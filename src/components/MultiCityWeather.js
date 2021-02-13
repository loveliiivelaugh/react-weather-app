import React from "react";

const WeatherContext = React.createContext({
  cities: [],
  addCity: (name, temperature) => { },
});


const AddCityButton = (props) => {
  const context = React.useContext(WeatherContext);
  const [name, setName] = React.useState('');
  const submit = () => {
    const unit = 'imperial';
    const mode = 'json';
    const encodedName = encodeURIComponent(name);
    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&mode=${mode}&q=${encodedName}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "ac72153c36mshd1814c8f1af20f3p1518fbjsnabee85184908"
      }
    })
      .then(response => {
        console.log(response);
        if (response.status !== 200) throw new Error();
        return response.json();
      }).then(json => {
        console.log(json);
        context.addCity(name, json.main.temp);
        setName('');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="add-city-form">
      <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
      <button className="input" onClick={submit}>Add</button>
    </div>
  );
};


const TemperatureAverage = (props) => {
  const context = React.useContext(WeatherContext);
  if (context.cities.length === 0) {
    return (
      <div>Add some cities to view their average temperatures.</div>
    );
  }
  let total = 0;
  for (const city of context.cities) {
    total += city.temperature;
  }
  const avg = total / context.cities.length;
  return (
    <div>
      The average is <b>{avg.toFixed(2)}</b> degrees Fahrenheit.
    </div>
  );
};



const CityList = (props) => {
  const context = React.useContext(WeatherContext);
  return (
    <table className="city-list">
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature</th>
        </tr>
      </thead>
      <tbody>
        {context.cities.map((city, i) => (
          <tr key={city.name}>
            <td>{city.name}</td>
            <td>{city.temperature}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function MultiCityWeather() {

  const [cities, setCities] = React.useState([]);
  const addCity = (name, temperature) => {
    const newCity = { name, temperature };
    setCities(prevCities => [...prevCities, { name, temperature }]);
  };

  return (
    <div>
      <WeatherContext.Provider value={{
        cities,
        addCity,
      }}>
        <div className="city-overview">
          <h2>Multi-Weather Widget</h2>
          <CityList />
          <AddCityButton />
          <TemperatureAverage />
        </div>
      </WeatherContext.Provider>
    </div>
  )
}
