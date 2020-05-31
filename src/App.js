import React from 'react';
import './App.css';

import "weather-icons/css/weather-icons.css"
import "bootstrap/dist/css/bootstrap.min.css"


import Weather from './app_components/weather.comoponents'
import Form from "./app_components/form.component"

const API_key = "d9508de96c8a2b29f542d90b8017d3c5"

class App extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
      city : undefined,
      country : undefined,
      icon :undefined,
      main : undefined,
      celsius :undefined,
      temp_max :undefined,
      temp_min:undefined,
      description :"",
      error :false 
    }
    this.weatherIcon ={
      Thunderstorm : "wi-thunderstorm",
      Drizzle :"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    }
  }
  calCelsius(temp)
  {
    let cell = Math.floor(temp-273.15)
    return cell;
  }
  get_weather_icon(icons,rangID){
    switch(true){
      case rangID>=200 && rangID<=232:
        this.setState({icon:this.weathericon.Thunderstorm})
         break;
        case rangID>=300 && rangID<=321:
          this.setState({icon:this.weathericon.Drizzle})
          break;
          case rangID>=500 && rangID<=531:
          this.setState({icon:this.weathericon.Rain})
          break;
        case rangID>=600 && rangID<=622:
         this.setState({icon:this.weathericon.Snow})
         break;
        case rangID>=701 && rangID<=781:
          this.setState({icon:this.weathericon.Atmosphere})
          break;
        case rangID === 800:
            this.setState({icon:this.weatherIcon.Clear})
        break;
        case rangID>=801 && rangID<=804:
         this.setState({icon:this.weathericon.Clouds})
         break;
         default:
           this.setState({icon:this.weatherIcon.Clouds})
    }
  }
  getWeather = async(e)=>{
    e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    
    if(city && country)
    {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)
      const response = await api_call.json()
      console.log(response)
      this.setState({
        city :`${response.name},${response.sys.country}`,
        celsius:this.calCelsius(response.main.temp),
        temp_max : this.calCelsius(response.main.temp_max),
        temp_min :this.calCelsius(response.main.temp_min),
        description : response.weather[0].description,
        
      })
  this.get_weather_icon(this.weatherIcon,response.weather[0])
    }
    else{
      this.setState({error:true})
    }
   
  }
  render()
  {
    return(
      <div className="App">
        <Form loadweather={this.getWeather} error = {this.state.error}/>
        <Weather 
        city={this.state.city} 
        country={this.state.country} 
        temp_celsius={this.state.celsius}
        temp_max ={this.state.temp_max}
        temp_min = {this.state.temp_min}
        description={this.state.description}
        weatherIcon={this.state.icon}
        />
      </div>
    )
  }
}

export default App;
