import axios from "axios"
import { useEffect, useState } from "react"

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState([])
  const apikey = process.env.REACT_APP_API_KEY
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${apikey}`

  useEffect(() => {
    axios
      .get(weatherUrl)
      .then((response) => {
        setWeatherData(response.data)
        console.log(response.data)
      })
  }, [])
  if (!weatherData.main) return <p>loading...</p>
  return (
    <div>
      <h1>Weather in {country.capital}</h1>
      <p>Temperature: {weatherData.main.temp-273.15} Celsius</p>
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon"/>
      <p>Wind speed: {weatherData.wind.speed} m/s</p>
    </div>
  )
}




export default Weather