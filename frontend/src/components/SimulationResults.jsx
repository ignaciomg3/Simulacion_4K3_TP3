import React, { useState } from 'react';
import SimulationSummary from './SimulationSummary';
import DailyResultsTable from './DailyResultsTable';

/**
 * Container component for all simulation results
 */
const SimulationResults = ({ results, numWorkers, targetProfit }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);

  if (!results) return null;

  const handleExportExcel = async () => {
    try {
      // First verify that we have dailyResults
      if (!results.dailyResults || results.dailyResults.length === 0) {
        setExportError("No hay resultados diarios para exportar");
        return;
      }
      
      setIsExporting(true);
      setExportError(null);
      
      const response = await fetch('/api/export-excel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          simulationResults: results,
          numWorkers,
          targetProfit
        }),
      });
      
      if (!response.ok) {
        // More robust error handling
        let errorMessage = 'Error exportando a Excel';
        try {
          const errorData = await response.json();
          if (errorData && errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          // If response isn't JSON, use status text instead
          errorMessage = `Error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      // Convert the response to a blob
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resultados_diarios.xlsx';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      setExportError(error.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Resultados de la Simulación</h2>
        
        {/* Excel Export Button */}
        <button
          onClick={handleExportExcel}
          disabled={isExporting}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Exportando...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Exportar a Excel
            </>
          )}
        </button>
      </div>
      
      {/* Display export error if any */}
      {exportError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error al exportar: {exportError}
        </div>
      )}
      
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