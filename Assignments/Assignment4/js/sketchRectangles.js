console.log('hello')

function setup(){
  createCanvas(600, 600);
  print('Setup complete...');
}

function draw(){
  noStroke()
  colorMode(HSB, 100);
  for (var i = 0; i < 40; i++) {
    for (var j = 0; j < 40; j++)
      {fill(i * 2.5, j *2.6, 100)
      rect(i * 10, j * 10, 10, 10);
    }
  }
}
