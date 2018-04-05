var animations = {};
var weatherDescription;

function setupAnimations(){
	animations.sprites = [];

	animations.reset = function(){
		this.sprites = [];
		}

//RAIN
animations.rain = function(){
	background("navy");
        noStroke();
		if (this.sprites.length < 100){
	       this.sprites.push(this.getDrop());
				}
	fill("silver");
	for (let i=this.sprites.length-1; i>=0; i--){ // -- so can splice later
		var s = this.sprites[i];
			ellipse(s.x, s.y, s.w, s.h);  //sprite's coordinates
			s.y += s.vy;  //  vy is velocity in y direction
				if (s.y > height + 55){  //height is bottom edge 
					this.sprites.splice(i, 1);  //to get rid of sprites we dont see that go past bottom
					this.sprites.push(this.getDrop()); // adds the drop to sprites array
	}
		}
}
		animations.drizzle = animations.rain;   //'drizzle' and 'thunderstorm' (below) both get rain animation
		animations.thunderstorm = animations.rain;
		animations.getDrop = function(){
		return {
			x: random(width), //randomize where drop
			y: -55,
			w: 2,
		    h: 50,
		    vy: 20 //velocity on y axis 
		};
}

//SUN
animations.sun = function(){
	background("lightblue");
       noStroke();
		if (!this.sprites.length){  //if the array has no length: to start afresh
		this.sprites.push(this.getSunBackground(), this.getSunForeground());
				}
		for (let i=0; i<this.sprites.length; i++){ 
			var s = this.sprites[i];
			fill(s.c); //c is color of sprite
			push(); //going to change the drawing canvas grid and rotate, push/pop function
			translate(s.x, s.y);
			rotate(s.angle);
			this.drawStar(0, 0, s.innerRadius, s.outerRadius, s.numberOfPoints);
			pop();
			s.angle += s.deltaAngle;  //going to change the angle delta amount
				}
				fill("yellow");
				ellipse(this.sprites[0].x, this.sprites[0].y, 90); //draws circle part of sun
	}
        animations.clear = animations.sun;
		animations.getSunBackground = function(){
		return {
			x: width * 2/3,
			y: height/6,
			numberOfPoints: 16,
			innerRadius: 50,
		   outerRadius: 70,
			angle: 0,
			deltaAngle: -0.01,
		    c: "rgb(255, 165, 0)"
				};
	}
		animations.getSunForeground = function(){
				return {
			x: width * 2/3,
			y: height/6,
			numberOfPoints: 16,
			innerRadius: 45,
			outerRadius: 65,
		     angle: 0,
		deltaAngle: 0.015,  //moving faster slightly, this is positive and other is negative to go opposite directions
		c: "rgb(255, 215, 0)"
				};
		}
		animations.drawStar = function(x, y, radius1, radius2, npoints) {
		var angle = TWO_PI / npoints;
		var halfAngle = angle/2.0;
		beginShape();
		for (var a = 0; a < TWO_PI; a += angle) {
			var sx = x + cos(a) * radius2;
				var sy = y + sin(a) * radius2;
				vertex(sx, sy);
				sx = x + cos(a+halfAngle) * radius1;
				sy = y + sin(a+halfAngle) * radius1;
				vertex(sx, sy);
				}
				endShape(CLOSE);
		}

//CLOUDS
		animations.clouds = function(){  //clouds groupings of circles
		 background("blue");
             noStroke();
				if (!this.sprites.length){
				for (let i=0; i<20; i++){
					this.sprites.push(this.getCloud(true));
						}
				for (let i=0; i<5; i++){
					this.sprites.push(this.getCloud());
						}
				}
				if (random() < 0.005){ //every frame a .5% chance of cloud
						this.sprites.push(this.getCloud());
				}
				for (let i=this.sprites.length-1; i>=0; i--){
					var s = this.sprites[i];
					for (let j=0; j<s.blobs.length; j++){  
					var b = s.blobs[j]; //b is the blob
					fill(b.c);
					ellipse(s.x+b.offsetX, s.y+b.offsetY, b.w, b.h);
						}
						s.x += s.vx;
						if (s.x < -100){
								this.sprites.splice(i, 1);  //remove when disappear to left
								this.sprites.push(this.getCloud());
  }
}
}
		animations.mist = animations.clouds;
		animations.haze = animations.clouds;
		animations.fog = animations.clouds;
		animations.getCloud = function(starting = false){
				var blobPoints = random(5, 12),
				   blobXOffset = 30,
				   blobYOffset = 10,
					blobMaxWidth = 120,
					blobMaxHeight = 50,
					blobMinWidth = 50,
					blobMinHeight = 10,
					blobs = [];
				for (let i=1; i<=blobPoints; i++){   
						blobs.push({
							offsetX: random(blobXOffset),
							offsetY: random(blobYOffset),
							w: random(blobMinWidth, blobMaxWidth),
							h: random(blobMinHeight, blobMaxHeight),
							c: 255 - random(10)
						});
				}
				return {
						x: (starting) ? random(width) : width + 100, //makes clouds at the beginning; if starting is true then random on the width, or if false width +100 
						y: random(height/2),
						vx: -1, //velocity on x axis moving right to left
						blobs: blobs  
				};
		}
//SNOW
	animations.snow = function(){
	background("black");
       noStroke();
				if (this.sprites.length < 200){
						this.sprites.push(this.getFlake());
				}
				fill("white");
				for (let i=this.sprites.length-1; i>=0; i--){
				var s = this.sprites[i];
				ellipse(s.x, s.y, s.w, s.h);
				s.x += s.vx;
				s.y += s.vy;
				if (s.y > height + 10 || s.x < -10 || s.x > width +10){  //if sprite has left to any side, splicing
				this.sprites.splice(i, 1);
			   this.sprites.push(this.getFlake());
	}
}
}
		animations.getFlake = function(){
				return {
	x: random(width), //to make more like flurries 
	y: -10,
	w: 5,
	h: 5,
	vx: random(1) -0.5,   
	vy: random(6) +2 // (0 to 6, plus 2, so 2 to 8)
	};
}
}