
 // var textLeft = 30;
var neighborhood = ["Gramercy","Soho","Upper East Side","Upper West Side","West Village"];
 // var number = ["0","10000", "20000", "30000", "40000", "50000"];
var number = [0,10000, 20000, 30000, 40000, 50000, 60000];
 
 
 
 //***** Preload function ***** //
 function preload(){
moviesTable = loadTable('../Assignment5/Data/try.csv', 'csv', 'header');
   // console.log('Done loading table...');
 }
 
 // ***** Setup function ***** //
 function setup(){
   createCanvas(800, 800);
   // textAlign(RIGHT, CENTER);

textSize(18);
   textFont('Roboto');
   console.log('Setup complete...');
   print(moviesTable.getRowCount() + ' rows loaded...');
}
 // ***** Draw function ***** //
 function draw(){


background(20,0,185);

//Label Y axis numbers
   fill(255);
 for (var i = 0; i < 7; i++) {
     // noStroke();

text(number[i], 20, map(number[i], 0, 60000, 750, 40));
     print(number[i]);
textSize(18);
     // stroke(200);
 //line(textLeft + 10, map(i, 0, 10, bottomY, topY), rightX + 10, map(i, 0, 10, bottomY, topY));
   }
   // noStroke();
   for (var i = 0; i < moviesTable.getRowCount(); i++) {
     // var date = moviesTable.getString(i, 'release_date').split('-')[0];
     // var year = parseInt(date);
     // var yearPosition = map(year, 1916, 2017, leftX, rightX);
     // var scorePosition = map(moviesTable.getNum(i, 'vote_average'), 0, 10, bottomY, topY);

fill(255,128,0);

//map functions: define variables for rectangles and get data, mapped
     var q3 = moviesTable.getNum(i, 'Q3');
 var q3map = map(q3, 0, 60000, 750, 0);
 //
var q1 = moviesTable.getNum(i, 'Q1');
var q1map = map(q1, 0, 60000, 750, 0);

 //draw medians
     var median = moviesTable.getNum(i, 'Median');
var medianmap = map(median, 0, 60000, 750, 0);

  //draw rectangles
    rect(i*130+100, q3map, 100, (q1map-q3map));


    line(i*130+90, medianmap, i*130+210, medianmap);
    
   fill(255);
    text(neighborhood[i], i*130+100, 790);
   //making the top outlier
   var max = moviesTable.getNum(i, 'Max');
    var maxmap = map(max, 0, 60000, 750,0);
    fill(255);
    ellipse(i*130+150, maxmap, 15, 15);

   }

{ 
strokeStyle = 255;
 line(60, 760, 800, 760);
 line(80, 20, 80, 780);

}
   //text("abcdfsdfs",400, 790);

 
 }