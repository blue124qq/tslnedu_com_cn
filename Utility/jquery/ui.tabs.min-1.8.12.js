/*
* jQuery UI Tabs 1.8.12
*
* Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI/Tabs
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*/
(function(d, p) {
    function u() { return ++v } function w() { return ++x } var v = 0, x = 0; d.widget("ui.tabs", { options: { add: null, ajaxOptions: null, cache: false, cookie: null, collapsible: false, disable: null, disabled: [], enable: null, event: "click", fx: null, idPrefix: "ui-tabs-", load: null, panelTemplate: "<div></div>", remove: null, select: null, show: null, spinner: "<em>Loading&#8230;</em>", tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>" }, _create: function() { this._tabify(true) }, _setOption: function(b, e) {
        if (b == "selected") this.options.collapsible &&
e == this.options.selected || this.select(e); else { this.options[b] = e; this._tabify() } 
    }, _tabId: function(b) { return b.title && b.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + u() }, _sanitizeSelector: function(b) { return b.replace(/:/g, "\\:") }, _cookie: function() { var b = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + w()); return d.cookie.apply(null, [b].concat(d.makeArray(arguments))) }, _ui: function(b, e) { return { tab: b, panel: e, index: this.anchors.index(b)} }, _cleanup: function() {
        this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
            var b =
d(this); b.html(b.data("label.tabs")).removeData("label.tabs")
        })
    }, _tabify: function(b) {
        function e(g, f) { g.css("display", ""); !d.support.opacity && f.opacity && g[0].style.removeAttribute("filter") } var a = this, c = this.options, h = /^#.+/; this.list = this.element.find("ol,ul").eq(0); this.lis = d(" > li:has(a[href])", this.list); this.anchors = this.lis.map(function() { return d("a", this)[0] }); this.panels = d([]); this.anchors.each(function(g, f) {
            var i = d(f).attr("href"), l = i.split("#")[0], q; if (l && (l === location.toString().split("#")[0] ||
(q = d("base")[0]) && l === q.href)) { i = f.hash; f.href = i } if (h.test(i)) a.panels = a.panels.add(a.element.find(a._sanitizeSelector(i))); else if (i && i !== "#") { d.data(f, "href.tabs", i); d.data(f, "load.tabs", i.replace(/#.*$/, "")); i = a._tabId(f); f.href = "#" + i; f = a.element.find("#" + i); if (!f.length) { f = d(c.panelTemplate).attr("id", i).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(a.panels[g - 1] || a.list); f.data("destroy.tabs", true) } a.panels = a.panels.add(f) } else c.disabled.push(g)
        }); if (b) {
            this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
            this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"); this.lis.addClass("ui-state-default ui-corner-top"); this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"); if (c.selected === p) {
                location.hash && this.anchors.each(function(g, f) { if (f.hash == location.hash) { c.selected = g; return false } }); if (typeof c.selected !== "number" && c.cookie) c.selected = parseInt(a._cookie(), 10); if (typeof c.selected !== "number" && this.lis.filter(".ui-tabs-selected").length) c.selected =
this.lis.index(this.lis.filter(".ui-tabs-selected")); c.selected = c.selected || (this.lis.length ? 0 : -1)
            } else if (c.selected === null) c.selected = -1; c.selected = c.selected >= 0 && this.anchors[c.selected] || c.selected < 0 ? c.selected : 0; c.disabled = d.unique(c.disabled.concat(d.map(this.lis.filter(".ui-state-disabled"), function(g) { return a.lis.index(g) }))).sort(); d.inArray(c.selected, c.disabled) != -1 && c.disabled.splice(d.inArray(c.selected, c.disabled), 1); this.panels.addClass("ui-tabs-hide"); this.lis.removeClass("ui-tabs-selected ui-state-active");
            if (c.selected >= 0 && this.anchors.length) { a.element.find(a._sanitizeSelector(a.anchors[c.selected].hash)).removeClass("ui-tabs-hide"); this.lis.eq(c.selected).addClass("ui-tabs-selected ui-state-active"); a.element.queue("tabs", function() { a._trigger("show", null, a._ui(a.anchors[c.selected], a.element.find(a._sanitizeSelector(a.anchors[c.selected].hash))[0])) }); this.load(c.selected) } d(window).bind("unload", function() { a.lis.add(a.anchors).unbind(".tabs"); a.lis = a.anchors = a.panels = null })
        } else c.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
        this.element[c.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible"); c.cookie && this._cookie(c.selected, c.cookie); b = 0; for (var j; j = this.lis[b]; b++) d(j)[d.inArray(b, c.disabled) != -1 && !d(j).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled"); c.cache === false && this.anchors.removeData("cache.tabs"); this.lis.add(this.anchors).unbind(".tabs"); if (c.event !== "mouseover") {
            var k = function(g, f) { f.is(":not(.ui-state-disabled)") && f.addClass("ui-state-" + g) }, n = function(g, f) {
                f.removeClass("ui-state-" +
g)
            }; this.lis.bind("mouseover.tabs", function() { k("hover", d(this)) }); this.lis.bind("mouseout.tabs", function() { n("hover", d(this)) }); this.anchors.bind("focus.tabs", function() { k("focus", d(this).closest("li")) }); this.anchors.bind("blur.tabs", function() { n("focus", d(this).closest("li")) })
        } var m, o; if (c.fx) if (d.isArray(c.fx)) { m = c.fx[0]; o = c.fx[1] } else m = o = c.fx; var r = o ? function(g, f) {
            d(g).closest("li").addClass("ui-tabs-selected ui-state-active"); f.hide().removeClass("ui-tabs-hide").animate(o, o.duration || "normal",
function() { e(f, o); a._trigger("show", null, a._ui(g, f[0])) })
        } : function(g, f) { d(g).closest("li").addClass("ui-tabs-selected ui-state-active"); f.removeClass("ui-tabs-hide"); a._trigger("show", null, a._ui(g, f[0])) }, s = m ? function(g, f) { f.animate(m, m.duration || "normal", function() { a.lis.removeClass("ui-tabs-selected ui-state-active"); f.addClass("ui-tabs-hide"); e(f, m); a.element.dequeue("tabs") }) } : function(g, f) { a.lis.removeClass("ui-tabs-selected ui-state-active"); f.addClass("ui-tabs-hide"); a.element.dequeue("tabs") };
        this.anchors.bind(c.event + ".tabs", function() {
            var g = this, f = d(g).closest("li"), i = a.panels.filter(":not(.ui-tabs-hide)"), l = a.element.find(a._sanitizeSelector(g.hash)); if (f.hasClass("ui-tabs-selected") && !c.collapsible || f.hasClass("ui-state-disabled") || f.hasClass("ui-state-processing") || a.panels.filter(":animated").length || a._trigger("select", null, a._ui(this, l[0])) === false) { this.blur(); return false } c.selected = a.anchors.index(this); a.abort(); if (c.collapsible) if (f.hasClass("ui-tabs-selected")) {
                c.selected =
-1; c.cookie && a._cookie(c.selected, c.cookie); a.element.queue("tabs", function() { s(g, i) }).dequeue("tabs"); this.blur(); return false
            } else if (!i.length) { c.cookie && a._cookie(c.selected, c.cookie); a.element.queue("tabs", function() { r(g, l) }); a.load(a.anchors.index(this)); this.blur(); return false } c.cookie && a._cookie(c.selected, c.cookie); if (l.length) { i.length && a.element.queue("tabs", function() { s(g, i) }); a.element.queue("tabs", function() { r(g, l) }); a.load(a.anchors.index(this)) } else throw "jQuery UI Tabs: Mismatching fragment identifier.";
            d.browser.msie && this.blur()
        }); this.anchors.bind("click.tabs", function() { return false })
    }, _getIndex: function(b) { if (typeof b == "string") b = this.anchors.index(this.anchors.filter("[href$=" + b + "]")); return b }, destroy: function() {
        var b = this.options; this.abort(); this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"); this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"); this.anchors.each(function() {
            var e =
d.data(this, "href.tabs"); if (e) this.href = e; var a = d(this).unbind(".tabs"); d.each(["href", "load", "cache"], function(c, h) { a.removeData(h + ".tabs") })
        }); this.lis.unbind(".tabs").add(this.panels).each(function() { d.data(this, "destroy.tabs") ? d(this).remove() : d(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide") }); b.cookie && this._cookie(null, b.cookie); return this
    }, add: function(b,
e, a) {
        if (a === p) a = this.anchors.length; var c = this, h = this.options; e = d(h.tabTemplate.replace(/#\{href\}/g, b).replace(/#\{label\}/g, e)); b = !b.indexOf("#") ? b.replace("#", "") : this._tabId(d("a", e)[0]); e.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true); var j = c.element.find("#" + b); j.length || (j = d(h.panelTemplate).attr("id", b).data("destroy.tabs", true)); j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"); if (a >= this.lis.length) { e.appendTo(this.list); j.appendTo(this.list[0].parentNode) } else {
            e.insertBefore(this.lis[a]);
            j.insertBefore(this.panels[a])
        } h.disabled = d.map(h.disabled, function(k) { return k >= a ? ++k : k }); this._tabify(); if (this.anchors.length == 1) { h.selected = 0; e.addClass("ui-tabs-selected ui-state-active"); j.removeClass("ui-tabs-hide"); this.element.queue("tabs", function() { c._trigger("show", null, c._ui(c.anchors[0], c.panels[0])) }); this.load(0) } this._trigger("add", null, this._ui(this.anchors[a], this.panels[a])); return this
    }, remove: function(b) {
        b = this._getIndex(b); var e = this.options, a = this.lis.eq(b).remove(), c = this.panels.eq(b).remove();
        if (a.hasClass("ui-tabs-selected") && this.anchors.length > 1) this.select(b + (b + 1 < this.anchors.length ? 1 : -1)); e.disabled = d.map(d.grep(e.disabled, function(h) { return h != b }), function(h) { return h >= b ? --h : h }); this._tabify(); this._trigger("remove", null, this._ui(a.find("a")[0], c[0])); return this
    }, enable: function(b) {
        b = this._getIndex(b); var e = this.options; if (d.inArray(b, e.disabled) != -1) {
            this.lis.eq(b).removeClass("ui-state-disabled"); e.disabled = d.grep(e.disabled, function(a) { return a != b }); this._trigger("enable", null,
this._ui(this.anchors[b], this.panels[b])); return this
        } 
    }, disable: function(b) { b = this._getIndex(b); var e = this.options; if (b != e.selected) { this.lis.eq(b).addClass("ui-state-disabled"); e.disabled.push(b); e.disabled.sort(); this._trigger("disable", null, this._ui(this.anchors[b], this.panels[b])) } return this }, select: function(b) { b = this._getIndex(b); if (b == -1) if (this.options.collapsible && this.options.selected != -1) b = this.options.selected; else return this; this.anchors.eq(b).trigger(this.options.event + ".tabs"); return this },
        load: function(b) {
            b = this._getIndex(b); var e = this, a = this.options, c = this.anchors.eq(b)[0], h = d.data(c, "load.tabs"); this.abort(); if (!h || this.element.queue("tabs").length !== 0 && d.data(c, "cache.tabs")) this.element.dequeue("tabs"); else {
                this.lis.eq(b).addClass("ui-state-processing"); if (a.spinner) { var j = d("span", c); j.data("label.tabs", j.html()).html(a.spinner) } this.xhr = d.ajax(d.extend({}, a.ajaxOptions, { url: h, success: function(k, n) {
                    e.element.find(e._sanitizeSelector(c.hash)).html(k); e._cleanup(); a.cache && d.data(c,
"cache.tabs", true); e._trigger("load", null, e._ui(e.anchors[b], e.panels[b])); try { a.ajaxOptions.success(k, n) } catch (m) { } 
                }, error: function(k, n) { e._cleanup(); e._trigger("load", null, e._ui(e.anchors[b], e.panels[b])); try { a.ajaxOptions.error(k, n, b, c) } catch (m) { } } 
                })); e.element.dequeue("tabs"); return this
            } 
        }, abort: function() { this.element.queue([]); this.panels.stop(false, true); this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2)); if (this.xhr) { this.xhr.abort(); delete this.xhr } this._cleanup(); return this },
        url: function(b, e) { this.anchors.eq(b).removeData("cache.tabs").data("load.tabs", e); return this }, length: function() { return this.anchors.length } 
    }); d.extend(d.ui.tabs, { version: "1.8.12" }); d.extend(d.ui.tabs.prototype, { rotation: null, rotate: function(b, e) {
        var a = this, c = this.options, h = a._rotate || (a._rotate = function(j) { clearTimeout(a.rotation); a.rotation = setTimeout(function() { var k = c.selected; a.select(++k < a.anchors.length ? k : 0) }, b); j && j.stopPropagation() }); e = a._unrotate || (a._unrotate = !e ? function(j) {
            j.clientX &&
a.rotate(null)
        } : function() { t = c.selected; h() }); if (b) { this.element.bind("tabsshow", h); this.anchors.bind(c.event + ".tabs", e); h() } else { clearTimeout(a.rotation); this.element.unbind("tabsshow", h); this.anchors.unbind(c.event + ".tabs", e); delete this._rotate; delete this._unrotate } return this
    } 
    })
})(jQuery);
