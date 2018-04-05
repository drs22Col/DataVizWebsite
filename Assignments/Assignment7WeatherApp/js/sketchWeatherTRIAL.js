// **** Global
var APIkey = 'b51108f7b72966280bcdfff37e9092b3';
var baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
var weatherData;
var city;
var country;
var cityName;
var button;
var cityInput;
var windSpeed;
var description = '';
var temperature = 0;
var temperatureF = 0;
var temperatureF_round = 999;
var song;
var SunSong;
var CloudySong;
var SnowSong;
var ThunderSong;
var RainSong;
var backgd; //background


function preload() {
  soundFormats('mp3');
  SunSong = loadSound('Songs/Sun.mp3');
  CloudySong = loadSound('Songs/Cloudy.mp3');
  SnowSong = loadSound('Songs/Snow.mp3');
  ThunderSong = loadSound('Songs/Thunder.mp3');
  RainSong = loadSound('Songs/Rain.mp3');
}

function setup(){
  createCanvas(700,500);
  setupAnimations();
  button = select('#submit');
  city = select('#city');
  button.mouseClicked(queryAPI);
}

function queryAPI(){
  var request = baseURL + city.value() +'&apikey=' + APIkey;
  // console.log(request)
  loadJSON(request, getWeatherData)
}
 
function getWeatherData(APIData){
    animations.reset();
  weatherData = APIData;
  weatherDescription = weatherData.weather[0].main.toLowerCase();
  temperature = weatherData.main.temp;
  country = weatherData.sys.country;
  cityName = weatherData.name;
  temperatureF = (temperature-273.15)*1.8+32;
  temperatureF_round = Math.round(temperatureF);

  //song
  if (song) song.stop();
  song = null;
  switch (weatherDescription){
      case "rain":
      case "drizzle":
          song = RainSong;
          break;
      case "sun":
      case "clear":
          song = SunSong;
          break;
      case "clouds":
      case "mist":
      case "fog":
      case "haze":
          song = CloudySong;
          break;
      case "snow":
          song = SnowSong;
          break;
      case "thunderstorm":
          song = ThunderSong;
          break;
  }
  if (song) song.play();

  // console.log(temperatureF)
  // console.log(temperatureF_round)
  console.log(weatherDescription);
  console.log(weatherData);
  //redraw();
}

function mouseClicked(){
    if (song){
        if (song.isPlaying()) song.pause();
        else song.play();
    }
}


function draw(){
    if (animations[weatherDescription]) animations[weatherDescription]();
    else background(200);
  if (weatherData){
    textAlign(CENTER, CENTER)
    fill(255,255,255,200)
    textSize(25)
    text(cityName+", "+country, width/2, (height/3)+20)
    fill(255,255,255,200)
    textSize(80)
    text(temperatureF_round + 'F', width/2, (height/2)+30)
    fill(255,255,255, 200)
    textSize(150)

  }

  }

