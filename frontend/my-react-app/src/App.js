// src/App.js
import { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: inputValue }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a number"
      />
      <button onClick={handleSubmit}>Submit</button>

      {result !== null && (
        <div>Result: {result}</div>
      )}
    </div>
  );
}

export default App;

