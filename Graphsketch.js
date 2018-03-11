
function setup() {

  var w = 650,
      h = 400,
   dims = {
      margin: {
        top: 20,
        left: 25,
        right: 15,
        bottom: 25
      }
   };
  
  dims.width = w - dims.margin.left - dims.margin.right;
  dims.height = h - dims.margin.top - dims.margin.bottom;
  
  var randomizer = d3.random.bates(10);

  // this part creates random frequency data for each letter of alphabet like [{letter: 'a', frequency:  0.2}, {letter: 'b', frequency:  0.34}, {letter: 'c', frequency:  0.21}, ...]. 
  //of course this random data is nonsense but its an easy way to create data similar to https://bl.ocks.org/mbostock/3885304

  var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  var data = alphabet.map(function(letter) {
    return {
      letter: letter,
      frequency: randomizer()
    }
  });  
  
  // using d3 max function find the maximum frequency of letters
  var maxFrequency = d3.max(data, function(d) { return d.frequency; });

  var yScale = d3.scale.linear();
  yScale.domain([0, maxFrequency]);   
  yScale.range([dims.height , 0]);
  
  // d3 has method chaning so instead of above style, you can chain methods (note that there is no ; in the end of first 2 lines and xScale is not repeated )
  var xScale = d3.scale.ordinal()
      .domain(alphabet)  // domain of xScale are alphabet letters
      .rangeRoundBands([0, dims.width], .1); // range 



  //create canvas
  createCanvas(w, h);

  //ignore margin area.
  push();
  translate(dims.margin.left, dims.margin.top);


  // draw circles
  for (var i = 0; i < data.length; i++) {

    var d = data[i];
    push();

    translate(xScale(d.letter), yScale(d.frequency));
    
    fill('steelblue');

    rect(0, 0, xScale.rangeBand(), dims.height - yScale(d.frequency) );

    pop();

  }

  drawAxis(xScale, 'bottom', dims, 8);

  drawAxis(yScale, 'left', dims, 8);

  pop();

}

function drawAxis(scale, orient, dims, numberOfTicks) {

  numberOfTicks = numberOfTicks || 8;

  //set properties which depend on scale orientation
  var linePoints,
    tickTranslate,
    tickTextMargins,
    tickLinePoints;
  if (orient === 'bottom') {
    linePoints = [0, dims.height , dims.width, dims.height ];
    tickTranslate = [scale, function() {
      return dims.height 
    }];
    tickTextMargins = [
        scale.rangeBand ? scale.rangeBand()/2 + 2 : 5,
        15];
    tickLinePoints = [
      scale.rangeBand ? scale.rangeBand()/2 : 0,
      0,
      scale.rangeBand ? scale.rangeBand()/2 : 0,
      5]
  } else if (orient === 'left') {
    linePoints = [0, 0, 0, dims.height];
    tickTranslate = [function() {
      return 0;
    }, scale];
    tickTextMargins = [-15, 5];
    tickLinePoints = [0, 0, -5, 0];
  }


  textAlign(CENTER);
  
  var ticks;
  
  if(scale.ticks) {  //for quantitative scales
    ticks = scale.ticks(numberOfTicks);
  }
  else {  // for ordinal scales
    ticks = scale.domain();
  }

  //draw ticks for x-axis
  for (var j = 0; j < ticks.length; j++) {
    //get j-th tick
    var tick = ticks[j];
    push();
    translate(tickTranslate[0](tick), tickTranslate[1](tick));
    // draw little tick line
    line(tickLinePoints[0], tickLinePoints[1], tickLinePoints[2], tickLinePoints[3]);
    stroke(100, 30);
    if (orient === 'left') {
      line(0, 0, dims.width , 0);
    }
    // write tick value
    //    textSize(24);
    noStroke();
    fill(0);
    text(String(tick), tickTextMargins[0], tickTextMargins[1]);
    pop();
  }
  line(linePoints[0], linePoints[1], linePoints[2], linePoints[3]);

}



// ***** Global variables ***** //
var priceybuildingsTable;
var topY = 50;
var bottomY = 500;
var leftX = 50;
var rightX = 700;
var textLeft = 30;
var buttonLabels = ['All Movies', '10M+ Budget', '< 10M Budget'];
var buttonStartX = 320;
var buttonStartY = 15;
var buttonLength = 120;
var buttonHeight = 20;
var buttonSpacing = 10;
var selectedButton = 0;
var topBudget = new p5.Table;
var bottomBudget = new p5.Table;

// ***** Preload function ***** //
function preload(){
  priceybuildingsTable = loadTable('../data/FiveMetrics.csv', 'csv', 'header');
  console.log('Done loading table...');
}

// ***** Setup function ***** //
function setup(){
  createCanvas(800, 800);
  textSize(12);
  textFont('Roboto');
  console.log('Setup complete...');
  print(priceybuildingsTable.getRowCount() + ' rows loaded...');
  print(priceybuildingsTable.getColumnCount() + ' columns loaded...');
  createNewTable();
  noLoop();
}

// ***** Labels Function ********* //
function drawLabels() {
  fill(0);
  textAlign(LEFT, CENTER);
  text("AVERAGE RATING OF SELECTED MOVIES", textLeft - 15, topY - 25);
  textAlign(RIGHT, CENTER);
  for (var i = 0; i < 11; i++) {
    noStroke();
    text(i, textLeft, map(i, 0, 10, bottomY, topY));
    stroke(200);
    line(textLeft + 10, map(i, 0, 10, bottomY, topY), rightX + 10, map(i, 0, 10, bottomY, topY));
  }
  textAlign(CENTER, CENTER);
  for (var i = 1900; i < 2021; i+=20) {
    noStroke();
    text(i, map(i, 1900, 2020, leftX, rightX), bottomY + 25);
    stroke(200);
    line(map(i, 1900, 2020, leftX, rightX), bottomY + 12, map(i, 1900, 2020, leftX, rightX), bottomY + 5);
  }
}

