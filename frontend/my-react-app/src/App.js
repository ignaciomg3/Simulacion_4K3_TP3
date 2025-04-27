// src/App.js
import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []); // Empty dependency array means this runs only once, like componentDidMount.

  return <div>{message}</div>;
}

export default App;
