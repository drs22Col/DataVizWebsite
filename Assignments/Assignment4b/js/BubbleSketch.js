var maxLength = 1.5;

function setup(){
	createCanvas(800, 3000);
	textSize(12);
	}

function draw(){
background(255);
noStroke();
colorMode(RGB, 20);
for (i = 0; i < 20; i++) {
  for (j = 0; j < 20; j++) {
    var radius = int(dist(5 + i * 20, 5 + j * 20, mouseX, mouseY));
    var m = map(radius, 0, 20, 0, maxLength)
    stroke(0);
    fill(m);
    ellipse(5 + i * 20, 5 + j * 20, m, m);
    }
  }
}
