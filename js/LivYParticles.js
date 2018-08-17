var canvasStars;
var oneStar = [];
var numStar
var corrX = 0;
var corrY = 0;

var canvasBubbles;
var oneBubble = [];
var numBubble;
var mouseX;
var mouseY;

function gaussianRand() {
  var rand = 0;

  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
}

function getRandomInt(start, end) {
  return Math.floor(start + gaussianRand() * (end - start + 1));
}

function getRandomInt123(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Star{
  	constructor(ctx, x, y) {
  	  this.ctx = ctx;
    	this.x = x;
    	this.y = y;

 		  this.maxAlpha = Math.random() * (0.9 - 0.5 + 1) + 0.7;
    	this.alpha = this.maxAlpha;
      var randColor = getRandomInt(0, 5)*30;
    	this.color = 'rgba('+ (230 - randColor) +', '+ (230 - randColor) +', '+ (255) +'';
  		this.size = getRandomInt123(1, 2);
  	}

  	draw(){
		  this.ctx.fillStyle = this.color +', ' + Math.abs(this.alpha) + ')';
		  this.ctx.beginPath(); 
		  this.ctx.fillRect(this.x, this.y, this.size, this.size);
		  this.ctx.closePath(); 
		  this.ctx.fill();
  	}

  	life(){
  		var this_ = this;
  		this.timer = setTimeout(function (){ this_.died();}, getRandomInt(1000, 5000));
  	}

  	died(){
  		this.flag = 0;
  		var this_ = this;

  		this.timer = setTimeout(function tick() {
  			if(this_.flag == 0){
  				this_.alpha += 0.1;
  			}else{
  				this_.alpha -= 0.1;
  			}

  			if(this_.alpha > 1){
  				this_.flag = 1;
  			}

  			if(this_.alpha > 0.1){
  				this_.timer = setTimeout(tick, 100);
  			}else{
  				this_.born();
  			}
		}, 100);
  	}

  	born(){
  		var this_ = this;

      this.x = getRandomInt(-corrX, canvasStars.width + corrX);
      this.y = getRandomInt(-corrY, canvasStars.height + corrY);

  		this.timer = setTimeout(function tick() {
  			if(this_.flag == 1 && this_.alpha < this_.maxAlpha){
  				this_.alpha += 0.1;
  			}else{
  				this_.flag = 0;
  			}

  			if(this_.flag == 1){
  				this_.timer = setTimeout(tick, 100);
  			}else{
  				this_.life();
  			}
		}, 100);

  	}
}

class Bubble{
    constructor(ctx, x, y) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.vx = 0.5*getRandomInt123(-1, 1);
      this.vy = 0.5*getRandomInt123(-1, 1);
      if(this.vx == 0 && this.vy == 0){
        this.vx = 0.5;
        this.vy = 0.5;
      }

      this.maxAlpha = 0.5;
      this.alpha = this.maxAlpha;

      if(getRandomInt123(0, 1) == 0){
        this.color = 'rgba('+ (145) +', '+ (183) +', '+ (200) +'';
      }else{
        this.color = 'rgba('+ (242) +', '+ (204) +', '+ (48) +'';
      }


      this.size = getRandomInt123(10, 30);
    }

    draw(){
      this.ctx.strokeStyle = this.color + ', ' + 0.5 + ')';
      this.ctx.lineWidth=2;

      this.ctx.fillStyle = this.color +', ' + Math.abs(this.alpha) + ')';

      this.ctx.beginPath(); 
      this.ctx.arc(this.x, this.y, this.size,50, 0, Math.PI*2, true);
      this.ctx.arc(this.x, this.y, this.size-10,50, 0, Math.PI*2, true);
      //this.ctx.fillRect(this.x, this.y, this.size, this.size);
      this.ctx.closePath(); 
      this.ctx.stroke();
      this.ctx.fill();
    }

    died(){
      var this_ = this;
      this_.flag = 1;

      this.timerDied = setTimeout(function tick() {
        if(this_.alpha > 0.2 && this_.flag == 1){

          this_.alpha -= 0.05;
          this_.timerDied = setTimeout(tick, 50);
        }else{
          this_.flag = 0;
        }
      }, 50);
    }

    born(){
      var this_ = this;
      this.flag = 0;

      this.timerBorn = setTimeout(function tick() {
        if(this_.alpha < this_.maxAlpha && this_.flag == 0){
          this_.alpha += 0.05;
          this_.timerBorn = setTimeout(tick, 50);
        }else{
          this_.flag = 1;
        }
      }, 50);
    }

    move(){
      if(this.x <= 0 || this.x >= canvasBubbles.width){
        this.vx = -this.vx;
      }

      if(this.y <= 0 || this.y >= canvasBubbles.height){
        this.vy = -this.vy;
      }

      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    }
}

