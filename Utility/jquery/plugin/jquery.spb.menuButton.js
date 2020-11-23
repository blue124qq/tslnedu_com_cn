/*
* Version: Beta 2
* Release: 2010-7-31
*/


(function($) {
    var allUIMenus = [];
    function bindEvent(element) {
        var options = $.data(element, "menuButton").options;
        var $this = $(element);
        var ismouseEnterMenu = false;
        if (options.buttonHoverClass)
            $this.removeClass(options.buttonHoverClass);
        var buttonTime = null;
        if (options.disabled == false && options.menu) {
            if (options.clickTrigger) {
                $this.bind("click", function() {
                    killAllUIMenus();
                    if ($(options.menu).is(":hidden"))
                        showmenu();
                    return false;
                });
            }
            else {
                $this.bind("mouseenter", function() {
                    setTimeout(function() {
                        killAllUIMenus();
                        showmenu();
                    }, options.duration);
                    return false;
                }).bind("mouseleave", function() {
                    buttonTime = setTimeout(function() {
                        killAllUIMenus();
                    }, options.duration);
                });
            }
        }
        function showmenu() {
	    $(options.menu).detach().appendTo(document.body);
            var left = $this.offset().left;
            if (left + $(options.menu).outerWidth() + 5 > $(window).width()) {
                left = $(window).width() - $(options.menu).outerWidth() - 5;
            }
            $(options.menu).css({ left: left, top: $this.offset().top + $this.outerHeight() }).show();
            if (options.buttonHoverClass)
                $this.addClass(options.buttonHoverClass);
            menuBlur();
            $this.blur();
        };
        function killAllUIMenus() {
            $(allUIMenus).each(function(i) {
                if ($(allUIMenus[i]).length) { $(allUIMenus[i]).hide(); };
            });
            if (options.buttonHoverClass)
                $this.removeClass(options.buttonHoverClass);
        }
        function menuBlur() {
            if (options.clickTrigger) {
                $(document).bind("click", function(e) {
                    if (options.notTriggerClose && $(e.target).is(options.notTriggerClose)) {
                        return;
                    }
                    $(document).unbind("click", arguments.callee);
                    killAllUIMenus();
                });
                $(options.menu).find("a").click(function() {
                    var url = $(this).attr("href");
                    if (url) {
                        location.href = url;
                    }
                });
            }
            else {
                var t = null;
                $(options.menu).bind("mouseenter", function() {
                    if (t) {
                        clearTimeout(t);
                        t = null;
                    }
                    if (buttonTime) {
                        clearTimeout(buttonTime);
                        buttonTime = null;
                    }
                }).bind("mouseleave", function() {
                    t = setTimeout(function() {
                        killAllUIMenus();
                    }, options.duration);
                });
            }
        }
    };

    $.fn.menuButton = function(options) {
        options = options || {};
        return this.each(function() {
            var menuButton = $.data(this, "menuButton");
            if (menuButton) {
                $.extend(menuButton.options, options);
            } else {
                var t = $(this);
                $.data(this, "menuButton", { options: $.extend({}, $.fn.menuButton.defaults, { disabled: (t.attr("disabled") ? t.attr("disabled") == "true" : undefined), menu: t.attr("menu"), duration: t.attr("duration") }, options) });
                $(this).removeAttr("disabled");
                allUIMenus.push(options.menu ? options.menu : t.attr("menu"));
                //$(this).parent().append("<span class=\"tn-icon tn-icon-triangle-down\">&nbsp;</span>");
            }
            bindEvent(this);
        });
    };
    $.fn.menuButton.defaults = { disabled: false, buttonHoverClass: "tn-button-default-hover", clickTrigger: false, notTriggerClose: null, menu: null, duration: 100 };
})(jQuery);