// src/App.js
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [parameters, setParameters] = useState({
    n: '',
    i: '',
    j: '',
    obreros_totales: '',
    valor_venta: 4000,
    costo_produccion: 2400,
    costo_obrero: 30,
    valor_y: 1000,
  });
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParameters({ ...parameters, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/simular', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters),
      });
      const data = await response.json();
      if (response.ok) {
        setResults(data.results);
      } else {
        alert(data.error || 'Ocurrió un error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const columns = [
    'Día',
    'Obreros totales',
    'RND Obreros ausentes',
    'Obreros ausentes',
    'Obreros restantes',
    'Fabrica funcionando',
    'Valor de venta',
    'Costo de producción',
    'Costo por obrero',
    'Ganancia diaria',
    'Ganancia acumulada',
    'Valor Y',
    'Contador Y',
    'P y',
  ];

  return (
    <div>
      <h1>Simulación de Montecarlo - Ausentismo en Industria Automotríz</h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <label>
          Días a simular (n):
          <input
            type="number"
            name="n"
            value={parameters.n}
            onChange={handleChange}
            style={{ marginLeft: '10px', width: '50%' }}
          />
        </label>
        <label>
          Día inicial (i):
          <input
            type="number"
            name="i"
            value={parameters.i}
            onChange={handleChange}
            style={{ marginLeft: '10px', width: '50%' }}
          />
        </label>
        <label>
          Día final (j):
          <input
            type="number"
            name="j"
            value={parameters.j}
            onChange={handleChange}
            style={{ marginLeft: '10px', width: '50%' }}
          />
        </label>
        <label>
        Obreros totales:
        <select
          name="obreros_totales"
          value={parameters.obreros_totales}
          onChange={handleChange}
          style={{ marginLeft: '10px', width: '25%' }}
        >
          <option value="">Seleccione</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
        </select>
        </label>
        <label>
        
          Costo de producción:
          <input
            type="number"
            name="costo_produccion"
            value={parameters.costo_produccion}
            onChange={handleChange}
            style={{ marginLeft: '10px', width: '35%' }}
          />
        </label>
        <label>
          Costo de obreros:
          <input
            type="number"
            name="costo_obrero"
            value={parameters.costo_obrero}
            onChange={handleChange}
            style={{ marginLeft: '10px', width: '30%' }}
          />
        </label>
        <label>
          Valor de ganancia Y (Y):
          <input
            type="number"
            name="valor_y"
            value={parameters.valor_y}
            onChange={handleChange}
            style={{ marginLeft: '10px', width: '35%' }}
          />
        </label>
        <button onClick={handleSubmit}>Correr Simulación</button>
      </div>

      {results && (
        <div>
          <h2>Resultados de la simulación</h2>
            <h3>
              {results && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  Parámetros de la simulación: <br />
                  Días a simular: {parameters.n} | Día inicial: {parameters.i} | Día final: {parameters.j} |
                  Obreros totales: {parameters.obreros_totales} | Valor de venta: {parameters.valor_venta} |
                  Costo de producción: {parameters.costo_produccion} | Costo de obreros: {parameters.costo_obrero} |
                  Valor Y: {parameters.valor_y}
                </div>
              )}
            </h3>
          <table border="1">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>
                    {col.split(' ').map((word, i) => (
                      <div key={i}>{word}</div>
                    ))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2].toFixed(4)}</td>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                  <td>{row[5] ? 'Si' : 'No'}</td>
                  <td>{row[6]}</td>
                  <td>{row[7]}</td>
                  <td>{row[8]}</td>
                  <td>{row[9]}</td>
                  <td>{row[10]}</td>
                  <td>{row[11]}</td>
                  <td>{row[12]}</td>
                  <td>{row[13].toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;

