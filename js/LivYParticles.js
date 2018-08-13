var canvas;
var corrX = 0;
var corrY = 0;

function getRandomInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Star{
  	constructor(ctx, x, y, dir) {
  		this.ctx = ctx;
    	this.x = x;
    	this.y = y;
    	this.dir = dir;

 		this.maxAlpha = Math.random() * (1 - 0.7 + 1) + 0.7;
    	this.alpha = this.maxAlpha;
    	this.color = 'rgba('+ (255 - getRandomInt(0, 5)*30) +', '+ (255 - getRandomInt(0, 5)*30) +', '+ (255 - getRandomInt(0, 5)*30) +'';
  		this.size = Math.random() * (1 - 0.5 + 1) + 0.5;
  	}

  	draw(){
		this.ctx.fillStyle = this.color +', ' + Math.abs(this.alpha) + ')';
		this.ctx.beginPath(); 
		this.ctx.arc(this.x, this.y, this.size, 50, 0, Math.PI*2, false); 
		this.ctx.closePath(); 
		this.ctx.fill();
  	}

  	start(){
  		var this_ = this;
  		setTimeout(function (){ this_.died();}, getRandomInt(1000, 5000));
  	}

  	died(){
  		this.flag = 0;
  		var this_ = this;

  		this.timerDied = setTimeout(function tick() {
  			if(this_.flag == 0){
  				this_.alpha += 0.1;
  			}else{
  				this_.alpha -= 0.1;
  			}

  			if(this_.alpha > 1){
  				this_.flag = 1;
  			}

  			if(this_.alpha > 0.1){
  				this.timerId = setTimeout(tick, 100);
  			}else{
  				this_.born();
  			}
		}, 100);
  	}

  	born(){
  		var this_ = this;

  		this.x = getRandomInt(this.dir*corrX, canvas.width-this.dir*corrX);
    	this.y = getRandomInt(this.dir*corrY, canvas.height-this.dir*corrY);

  		this.timerBorn = setTimeout(function tick() {
  			if(this_.flag == 1){
  				this_.alpha += 0.2;
  			}else{
  				this_.flag = 0;
  			}

  			if(this_.alpha > this.maxAlpha){
  				this_.flag = 0;
  			}

  			if(this_.alpha < this.maxAlpha){
  				this.timerId = setTimeout(tick, 100);
  			}else{
  				this_.start();
  			}
		}, 100);

  	}
}

$(document).ready(function(){
	canvas = document.getElementById("particles"),
	ctx = canvas.getContext('2d');
	canvas.width = $('#particles').parent().width();
	canvas.height = $('#particles').parent().height();

	corrX=parseInt(canvas.width/4);
	corrY=parseInt(canvas.height/4);

	startCanvas();
});

function startCanvas(){
	var oneStar = [];
	var numStar = parseInt((canvas.width*canvas.height)/1500);

	for(var i = 0; i< numStar; i++){
		if(getRandomInt(0, 2)!=0){
			oneStar[i] = new Star(ctx, getRandomInt(0, canvas.width), getRandomInt(0, canvas.height), 0);
		}else{
			oneStar[i] = new Star(ctx, getRandomInt(0+corrX, canvas.width-corrX), getRandomInt(0+corrY, canvas.height-corrY), 1);
		}

		oneStar[i].draw();

		if(getRandomInt(0, 5) != 0){
			oneStar[i].start();
		}
	}

	var timerId = setTimeout(function tick() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for(var i = 0; i<numStar; i++){
			oneStar[i].draw();
		}
  		timerId = setTimeout(tick, 50);
	}, 50);
}