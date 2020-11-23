$(document).ready(function() {
    var duilian = $("div.duilian");
    var duilian_close = $("a.duilian_close");

    var window_w = $(window).width();
    if (window_w > 500) { duilian.show(); }
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        duilian.stop().animate({ top: scrollTop + 260 });
    });
    duilian_close.click(function() {
        $(this).parent().hide();
        return false;
    });


});
