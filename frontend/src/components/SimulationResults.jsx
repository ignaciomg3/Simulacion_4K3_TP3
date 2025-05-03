import React from 'react';
import SimulationSummary from './SimulationSummary';
import DailyResultsTable from './DailyResultsTable';

/**
 * Container component for all simulation results
 */
const SimulationResults = ({ results, numWorkers, targetProfit }) => {
  if (!results) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Resultados de la Simulación</h2>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        <SimulationSummary 
          results={results} 
          numWorkers={numWorkers} 
          targetProfit={targetProfit} 
        />
      </div>
      
      <DailyResultsTable 
        results={results} 
        numWorkers={numWorkers} 
        targetProfit={targetProfit}
      />
    </div>
  );
};

export default SimulationResults;