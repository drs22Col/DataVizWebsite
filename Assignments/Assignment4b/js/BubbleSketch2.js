function setup(){
  createCanvas(540,540);

  for(var i = 1; i<21; i++){
    for (var j =1; j<21; j++) {
      var x = i*26;
      var y = j*26;
      fill(150);
      ellipse(x,y,30);
    }
  }

}

function draw(){
  var a = mouseX;
  var b = mouseY;   
  if ( (a>0) && (a<540) && (b>0) && (b<540) ) {

  clear();
  for(var i = 1; i<21; i++){
    for (var j =1; j<21; j++) {
      // Find distance of the center of the circle to current mouse 

      var x = i*26;
      var y = j*26;


      var d = int(dist(x, y, mouseX, mouseY));

      var radius = map(d, 0, 849, 3, 37);
      var color = map(d, 0, 849, 0, 255);
      fill(color);
      stroke(100);
      ellipse(x,y,radius, radius);
      

    }
  }

  }
}