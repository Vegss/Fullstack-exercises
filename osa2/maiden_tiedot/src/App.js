import { useEffect, useState } from 'react'
import Countries from './components/Countries'
import axios from 'axios'



const App = () => {
  const [countries, setCountries] = useState([])
  const [toShow, setToShow] = useState(countries)
  const [filter, setFilter] = useState('')
  const baseUrl = 'https://restcountries.com/v3.1'

  useEffect(() => {
    axios.get(`${baseUrl}/all`).then(response => {
      setCountries(response.data)
      setToShow(response.data)
    })
  }, [])

  useEffect(() => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter))
    setToShow(filteredCountries)
  }, [filter, countries])

  return (
    <div className='App'>
      <label>find countries</label>
      <input onChange={(e) => setFilter(e.target.value)} />
      <div>
        <Countries countries={toShow} setToShow={setToShow} />
      </div>
    </div>
  );
}

export default App;
