import React, { useState, useEffect } from 'react';

const AbsenteeDistribution = ({ 
  distributionData, 
  onDistributionChange,
  validationError
}) => {
  // Store the ORIGINAL base frequencies and default probabilities
  const [baseFrequencies] = useState(() => distributionData.map(item => item.frequency));
  const [baseProbabilities] = useState(() => distributionData.map(item => item.probability));
  const [localDistribution, setLocalDistribution] = useState(distributionData);
  
  // Actualizar cuando cambien datos externos
  useEffect(() => {
    setLocalDistribution(distributionData);
  }, [distributionData]);
  
  // Función para restaurar valores por defecto
  const resetToDefaults = () => {
    // Copy BASE FREQUENCIES into PROBABILITY column
    const resetDistribution = localDistribution.map((item, index) => ({
      ...item,
      probability: baseFrequencies[index], // Copy from base frequencies to probability
      frequency: baseFrequencies[index]    // Keep frequency as base frequency
    }));
    
    setLocalDistribution(resetDistribution);
    // Immediately call onDistributionChange to propagate the reset
    onDistributionChange(resetDistribution);
  };
  
  // Manejar cambios en los valores de probabilidad
  const handleProbabilityChange = (index, newValue) => {
    const value = parseFloat(newValue) || 0;
    
    // Crear una copia del array para modificar
    const updatedDistribution = [...localDistribution];
    updatedDistribution[index] = { 
      ...updatedDistribution[index], 
      probability: value 
    };
    
    // Calcular el total actual de probabilidades
    const totalProb = updatedDistribution.reduce((sum, item) => sum + item.probability, 0);
    
    // Evitar división por cero
    if (totalProb === 0) {
      // Si el total es cero, establecer todas las frecuencias a cero
      updatedDistribution.forEach(item => {
        item.frequency = 0;
      });
    } else {
      // Ajustar todas las frecuencias basadas en proporción de probabilidades
      const totalDays = 100; // Mantenemos un total de 100 días
      
      // Actualizamos las frecuencias basadas en las probabilidades
      updatedDistribution.forEach(item => {
        // Calculamos la frecuencia exacta
        const exactFreq = (item.probability / totalProb) * totalDays;
        // Redondeamos al entero más cercano
        item.frequency = Math.round(exactFreq);
      });
      
      // Ajustamos para asegurar que la suma sea exactamente 100
      const currentSum = updatedDistribution.reduce((sum, item) => sum + item.frequency, 0);
      if (currentSum !== totalDays) {
        // Encontrar el ítem con la mayor frecuencia para ajustar la diferencia
        const maxIndex = updatedDistribution.reduce((maxIdx, item, idx, arr) => 
          item.frequency > arr[maxIdx].frequency ? idx : maxIdx, 0);
        
        // Ajustar la diferencia
        updatedDistribution[maxIndex].frequency += (totalDays - currentSum);
      }
    }
    
    setLocalDistribution(updatedDistribution);
    onDistributionChange(updatedDistribution);
  };
  
  // Calcular totales
  const totalFrequency = baseFrequencies.reduce((sum, freq) => sum + freq, 0);
  const totalPercentage = localDistribution.reduce((sum, item) => sum + item.probability, 0);
  
  return (
    <div className="card">
      <h2 className="card-header flex justify-between items-center">
        <span>Distribución de Ausentismo</span>
        <button
          onClick={resetToDefaults}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-md transition-colors"
          title="Restaurar valores por defecto"
        >
          Restaurar valores
        </button>
      </h2>
      
      <div className="p-4">
        {validationError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded">
            {validationError}
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trabajadores Ausentes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Frecuencia Base (días)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Probabilidad (%)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {localDistribution.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.absent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {baseFrequencies[index]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input 
                      type="number" 
                      min="0"
                      max="100"
                      step="0.1"
                      value={item.probability.toFixed(1)}
                      onChange={(e) => handleProbabilityChange(index, e.target.value)}
                      className="input-field w-20 text-center"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-medium">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Total
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {totalFrequency}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  Math.abs(totalPercentage - 100) < 0.1 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {totalPercentage.toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AbsenteeDistribution;