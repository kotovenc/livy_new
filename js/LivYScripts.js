var flagLeftRight = [];
var numClone = [];/*равно кол-ву одновременно отображенных слайдов*/
var flagMouse = 0;
var flagOpenMouse = 1;
var startMouseX = 0;
var idMoveMouse = 0;
var numberOfActSlide = 0;
var relX = 0;

function loadSlider(){
	for(var j=0; j < $('.slider').last().index(); j++){
		var idEl = $('.slider').eq(j).attr('id');
		var thisSlider =  $('.slider'+'#'+idEl).children('.containerSlider').children('.containerBlock');
		var numAllSlide =  thisSlider.children('.block').last().index();/*сколько всего слайдов (настоящих)*/

		numClone[idEl] = thisSlider.attr('numActSlide');

		/*настройка размеров*/
		$('.slider'+'#'+idEl).children('.containerSlider').css("width", numClone[idEl]*$('#' + idEl + '>.containerSlider>.containerBlock>.block').width() + 'px');
		thisSlider.css("width", (2*numClone[idEl]+numAllSlide + 1)*$('#' + idEl + '>.containerSlider>.containerBlock>.block').width() + 'px');/*размеры*/
		/*настройка размеров*/

		var numEndClone = numClone[idEl];/*сколько надо клонов*/
		var i = 0;

		while(numEndClone > 0){
			numEndClone = numEndClone - 1;

			thisSlider.children('.block').eq(2*i).clone().removeClass('active').addClass('clone').appendTo(thisSlider);/*клон снизу*/
			thisSlider.children('.block').eq(numAllSlide).clone().removeClass('active').addClass('clone').prependTo(thisSlider);/*клон сверху*/

			i++;
		}

		/*настройка размеров*/
		thisSlider.css("transform","translate3d("+ -(thisSlider.children('.active').index())*$('#' + idEl + '>.containerSlider>.containerBlock>.block').width() +"px, 0, 0)");
		/*настройка размеров*/

		if(thisSlider.attr('haveSpecialCenterSlide') == 1){
			thisSlider.children('.block').css({transition:"opacity 0.5s ease"});
			thisSlider.children('.block').css({opacity:"0.5"});
			thisSlider.children('.block').eq(thisSlider.children('.active').index()+parseInt(numClone[idEl]/2)).addClass(idEl + 'specialEl');
		}
	}
}

$(window).resize(function(){
  	for(var j=0; j < $('.slider').last().index(); j++){
		var idEl = $('.slider').eq(j).attr('id');
		var thisSlider =  $('.slider'+'#'+idEl).children('.containerSlider').children('.containerBlock');
		var numAllSlide =  thisSlider.children('.block').last().index() - 2*numClone[idEl];/*сколько всего слайдов (настоящих)*/

		thisSlider.css({transition:"all 0s linear 0s"});

		/*настройка размеров*/
		$('.slider'+'#'+idEl).children('.containerSlider').css("width", numClone[idEl]*$('#' + idEl + '>.containerSlider>.containerBlock>.block').width() + 'px');
		thisSlider.css("width", (2*numClone[idEl]+numAllSlide + 1)*$('#' + idEl + '>.containerSlider>.containerBlock>.block').width() + 'px');/*размеры*/
		thisSlider.css("transform","translate3d("+ -(thisSlider.children('.active').index())*$('#' + idEl + '>.containerSlider>.containerBlock>.block').width() +"px, 0, 0)");
	}
});

