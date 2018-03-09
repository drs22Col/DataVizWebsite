// **** Global Variables ***** //
var apiKey = 'your api key here';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
var weatherData;

// **** Preload Function **** //
function preload(){
  var request = baseURL + 'New York' + '&apikey=' + apiKey;
  weatherData = loadJSON(request);
  print(weatherData);
}

// **** Setup Function ****** //
function setup(){
  createCanvas(800, 800);
  noLoop();
}

function draw(){
  background(225);
}