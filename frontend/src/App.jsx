import React from 'react';
import SimulationForm from './components/SimulationForm';
import AbsenteeDistribution from './components/DistribucionAusentes';
import SimulationResults from './components/SimulationResults';
import useSimulation from './hooks/useSimulation';

/**
 * Main application component
 */
const App = () => {
  const {
    numDays,
    setNumDays,
    startDay,
    setStartDay,
    endDay,
    setEndDay,
    numWorkers,
    setNumWorkers,
    dailyRevenue,
    setDailyRevenue,
    dailyCosts,
    setDailyCosts,
    distribution,
    distributionError,
    handleDistributionChange,
    workerCost,
    setWorkerCost,
    targetProfit,
    setTargetProfit,
    simulationResults,
    errors,
    isLoading,
    isSimulationDisabled,
    apiError,
    runSimulation
  } = useSimulation();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Simulación Monte Carlo - Ausentismo Laboral
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SimulationForm
          numDays={numDays}
          setNumDays={setNumDays}
          startDay={startDay}
          setStartDay={setStartDay}
          endDay={endDay}
          setEndDay={setEndDay}
          numWorkers={numWorkers}
          setNumWorkers={setNumWorkers}
          dailyRevenue={dailyRevenue}
          setDailyRevenue={setDailyRevenue}
          dailyCosts={dailyCosts}
          setDailyCosts={setDailyCosts}
          workerCost={workerCost}
          setWorkerCost={setWorkerCost}
          targetProfit={targetProfit}
          setTargetProfit={setTargetProfit}
          errors={errors}
          isLoading={isLoading}
          isSimulationDisabled={isSimulationDisabled}
          apiError={apiError}
          runSimulation={runSimulation}
        />
        
        <AbsenteeDistribution 
        distributionData={distribution}
        onDistributionChange={handleDistributionChange}
        validationError={distributionError}
        />
      </div>
      
      {simulationResults && (
        <SimulationResults
        results={simulationResults}
        numWorkers={numWorkers}
        targetProfit={targetProfit}
      />
      )}
    </div>
  );
};

export default App;