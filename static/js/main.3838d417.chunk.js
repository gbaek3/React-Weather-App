(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,a){e.exports=a(44)},26:function(e,t,a){},4:function(e,t,a){},44:function(e,t,a){"use strict";a.r(t);var s=a(0),r=a.n(s),n=a(13),i=a.n(n),o=(a(26),a(14)),l=a(15),c=a(16),m=a(18),p=a(17),d=a(19),u=(a(4),a(2)),h=function(e){function t(){var e,a;Object(l.a)(this,t);for(var s=arguments.length,r=new Array(s),n=0;n<s;n++)r[n]=arguments[n];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={apiCalled:!1,APIkey:"abca5400fcc5dc0c00e8077d15e20a9e",inputZip:"",inputError:!1,currentTemp:"",highTemp:"",lowTemp:"",weatherDesc:"",forecastTemp:[],forecastDesc:[],forecastDays:[],displayName:"",lightMode:!0},a.handleChange=function(e){a.setState(Object(o.a)({},e.target.name,e.target.value))},a.handleDefaultCall=function(e){e.preventDefault(),u.all([u.get("https://api.openweathermap.org/data/2.5/weather?zip=".concat(a.state.inputZip,",us&units=imperial&appid=").concat(a.state.APIkey)),u.get("https://api.openweathermap.org/data/2.5/forecast?zip=".concat(a.state.inputZip,",us&units=imperial&appid=").concat(a.state.APIkey))]).then(u.spread(function(e,t){console.log(e),console.log(t),a.setState({apiCalled:!0,inputError:!1,displayName:a.state.inputZip,inputZip:"",currentTemp:a.roundTemp(e.data.main.temp),highTemp:a.roundTemp(e.data.main.temp_max),lowTemp:a.roundTemp(e.data.main.temp_min),weatherDesc:a.properCase(e.data.weather[0].description),forecastTemp:[a.roundTemp(t.data.list[1].main.temp),a.roundTemp(t.data.list[9].main.temp),a.roundTemp(t.data.list[17].main.temp),a.roundTemp(t.data.list[25].main.temp),a.roundTemp(t.data.list[33].main.temp)],forecastDesc:[a.properCase(t.data.list[1].weather[0].description),a.properCase(t.data.list[9].weather[0].description),a.properCase(t.data.list[17].weather[0].description),a.properCase(t.data.list[25].weather[0].description),a.properCase(t.data.list[33].weather[0].description)],forecastDays:[a.getDayOfWeek(t.data.list[1].dt_txt.substring(0,10)),a.getDayOfWeek(t.data.list[9].dt_txt.substring(0,10)),a.getDayOfWeek(t.data.list[17].dt_txt.substring(0,10)),a.getDayOfWeek(t.data.list[25].dt_txt.substring(0,10)),a.getDayOfWeek(t.data.list[33].dt_txt.substring(0,10))]})})).catch(function(e){a.setState({inputError:!0})})},a.useCurrentLoc=function(e){e.preventDefault(),navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(e){sessionStorage.setItem("latitude",e.coords.latitude),sessionStorage.setItem("longitude",e.coords.longitude),a.handleGeoCall()},function(e){console.log(e)})},a.handleGeoCall=function(e){var t=sessionStorage.getItem("latitude"),s=sessionStorage.getItem("longitude");u.all([u.get("https://api.openweathermap.org/data/2.5/weather?lat=".concat(t,"&lon=").concat(s,"&units=imperial&appid=").concat(a.state.APIkey)),u.get("https://api.openweathermap.org/data/2.5/forecast?lat=".concat(t,"&lon=").concat(s,"&units=imperial&appid=").concat(a.state.APIkey))]).then(u.spread(function(e,t){console.log(e),console.log(t),a.setState({apiCalled:!0,inputError:!1,displayName:e.data.name,inputZip:"",currentTemp:a.roundTemp(e.data.main.temp),highTemp:a.roundTemp(e.data.main.temp_max),lowTemp:a.roundTemp(e.data.main.temp_min),weatherDesc:a.properCase(e.data.weather[0].description),forecastTemp:[a.roundTemp(t.data.list[1].main.temp),a.roundTemp(t.data.list[9].main.temp),a.roundTemp(t.data.list[17].main.temp),a.roundTemp(t.data.list[25].main.temp),a.roundTemp(t.data.list[33].main.temp)],forecastDesc:[a.properCase(t.data.list[1].weather[0].description),a.properCase(t.data.list[9].weather[0].description),a.properCase(t.data.list[17].weather[0].description),a.properCase(t.data.list[25].weather[0].description),a.properCase(t.data.list[33].weather[0].description)],forecastDays:[a.getDayOfWeek(t.data.list[1].dt_txt.substring(0,10)),a.getDayOfWeek(t.data.list[9].dt_txt.substring(0,10)),a.getDayOfWeek(t.data.list[17].dt_txt.substring(0,10)),a.getDayOfWeek(t.data.list[25].dt_txt.substring(0,10)),a.getDayOfWeek(t.data.list[33].dt_txt.substring(0,10))]})})).catch(function(e){console.log(e)})},a.darkToggle=function(e){!0===a.state.lightMode?(document.body.style.backgroundColor="black",localStorage.setItem("lightMode",!1),a.setState({lightMode:!1})):(document.body.style.backgroundColor="#f2f2f2",localStorage.setItem("lightMode",!0),a.setState({lightMode:!0}))},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"roundTemp",value:function(e){return Math.floor(e)}},{key:"properCase",value:function(e){e=e.toLowerCase().split(" ");for(var t=0;t<e.length;t++)e[t]=e[t].charAt(0).toUpperCase()+e[t].slice(1);return e.join(" ")}},{key:"getDayOfWeek",value:function(e){var t=new Date(e).getUTCDay();return isNaN(t)?null:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][t]}},{key:"reload",value:function(){window.location.reload()}},{key:"render",value:function(){var e=this.state,t=e.currentTemp,a=e.highTemp,s=e.lowTemp,n=e.weatherDesc,i=e.displayName;return r.a.createElement("main",{className:"App"},r.a.createElement("h1",null,r.a.createElement("span",{className:"puff-in-center ".concat(this.state.lightMode?"title2":"title")},"Cloudy "),r.a.createElement("span",{className:"puff-in-center ".concat(this.state.lightMode?"title1":"title")},"with a Chance of "),r.a.createElement("span",{className:"puff-in-center ".concat(this.state.lightMode?"title2":"title")},"Weather")),r.a.createElement("a",{href:".",onClick:this.reload},r.a.createElement("i",{className:this.state.lightMode?"fas fa-home Home":"fas fa-home HomeDark",title:"Home"})),r.a.createElement("i",{className:this.state.lightMode?"fas fa-adjust Switch":"fas fa-adjust SwitchDark",title:"Toggle Dark Theme",onClick:this.darkToggle}),r.a.createElement("form",{onSubmit:this.handleDefaultCall},r.a.createElement("input",{value:this.state.inputZip,name:"inputZip",onChange:this.handleChange,placeholder:"Enter zip code..."}),r.a.createElement("span",{className:"currentLoc"},r.a.createElement("i",{className:this.state.lightMode?"fas fa-map-marker-alt":"fas fa-map-marker-alt locDark",onClick:this.useCurrentLoc,title:"Use Current Location"})),r.a.createElement("div",{className:"inputError ".concat(!this.state.inputError&&"errToggle")},"Error - please try another zip code")),r.a.createElement("div",null,this.state.apiCalled?r.a.createElement("div",null,r.a.createElement("div",{className:this.state.lightMode?"currentForecast":"resultsDark"},r.a.createElement("h1",null,"Weather Report for ",i),r.a.createElement("div",{className:"tempDiv"},t,"\xb0"),r.a.createElement("div",null,n),r.a.createElement("div",null,"High of ",a,"\xb0"),r.a.createElement("div",null,"Low of ",s,"\xb0")),r.a.createElement("div",{className:this.state.lightMode?"futureForecast":"resultsDark"},r.a.createElement("h1",null,"5 Day Forecast"),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row weekDays"},r.a.createElement("div",{className:"col"},this.state.forecastDays[0]),r.a.createElement("div",{className:"col"},this.state.forecastDays[1]),r.a.createElement("div",{className:"col"},this.state.forecastDays[2]),r.a.createElement("div",{className:"col"},this.state.forecastDays[3]),r.a.createElement("div",{className:"col"},this.state.forecastDays[4])),r.a.createElement("div",{className:"row fiveDay"},r.a.createElement("div",{className:"col"},this.state.forecastTemp[0],"\xb0"),r.a.createElement("div",{className:"col"},this.state.forecastTemp[1],"\xb0"),r.a.createElement("div",{className:"col"},this.state.forecastTemp[2],"\xb0"),r.a.createElement("div",{className:"col"},this.state.forecastTemp[3],"\xb0"),r.a.createElement("div",{className:"col"},this.state.forecastTemp[4],"\xb0")),r.a.createElement("div",{className:"row fiveDayDesc"},r.a.createElement("div",{className:"col"},this.state.forecastDesc[0]),r.a.createElement("div",{className:"col"},this.state.forecastDesc[1]),r.a.createElement("div",{className:"col"},this.state.forecastDesc[2]),r.a.createElement("div",{className:"col"},this.state.forecastDesc[3]),r.a.createElement("div",{className:"col"},this.state.forecastDesc[4]))))):r.a.createElement("div",{className:"cloudy"})))}}]),t}(s.Component),f=function(){return r.a.createElement(h,{component:h})};i.a.render(r.a.createElement(f,null),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.3838d417.chunk.js.map