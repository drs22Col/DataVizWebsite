console.log("sketch loaded");

//global variables

var zipcode= ["10001", "10002", "10003", "10009", "10011", "10012", "10013", "10014", "10016", "10019", "10021", "10022", "10023" ,"10024", "10025" ,"10026" ,"10027" ,"10028" ,"10029", "10030", "10031" ,"10032" ,"10036", "10065", "10128"];

var costLabels = ["0M","2M", "4M", "6M", "8M", "10M", "12M", "14M", "16M"];// THIS DOES NOT WORK ?
var cost = [0, 2000000, 4000000, 6000000, 8000000, 10000000, 12000000, 14000000, 16000000];
var topY = 40;
var bottomY = 600;
var leftX = 80;
var rightX = 1250;
var textLeft = 100;
var chocolateSong;

var properties = [];
var showingPropertyDetail = null;

var landUseColors = ["", "", "purple", "", "pink", "orange"];

 //***** Preload function ***** //
function preload(){
    AvgAssessedTable = loadTable('./Data/ZipCode4.csv', 'csv', 'header');
    // AvgAssessedTable = loadTable('Data/ZipCodeAssets.csv', 'csv', 'header');
    // AllAssessedTable = loadTable('Data/ManhattanFULLTopZip.csv', 'csv', 'header');
    // console.log('Done loading table...');
   // soundFormats('mp3');
   // chocolateSong = loadSound('Songs/Chocolate.mp3');
 }

 // ***** Setup function ***** //
function setup(){
   createCanvas(1300, 650);
   textSize(18);
   textFont('Roboto');
   console.log('Setup complete...');
   console.log("ZipCodeAssets:", AvgAssessedTable.getRowCount() + ' rows loaded...');
   //console.log("ManhattanFULL:", AllAssessedTable.getRowCount() + ' rows loaded...');
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
     // noStroke();
  text(costLabels[i], 20, map(cost[i], 0, 16000000, 600, 40));
  //print(cost[i]);
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
  //verticalgridlines()
  drawXandYaxes();
  LabelXaxis();

   // noStroke();
  for (var i = 0; i < Math.min(25, AvgAssessedTable.getRowCount()); i++) {
 //
    var AvgValue = AvgAssessedTable.getNum(i, 'AverageAssessed');
    var zipCode = AvgAssessedTable.getNum(i, "ZipCode");
    var maxValue = "$" + (AvgAssessedTable.getNum(i, "MaxValue")/100000000).toFixed(2) + "B";
    var maxValueAddress = AvgAssessedTable.getString(i, "AddressMaximum");
    var landUse = AvgAssessedTable.getString(i, "LandUse");
    var barX = i*48.8+80;
    var barY = 600;
    var barWidth = 45;
    var barHeight = map(AvgValue, 0, 16000000, 0, 600);   //range of original to range of target
    properties.push({AvgValue, zipCode, maxValue, maxValueAddress, landUse, barX, barY, barWidth, barHeight});
    //draw rectangles
     //set color for rects
    // fill(200, i*10, 80);
    fill(landUseColors[AvgAssessedTable.getNum(i, "LandUseMode")]);
     
    rect(barX, barY, barWidth, -barHeight);   // (x,y,w, h)  

    // stroke(0);



}  




}  

function mouseMoved(){
    for (let i=0; i<properties.length; i++){
        let p=properties[i];
        if (mouseX > p.barX && mouseX < p.barX + p.barWidth &&
            mouseY > p.barY - p.barHeight && mouseY < p.barY){
            //already showing these data?
            if (showingPropertyDetail === i) return;
            showingPropertyDetail = i;
            //show more data
            return showMoreData(p);
        }
    }
    showingPropertyDetail = null;
    removeMoreData();
}

function showMoreData(propertyData){
    var html = "";
    html += "<h2>" + propertyData.zipCode + "</h2>";
    html += "<h3>Highest Property Value: " + propertyData.maxValue + "<br />";
    html += "Address: " + propertyData.maxValueAddress + "<br />";
    html += "Land Use Type: " + propertyData.landUse + "</h3>";
    var aside = document.querySelector("aside");
    aside.classList.add("active");
    aside.innerHTML = html;
}

function removeMoreData(){
    var aside = document.querySelector("aside");
    aside.classList.remove("active");
}
