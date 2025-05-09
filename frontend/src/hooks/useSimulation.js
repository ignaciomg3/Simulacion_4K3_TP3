import { useState, useEffect } from 'react';
import { runSimulation as apiRunSimulation } from '../services/api';
import { processApiResults, validateInputs } from '../utils/simulationUtils';
import {
  DEFAULT_DAYS,
  DEFAULT_START_DAY,
  DEFAULT_END_DAY,
  DEFAULT_WORKERS,
  DEFAULT_DAILY_REVENUE,
  DEFAULT_DAILY_COSTS,
  DEFAULT_WORKER_COST,
  DEFAULT_TARGET_PROFIT,
  DEFAULT_ABSENTEE_DISTRIBUTION
} from '../constants/defaults';

/**
 * Custom hook to manage simulation state and logic
 * @returns {Object} - Simulation state and functions
 */
const useSimulation = () => {
  // State variables for inputs
  const [numDays, setNumDays] = useState(DEFAULT_DAYS);
  const [startDay, setStartDay] = useState(DEFAULT_START_DAY);
  const [endDay, setEndDay] = useState(DEFAULT_END_DAY);
  const [numWorkers, setNumWorkers] = useState(DEFAULT_WORKERS);
  const [dailyRevenue, setDailyRevenue] = useState(DEFAULT_DAILY_REVENUE);
  const [dailyCosts, setDailyCosts] = useState(DEFAULT_DAILY_COSTS);
  const [workerCost, setWorkerCost] = useState(DEFAULT_WORKER_COST);
  const [targetProfit, setTargetProfit] = useState(DEFAULT_TARGET_PROFIT);
  const [simulationResults, setSimulationResults] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Variable de estado para la distribución
  const [distribution, setDistribution] = useState(DEFAULT_ABSENTEE_DISTRIBUTION);
  const [distributionError, setDistributionError] = useState(null);
  const [isSimulationDisabled, setIsSimulationDisabled] = useState(false);

  // Validate inputs whenever they change
  useEffect(() => {
    const validationErrors = validateInputs({
      numDays,
      startDay,
      endDay,
      numWorkers,
      dailyRevenue,
      dailyCosts,
      workerCost
    });
    
    setErrors(validationErrors);
  }, [numDays, startDay, endDay, numWorkers, dailyRevenue, dailyCosts, workerCost]);

  // Funcion para actualizar la distribución
  const handleDistributionChange = (newDistribution) => {
    setDistribution(newDistribution);
    const totalPercentage = newDistribution.reduce((sum, item) => sum + item.probability, 0);

    // Si la suma es distinto a 100, deshabilitar el botón de simulación
    if (totalPercentage !== 100) {
      setDistributionError(`La suma de probabilidades no puede ser mayor a 100%. Actualmente: ${totalPercentage.toFixed(1)}%`);
      setIsSimulationDisabled(true);
    } else {
      setDistributionError(null);
      setIsSimulationDisabled(false);
    }
  };

  const runSimulation = async () => {
    // Validate inputs before running simulation
    const validationErrors = validateInputs({
      numDays,
      startDay,
      endDay,
      numWorkers,
      dailyRevenue,
      dailyCosts,
      workerCost
    });
    
    // If there are validation errors, update state and don't run simulation
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Check distribution validation
    if (distributionError) {
      return;
    }
    
    setIsLoading(true);
    setApiError(null);
    setSimulationResults(null);

    try {
      const response = await fetch('/api/simular', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          n: parseInt(numDays),
          i: parseInt(startDay),
          j: parseInt(endDay),
          obreros_totales: parseInt(numWorkers),
          valor_venta: parseInt(dailyRevenue),
          costo_produccion: parseInt(dailyCosts),
          costo_obrero: parseInt(workerCost),
          valor_y: parseInt(targetProfit),
          // Include other parameters here if needed
          dia_0: distribution[0].frequency,
          dia_1: distribution[1].frequency,
          dia_2: distribution[2].frequency,
          dia_3: distribution[3].frequency,
          dia_4: distribution[4].frequency,
          dia_5: distribution[5].frequency,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la simulación');
      }

      const data = await response.json();
      
      // Pass the simulation parameters to processApiResults
      const processedResults = processApiResults(data.results, {
        numDays: parseInt(numDays),
        startDay: parseInt(startDay),
        endDay: parseInt(endDay),
        numWorkers: parseInt(numWorkers)
      });
      
      setSimulationResults(processedResults);
    } catch (error) {
      console.error('Simulation error:', error);
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    numDays,
    startDay,
    endDay,
    numWorkers,
    dailyRevenue,
    dailyCosts,
    workerCost,
    targetProfit,
    simulationResults,
    errors,
    isLoading,
    apiError,
    isSimulationDisabled,
    
    // Setters
    setNumDays,
    setStartDay,
    setEndDay,
    setNumWorkers,
    setDailyRevenue,
    setDailyCosts,
    setWorkerCost,
    setTargetProfit,
    
    // Functions
    runSimulation,
    distribution,
    distributionError,
    handleDistributionChange,
  };
};

export default useSimulation;