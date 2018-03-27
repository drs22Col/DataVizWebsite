//global variables
 
 // var textLeft = 30;
var neighborhood = ["Gramercy","Soho","Upper East Side","Upper West Side","West Village"];
 // var number = ["0","10000", "20000", "30000", "40000", "50000"];
var number = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000];
var topY = 40;
var bottomY = 750;
var leftX = 40;
var rightX = 750;
var textLeft = 40;
 
 //***** Preload function ***** //
function preload(){
    neighborhoodTable = loadTable('../Assignment5/Data/try.csv', 'csv', 'header');
   // console.log('Done loading table...');
 }
 
 // ***** Setup function ***** //
function setup(){
   createCanvas(800, 800);
   // textAlign(RIGHT, CENTER);

   textSize(18);
   textFont('Roboto');
   console.log('Setup complete...');
   print(neighborhoodTable.getRowCount() + ' rows loaded...');
   noLoop();
}

// push ();
// translate(100,150);
// rotate(-PI/2);
// text("Estimated Value (Dollars) Per Square Foot", 0, 0);
// pop();
 // ***** Draw function ***** //
function draw(){
  background(20,0,185);

//Label Y axis numbers
  fill(255);
  for (var i = 0; i < 12; i++) {
     // noStroke();

  text(number[i], 20, map(number[i], 0, 55000, 750, 40));
  print(number[i]);
  textSize(18);
     // stroke(200);
 //line(textLeft + 10, map(i, 0, 10, bottomY, topY), rightX + 10, map(i, 0, 10, bottomY, topY));
   }

//draw gray horizontal grid lines 
  for (var i = 0; i < 12; i++) {
    //noStroke();
    stroke(0);
    line(textLeft + 10, map(number[i], 0, 55000, bottomY, topY), rightX + 10, map(number[i], 0, 55000, bottomY, topY));

  }
   
 // // function drawLabels(){
 //  fill(0);
 //  textAlign(LEFT, CENTER);
 //  text("ESTIMATED VALUE (DOLLARS) PER SQUARE FOOT", textLeft - 15, topY - 25);
 //  for (var i = 0; i < 12; i++) {
 //    noStroke();
 //    text(i, textLeft, map(i, 0, 10, bottomY, topY));
 //    stroke(200);
 //    line(textLeft + 10, map(i, 0, 10, bottomY, topY), rightX + 10, map(i, 0, 10, bottomY, topY));
 //  }



   // noStroke();
  for (var i = 0; i < neighborhoodTable.getRowCount(); i++) {
     // var date = moviesTable.getString(i, 'release_date').split('-')[0];
     // var year = parseInt(date);
     // var yearPosition = map(year, 1916, 2017, leftX, rightX);
     // var scorePosition = map(moviesTable.getNum(i, 'vote_average'), 0, 10, bottomY, topY);

//fill(255,128,0);

//map functions: define variables for rectangles and get data 
    var q3 = neighborhoodTable.getNum(i, 'Q3');
    var q3map = map(q3, 0, 55000, 750, 0);
 //
    var q1 = neighborhoodTable.getNum(i, 'Q1');
    var q1map = map(q1, 0, 55000, 750, 0);

 //define median and map
    var median = neighborhoodTable.getNum(i, 'Median');
    var medianmap = map(median, 0, 60000, 750, 0);

//define topbar var and map
    var topbar = neighborhoodTable.getNum(i, 'TOPBAR');
    var topbarmap = map(topbar, 0, 55000, 750,0);

  //set color for rects
    fill(200, i*50, 80);

  //draw rectangles
    rect(i*130+100, q3map, 100, (q1map-q3map));

    stroke(0);
    line(i*130+90, medianmap, i*130+210, medianmap);

    //labels for x axis 
    fill(255);
    text(neighborhood[i], i*130+100, 790);

    // // fill(255);
    // rotate(PI/2);
    // text("Estimated dollar value per square foot", -width/2, -100);

//making top bar of box plot, 1.5* IQR (Interquartile Range)

    stroke(200, i*50, 80);
    line(i*132+90, topbarmap, i*133+189, topbarmap);

   // text("Price per square foot($)", 5, 100);

   //Making the vertical line for the top bar
    stroke(200, i*50, 80);
    line(i*132+140, q3map, i*132+140, topbarmap)

   //making the top outlier
    var max = neighborhoodTable.getNum(i, 'Max');
    var maxmap = map(max, 0, 55000, 750,0);
    fill(255);
    ellipse(i*130+150, maxmap, 15, 15);

    //making the other outliers
     var outlierone = neighborhoodTable.getNum(i,'OUTLIERONE');
     var outlieronemap = map(outlierone, 0, 55000, 750,0);
     fill(255);

//creating points for interactive part
var x = i*130+150; 
var y = outlieronemap;



     ellipse(i*130+150, outlieronemap, 15, 15);

     var outliertwo = neighborhoodTable.getNum(i,'OUTLIERTWO');
     var outliertwomap = map(outliertwo, 0, 55000, 750,0);
     fill(255);
     ellipse(i*130+150, outliertwomap, 15, 15);

    // var outlierthree = neighborhoodTable.getNum(i,'OUTLIERTHREE');
    // var outlierthreeemap = map(outlierthree, 0, 60000, 750,0);
    // fill(255);
    // ellipse(i*130+150, outlierthreemap, 15, 15);

}


// draw x and y axis
{ 
 strokeStyle = 255;
 line(60, 760, 780, 760);
 line(80, 20, 80, 780);
   //text("abcdfsdfs",400, 790);
 }
  //making the other outliers
}