$(window).resize(function(){
  canvasStars.width = $('#stars').parent().width();
  canvasStars.height = $('#stars').parent().height();

  corrX=parseInt(canvasStars.width/5);
  corrY=parseInt(canvasStars.height/5);

  var oldNumStar = numStar;
  if(oldNumStar < parseInt((canvasStars.width*canvasStars.height)/2000)){
    numStar = parseInt((canvasStars.width*canvasStars.height)/2000);

    for(var i = oldNumStar; i< numStar; i++){
      oneStar[i] = new Star(ctx, getRandomInt(-corrX, canvasStars.width + corrX), getRandomInt(-corrY, canvasStars.height + corrY));

      oneStar[i].life();
    }
  }

  canvasBubbles.width = $('#bubbles').parent().width();
  canvasBubbles.height = $('#bubbles').parent().height();

  var oldNumBubble = numBubble;
  if(oldNumBubble < parseInt((canvasBubbles.width*canvasBubbles.height)/10000)){
    numBubble = parseInt((canvasBubbles.width*canvasBubbles.height)/10000);

    for(var i = oldNumBubble; i< numBubble; i++){
      oneBubble[i] = new Bubble(ctxB, getRandomInt123(0, canvasBubbles.width), getRandomInt123(0, canvasBubbles.height));

      oneBubble[i].born();
    }
  }
});

$(document).ready(function(){
	canvasStars = document.getElementById("stars"),
	ctx = canvasStars.getContext('2d');
	canvasStars.width = $('#stars').parent().width();
	canvasStars.height = $('#stars').parent().height();

	corrX=parseInt(canvasStars.width/5);
	corrY=parseInt(canvasStars.height/5);

  canvasBubbles = document.getElementById("bubbles"),
  ctxB = canvasBubbles.getContext('2d');

  $(document).mousemove(function(e){
    var parentOffset = $('#bubbles').offset(); 
    mouseX = e.pageX - parentOffset.left;
    mouseY = e.pageY - parentOffset.top;
  });

  canvasBubbles.width = $('#bubbles').parent().width();
  canvasBubbles.height = $('#bubbles').parent().height();

  startCanvas();
});

function startCanvas(){
	numStar = parseInt((canvasStars.width*canvasStars.height)/2000);

	for(var i = 0; i< numStar; i++){
    oneStar[i] = new Star(ctx, getRandomInt(-corrX, canvasStars.width + corrX), getRandomInt(-corrY, canvasStars.height + corrY));

		oneStar[i].draw();

		oneStar[i].life();
	}

  numBubble = parseInt((canvasBubbles.width*canvasBubbles.height)/10000);

  for(var i = 0; i< numBubble; i++){
    oneBubble[i] = new Bubble(ctxB, getRandomInt123(0, canvasBubbles.width), getRandomInt123(0, canvasBubbles.height));

    oneBubble[i].draw();

    oneBubble[i].born();
  }

	var timerDrawStar = setTimeout(function tick() {
		ctx.clearRect(0, 0, canvasStars.width, canvasStars.height);

		for(var i = 0; i<numStar; i++){
			oneStar[i].draw();
		}
  		timerDrawStar = setTimeout(tick, 50);
	}, 50);

  var timerDrawBubbles = setTimeout(function tick() {
    ctxB.clearRect(0, 0, canvasBubbles.width, canvasBubbles.height);

    for(var i = 0; i<numBubble; i++){
      oneBubble[i].draw();
    }

    for(var i = 0; i<numBubble; i++){
      oneBubble[i].move();
    }

    timerDrawBubbles = setTimeout(tick, 10);
  }, 10);

  var timerMouseDetectBubbles = setTimeout(function tick() {
    for(var i = 0; i < numBubble; i++){
      if(Math.pow(oneBubble[i].x - mouseX, 2) + Math.pow(oneBubble[i].y - mouseY, 2) <= 10000){
        oneBubble[i].died();
      }else{
        oneBubble[i].born();
      }
    }

    timerMouseDetectBubbles = setTimeout(tick, 20);
  }, 20);
}