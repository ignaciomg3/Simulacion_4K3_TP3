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

  // Function to run the Monte Carlo simulation
  const runSimulation = async () => {
    const inputParams = {
      numDays,
      startDay,
      endDay,
      numWorkers,
      dailyRevenue,
      dailyCosts,
      workerCost
    };
    
    const validationErrors = validateInputs(inputParams);
    setErrors(validationErrors);
    

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Borramos la data de previa simulacion
    setSimulationResults(null);
    setIsLoading(true);
    setApiError(null);
    
    try {

      // Extraer valores de frecuencia de la distribución
      const dia_0 = distribution.find(item => item.absent === 0)?.frequency || 0;
      const dia_1 = distribution.find(item => item.absent === 1)?.frequency || 0;
      const dia_2 = distribution.find(item => item.absent === 2)?.frequency || 0;
      const dia_3 = distribution.find(item => item.absent === 3)?.frequency || 0;
      const dia_4 = distribution.find(item => item.absent === 4)?.frequency || 0;
      const dia_5 = distribution.find(item => item.absent === 5)?.frequency || 0;

      // Prepare the payload for the API call
      const payload = {
        n: numDays,
        i: startDay,
        j: endDay,
        obreros_totales: numWorkers,
        valor_venta: dailyRevenue,
        costo_produccion: dailyCosts,
        costo_obrero: workerCost,
        valor_y: targetProfit,
        dia_0: dia_0,
        dia_1: dia_1,
        dia_2: dia_2,
        dia_3: dia_3,
        dia_4: dia_4,
        dia_5: dia_5,
      };
      
      // Make the API call
      const data = await apiRunSimulation(payload);
      
      // Process the results from the API
      const processedResults = processApiResults(data.results);
      setSimulationResults(processedResults);
    } catch (error) {
      console.error('Error running simulation:', error);
      setApiError(error.toString());
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