// ***** Create new table function ******* //
function createNewTable(){
  topBudget.addColumn('release_date');
  topBudget.addColumn('vote_average');
  bottomBudget.addColumn('release_date');
  bottomBudget.addColumn('vote_average');
  for (var i = 0; i < priceybuildingsTable.getRowCount(); i++) {
    var budget = priceybuildingsTable.getNum(i, 'budget');
    if (budget >= 10000000) {
      var newRow = topBudget.addRow();
      newRow.setString('release_date', priceybuildingsTable.getString(i, 'release_date'));
      newRow.setNum('vote_average', priceybuildingsTable.getNum(i, 'vote_average'));
    }
    else {
      var newRow = bottomBudget.addRow();
      newRow.setString('release_date', priceybuildingsTable.getString(i, 'release_date'));
      newRow.setNum('vote_average', priceybuildingsTable.getNum(i, 'vote_average'));
    }
  }
  print('New tables created...');
}

// ***** Draw movies function ***** //
function drawMovies(){
  if (selectedButton == 0) {
    fill(0);
    noStroke();
    for (var i = 0; i < priceybuildingsTable.getRowCount(); i++) {
      var date = priceybuildingsTable.getString(i, 'release_date').split('-')[0];
      var year = parseInt(date);
      var yearPosition = map(year, 1900, 2020, leftX, rightX);
      var scorePosition = map(priceybuildingsTable.getNum(i, 'vote_average'), 0, 10, bottomY, topY);
      ellipse(yearPosition, scorePosition, 3, 3);
    }
  }
  else if (selectedButton == 1){
    fill(220);
    noStroke();
    for (var i = 0; i < bottomBudget.getRowCount(); i++) {
      var date = bottomBudget.getString(i, 'release_date').split('-')[0];
      var year = parseInt(date);
      var yearPosition = map(year, 1900, 2020, leftX, rightX);
      var scorePosition = map(bottomBudget.getNum(i, 'vote_average'), 0, 10, bottomY, topY);
      ellipse(yearPosition, scorePosition, 3, 3);
    }
    fill(255, 0, 0);
    noStroke();
    for (var i = 0; i < topBudget.getRowCount(); i++) {
      var date = topBudget.getString(i, 'release_date').split('-')[0];
      var year = parseInt(date);
      var yearPosition = map(year, 1900, 2020, leftX, rightX);
      var scorePosition = map(topBudget.getNum(i, 'vote_average'), 0, 10, bottomY, topY);
      ellipse(yearPosition, scorePosition, 3, 3);
    }
  }
  else {
    fill(220);
    noStroke();
    for (var i = 0; i < topBudget.getRowCount(); i++) {
      var date = topBudget.getString(i, 'release_date').split('-')[0];
      var year = parseInt(date);
      var yearPosition = map(year, 1900, 2020, leftX, rightX);
      var scorePosition = map(topBudget.getNum(i, 'vote_average'), 0, 10, bottomY, topY);
      ellipse(yearPosition, scorePosition, 3, 3);
    }
    fill(255, 0, 0);
    noStroke();
    for (var i = 0; i < bottomBudget.getRowCount(); i++) {
      var date = bottomBudget.getString(i, 'release_date').split('-')[0];
      var year = parseInt(date);
      var yearPosition = map(year, 1900, 2020, leftX, rightX);
      var scorePosition = map(bottomBudget.getNum(i, 'vote_average'), 0, 10, bottomY, topY);
      ellipse(yearPosition, scorePosition, 3, 3);
    }
  }
}

// ***** Draw buttons function ***** //
function drawButtons(){
  textAlign(CENTER, TOP);
  for (var i = 0; i < buttonLabels.length; i++) {
    if (selectedButton == i) {
      fill(200);
    }
    else {
      fill(240);
    }
    stroke(100);
    rect(buttonStartX + i * (buttonLength + buttonSpacing), buttonStartY, buttonLength, buttonHeight);
    fill(0);
    noStroke();
    text(buttonLabels[i], buttonStartX + i * (buttonLength + buttonSpacing) + buttonLength/2, buttonStartY + 2);
  }
}

// ***** Draw function ***** //
function draw(){
  background(255);
  drawLabels();
  drawMovies();
  drawButtons();
}

// ****** Mouse pressed function ******* //
function mousePressed(){
  if (mouseX >= buttonStartX && mouseX <= (buttonStartX + buttonLength) && mouseY >= buttonStartY && mouseY <= (buttonStartY + buttonHeight)) {
    selectedButton = 0;
    redraw();
  }
  else if (mouseX >= (buttonStartX + buttonLength + buttonSpacing) && mouseX <= (buttonStartX + buttonLength * 2 + buttonSpacing) && mouseY >= buttonStartY && mouseY <= (buttonStartY + buttonHeight)){
    selectedButton = 1;
    redraw();
  }
  else if (mouseX >= (buttonStartX + buttonLength + buttonSpacing) && mouseX <= (buttonStartX + buttonLength * 3 + buttonSpacing * 2) && mouseY >= buttonStartY && mouseY <= (buttonStartY + buttonHeight)){
    selectedButton = 2;
    redraw();
  }
}