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
        name: '',
        lightMode: true
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

    reload() {
        window.location.reload();
    }

    darkToggle = (event) => {
        if (this.state.lightMode === true) {
            document.body.style.backgroundColor = "black";
            this.setState({
                lightMode: false
            })
        }
        else {
            document.body.style.backgroundColor = "#f2f2f2";
            this.setState({
                lightMode: true
            })
        }
    }

    render() {
        const { currentTemp, highTemp, lowTemp, weatherDesc, name } = this.state;
        return (
            <main className="App">
                <h1>
                    <span className={this.state.lightMode ? "title2" : "title"}>Cloudy </span>
                    <span className={this.state.lightMode ? "title1" : "title"}>with a Chance of </span>
                    <span className={this.state.lightMode ? "title2" : "title"}>Weather</span>
                </h1>
                <a href="." onClick={this.reload}>
                    <i className={this.state.lightMode ? "fas fa-home Home" : "fas fa-home HomeDark"}
                        title="Home">
                    </i>
                </a>
                <i className={this.state.lightMode ? "fas fa-adjust Switch" : "fas fa-adjust SwitchDark"}
                    title="Toggle Dark Theme"
                    onClick={this.darkToggle}>
                </i>

                <form onSubmit={this.handleDefaultCall}>
                    <input
                        value={this.state.inputZip}
                        name="inputZip"
                        onChange={this.handleChange}
                        placeholder="Enter zip code...">
                    </input>
                    <span className="currentLoc">
                        <i className={this.state.lightMode ? "fas fa-search-location" : "fas fa-search-location locDark"}
                            onClick={this.useCurrentLoc}
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
                            <div className={this.state.lightMode ? "" : "currentForecast"}>
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
