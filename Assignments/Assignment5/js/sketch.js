//***** Global variables ***** //
// var moviesTable;
// var topY = 50;
// var bottomY = 500;
// var leftX = 50;
// var rightX = 700;
// var textLeft = 30;
var neighborhood = ["1","2","3","4","5"];
// var number = ["0","10000", "20000", "30000", "40000", "50000"];
var number = [0,10000, 20000, 30000, 40000, 50000];



//***** Preload function ***** //
function preload(){
  moviesTable = loadTable('Data/try.csv', 'csv', 'header');
  // console.log('Done loading table...');
}

// ***** Setup function ***** //
function setup(){
  createCanvas(800, 800);
  // textAlign(RIGHT, CENTER);
  textSize(12);
  textFont('Roboto');
  console.log('Setup complete...');
  print(moviesTable.getRowCount() + ' rows loaded...');
  print(moviesTable.getColumnCount() + ' columns loaded...');
  noLoop();
}

// ***** Draw function ***** //
function draw(){
  background(255);
  fill(0);
  for (var i = 0; i < 6; i++) {
    // noStroke();
    text(number[i], 20, map(number[i], 0, 50000, 750, 0));
    print(number[i]);
    // stroke(200);
    // line(textLeft + 10, map(i, 0, 10, bottomY, topY), rightX + 10, map(i, 0, 10, bottomY, topY));
  }
  // noStroke();
  for (var i = 0; i < moviesTable.getRowCount(); i++) {
    // var date = moviesTable.getString(i, 'release_date').split('-')[0];
    // var year = parseInt(date);
    // var yearPosition = map(year, 1916, 2017, leftX, rightX);
    // var scorePosition = map(moviesTable.getNum(i, 'vote_average'), 0, 10, bottomY, topY);
    fill(150);
    var q3 = moviesTable.getNum(i, 'Q3');
    var q3map = map(q3, 0, 50000, 750, 0);
    var q1 = NeighborhoodTable.getNum(i, 'Q1');
    var q1map = map(q1, 0, 50000,750,0);
    var median = moviesTable.getNum(i, 'Median');
    var medianmap = map(median, 0, 50000,750,0);
    line(i*100+70, medianmap, i*100+140, medianmap);
    rect(i*100+80, q3map, 50, (q1map-q3map));
    text(neighborhood[i], i*100+80, 790);
  }
  line(60, 780, 800, 780);
  line(60, 100, 60, 780);
  text("abcdfsdfs",400, 790);
}
