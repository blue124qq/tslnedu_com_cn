$(function() {
    $.scrollTopBtn();
});
// 基于JQ的返回顶部插件
// 创建一个闭包     
(function($) {
    //插件主要内容
    var defaults = {
        btnId: 'scrollTop', //按钮id
        btnText: '返回顶部', //按钮文字
        toPageRight: 20, //按钮距离页面边缘距离
        pageWidth: 970, //页面内容宽度
        toBottom: 50, //按钮距离底部距离
        hideHeight: 400, //隐藏区域高度
        timeThread: null//用于IE的setTimeout进程
    };
    $.extend({
        scrollTopBtn: function(options) {
            var opts = $.extend({}, defaults, options);
            _insertBtn();
            $(window).scroll(function() {
                _scrollScreenHandle();
            });
            $(window).resize(function() {
                _resizeWindow();
            });

            //插入按钮函数
            function _insertBtn() {
                var topLink = "<a href='javascript:;' title='" + opts.btnText + "' id='" + opts.btnId + "'>" + opts.btnText + "</a>",
			scrollTopPx = document.documentElement.scrollTop;
                $('body').append(topLink);
                var $topBtn = $('#' + opts.btnId);
                $topBtn.click(function() { $('html,body').animate({ scrollTop: 0 }, 800); });
                var rightPx = _getPosition($topBtn);
                if (/MSIE 6/i.test(navigator.userAgent)) {
                    $topBtn.css({
                        'display': 'none',
                        'position': 'absolute',
                        'right': rightPx
                    });
                } else {
                    $topBtn.css({
                        'display': 'none',
                        'position': 'fixed',
                        'right': rightPx,
                        'top': $(window).height() - opts.toBottom
                    });
                }
            }

            //获取定位距离
            function _getPosition(btnObj) {
                var _self = btnObj,
			rightPx = parseInt(($(window).width() - opts.pageWidth) / 2 - _self.outerWidth() - opts.toPageRight, 10);
                if (rightPx < 10) {
                    rightPx = 10;
                }
                return rightPx;
            }

            //滚屏幕事件函数
            function _scrollScreenHandle() {
                var _self = $('#' + opts.btnId);
                if ($(document).scrollTop() <= opts.hideHeight) {
                    clearTimeout(opts.timeThread);
                    _self.hide();
                    return;
                }
                if (/MSIE 6/i.test(navigator.userAgent)) {
                    clearTimeout(opts.timeThread);
                    _self.hide();
                    opts.timeThread = setTimeout(function() {
                        var topPx = $(document).scrollTop() + $(window).height() - opts.toBottom;
                        _self.css({ 'top': topPx }).fadeIn();
                    }, 400);
                } else { _self.fadeIn(); }
            }

            function _resizeWindow() {
                var _self = $('#' + opts.btnId),
			rightPx = _getPosition(_self);
                var topPx = $(window).height() - opts.toBottom;
                if (/MSIE 6/i.test(navigator.userAgent)) {
                    topPx += $(document).scrollTop();
                }
                _self.css({
                    'right': rightPx,
                    'top': topPx
                });
            }

        }
    });
    // 闭包结束     
})(jQuery); 