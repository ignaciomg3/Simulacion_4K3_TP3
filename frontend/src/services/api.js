import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Run Monte Carlo simulation
 * @param {Object} params - Simulation parameters
 * @param {number} params.n - Numeros de días a simular
 * @param {number} params.i - Comienzo del día para los resultados
 * @param {number} params.j - Fin del día para los resultados
 * @param {number} params.obreros_totales - Numero de obreros
 * @param {number} params.valor_venta - Precio de venta por unidad
 * @param {number} params.costo_produccion - costo de producción por unidad
 * @param {number} params.costo_obrero - costo por obrero
 * @param {number} params.valor_y - Target profit
 * @returns {Promise<Object>} - API response
 */
export const runSimulation = async (params) => {
  try {
    const response = await api.post('/simular', params);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message || 'Error en la simulación';
  }
};

export default api;