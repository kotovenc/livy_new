$('.portfolio_block').mouseenter(function(eventObject){
  	$(this).children('.overlay').css('opacity', '1');
  	$(this).children('.portfolio_hidden').css('top', '-100%');
});

$('.portfolio_block').mouseleave(function(eventObject){
  	$(this).children('.overlay').css('opacity', '0.5');
  	$(this).children('.portfolio_hidden').css('top', '-50px');
});