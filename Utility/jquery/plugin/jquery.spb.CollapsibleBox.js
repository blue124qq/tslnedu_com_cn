/*
* Version: Beta 2
* Release: 2010-5-29
*/
(function($) {
    var settings;
    $.fn.collapsibleBox = function(callerSettings) {
        settings = $.extend({
            autoOpen: false,
            target: "div.tn-collapsible-header",
            switchPosition: "left"
        }, callerSettings || {});
        return this.each(
			function() {
			    var $this = $(this);
			    if (settings.switchPosition == "right" || $this.is(".tn-widget"))
			        $this.children(".tn-collapsible-header").addClass("tn-switch-right");
			    else if (settings.switchPosition == "left")
			        $this.children(".tn-collapsible-header").addClass("tn-switch-left");
			    if ($this.find(".tn-switch").length <= 0)
			        $this.children(".tn-collapsible-header").append("<span class=\"tn-icon tn-switch\"></span>");
			    if ($this.find(settings.target).is("div.tn-collapsible-header"))
			        $this.children(".tn-collapsible-header").css("cursor", "pointer");
			    function openBox() {
			        $this.removeClass('tn-collapsible-closed').addClass("tn-collapsible-opened");
			        $this.children(".tn-collapsible-header").find('.tn-icon').removeClass('tn-icon-collapse-open').addClass('tn-icon-collapse-close');
			        $this.children(".tn-collapsible-content").show();
			    }
			    function closeBox() {
			        $this.removeClass('tn-collapsible-opened').addClass("tn-collapsible-closed");
			        $this.children(".tn-collapsible-header").find('.tn-icon').removeClass('tn-icon-collapse-close').addClass('tn-icon-collapse-open');
			        $this.children(".tn-collapsible-content").hide();
			    }
			    //实现切换效果
			    if ($(this).is('.tn-collapsible-closed') || settings.autoOpen)
			        closeBox();
			    else
			        openBox();
			    $this.find(settings.target).click(function() {
			        if ($this.is('.tn-collapsible-closed')) {
			            openBox();
			        }
			        else {
			            closeBox();
			        }
			    });
			}
		);
    };
})(jQuery);