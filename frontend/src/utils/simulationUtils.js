/**
 * Process the raw API results into a format for UI display
 * @param {Array} results - Raw simulation results from API
 * @param {Object} simulationParams - Original simulation parameters
 * @returns {Object} - Processed simulation data
 */
export const processApiResults = (results, simulationParams = {}) => {
  if (!results || results.length === 0) {
    return null;
  }
  
  // Extract total days from simulationParams or use a default (100000)
  const totalDaysSimulated = simulationParams.numDays || 100000;
  
  const dailyResults = results.map(day => {
    return {
      day: day[0], // Día
      totalWorkers: day[1], // Obreros totales
      rnd: day[2], // RND obreros ausentes
      absentWorkers: day[3], // Obreros ausentes
      presentWorkers: day[4], // Obreros restantes
      operational: day[5], // Fabrica en funcionamiento
      revenue: day[6], // Venta productos
      costs: day[7], // Costo produccion
      laborCosts: day[5] ? day[8] * day[4] : day[8] * day[1], // if operational: costoXobrero * obrerosRestantes else costoXobrero * obrerosTotales
      profit: day[9], // Ganancia del día
      cumulativeProfit: day[10], // Ganancia acumulada
      targetValue: day[11], // Valor Y
      profitAboveYCounter: day[12], // Contador beneficio > Y
      profitAboveYProbability: day[13] // P() beneficio diario > Y
    };
  });
  
  // Calculate summary statistics
  const lastDay = dailyResults[dailyResults.length - 1];
  const operationalDays = dailyResults.filter(day => day.operational).length;
  const nonOperationalDays = dailyResults.length - operationalDays;
  
  // Calculate extrapolated operational days for the full simulation
  const operationalPercentage = (operationalDays / dailyResults.length) * 100;
  
  return {
    totalProfit: lastDay.cumulativeProfit,
    averageProfit: lastDay.cumulativeProfit / lastDay.day,
    operationalDays,
    nonOperationalDays,
    operationalPercentage,
    probabilityOfTargetProfit: lastDay.profitAboveYProbability * 100,
    totalDaysSimulated, // Add the total number of days simulated
    dailyResults
  };
};

/**
 * Validate simulation input parameters
 * @param {Object} params - Simulation parameters to validate
 * @returns {Object} - Error messages by field
 */
export const validateInputs = (params) => {
  const {
    numDays,
    startDay,
    endDay,
    numWorkers,
    dailyRevenue,
    dailyCosts,
    workerCost
  } = params;
  
  const errors = {};
  
  if (!numDays || numDays <= 0) 
    errors.numDays = "El número de días debe ser mayor que 0";
  
  if (!startDay || startDay <= 0) 
    errors.startDay = "El día de inicio debe ser mayor que 0";
  
  if (!endDay || endDay <= 0) 
    errors.endDay = "El día de fin debe ser mayor que 0";
  
  if (endDay < startDay) 
    errors.endDay = "El día de fin no puede ser menor que el día de inicio";
  
  if (endDay > numDays) 
    errors.endDay = "El día de fin no puede ser mayor que el número total de días";
  
  if (!numWorkers || numWorkers <= 0) 
    errors.numWorkers = "El número de trabajadores debe ser mayor que 0";
  
  if (!dailyRevenue || dailyRevenue <= 0) 
    errors.dailyRevenue = "Los ingresos diarios deben ser mayores que 0";
  
  if (!dailyCosts || dailyCosts <= 0) 
    errors.dailyCosts = "Los costos diarios deben ser mayores que 0";
  
  if (!workerCost || workerCost <= 0) 
    errors.workerCost = "El costo por trabajador debe ser mayor que 0";

  return errors;
};