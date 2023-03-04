import Weather from "./Weather"

const Country = ({ country }) => {
  const countryLanguages = Object.keys(country.languages)
  const flagUrl = country.flags.png
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>languages: </h3>
      <ul>
        {
          countryLanguages.map(language => <li key={language[0]}>{country.languages[language]}</li>)
        }
      </ul>
      <img src={flagUrl} alt='flag' />
      <Weather country={country}/>
  </div>
  )
}

export default Country