// **** Global Variables ***** //
var apiKey = 'ccac5f3796d194d4a15e7a3fcc8ccda6';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
var weatherData;
var city = 'New York';

// **** Preload Function **** //
function preload(){
  var request = baseURL + city + '&apikey=' + apikey;
  weatherData = loadJSON(request);
  print(weatherData);
}

// **** Setup Function ****** //
function setup(){
  createCanvas(500, 500);
  background(100);
  noLoop()
 
}

function draw(){
	var myWeatherData = weatherData.wind;
	var speed = myWeatherData.speed
	var pressure = myWeatherData.pressure
  
}