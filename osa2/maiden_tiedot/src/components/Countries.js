import Country from "./Country"

const Countries = ({ countries, setToShow }) => {

  if (countries.length > 10) return <p>Too many matches, specify another filter</p>
  if (countries.length === 1) {
    const country = countries[0]
    return (
      <Country country={country} />
    )
  }
  return (
    <div>
    {
      countries.map(country => {
        return(
          <div key={country.name.common}>
            <p style={{display: "inline"}}>{country.name.common}</p>
            <button onClick={() => setToShow([country])} >show</button>
          </div>
        )
      })
    }
    </div>
  )
}

export default Countries