import React, { useState, useEffect} from 'react';
import ProgressBar from './ProgressBar';

/**
 * Form component for simulation parameters
 */
const SimulationForm = ({
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
  workerCost,
  setWorkerCost,
  targetProfit,
  setTargetProfit,
  errors,
  isLoading,
  apiError,
  isSimulationDisabled,
  runSimulation,
  // ???????????????
  exportToExcel
  // ???????????????
}) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Parámetros de Simulación</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total de días
            </label>
            <input 
              type="number" 
              value={numDays} 
              onChange={(e) => setNumDays(parseInt(e.target.value) || 0)}
              className={`mt-1 block w-full px-3 py-2 border ${errors.numDays ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.numDays && <p className="text-red-500 text-sm mt-1">{errors.numDays}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Día inicial (i)
            </label>
            <input 
              type="number" 
              value={startDay} 
              onChange={(e) => setStartDay(parseInt(e.target.value) || 0)}
              className={`mt-1 block w-full px-3 py-2 border ${errors.startDay ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.startDay && <p className="text-red-500 text-sm mt-1">{errors.startDay}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Día final (j)
            </label>
            <input 
              type="number" 
              value={endDay} 
              onChange={(e) => setEndDay(parseInt(e.target.value) || 0)}
              className={`mt-1 block w-full px-3 py-2 border ${errors.endDay ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.endDay && <p className="text-red-500 text-sm mt-1">{errors.endDay}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Número total de trabajadores
          </label>
          <select
            value={numWorkers}
            onChange={(e) => setNumWorkers(parseInt(e.target.value))}
            className={`mt-1 block w-full px-3 py-2 border ${errors.numWorkers ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="21">21 trabajadores</option>
            <option value="22">22 trabajadores</option>
            <option value="23">23 trabajadores</option>
            <option value="24">24 trabajadores (original)</option>
          </select>
          {errors.numWorkers && <p className="text-red-500 text-sm mt-1">{errors.numWorkers}</p>}
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ingresos diarios ($)
            </label>
            <input 
              type="number" 
              value={dailyRevenue} 
              onChange={(e) => setDailyRevenue(parseFloat(e.target.value) || 0)}
              className={`mt-1 block w-full px-3 py-2 border ${errors.dailyRevenue ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.dailyRevenue && <p className="text-red-500 text-sm mt-1">{errors.dailyRevenue}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Costos variables ($)
            </label>
            <input 
              type="number" 
              value={dailyCosts} 
              onChange={(e) => setDailyCosts(parseFloat(e.target.value) || 0)}
              className={`mt-1 block w-full px-3 py-2 border ${errors.dailyCosts ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.dailyCosts && <p className="text-red-500 text-sm mt-1">{errors.dailyCosts}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Costo obrero ($)
            </label>
            <input 
              type="number" 
              value={workerCost} 
              onChange={(e) => setWorkerCost(parseFloat(e.target.value) || 0)}
              className={`mt-1 block w-full px-3 py-2 border ${errors.workerCost ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.workerCost && <p className="text-red-500 text-sm mt-1">{errors.workerCost}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Beneficio diario objetivo (y) ($)
          </label>
          <input 
            type="number" 
            value={targetProfit} 
            onChange={(e) => setTargetProfit(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <button
          onClick={runSimulation}
          disabled={isLoading || isSimulationDisabled}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Simulando...
            </span>
          ) : 'Ejecutar Simulación'}
        </button>

        <button
          onClick={exportToExcel}
          disabled={isLoading || isSimulationDisabled}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 mt-2"
        >
          Exportar a Excel
        </button>
        
        {apiError && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{apiError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationForm;