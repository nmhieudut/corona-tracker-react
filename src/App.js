import React, { useEffect } from 'react';
import './App.css';
import { Card, Chart, CountryPicker } from './components'
import { fetchData } from './api'

function App() {
  useEffect(() => fetchData(), [])
  return (
    <div className="App">
      <Card />
      <Chart />
      <CountryPicker />
    </div>
  );
}

export default App;
