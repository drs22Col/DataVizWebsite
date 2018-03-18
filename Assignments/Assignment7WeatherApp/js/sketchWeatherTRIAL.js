// **** Global Variables ***** //
var apiKey = 'b51108f7b72966280bcdfff37e9092b3';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var weatherData;
var button;
var cityInput;
var description = '';
var temperatureK = 0;
var humidity = 0;
var pressure = 0;
var wind = 0;
var cloudiness = 0;
var TempInFahrenheit = 0
//var wind = 0;

// **** Setup Function ****** //
function setup(){
  createCanvas(800, 800);
  button = select('#submit');
  cityInput = select('#city');
  button.mousePressed(queryAPI);
  noLoop();
}

// **** Query API Function *** //
function queryAPI(){
  var request = baseURL + cityInput.value() + '&apikey=' + apiKey;
  loadJSON(request, getWeatherData);
}

function getWeatherData(apiData){
  weatherData = apiData;
  description = weatherData.weather[0].description;
  weatherIcon = weatherData.weather[0].icon;
  temperatureK = weatherData.main.temp;
  humidity = weatherData.main.humidity;
  pressure = weatherData.main.pressure;
  wind = weatherData.wind.speed;
  cloudiness = weatherData.clouds.all;
  print(weatherData);
  redraw();
}


 

// **** Draw Function **** //

function draw(){
  background(205);
  if (weatherData){
    text('The current weather for ' + cityInput.value() + ' is:', 50, 50);
    text(description, 80, 70);
    text(temperatureK + ' F', 80, 90);
    text(humidity + '% humidity', 80, 110);
    text(pressure + ' hPa (pressure)', 80, 130);
    text(wind + 'meters/second', 80, 150);
    text(cloudiness + 'percent cloudy', 80, 170);
  }
//trying to convert from Kelvin to Fahrenheit 
{TempInFahrenheit = Math.round(temperatureK * 2) -950;}
 // }


//   //Update Weather animation based on the returned weather description
//    var weather = json.weather[0].description;
//     if(weather.indexOf("rain") >= 0) {
//         skycons.set("animated-icon", Skycons.RAIN);
//     }
//     else if (weather.indexOf("sunny") >= 0) {
//         skycons.set("animated-icon", Skycons.CLEAR_DAY);
//     }
// }

}

function setUnitSystem(newSystem) {
    localStorage.setItem("unit-system", newSystem);
    $(".active").removeClass("active");
    $("#" + newSystem).addClass("active");
}

function getUnitSystem() {
    var system = localStorage.getItem("unit-system");
    
    // if system is unset or invalid, then determine it automatically
    if (system != "metric" && system != "imperial") {
        system = window.navigator.language == "en-US" ? "imperial" : "metric";
    }
    
    setUnitSystem(system);
    return system;
}

function localizeTemperature(metric) {
    metric = Math.round(metric);
    if (getUnitSystem() == "imperial") {
        return (metric * 9 / 5 + 32).toFixed(1) + "&deg;F";
    } else {
        return metric.toFixed(1) + "&deg;C";
    }
}

function localizeSpeed(metric) {
    var MILES_PER_METRE = 1 / 1609.344;
    var HOURS_PER_SECOND = 1 / 60 / 60;
    if (getUnitSystem() == "imperial") {
        return (metric * MILES_PER_METRE / HOURS_PER_SECOND).toFixed(2) + " mph";
    } else {
        return metric.toFixed(2) + " m/s";
    }
}

    
    var backgroundSrc = "https://raw.githubusercontent.com/meskarune/mylocalweather/gh-pages/assets/backgrounds/" + data.weather[0].icon + ".jpg";
    var foregroundSrc = "https://raw.githubusercontent.com/meskarune/mylocalweather/gh-pages/assets/icons/" + data.weather[0].icon + ".png";
    var temperature = localizeTemperature(data.main.temp);
    var description = data.weather[0].description;
    var windSpeed = localizeSpeed(data.wind.speed);
    
    var dailyHigh = localizeTemperature(forecast.list[0].temp.max);
    var dailyLow = localizeTemperature(forecast.list[0].temp.min);
    
    $("body").css("background", "url('" + backgroundSrc + "') no-repeat fixed 50% 50%")
             .css("background-size", "cover");
    $("#weather").empty()
                 .append("<h2>" + data.name + "</h2>")
                 .append("<img class='icon' src='" + foregroundSrc + "' />")
                 .append("<span id='temp'>" + temperature + "</span>")
                 .append("<p id='description'>" + data.weather[0].description + "</p>")
                 .append("<p><span id='humidity'>" + data.main.humidity + "% humid</span>" +
                            "<span id='wind-speed'>" + windSpeed + "</span></p>");
    $("#forecast").empty()
                  .append("<p id='daily'>Today's Forecast: " + forecast.list[0].weather[0].main + "</p>")
                  .append("<p><span id='high'>High: " + dailyHigh + "</span>" +
                             "<span id='low'>Low: " + dailyLow + "</span></p>");
}

// function getAndDisplayWeather() {
//     var now = Math.round(Date.now() / 1000);
//     if (localStorage.getItem("timestamp") && localStorage.getItem("timestamp") <= now - 1800) {
//         renderFromCache();
//     } else {
//         getWeather(function() {
//             localStorage.setItem("timestamp", now);
//             renderFromCache();
//         });
//     }
// }

// $(function() {
//     $("#imperial, #metric").on("click", function() {
//         setUnitSystem(this.id);
//         renderFromCache();
//     });
    
//     getUnitSystem();
//     getAndDisplayWeather();
// });

//experiment with model:

// var tempUnit = 'K';
// var currentTempInKelvin;

//   // $("#tempunit").click(function () {
//   //   var currentTempUnit = $("#tempunit").text();
//   //   var newTempUnit = currentTempUnit == "K" ? "K" : "F";
//   //   $("#tempunit").text(newTempUnit);
//   //   if (newTempUnit == "F") {
//   //     var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 - 459.67);
//   //     $("#temp").text(fahTemp + " " + String.fromCharCode(176));
//   //   } else {
//       $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
//     }
//   });
  
// })
 
  //     currentTempInFahrenheit = Math.round(result.main.temp * 2) -450;
  //     $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
  //     $("#tempunit").text(tempUnit);
  //     $("#desc").text(result.weather[0].main);
  //     IconGen(result.weather[0].main);
  //   }
  // });
}

function IconGen(desc) {
  var desc = desc.toLowerCase()
  switch (desc) {
    case 'drizzle':
      addIcon(desc)
      break;
    case 'clouds':
      addIcon(desc)
      break;
    case 'rain':
      addIcon(desc)
      break;
    case 'snow':
      addIcon(desc)
      break;
    case 'clear':
      addIcon(desc)
      break;
    case 'thunderstom':
      addIcon(desc)
      break;
    default:
      $('div.clouds').removeClass('hide');
  }
}

function addIcon(desc) {
  $('div.' + desc).removeClass('hide');
}

