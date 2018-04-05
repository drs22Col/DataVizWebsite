console.log("sketch loaded");

//global variables

var zipcode= ["10001", "10002", "10003", "10009", "10011", "10012", "10013", "10014", "10016", "10019", "10021", "10022", "10023" ,"10024", "10025" ,"10026" ,"10027" ,"10028" ,"10029", "10030", "10031" ,"10032" ,"10036", "10065", "10128"];

var costLabels = ["0M","2M", "4M", "6M", "8M", "10M", "12M", "14M", "16M"];
var cost = [0, 2000000, 4000000, 6000000, 8000000, 10000000, 12000000, 14000000, 16000000];
var topY = 40;
var bottomY = 600;
var leftX = 80;
var rightX = 1250;
var textLeft = 100;



 //***** Preload function ***** //
function preload(){
    AvgAssessedTable = loadTable('./Data/ZipCodeThree.csv', 'csv', 'header');
  
 }

 // ***** Setup function ***** //
function setup(){
   createCanvas(1300, 650);
   textSize(18);
   textFont('Roboto');
   console.log('Setup complete...');
   console.log("ZipCodeAssets:", AvgAssessedTable.getRowCount() + ' rows loaded...');
   noLoop();
}

function addyaxisLabel() {
    push();
    translate(50,150);
    rotate(-PI/2);
    text("Average Assessed Value", -400, 20);
    pop();
}

function YaxisScale() {
  fill(255);
  for (var i = 0; i < 9; i++) {   
  text(costLabels[i], 20, map(cost[i], 0, 16000000, 600, 40));
  textSize(18);
   }
}

function horizontalgridlines() {
  for (var i = 0; i < 9; i++) {
    //noStroke();
    stroke(0);
    line(textLeft + 10, map(cost[i], 0, 16000000, bottomY, topY), rightX + 10, map(cost[i], 0, 16000000, bottomY, topY));

  }
}

function verticalgridlines() {          
    for (var i = 0; i < 26; i++) {
        line(map(0+10), 600, leftX, rightX);
        stroke(0);
    }
}

function drawXandYaxes() {

 strokeStyle = 255;
 line(60, 600, 1250, 600); //x axis (x1, y1, x2, y2)
 line(60, 50, 60, 600); //y axis

 }

 function LabelXaxis(){
     fill(150);
      for (var i = 0; i < 25; i++){
        text(zipcode[i], i*48.8+80, 625);

      }
}
 // ***** Draw function ***** //
function draw(){
  background(20,0,185);
  addyaxisLabel();
  YaxisScale();
  horizontalgridlines();
  drawXandYaxes();
  LabelXaxis();

   // noStroke();
  for (var i = 0; i < AvgAssessedTable.getRowCount(); i++) {
 //
    var AvgValue = AvgAssessedTable.getNum(i, 'AverageAssessed');console.log(AvgValue);
    var avgvalueMap = map(AvgValue, 0, 16000000, 0, 600);   //range of original to range of target

    //draw rectangles
     //set color for rects
    fill(200, i*10, 80);
    rect(i*48.8+80, 600, 45, -avgvalueMap);     

  } 

} 
