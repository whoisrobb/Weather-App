import React, { useEffect, useState } from 'react';
import './App.css';
import CityInput from '../components/CityInput';
import TestInput from '../components/TestInput';
import Weather from '../components/Weather';
import Forecast from '../components/Forecast';

function App() {
  // const [selectedCity, setSelectedCity] = useState();

  // const handleSelectedCity = (data) => {
  //   setSelectedCity(data);
  // }

  // useEffect(() => {
  //   if (selectedCity) {
  //     const apiKey = '12d73bf1c475daa38b9f3856fb21f4f8';

  //     async function getWeatherData(apiKey) {
  //       const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.city},${selectedCity.countryCode}&appid=${apiKey}`;
  //       const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity.city},${selectedCity.countryCode}&appid=${apiKey}`;
      
  //       try {
  //         const [weatherResponse, forecastResponse] = await Promise.all([
  //           fetch(weatherUrl),
  //           fetch(forecastUrl)
  //         ]);
      
  //         const weatherData = await weatherResponse.json();
  //         const forecastData = await forecastResponse.json();
      
  //         console.log(weatherData);
  //         console.log(forecastData);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }      
  
  //     getWeatherData(apiKey)
  //   }
  // }, [selectedCity])

  const [cityWeather, setCityWeather] = useState('')
  const [cityForecast, setCityForeCast] = useState('')

  const [city, setCity] = useState('New York')

  const handleSelectedCity = (data) => (
    setCity(data)
  )

    useEffect(() => {
    if (city) {
      const apiKey = '12d73bf1c475daa38b9f3856fb21f4f8';

      async function getWeatherData(apiKey) {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      
        try {
          const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
          ]);
      
          const weatherData = await weatherResponse.json();
          const forecastData = await forecastResponse.json();
      
          setCityWeather(weatherData);
          setCityForeCast(forecastData);
        } catch (error) {
          console.log(error);
        }
      }      
  
      getWeatherData(apiKey)
    }
  }, [city])

  return (
    <div>
      <header>
        {/* <CityInput sendSelectedSuggestion={handleSelectedCity} /> */}
        <div className="city">
          <i className="uil uil-map-marker"></i>
          {cityWeather.name}
        </div>
        <TestInput sendSelectedCity={handleSelectedCity}/>
      </header>
      <main>
        <Weather data={cityWeather} />
      </main>
      <aside>
        <Forecast data={cityForecast} />
      </aside>
    </div>
  );
}

export default App;