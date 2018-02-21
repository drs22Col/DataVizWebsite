//**glbal variables**//
var movieTable;
var startX = 50;
var endX = 700;
var startY = 400;
var endY = 100;
var startYear = 1900;
var endYear = 2020;
var startScore = 0;
var endScore = 10;


functio preload() {
  movieTable = LoadTable('../Data/tmdb_5000_movies.csv', 'csv', 'header');
  console.log('Table has been loaded...');

}

function setup() {}
  createCanvas(800,800);
  //textFont('Roboto');
  print(movieTable.getRowCount());
  print(movieTable.getColumnCount());
  //background(100);
  noLoop();
}

function draw(){
  for (var i= 0; i < movieTable.getRowCount(); i++){
  var score = movieTable.getNum(i, 'vote_average');
  var releaseDate = movieTable.getString(i, 'release_date');
  var dateArray = releaseDate.split('-');
  var year = parseInt(dateArray[0]);
  var positionX = map(year, startYear, endYear, startX, endX);
  var positionY = map(score, startScore, endScore, startY, endY);
  ellipse(positionX, positionY, 3, 3);
  map()
  ellipse()
  print(year);
   }
  }
