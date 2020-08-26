import React, { useState, useEffect } from 'react'
import { fetchDailyDate } from '../../api'
import { Line, Bar } from 'react-chartjs-2'
import styles from './Chart.module.css'

export default function Chart({ data: { confirmed, recovered, deaths }, countryPicker }) {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyDate());
        }
        fetchAPI();
    }, [])

    const lineChart = (
        dailyData.length !== 0 ?
            (
                <Line data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true
                    }]
                }} />
            ) : null
    )
    const barChart = (
        confirmed
            ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    option={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${countryPicker}` }
                    }}
                />
            ) : null)
    return (
        <div className={styles.container}>
            {countryPicker ? barChart : lineChart}
        </div>
    )
}
