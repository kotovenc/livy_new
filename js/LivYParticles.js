var canvas;
var corrX = 0;
var corrY = 0;

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
		  this.ctx.fillRect(this.x, this.y, 2, 2);
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

      this.x = getRandomInt(-corrX, canvas.width + corrX);
      this.y = getRandomInt(-corrY, canvas.height + corrY);

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

$(window).resize(function(){
  canvas.width = $('#particles').parent().width();
  canvas.height = $('#particles').parent().height();

  corrX=parseInt(canvas.width/5);
  corrY=parseInt(canvas.height/5);
});

$(document).ready(function(){
	canvas = document.getElementById("particles"),
	ctx = canvas.getContext('2d');
	canvas.width = $('#particles').parent().width();
	canvas.height = $('#particles').parent().height();

	corrX=parseInt(canvas.width/5);
	corrY=parseInt(canvas.height/5);

	startCanvas();
});

function startCanvas(){
	var oneStar = [];
	var numStar = parseInt((canvas.width*canvas.height)/2500);

	for(var i = 0; i< numStar; i++){
    oneStar[i] = new Star(ctx, getRandomInt(-corrX, canvas.width + corrX), getRandomInt(-corrY, canvas.height + corrY));

		oneStar[i].draw();

		oneStar[i].life();
	}

	var timerId = setTimeout(function tick() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for(var i = 0; i<numStar; i++){
			oneStar[i].draw();
		}
  		timerId = setTimeout(tick, 50);
	}, 50);
}