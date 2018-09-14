$('#order1').click(function(){
    $(".form1").animate({left: '0'},700);
});

$(function() {
  $(".form1_bg, .form1_container").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      if(direction == 'left') {
      	$(".form1").animate({left: '-100%'},700)
      }   
    }
  });
});

$('#close1').click(function(){
  $(".form1").animate({left: '-100%'},700);
});

$('#order2').click(function(){
    $(".form2").animate({right: '0'},700);
});

$(function() {
  $(".form2_bg, .form2_container").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      if(direction == 'right'){
      	$(".form2").animate({right: '-100%'},700)
      }   
    }
  });
});

$('#close2').click(function(){
  $(".form2").animate({right: '-100%'},700);
});



$("#phone").mask("+9(999) 999-99-99");

$(document).ready(function () {
	$('#submit1').click(function (e) {
	    var isValid = true;
	    $('#name1,#email').each(function () {
	    	if ($.trim($(this).val()) == '') {
	            isValid = false;
	            $(this).css({
	                "background": "#FFCECE"
	            });
	        }
	        else {
	            $(this).css({
	                "border": "",
	                "background": ""
	            });
	        }
	    });
	    if (isValid == false)
	        e.preventDefault();
    });
    $('#submit2').click(function (e) {
	    var isValid = true;
	    $('#name2,#phone').each(function () {
	    	if ($.trim($(this).val()) == '') {
	            isValid = false;
	            $(this).css({
	                "background": "#FFCECE"
	            });
	        }
	        else {
	            $(this).css({
	                "border": "",
	                "background": ""
	            });
	        }
	    });
	    if (isValid == false)
	        e.preventDefault();
    });
});