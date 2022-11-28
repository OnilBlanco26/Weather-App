
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'
import background from './json/background.json'

function App() {

  const getRandomFromArray = (arr) => {
    const indexRandom = Math.floor(arr.length * Math.random())
    return arr[indexRandom]
  }


  const [coords, setCoords] = useState({})
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()

  const success = (pos) => {
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {

    if(coords) {
      const ApiKey = 'f334bb5db964e19695b53c0b937e539e'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${ApiKey}`
      axios.get(URL)
      .then(res =>  {
        setWeather(res.data)
        const celsius =( res.data.main.temp - 273.15).toFixed(1);
        const farenheit = (celsius * (9/5) + 32).toFixed(1);

        setTemp({
          celsius, farenheit
        })
      })
      .catch(err => console.log(err))
    }

  }, [coords])


  

  return (
    <div className="App">
     {weather ? <WeatherCard 
        weather = {weather}
        temp = {temp}
      />
     : <Loading />
    }
    </div>
  )
}

export default App
