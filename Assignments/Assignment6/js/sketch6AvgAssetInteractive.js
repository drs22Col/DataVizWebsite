//global variables

var zipcode= ["10001", "10002", "10003", "10009", "10011", "10012", "10013", "10014", "10016", "10019", "10021",
"10022", "10023" ,"10024", "10025" ,"10026" ,"10027" ,"10028" ,"10029" ,"10030", "10031" ,"10032" ,"10036", "10065", "10128"];

//var cost = ["0M","2M", "4M", "6M", "8M", "10M", "12M", "14M", "16M"]; THIS DOES NOT WORK ?
var cost = [0, 2000000, 4000000, 6000000, 8000000, 10000000, 12000000, 14000000, 16000000];
var topY = 40;
var bottomY = 600;
var leftX = 80;
var rightX = 1350;
var textLeft = 100;
var chocolateSong;
var AverageAssessed;
var numberofLandUseTypes = 11;
//var colorforModes = ["yellow", "green", "red" , "blue", "orange", "purple", "lightblue", "white", "brown", "black", "pink"];


 
 //***** Preload function ***** //
function preload(){
    AvgAssessedTable = loadTable('../Assignment6/Data/ZipCodeThree.csv', 'csv', 'header');
    //AllAssessedTable = loadTable('../Assignment6/Data//ManhattanLandUse.csv', 'csv', 'header');
    // console.log('Done loading table...');
   // soundFormats('mp3');
   // chocolateSong = loadSound('Songs/Chocolate.mp3');
 }
 
 // ***** Setup function ***** //
function setup(){
   createCanvas(1400, 650);
   textSize(18);
   textFont('Roboto');
   console.log('Setup complete...');
   print(AvgAssessedTable.getRowCount() + ' rows loaded...');
   noLoop();
}

function addyaxisLabel() {
  push ();
translate(50,150);
rotate(-PI/2);
text("Average Assessed Value", -300, -10);    
stroke(255);
pop();
}

function YaxisScale() {
  fill(255);
  for (var i = 0; i < 9; i++) {  //OR CHANGE "i < 9" to i < cost.length?
     // noStroke();
  text(cost[i], 20, map(cost[i], 0, 16000000, 600, 40));
  print(cost[i]);
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

function verticalgridlines() {         //TK
for (var i = 0; i < 26; i++) {
 line(map(0+10), 600, leftX, rightX);
 stroke(0);
}
}

// }
function drawXandYaxes() { 

 strokeStyle = 255;
 line(60, 600, 1350, 600); //x axis (x1, y1, x2, y2)
 line(60, 50, 60, 600); //y axis

 }

 function LabelXaxis(){                       //WILL FIX
  for (var i = 0; i < 25; i++){
    text(zipcode[i], i*130+80, 1350);
    fill(150);

   // OR use following SO THAT THE PLACEMENT IS WORKED OUT THROUGH MAPPING 
 
   // var zipcodeNumber = AvgAssessedTable.getNum(i, 'Zip Code');  
    //var zipcodeNumberMap = map(zipcodeNumber, 0, 650, leftX, rightX);
    
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
  verticalgridlines();
  //makeColorKey();

   // noStroke();
  for (var i = 0; i < AvgAssessedTable.getRowCount(); i++) {
 //
    var AvgValue = AvgAssessedTable.getNum(i, 'AverageAssessed');
    var avgvalueMap = map(AvgValue, 0, 16000000, 600, 40);   //range of original to range of target

    //DRAW RECTANGLES
     //set color for rects
    fill(200, i*20, 50);
    //rect(i*130+100, q3map, 100, (q1map-q3map));
    rect(i*60+100, avgvalueMap, 40, avgvalueMap);   // (x,y,w, h) TK NOT SURE OF SECOND VALUE

    stroke(0);
  //set color for rects
    fill(200, i*50, 80);

  }


    //WILL MAKE COLOR KEY

// for (var i = 0; i< numberofLandUseTypes; i++) {
//  // Set colors
//   fill(THE 11 different colors for each of 11 squares); 
//   stroke(127, 63, 120);

//   // A rectangle
//   rect(i*40, 40 +100, 40, 40);}


    }


   //CREATE function to get mode of the column called LandUse from the AllAssessedTable and then 
   //assign different color for each zipcode's mode, perhaps with a loop to automate the following 
   //that has been written out? 

//    function getModeChart(){
//   background(200); REDRAW CHART here 
//   var colors = ["yellow", "green", "red" , "blue", "orange", "purple", "lightblue", "white", "brown", "black", "pink"]
//  for zipcode = zipcode[i], i < zipcode.length, i++  WORK OUT WITH LOOP?

//   var modeFor10003 =getModeByZipcode(AllAssessedTable, 10003);
//   var colorFor10003 =colors[modeFor10003-1]; etc 

// function getModebyZipCode(data, zipcode){
//   var zips = ZipCodeThree.getRow("ZipCode"),   PUT IN OTHER DATA TABLE HERE
//   byZip = [];
//   zips.forEach(function(zip,i){
//     var zips =data.getColumn("ZipCode"),
//     byZip =[];
//     zips.forEach(function(zip, i){
//       if (zip=== zipcode) by Zip.push(data.getNum(i,"LandUse"));
//     });
//     return mode(byZip);
//   }

//   function mode(arr)  {
//     var numMapping = {};
//     var greatestFreq = 0;
//     var mode;
//     arr.forEach(function findMode(number) {
//       numMapping[number] = (numMapping[number] || 0) + 1;
//       if (greatestFreq < numMapping[number])  {
//         greatestFreq = numMapping[number];
//         mode = number; 
//       }
//     });
//     return +mode;

//     function max(arr) {
//       return Math.max(...arr);
//     }




//       }
//     })
//   }

//

   //function antennae(): vertical lines for antennae of "buildings"/rectangles, in the center of each rectangle/bar
      //stroke(200, i*50, 80);
      //line(i*65+100,  , i*132+140, )

   //function drawlights():  small red circle (the light at the top of each antennae) at the 
   //max value for each zip code, saved in the MaxValue column in AvgAssessedTable

     // var max = AvgAssessedTable.getNum(i, 'MaxValue');
     // var maxmap = map(max, 0, 16000000, 600,0);
     // fill(255);
      // ellipse(i*130+150, maxmap, 15, 15);


//function-- rollover effect: if roll over the red lights on top of antennae of each rectangle, 
//tells you the address and the assessed value for that address; these are saved in the AvgAssessedTable:
//the address is in the column called Address of Maximum, and the value of that address is in MaxValue column

     // var MaxAddress = AvgAssessedTable, getNum(i, 'Address of Maximum') 
 

 //OPTIONAL
// SONG that plays when click on image of homeless person: Image/Homeless.jpg
//if (song) song.stop();
//   song = null;
//   if mousePress  
//           song = chocolateSong;
           
//   }
//   if (song) song.play();


//  
// }








