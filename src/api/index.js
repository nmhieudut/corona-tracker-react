import axios from 'axios'

const url = "https://covid19.mathdro.id/api"

export const fetchData = async (country) => {
    let countryUrl = url;
    if (country) {
        countryUrl = `${url}/countries/${country}`
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(countryUrl);

        return { confirmed, recovered, deaths, lastUpdate }
    } catch (err) {
        console.log(err);
    }
}
export const fetchDailyDate = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map(e => ({
            confirmed: e.confirmed.total,
            deaths: e.deaths.total,
            date: e.reportDate
        }))
        return modifiedData;
    } catch (error) {
        console.log(error)
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)
        return countries.map((country) => country.name)
    } catch (error) {
        console.log(error)
    }
}