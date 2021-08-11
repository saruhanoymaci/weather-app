import React from 'react';
import './App.css'


import Weather from './component/weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Form from './component/form.component';

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const API_key = "58fdfb77bd3829836a1c747bc7d86bd6";
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_min: undefined,
      temp_max: undefined,
      description: "",
      error: false
    };
    this.weatherIcon = {
      Thunderstorm: "poo-storm",
      Drizzle: "cloud-rain",
      Rain: "cloud-showers-heavy",
      Snow: "snowflake",
      Atmosphere: "smog",
      Clear: "sun",
      Clouds: "cloud",
    }
  }
  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15)
    return cell;
  }
  get_WeatherIcon(icons, rangeID) {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm })
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle })
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({ icon: this.weatherIcon.Rain })
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: this.weatherIcon.Snow })
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere })
        break;
      case rangeID === 800:
        this.setState({ icon: this.weatherIcon.Clear })
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({ icon: this.weatherIcon.Clouds })
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds })
    }
  }
  /*getWeather = async () => {
    const api_call = await fetch(`api.openweathermap.org/data/2.5/weather?q=London&appid=${API_key}`);
    const response = await api_call.json();
    //console.log(response)
    this.setState({
      city: response.name,
      country: response.sys.country
    })
  }*/
  //with axios
  getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {

      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)
      console.log(response)
      this.setState({
        city: `${response.data.name},${response.data.sys.country}`,
        celsius: this.calCelsius(response.data.main.temp_celsius),
        temp_min: this.calCelsius(response.data.main.temp_min),
        temp_max: this.calCelsius(response.data.main.temp_max),
        description: response.data.weather[0].description,
        error: false
      })
      this.get_WeatherIcon(this.weatherIcon, response.data.weather[0].id);
    }
    else {
      this.setState({ error: true })
    }

  }
  render() {
    return (
      <div className="App">
        <Form error={this.state.error} loadweather={this.getWeather} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celcius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon} />
      </div>
    );
  }
}
export default App;
