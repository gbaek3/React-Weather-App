import React, { Component } from "react";
import '../App.css'
import * as $ from 'axios';

class Homepage extends Component {
    state = {
        apiCalled: false,
        APIkey: 'abca5400fcc5dc0c00e8077d15e20a9e',
        inputZip: '',
        inputError: false,
        currentTemp: '',
        highTemp: '',
        lowTemp: '',
        weatherDesc: '',
        name: ''
    }

    roundTemp(temp) {
        var converted = Math.floor(temp)
        return converted;
    }

    properCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDefaultCall = (event) => {
        event.preventDefault();
        $.get(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.inputZip},us&units=imperial&appid=${this.state.APIkey}`)
            .then((data) => {
                console.log(data.data);
                this.setState({
                    apiCalled: true,
                    inputError: false,
                    inputZip: '',
                    currentTemp: this.roundTemp(data.data.main.temp),
                    highTemp: this.roundTemp(data.data.main.temp_max),
                    lowTemp: this.roundTemp(data.data.main.temp_min),
                    weatherDesc: this.properCase(data.data.weather[0].description),
                    name: data.data.name
                })
            }).catch(err => {
                this.setState({
                    inputError: true
                })
            })

    }

    useCurrentLoc = (event) => {
        event.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((geoloc) => {
                localStorage.setItem('latitude', geoloc.coords.latitude);
                localStorage.setItem('longitude', geoloc.coords.longitude);
                this.handleGeoCall();
            },
                (err) => {
                    console.log(err)
                })
        }
    }

    handleGeoCall = (event) => {
        var latCoord = localStorage.getItem('latitude');
        var lonCoord = localStorage.getItem('longitude');

        $.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latCoord}&lon=${lonCoord}&units=imperial&appid=${this.state.APIkey}`)
            .then((data) => {
                console.log(data.data);
                this.setState({
                    apiCalled: true,
                    inputError: false,
                    inputZip: '',
                    currentTemp: this.roundTemp(data.data.main.temp),
                    highTemp: this.roundTemp(data.data.main.temp_max),
                    lowTemp: this.roundTemp(data.data.main.temp_min),
                    weatherDesc: this.properCase(data.data.weather[0].description),
                    name: data.data.name
                })
            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        const { currentTemp, highTemp, lowTemp, weatherDesc, name } = this.state;
        return (
            <main className="App">
                <h1>
                    <span className="title2">Cloudy </span>
                    <span className="title1">with a Chance of </span>
                    <span className="title2">Weather</span>
                </h1>
                <a href="index.html">
                    <i class="fas fa-home home" title="Home"></i>
                </a>
                <form onSubmit={this.handleDefaultCall}>
                    <input
                        value={this.state.inputZip}
                        name="inputZip"
                        onChange={this.handleChange}
                        placeholder="Enter zip code...">
                    </input>
                    <span className="currentLoc">
                        <i onClick={this.useCurrentLoc}
                            className="fas fa-search-location"
                            title="Use Current Location">
                        </i>
                    </span>
                    <div className={`inputError ${!this.state.inputError && "errToggle"}`}>
                        Error - please try another zip code
                    </div>
                </form>

                <div>
                    {
                        this.state.apiCalled
                            ?
                            <div>
                                <h1>Weather Report for {name}</h1>
                                <div>Current temperature: {currentTemp}°</div>
                                <div>{weatherDesc}</div>
                                <div>High of {highTemp}°</div>
                                <div>Low of {lowTemp}°</div>
                            </div>
                            :
                            <div className="cloudy"></div>
                    }
                </div>
            </main>
        );
    }
}

export default Homepage;
