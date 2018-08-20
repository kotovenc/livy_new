// JavaScript Document

//	"use strict";

	var line;
	var i=1;
	var serv1;
	var serv2;
	var serv1_x ,serv1_y;
	var serv2_x ,serv2_y;
	var angle;
	var serv;
	var j;
	var arr = ['1', '2', '3','4', '5'];
	function resize() { 	
    	for ( i = 0; i<4;i++ ) 	{
			serv1 = document.getElementById('serv'+arr[i]);
			serv2 = document.getElementById('serv'+arr[i+1]);
			line = document.getElementById('line'+arr[i]);
			
			serv1_x = (serv1.getBoundingClientRect().right - serv1.getBoundingClientRect().left) / 2 + serv1.getBoundingClientRect().left;
		
			serv1_y = (serv1.getBoundingClientRect().bottom - serv1.getBoundingClientRect().top) / 2 + serv1.getBoundingClientRect().top;
		
			serv2_x = (serv2.getBoundingClientRect().right - serv2.getBoundingClientRect().left) / 2 + serv2.getBoundingClientRect().left;
		
			serv2_y = (serv2.getBoundingClientRect().bottom - serv2.getBoundingClientRect().top) / 2 + serv2.getBoundingClientRect().top;
		
			angle = (serv2_y - serv1_y) / (serv2_x - serv1_x);

			line.style.transform = 'rotate(' + String(Math.atan(angle)) + 'rad)';
		}
  	}
	window.onresize = resize;