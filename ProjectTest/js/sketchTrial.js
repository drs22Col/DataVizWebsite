console.log('hello');

function setup() {

createCanvas(600,600);
print('Setup complete...');}


//set up crazy looking "random" weather!!
function draw(){

background(215); 
strokeWeight(5);
smooth();
noFill();

for (int(i=0); i<10; i++) {

strokeWeight(3);
fill(random(255),random(255),random(255));


beginShape();
vertex(random(600), random(600));
bezierVertex(random(600), random(600), random(600), random(600), random(600), random(600));
bezierVertex(random(600), random(600), random(600), random(600), random(600), random(600));
endShape();
}

} 
