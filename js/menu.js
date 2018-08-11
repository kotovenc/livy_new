$(window).scroll(function () {
    var offset = $(document).scrollTop()
    var opacity = 0;
    if (offset <= 0) {
        opacity = 0;
    } else if (offset > 0 & offset <= 200) {
        opacity = (offset - 1) / 200;
    }
    else if (offset > $(document).height() - $(window).height() - 64){
        opacity = 0;
    }
    else {
        opacity = 1;
    }
    $('.header_bg').css('opacity', opacity);
    $('.logobg').css('opacity', opacity);
});

let every_second_click = 0;
$('.menu-icon').click(function(){
    $(".menu-hidden").fadeIn("slow");
    if (every_second_click != 2) {
        every_second_click = 1;
    }
});

$(document).click(function(){
    if (every_second_click == 2) {
        $(".menu-hidden").fadeOut("slow");
        every_second_click = 0;
    }
    if (every_second_click == 1) {
        every_second_click++;
    }
});