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