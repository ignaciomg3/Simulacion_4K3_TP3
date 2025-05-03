import React, { useCallback, memo } from 'react';

// Componente de fila memoizado para evitar re-renderizados
const TableRow = memo(({ day, index, targetProfit }) => (
  <tr 
    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${
      day.operational ? 'hover:bg-green-50' : 'hover:bg-red-50'
    } transition-colors`}
  >
    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{day.day}</td>
    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{day.rnd.toFixed(4)}</td>
    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{day.absentWorkers}</td>
    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{day.presentWorkers}</td>
    <td className="px-4 py-3 whitespace-nowrap text-sm">
      {day.operational ? 
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Sí</span> : 
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">No</span>}
    </td>
    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{day.revenue.toFixed(2)}</td>
    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{day.costs.toFixed(2)}</td>
    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{day.laborCosts.toFixed(2)}</td>
    <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
      day.profit >= targetProfit ? 'text-green-600' : 'text-red-600'
    }`}>
      {day.profit.toFixed(2)}
    </td>
    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{day.cumulativeProfit.toFixed(2)}</td>
  </tr>
));

const DailyResultsTable = ({ results, numWorkers, targetProfit }) => {
  if (!results || !results.dailyResults || results.dailyResults.length === 0) {
    return null;
  }

  // Optimizaciones para el scrolling
  const renderRow = useCallback((day, index) => (
    <TableRow 
      key={index} 
      day={day} 
      index={index} 
      targetProfit={targetProfit} 
    />
  ), [targetProfit]);

  return (
    <div className="card">
      <h3 className="card-header">
        Resultados Diarios ({numWorkers} trabajadores)
      </h3>
      <div 
        className="overflow-x-auto overflow-y-auto" 
        style={{ 
          maxHeight: '400px',
          // Optimizaciones de CSS para scrolling
          willChange: 'transform',
          transform: 'translateZ(0)',
          overscrollBehavior: 'contain'
        }}
      >
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Día</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">RND</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Ausentes</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Presentes</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Operativo</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Ingresos ($)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Costos Prod. ($)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">Costos Personal ($)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Beneficio ($)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Beneficio AC ($)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.dailyResults.map(renderRow)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyResultsTable;