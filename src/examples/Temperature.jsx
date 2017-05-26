/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  return Math.round(output);
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
// BoilingVerdict.propTypes = {
//   celsius: PropTypes.number.isRequired
// };

function TemperatureInput(props) {
  const handleInputChange = (e) => {
    props.onTemperatureChange(e.target.value);
  };
  const temperature = props.temperature;
  const scale = props.scale;
  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[scale]}:</legend>
      <input type="text" value={temperature} onChange={handleInputChange} />
    </fieldset>
  );
}
// TemperatureInput.propTypes = {
//   onTemperatureChange: PropTypes.func.isRequired,
//   temperature: PropTypes.string.isRequired,
//   scale: PropTypes.string.isRequired
// };

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 'c',
      temperature: ''
    };
  }
  handleCelsiusChange = (temperature) => {
    this.setState({
      scale: 'c',
      temperature
    });
  };
  handleFahrenheitChange = (temperature) => {
    this.setState({
      scale: 'f',
      temperature
    });
  };
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'c' ? temperature : tryConvert(temperature, toFahrenheit);
    const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toCelsius);
    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
