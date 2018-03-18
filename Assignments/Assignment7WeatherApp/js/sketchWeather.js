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
  temperatureK = weatherData.main.temp;
  humidity = weatherData.main.humidity;
  pressure = weatherData.main.pressure;
  wind = weatherData.main.wind;
  print(weatherData);
  redraw();
}

// convert from Kelvin to Fahrenheit 

var temperatureFah = temperatureK * .45 - 459.67

// **** Draw Function **** //


function draw(){
  background(225);
  if (weatherData){
    text('The current weather for ' + cityInput.value() + ' is:', 50, 50);
    text(description, 80, 70);
    text(temperatureFah + ' F', 80, 90);
    text(humidity + '% humidity', 80, 110);
    text(pressure + ' hPa (pressure)', 80, 130);
    //text(wind + ' mph', 80, 150);
  }

  //Update Weather animation based on the returned weather description
   // var weather = json.weather[0].description;
    // if(weather.indexOf("rain") >= 0) {
        // skycons.set("animated-icon", Skycons.RAIN);
    // }
    // else if (weather.indexOf("sunny") >= 0) {
        // skycons.set("animated-icon", Skycons.CLEAR_DAY);
    // }
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


 