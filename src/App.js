import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/get_count')
      .then(response => {
        if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Initial count data:', data);
        setCount(data.count);
      })
      .catch(error => console.error('Error fetching initial count:', error));
  }, []);

  const handleClick = () => {
    fetch('http://127.0.0.1:8000/increase_count', { method: 'POST' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
        }
        return fetch('http://127.0.0.1:8000/get_count');
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Updated count data:', data);
        setCount(data.count);
      })
      .catch(error => console.error('Error updating count:', error));
  };

  return (
    <div className="App">
      <div className="counterContainer">
        <p>Button clicked {count} times</p>
        <button className="centeredButton" onClick={handleClick}>
          Click me
        </button>
      </div>
    </div>
  );
}

export default App;