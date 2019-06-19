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
        forecastTemp: [],
        forecastDesc: [],
        forecastDays: [],
        displayName: '',
        lightMode: true
    }

    //remove decimals from Temperatures
    roundTemp(temp) {
        var converted = Math.floor(temp)
        return converted;
    }

    //capitalize first word of string
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

    //retrieve Weekday name from Date
    getDayOfWeek(date) {
        var dayOfWeek = new Date(date).getUTCDay();
        return isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];
    }

    //API call based on User zip code input
    handleDefaultCall = (event) => {
        event.preventDefault();
        $.all([$.get(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.inputZip},us&units=imperial&appid=${this.state.APIkey}`),
        $.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${this.state.inputZip},us&units=imperial&appid=${this.state.APIkey}`)])
            .then($.spread((currentData, forecastData) => {
                console.log(currentData);
                console.log(forecastData);
                this.setState({
                    apiCalled: true,
                    inputError: false,
                    displayName: this.state.inputZip,
                    inputZip: '',
                    currentTemp: this.roundTemp(currentData.data.main.temp),
                    highTemp: this.roundTemp(currentData.data.main.temp_max),
                    lowTemp: this.roundTemp(currentData.data.main.temp_min),
                    weatherDesc: this.properCase(currentData.data.weather[0].description),
                    forecastTemp: [
                        this.roundTemp(forecastData.data.list[1].main.temp),
                        this.roundTemp(forecastData.data.list[9].main.temp),
                        this.roundTemp(forecastData.data.list[17].main.temp),
                        this.roundTemp(forecastData.data.list[25].main.temp),
                        this.roundTemp(forecastData.data.list[33].main.temp)
                    ],
                    forecastDesc: [
                        this.properCase(forecastData.data.list[1].weather[0].description),
                        this.properCase(forecastData.data.list[9].weather[0].description),
                        this.properCase(forecastData.data.list[17].weather[0].description),
                        this.properCase(forecastData.data.list[25].weather[0].description),
                        this.properCase(forecastData.data.list[33].weather[0].description)
                    ],
                    forecastDays: [
                        this.getDayOfWeek((forecastData.data.list[1].dt_txt).substring(0, 10)),
                        this.getDayOfWeek((forecastData.data.list[9].dt_txt).substring(0, 10)),
                        this.getDayOfWeek((forecastData.data.list[17].dt_txt).substring(0, 10)),
                        this.getDayOfWeek((forecastData.data.list[25].dt_txt).substring(0, 10)),
                        this.getDayOfWeek((forecastData.data.list[33].dt_txt).substring(0, 10)),
                    ],
                })
            })).catch(err => {
                this.setState({
                    inputError: true
                })
            })
    }

    //use geolocation to get current coordinates
    useCurrentLoc = (event) => {
        event.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((geoloc) => {
                sessionStorage.setItem('latitude', geoloc.coords.latitude);
                sessionStorage.setItem('longitude', geoloc.coords.longitude);
                this.handleGeoCall();
            },
                (err) => {
                    console.log(err)
                })
        }
    }

    //API call using latitude and longitude
    handleGeoCall = (event) => {
        var latCoord = sessionStorage.getItem('latitude');
        var lonCoord = sessionStorage.getItem('longitude');

        $.all([$.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latCoord}&lon=${lonCoord}&units=imperial&appid=${this.state.APIkey}`),
        $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latCoord}&lon=${lonCoord}&units=imperial&appid=${this.state.APIkey}`)])
            .then($.spread((currentData, forecastData) => {
                console.log(currentData);
                console.log(forecastData);
                this.setState({
                    apiCalled: true,
                    inputError: false,
                    displayName: currentData.data.name,
                    inputZip: '',
                    currentTemp: this.roundTemp(currentData.data.main.temp),
                    highTemp: this.roundTemp(currentData.data.main.temp_max),
                    lowTemp: this.roundTemp(currentData.data.main.temp_min),
                    weatherDesc: this.properCase(currentData.data.weather[0].description),
                    forecastTemp: [
                        this.roundTemp(forecastData.data.list[1].main.temp),
                        this.roundTemp(forecastData.data.list[9].main.temp),
                        this.roundTemp(forecastData.data.list[17].main.temp),
                        this.roundTemp(forecastData.data.list[25].main.temp),
                        this.roundTemp(forecastData.data.list[33].main.temp)
                    ],
                    forecastDesc: [
                        this.properCase(forecastData.data.list[1].weather[0].description),
                        this.properCase(forecastData.data.list[9].weather[0].description),
                        this.properCase(forecastData.data.list[17].weather[0].description),
                        this.properCase(forecastData.data.list[25].weather[0].description),
                        this.properCase(forecastData.data.list[33].weather[0].description)
                    ],
                    forecastDays: [
                        this.getDayOfWeek((forecastData.data.list[1].dt_txt).substring(0, 10)),
                        this.getDayOfWeek((forecastData.data.list[9].dt_txt).substring(0, 10)),
                        this.getDayOfWeek((forecastData.data.list[17].dt_txt).substring(0, 10)),
                        this.getDayOfWeek((forecastData.data.list[25].dt_txt).substring(0, 10)),
                        this.getDayOfWeek((forecastData.data.list[33].dt_txt).substring(0, 10)),
                    ],
                })
            })).catch(err => {
                console.log(err)
            })
    }

    //reset page using window reload
    reload() {
        window.location.reload();
    }

    //switch to toggle light and dark theme
    darkToggle = (event) => {
        if (this.state.lightMode === true) {
            document.body.style.backgroundColor = "black";
            localStorage.setItem('lightMode', false)
            this.setState({
                lightMode: false
            })
        }
        else {
            document.body.style.backgroundColor = "#d8d8d8";
            localStorage.setItem('lightMode', true)
            this.setState({
                lightMode: true
            })
        }
    }

    render() {
        //calculate today's date
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        today = mm + '/' + dd;

        const { currentTemp, highTemp, lowTemp, weatherDesc, displayName } = this.state;
        return (
            <main className="App" >
                <h1>
                    <span className={`puff-in-center ${this.state.lightMode ? "title2" : "title"}`}>Cloudy </span>
                    <span className={`puff-in-center ${this.state.lightMode ? "title1" : "title"}`}>with a Chance of </span>
                    <span className={`puff-in-center ${this.state.lightMode ? "title2" : "title"}`}>Weather</span>
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
                        <i className={this.state.lightMode ? "fas fa-map-marker-alt" : "fas fa-map-marker-alt locDark"}
                            onClick={this.useCurrentLoc}
                            title="Use Current Location">
                        </i>
                    </span><br></br>
                    <button className="btn btn-info btn-sm submit"
                        onClick={this.handleDefaultCall}>
                        Submit
                    </button>
                    <div className={`inputError ${!this.state.inputError && "errToggle"}`}>
                        Error - please try another zip code
                    </div>
                </form>

                <div>
                    {
                        this.state.apiCalled
                            ?
                            <div>
                                <div className={this.state.lightMode ? "currentForecast" : "resultsDark"}>
                                    <h1>Weather Report for {displayName}</h1>
                                    <h1>{today} </h1>
                                    <div className="tempDiv">{currentTemp}°</div>
                                    <div>{weatherDesc}</div>
                                    <div>High of {highTemp}°</div>
                                    <div>Low of {lowTemp}°</div>
                                </div>

                                <div className={this.state.lightMode ? "futureForecast" : "futureForecastDark"}>
                                    <h1>5 Day Forecast</h1>
                                    <div className="container">
                                        <div className="row weekDays">
                                            <div className="col">{this.state.forecastDays[0]}</div>
                                            <div className="col">{this.state.forecastDays[1]}</div>
                                            <div className="col">{this.state.forecastDays[2]}</div>
                                            <div className="col">{this.state.forecastDays[3]}</div>
                                            <div className="col">{this.state.forecastDays[4]}</div>
                                        </div>

                                        <div className="row fiveDay">
                                            <div className="col">{this.state.forecastTemp[0]}°</div>
                                            <div className="col">{this.state.forecastTemp[1]}°</div>
                                            <div className="col">{this.state.forecastTemp[2]}°</div>
                                            <div className="col">{this.state.forecastTemp[3]}°</div>
                                            <div className="col">{this.state.forecastTemp[4]}°</div>
                                        </div>

                                        <div className="row fiveDayDesc">
                                            <div className="col">{this.state.forecastDesc[0]}</div>
                                            <div className="col">{this.state.forecastDesc[1]}</div>
                                            <div className="col">{this.state.forecastDesc[2]}</div>
                                            <div className="col">{this.state.forecastDesc[3]}</div>
                                            <div className="col">{this.state.forecastDesc[4]}</div>
                                        </div>
                                    </div>
                                </div>
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