$(document).ready(function(){
	loadSlider();

	$('.containerSlider').mousedown(function(e){
		if($(this).closest('.slider').attr('withGrab') == 1 && flagOpenMouse == 1){
			idMoveMouse = $(this).closest('.slider').attr('id');
			startMouseX = e.pageX - $(this).offset().left;
			flagMouse = 1;
			//console.log(idMoveMouse);
		}
	});

	$(document).mousemove(function(e){
	/*$('.containerSlider').mousemove(function(e){
		if(flagMouse == 1 && $(this).closest('.slider').attr('withGrab') == 1){
			var idEl = $(this).closest('.slider').attr('id');
			var parentOffset = $(this).offset(); 
			var thisSlider =  $(this).children('.containerBlock');
   			relX = e.pageX - parentOffset.left - startMouseX;*/
		if(flagMouse == 1){
			var idEl = idMoveMouse;
			var parentOffset = $('.slider'+'#'+idEl).children('.containerSlider').offset(); 
			var thisSlider =  $('.slider'+'#'+idEl).children('.containerSlider').children('.containerBlock');
   			relX = e.pageX - parentOffset.left - startMouseX;

   			/*Warning: light magic*/
   			var globalX = thisSlider.children('.active').index()*thisSlider.children('.active').width();
   			var samKoef = thisSlider.children('.active').index() - numClone[idEl];
   			var koefCorr = -Math.ceil((relX - (samKoef+1)*thisSlider.children('.block').width())/((thisSlider.children('.block').last().index() - 2*numClone[idEl] + 1)*thisSlider.children('.block').width()));

   			thisSlider.css({transition:"all 0s linear 0s"});
   			thisSlider.css("transform","translate3d(" + -((globalX-relX) - koefCorr*((thisSlider.children('.block').last().index() - 2*numClone[idEl] + 1)*thisSlider.children('.block').width())) +"px, 0, 0)");
			
			numberOfActSlide = (((globalX-relX) - koefCorr*((thisSlider.children('.block').last().index() - 2*numClone[idEl] + 1)*thisSlider.children('.block').width()))/thisSlider.children('.block').width()) - numClone[idEl] + 1;

			/*выделение центрального слайда*/
			if(thisSlider.children('.block').hasClass(idEl + 'specialEl')){
				/*var lastId = thisSlider.children(idEl + 'specialEl').index();
				setTimeout(function (){ thisSlider.children('.block').eq(lastId).css({transition:"opacity 0s ease"}); }, 5);*/
				thisSlider.children('.block').removeClass(idEl + 'specialEl');

				if(numberOfActSlide - 0.5 < 0){
					if(numberOfActSlide - 0.5 < -0.3){
						thisSlider.children('.block').eq(parseInt(-1) + parseInt(numClone[idMoveMouse]) + parseInt(thisSlider.attr('numActSlide')/2)).addClass(idEl + 'specialEl').css({transition:"opacity 0s ease"});
					}else{
						thisSlider.children('.block').eq(parseInt(-1) + parseInt(numClone[idMoveMouse]) + parseInt(thisSlider.attr('numActSlide')/2)).addClass(idEl + 'specialEl').css({transition:"opacity 0.5s ease"});
					}
				}else{/*если подход к границе то добавить анимацию на след слайд а с предыдущего убрать*/
					if(numberOfActSlide - 0.5 > thisSlider.children('.block').last().index() - 2*numClone[idEl] + 0.3){/*отсчет от всех настоящих слайдов*/
						thisSlider.children('.block').eq(parseInt(numberOfActSlide - 0.5) + parseInt(numClone[idMoveMouse]) + parseInt(thisSlider.attr('numActSlide')/2)).addClass(idEl + 'specialEl').css({transition:"opacity 0s ease"});
					}else{
						thisSlider.children('.block').eq(parseInt(numberOfActSlide - 0.5) + parseInt(numClone[idMoveMouse]) + parseInt(thisSlider.attr('numActSlide')/2)).addClass(idEl + 'specialEl').css({transition:"opacity 0.5s ease"});
					}
				}
			}
			/*выделение центрального слайда*/
		}
	});

	$(document).mouseup(function(){
		if(flagMouse == 1 && relX != 0){
			thisSlider = $('.slider'+'#'+idMoveMouse).children('.containerSlider').children('.containerBlock');
			numberOfActSlide = parseInt(parseInt(numberOfActSlide) + parseInt(numClone[idMoveMouse]) - 0.5* parseInt(relX/Math.abs(relX)));
			var samKoef = thisSlider.children('.active').index() - numClone[idMoveMouse];

			thisSlider.children('.active').removeClass('active');

			//console.log(numberOfActSlide);
			if(thisSlider.children('.block').eq(numberOfActSlide).hasClass('clone') && relX < 0){
				thisSlider.children('.block').eq(numClone[idMoveMouse]).addClass('active');
				thisSlider.css("transform","translate3d(" +  -((numClone[idMoveMouse]-1)*thisSlider.children('.block').width() - relX) + "px, 0, 0)");
				
				setTimeout(function (){ 
					thisSlider.css({transition:"all 0.25s linear 0s"});
					thisSlider.css("transform","translate3d(" +  -(numClone[idMoveMouse]*thisSlider.children('.block').width()) + "px, 0, 0)");
				}, 50);
			}else{
				if(thisSlider.children('.block').eq(numberOfActSlide).hasClass('clone') && relX > 0){
					thisSlider.children('.block').eq(thisSlider.children('.block').last().index()-numClone[idMoveMouse]).addClass('active');
					thisSlider.css("transform","translate3d(" +  -((thisSlider.children('.block').last().index()-(numClone[idMoveMouse]-1))*thisSlider.children('.block').width() - relX + ((thisSlider.children('.block').last().index() - 2*numClone[idMoveMouse] + 1)*thisSlider.children('.block').width())*parseInt(Math.abs(relX)/((thisSlider.children('.block').last().index() - 2*numClone[idMoveMouse] + 1)*thisSlider.children('.block').width())) + samKoef*thisSlider.children('.block').width()) + "px, 0, 0)");
					
					setTimeout(function (){ 
						thisSlider.css({transition:"all 0.25s linear 0s"});
						thisSlider.css("transform","translate3d(" +  -((thisSlider.children('.block').last().index()-(numClone[idMoveMouse]))*thisSlider.children('.block').width()) + "px, 0, 0)");
					}, 50);
				}else{
					thisSlider.children('.block').eq(numberOfActSlide).addClass('active');
					thisSlider.css({transition:"all 0.25s linear 0s"});
					thisSlider.css("transform","translate3d(" +  -(numberOfActSlide*thisSlider.children('.block').width()) + "px, 0, 0)");
				}
			}

			flagOpenMouse = 0;

			setTimeout(function (){flagOpenMouse = 1;}, 200);
			 if(relX < 0){
			 	if(thisSlider.children('.block').eq(numberOfActSlide).hasClass('clone')){
					thisSlider.children('.block').removeClass(idMoveMouse + 'specialEl');
					thisSlider.children('.block').eq((thisSlider.children('.active').index() + parseInt(numClone[idMoveMouse]/2) - 1)).addClass(idMoveMouse + 'specialEl').css({transition:"opacity 0s ease"});
			 		setTimeout(function (){ addSpecialCenterSlide(idMoveMouse);}, 50);
				}else{
			 		addSpecialCenterSlide(idMoveMouse);/*выделение центрального слайда*/
			 	}
			 }else{
			 	if(thisSlider.children('.block').eq(numberOfActSlide).hasClass('clone')){
			 		thisSlider.children('.block').removeClass(idMoveMouse + 'specialEl');
					thisSlider.children('.block').eq(thisSlider.children('.block').last().index()-(numClone[idMoveMouse]-Math.ceil(numClone[idMoveMouse]/2))).addClass(idMoveMouse + 'specialEl').css({transition:"opacity 0s ease"});
					setTimeout(function (){ addSpecialCenterSlide(idMoveMouse);}, 50);
				}else{
					addSpecialCenterSlide(idMoveMouse);/*выделение центрального слайда*/
				}
			 }	
		}
		//console.log(idMoveMouse);
		numberOfActSlide = 0;
		relX = 0;
		flagMouse = 0;
	});

	$('.sliderRight').click(function(){
		var temp = $(this).closest('.slider');

		if(flagLeftRight[temp.attr('id')] != 0){
			funcRight1(temp.attr('id'));

			flagLeftRight[temp.attr('id')] = 0;
			setTimeout(function (){ flagLeftRight[temp.attr('id')] = 1; }, 500);
		}
	});

	$('.sliderLeft').click(function(){
		var temp = $(this).closest('.slider');

		if(flagLeftRight[temp.attr('id')] != 0){
			funcLeft1(temp.attr('id'));

			flagLeftRight[temp.attr('id')] = 0;
			setTimeout(function (){ flagLeftRight[temp.attr('id')] = 1; }, 500);
		}
	});
});

