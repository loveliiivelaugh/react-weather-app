import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import MultiCityWeather from "./components/MultiCityWeather";
import WeatherCard from "./components/WeatherCard";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function App() {
  const [forecast, setForecast] = useState([]);

  function getForecast(e) {
    e.preventDefault();
    const fiveDayForecast = [];
    fetch("https://community-open-weather-map.p.rapidapi.com/forecast?q=san%20francisco%2Cus", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "ac72153c36mshd1814c8f1af20f3p1518fbjsnabee85184908",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(data => {
      // to format the data structure to be strictly a 5-day forecast, we'll use this "for loop" to divide the 40 "3-hour" record lines by 8. Which will return just 5 days worth of data then.
      for (let i = 0; i < 40; i += 8) {
        // We'll then need to append this newly formated data structure to an empty array variable to then later set in state.
        fiveDayForecast.push(data.list[i]);
      }
      setForecast(fiveDayForecast);
    })
    .catch(err => {
      console.error(err);
    });
  }

  return (
    <div className="App">
      {/* <video id="background-video" loop autoPlay>
        <source src="https://player.vimeo.com/external/369614525.sd.mp4?s=f9462a0245c8c62331b5bd5ce12b207c610dd7df&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
      </video> */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
        <div className="form-container">
          <h2>Multi-City Weather App</h2>
          <h5>Search for your weather by city.</h5>
          {/* <MultiCityWeather /> */}

          <Row>
            <form onSubmit={getForecast}>
              <input id="city" type="text" name="city" placeholder="Search by City" />
              <input className="btn" type="submit" value="Search" />
            </form>
          </Row>
        </div>
      <Row>
        {forecast &&
          forecast.map(weath => (
            <WeatherCard 
              title={weath.weather[0].main}
              subtitle={weath.weather[0].id} 
              date={weath.dt_txt}
              temp={weath.main.temp}
              feelsLike={weath.main.feels_like}
              description={weath.weather[0].description} 
              icon={weath.weather[0].icon} 
              id={weath.weather[0].id} //used to acquire weather condition (i.e. thunderstorm with light rain)
              windDirection={weath.wind.deg}
              windSpeed={weath.wind.speed}
              link2="" 
            />
          ))
        }
      </Row>
    </div>
  );
}

export default App;
