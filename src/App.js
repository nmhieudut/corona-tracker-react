import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import corona from './assets/image.png'
import { Cards, Chart, CountryPicker } from './components'
import { fetchData } from './api'

function App() {
  const [data, setData] = useState({});
  const [countryPicker, setCountryPicker] = useState('')

  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData());
    }
    fetchAPI();
  }, [])

  const handleCountryChange = async (country) => {
    setData(await fetchData(country));
    setCountryPicker(country)
  }

  return (
    <div className={styles.container}>
      <img src={corona} className={styles.image} alt="Loading..." />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} countryPicker={countryPicker} />
    </div>
  );
}

export default App;
