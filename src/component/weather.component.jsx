import React from 'react';
import './form.css'



const Weather = (props) => {
  return (
    <div className="container">
      <div className="cards pt-4"></div>
      <div className="cards">
        <h1>{props.city}</h1>
        <h5 className="py-4">
          <i class={`fas fa-${props.weatherIcon} fa-7x`}></i>
        </h5>
        {/*<h1 className="py-4">{props.temp_celsius}&deg;</h1>*/}
        {/*show max and min Temp*/}
        {minmaxTemp(props.temp_min, props.temp_max)}

        <h4 className="py-3">{props.description.toString().toLocaleUpperCase()}</h4>
      </div>
    </div>
  )
}

function minmaxTemp(min, max) {
  if (min && max) {
    return (
      <h3>
        <span className="px-4">Min: {min}&deg;</span>
        <span className="px-4">Max: {max}&deg;</span>
      </h3>
    )
  }
}

export default Weather;