function funcRight1(idEl){
	var thisSlider = $('.slider'+'#'+idEl).children('.containerSlider').children('.containerBlock');

	var currIndex = thisSlider.children('.active').index();
	thisSlider.children('.block').eq(currIndex).removeClass('active');

	if(currIndex == thisSlider.children('.block').last().index()-numClone[idEl]){
		thisSlider.children('.block').eq(numClone[idEl]).addClass('active');

		thisSlider.css({transition:"all 0s linear 0s"});
		thisSlider.css("transform","translate3d("+ -((numClone[idEl]-1)*thisSlider.children('.block').width() - relX) +"px, 0, 0)");

		/*для специального центрального слайда*/
		thisSlider.children('.block').removeClass(idEl + 'specialEl');
		thisSlider.children('.block').eq((thisSlider.children('.active').index() + parseInt(numClone[idEl]/2) - 1)).addClass(idEl + 'specialEl').css({transition:"opacity 0s ease"});
		/*для специального центрального слайда*/

		setTimeout(function (){ 
			thisSlider.css({transition:"all 0.5s linear 0s"});
			thisSlider.css("transform","translate3d("+ -(thisSlider.children('.active').index())*thisSlider.children('.block').width() +"px, 0, 0)");
			addSpecialCenterSlide(idEl);
		}, 50);
	}else{
		thisSlider.children('.block').eq(currIndex+1).addClass('active');
		thisSlider.css({transition:"all 0.5s linear 0s"});
		thisSlider.css("transform","translate3d("+ -(thisSlider.children('.active').index())*thisSlider.children('.block').width() +"px, 0, 0)");
		addSpecialCenterSlide(idEl);
	}
}

