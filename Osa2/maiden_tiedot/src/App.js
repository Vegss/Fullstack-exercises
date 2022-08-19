import axios from "axios";
import { useEffect, useState } from "react";

const Languages = ({languageKeys, filtered}) => {
  return(
    languageKeys.map((key, index) =>
      <div key={index}>
        <li key={index}>{filtered[0].languages[key]}</li>
      </div>
    )
  )
}

const MoreAbout = ({filtered}) => {
  const languageKeys = Object.keys(filtered[0].languages)
  return(
  <div>
    <h1>{filtered[0].name.common}</h1>
      <p>capital {filtered[0].capital}</p>
      <p>area {filtered[0].area}</p>
    <h3>languages:</h3>
      <Languages languageKeys={languageKeys} filtered={filtered}/>
    <img 
      src={filtered[0].flags.png}
      alt="country flag"
     />
  </div>
  )
}

const Content = ({filtered}) => {
  if (filtered.length > 10) {
    return(
      <p>Too many matches, specify another filter</p>
    )
  }
  if (filtered.length === 1) {
    return(
      <MoreAbout filtered={filtered}/>
    )
  }
  return(
    filtered.map(country => 
      <p key={country.name}>{country.name.common}</p>
    )
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data)
    })
  },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const toShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    setFiltered(toShow)
  }

  return (
    <div>
      <form>
        <div>find countries <input value={filter} onChange={handleFilterChange}/></div>
      </form>
      <Content filtered={filtered}/>  
    </div>
  );
}

export default App;
