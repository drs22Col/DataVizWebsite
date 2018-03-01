/
function setup() {
  createCanvas(100, 100, WEBGL);
}

function draw() {
  background(0);
  noStroke();
  fill(240, 150, 150);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(45, 45, 45);
}