function funcLeft1(idEl){
	var thisSlider = $('.slider'+'#'+idEl).children('.containerSlider').children('.containerBlock');

	var currIndex = thisSlider.children('.active').index();
	thisSlider.children('.block').eq(currIndex).removeClass('active');

	if(currIndex == numClone[idEl]){
		thisSlider.children('.block').eq(thisSlider.children('.block').last().index()-numClone[idEl]).addClass('active');

		thisSlider.css({transition:"all 0s linear 0s"});
		thisSlider.css("transform","translate3d("+ -((thisSlider.children('.block').last().index()-(numClone[idEl]-1))*thisSlider.children('.block').width() - relX) +"px, 0, 0)");
		
		/*для специального центрального слайда*/
		thisSlider.children('.block').removeClass(idEl + 'specialEl');
		thisSlider.children('.block').eq(thisSlider.children('.block').last().index()-(numClone[idEl]-Math.ceil(numClone[idEl]/2))).addClass(idEl + 'specialEl').css({transition:"opacity 0s ease"});
		/*для специального центрального слайда*/

		setTimeout(function (){ 
			thisSlider.css({transition:"all 0.5s linear 0s"});
			thisSlider.css("transform","translate3d("+ -(thisSlider.children('.active').index())*thisSlider.children('.block').width() +"px, 0, 0)");
			addSpecialCenterSlide(idEl);
		}, 50);
	}else{
		thisSlider.children('.block').eq(currIndex-1).addClass('active');
		thisSlider.css({transition:"all 0.5s linear 0s"});
		thisSlider.css("transform","translate3d("+ -(thisSlider.children('.active').index())*thisSlider.children('.block').width() +"px, 0, 0)");
		addSpecialCenterSlide(idEl);
	}
}

function addSpecialCenterSlide(idEl){/*доделать по направлениям 53 75*/
	var thisBlocks = $('.slider'+'#'+idEl).children('.containerSlider').children('.containerBlock').children('.block');
	console.log(thisBlocks.parent().children('.active').index());

	if(thisBlocks.hasClass(idEl + 'specialEl')){
		thisBlocks.parent().children('.'+ idEl + 'specialEl').css({transition:"opacity 0.5s ease"});
		thisBlocks.removeClass(idEl + 'specialEl');
		thisBlocks.eq(thisBlocks.parent().children('.active').index() + parseInt(numClone[idEl]/2)).addClass(idEl + 'specialEl').css({transition:"opacity 0.5s ease"});
	}
}