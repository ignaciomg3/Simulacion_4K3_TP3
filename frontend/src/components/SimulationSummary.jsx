import React from 'react';

/**
 * Component to display simulation summary statistics
 */
const SimulationSummary = ({ results, numWorkers, targetProfit }) => {
  if (!results) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-2">Resumen ({numWorkers} trabajadores)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-sm">
            Beneficio total: <span className="font-semibold">${results.totalProfit.toFixed(2)}</span>
          </p>
          <p className="text-sm">
            Beneficio promedio: <span className="font-semibold">${results.averageProfit.toFixed(2)}</span>
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm">
            Días operativos: <span className="font-semibold">{results.operationalDays}</span> ({results.operationalPercentage.toFixed(1)}%)
          </p>
          <p className="text-sm">
            Días no operativos: <span className="font-semibold">{results.nonOperationalDays}</span>
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm">
            Prob. beneficio {'>'} ${targetProfit}: <span className="font-semibold">{results.probabilityOfTargetProfit.toFixed(1)}%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulationSummary;