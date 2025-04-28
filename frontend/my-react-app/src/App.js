// src/App.js
import { useState, useEffect } from 'react';

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
      <div>
        <label>
          Días a simular (n):
          <input
            type="number"
            name="n"
            value={parameters.n}
            onChange={handleChange}
          />
        </label>
        <label>
          Día inicial (i):
          <input
            type="number"
            name="i"
            value={parameters.i}
            onChange={handleChange}
          />
        </label>
        <label>
          Día final (j):
          <input
            type="number"
            name="j"
            value={parameters.j}
            onChange={handleChange}
          />
        </label>
        <label>
          Obreros totales:
          <input
            type="number"
            name="obreros_totales"
            value={parameters.obreros_totales}
            onChange={handleChange}
          />
        </label>
        <label>
          Valor de venta:
          <input
            type="number"
            name="valor_venta"
            value={parameters.valor_venta}
            onChange={handleChange}
          />
        </label>
        <label>
          Costo de producción:
          <input
            type="number"
            name="costo_produccion"
            value={parameters.costo_produccion}
            onChange={handleChange}
          />
        </label>
        <label>
          Costo de obreros:
          <input
            type="number"
            name="costo_obrero"
            value={parameters.costo_obrero}
            onChange={handleChange}
          />
        </label>
        <label>
          Valor de ganancia Y (Y):
          <input
            type="number"
            name="valor_y"
            value={parameters.valor_y}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleSubmit}>Correr Simulación</button>
      </div>

      {results && (
        <div>
          <h2>Resultados de la simulación</h2>
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

