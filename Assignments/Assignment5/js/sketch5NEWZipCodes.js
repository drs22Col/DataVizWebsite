//global variables

var zipcode= ["10001", "10002", "10003", "10009", "10011", "10012", "10013", "10014", "10016", "10019", "10021",
"10022", "10023" ,"10024", "10025" ,"10026" ,"10027" ,"10028" ,"10029" ,"10030", "10031" ,"10032" ,"10036", "10065", "10128"];
 // var number = ["0M","2M", "4M", "6M", "8M", "10M", "12M", "14M", "16M"];
var cost = [0, 2000000, 4000000, 6000000, 8000000, 10000000, 12000000, 14000000, 16000000];
var topY = 40;
var bottomY = 750;
var leftX = 40;
var rightX = 750;
var textLeft = 40;

 
 //***** Preload function ***** //
function preload(){
    ZipCodeTable = loadTable('Data/ZipCodeAssets.csv', 'csv', 'header');
   // console.log('Done loading table...');
 }
 
 // ***** Setup function ***** //
function setup(){
   createCanvas(800, 800);
   textSize(18);
   textFont('Roboto');
   console.log('Setup complete...');
   print(ZipCodeTable.getRowCount() + ' rows loaded...');
   noLoop();
}

function addyaxisLabel() {
  push ();
translate(50,150);
rotate(-PI/2);
text("Average Assessed Value", 0, 0);
pop();
}


 // ***** Draw function ***** //
function draw(){
  background(20,0,185);
  addyaxisLabel();

//Label Y axis numbers
  fill(255);
  for (var i = 0; i < 9; i++) {
     // noStroke();

  text(cost[i], 20, map(cost[i], 0, 55000, 750, 40));
  print(cost[i]);
  textSize(18);
   }

//draw gray horizontal grid lines 
  for (var i = 0; i < 9; i++) {
    //noStroke();
    stroke(0);
    line(textLeft + 10, map(cost[i], 0, 55000, bottomY, topY), rightX + 10, map(cost[i], 0, 55000, bottomY, topY));

  }

   // noStroke();
  for (var i = 0; i < ZipCodeTable.getRowCount(); i++) {
   

//map functions: define variables for rectangles and get data 

 //  var ZipCode = ZipCodeTable.getNum(i, 'Zip Code');
  //  var zipMap = map(ZipCode, 0, 55000, 750, 0);
 //
    var AvgValue = ZipCodeTable.getNum(i, 'Average Assessed');
    var avgvalueMap = map(AvgValue, 0, 1600000, 750, 0);

  //set color for rects
    fill(200, i*50, 80);

  //draw rectangles
    rect(i*130+100, zipMap, 100, avgvalueMap);

    //stroke(0);
   // line(i*130+90, medianmap, i*130+210, medianmap);

    //labels for x axis 
    fill(255);
    text(ZipCode[i], i*130+70, 790);

   //Making the vertical line for antaneaa
    //stroke(200, i*50, 80);
    //line(i*132+140, q3map, i*132+140, topbarmap)

   //making the max circle
   // var max = ZipCodeTable.getNum(i, 'Max');
   // var maxmap = map(max, 0, 55000, 750,0);
   // fill(255);
   // ellipse(i*130+150, maxmap, 15, 15);
    
}


// draw x and y axis
{ 
 strokeStyle = 255;
 line(60, 760, 780, 760);
 line(80, 20, 80, 780);

 }
}


