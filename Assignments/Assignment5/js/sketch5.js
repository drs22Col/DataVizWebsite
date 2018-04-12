//global variables

var neighborhood = ["Gramercy","Soho","Upper East Side","Upper West Side","West Village"];
 // var number = ["0","10000", "20000", "30000", "40000", "50000"];
var cost = [0, 2500, 5000, 7500, 10000, 12500, 15000,17500, 20000, 22500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000, 52500, 55000];
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
   textSize(18);
   textFont('Roboto');
   console.log('Setup complete...');
   print(neighborhoodTable.getRowCount() + ' rows loaded...');
   noLoop();
}
 // ***** Draw function ***** //
function draw(){
  background(20,0,185);

//Label Y axis numbers
  fill(255);
  for (var i = 0; i < 23; i++) {
     // noStroke();

  text(cost[i], 20, map(cost[i], 0, 55000, 750, 40));
  print(cost[i]);
  textSize(18);
   }

//draw gray horizontal grid lines 
  for (var i = 0; i < 23; i++) {
    //noStroke();
    stroke(0);
    line(textLeft + 10, map(cost[i], 0, 55000, bottomY, topY), rightX + 10, map(number[i], 0, 55000, bottomY, topY));

  }
   
function addyaxisLabel() {
  push ();
translate(100,150);
rotate(-PI/2);
text("Estimated Value (Dollars) Per Square Foot", 0, 0);
pop();
}
   // noStroke();
  for (var i = 0; i < neighborhoodTable.getRowCount(); i++) {
   

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

//making top bar of box plot, 1.5* IQR (Interquartile Range)

    stroke(200, i*50, 80);
    line(i*132+90, topbarmap, i*133+189, topbarmap);

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

 }
}


