var anchors = [];

class Anchor{
  constructor(name, startY, endY) {
  	this.name = name;
  	this.startY = startY;
  	this.endY = endY;
  }
}

$(document).ready(function(){
	for(var i = 0; i < $('.nav_button').last().index(); i++){
		var str1 = $('.nav_button').eq(i).attr('onclick');
		nameAnchorFirst = str1.substring(15, str1.length - 1);

		var str2 = $('.nav_button').eq(i+1).attr('onclick');
		nameAnchorLast = str2.substring(15, str2.length - 1);

		anchors[i] = new Anchor(nameAnchorFirst, $(nameAnchorFirst).offset().top, $(nameAnchorLast).offset().top);
		//console.log(anchors[i]);
	}

	var str = $('.nav_button').eq($('.nav_button').last().index()).attr('onclick');
	var nameAnchor = str.substring(15, str.length - 1);

	anchors[$('.nav_button').last().index()] = new Anchor(nameAnchor, $(nameAnchor).offset().top, 	$(document).height());
	//console.log(anchors[$('.nav_button').last().index()]);
});

$(window).resize(function(){
	for(var i = 0; i < $('.nav_button').last().index(); i++){
		var str1 = $('.nav_button').eq(i).attr('onclick');
		nameAnchorFirst = str1.substring(15, str1.length - 1);

		var str2 = $('.nav_button').eq(i+1).attr('onclick');
		nameAnchorLast = str2.substring(15, str2.length - 1);

		anchors[i].startY = $(nameAnchorFirst).offset().top;
		anchors[i].endY = $(nameAnchorLast).offset().top
	}

	var str = $('.nav_button').eq($('.nav_button').last().index()).attr('onclick');
	var nameAnchor = str.substring(15, str.length - 1);

	anchors[$('.nav_button').last().index()].startY = $(nameAnchor).offset().top;
	anchors[$('.nav_button').last().index()].endY = $(document).height();
});

var timerStartScroll;
var oldScrollY = 0;

$(document).scroll(function(){
	clearTimeout(timerStartScroll);

	timerStartScroll = setTimeout(function tick() {
		var nearAnchor = anchors[0];
    	for(var i = 1; i < anchors.length; i++){
    		if((nearAnchor.endY - nearAnchor.startY) > document.documentElement.clientHeight){
				if(Math.abs(nearAnchor.endY - scrollY - document.documentElement.clientHeight) > Math.abs(anchors[i].endY - scrollY - document.documentElement.clientHeight) && Math.abs(nearAnchor.startY - scrollY) > Math.abs(anchors[i].startY - scrollY)){ //document.documentElement.clientHeight
					nearAnchor = anchors[i];
				}
			}else{
				if(Math.abs(nearAnchor.startY - scrollY) > Math.abs(anchors[i].startY - scrollY)){
					nearAnchor = anchors[i];
				}
			}
		}

		if((nearAnchor.endY - nearAnchor.startY) > document.documentElement.clientHeight){
			if(!(scrollY > nearAnchor.startY && scrollY <= nearAnchor.endY - document.documentElement.clientHeight)){
				if(scrollY + document.documentElement.clientHeight > nearAnchor.endY){
					//$('html, body').animate({ scrollTop: nearAnchor.endY  - document.documentElement.clientHeight}, 100);
					window.scroll(0, nearAnchor.endY  - document.documentElement.clientHeight);
				}else{
					location.href = nearAnchor.name;
				}
			}
		}else{
			location.href = nearAnchor.name;
		}

		oldScrollY = scrollY;
	}, 500);
});
