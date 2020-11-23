$(document).ready(function() {

    // first example
    $("#navigation").treeview({
        persist: "location",
        collapsed: true,
        unique: true
    });

    // second example
    $("#browser").treeview();
    $("#add").click(function() {
        var branches = $("<li><span class='folder'>New Sublist</span><ul>" +
			"<li><span class='file'>Item1</span></li>" +
			"<li><span class='file'>Item2</span></li></ul></li>").appendTo("#browser");
        $("#browser").treeview({
            add: branches
        });
        branches = $("<li class='closed'><span class='folder'>New Sublist</span><ul><li><span class='file'>Item1</span></li><li><span class='file'>Item2</span></li></ul></li>").prependTo("#folder21");
        $("#browser").treeview({
            add: branches
        });
    });

    $("#browser1").treeview();
    $("#add").click(function() {
        var branches = $("<li><span class='folder'>New Sublist</span><ul>" +
			"<li><span class='file'>Item1</span></li>" +
			"<li><span class='file'>Item2</span></li></ul></li>").appendTo("#browser1");
        $("#browser1").treeview({
            add: branches
        });
        branches = $("<li class='closed'><span class='folder'>New Sublist</span><ul><li><span class='file'>Item1</span></li><li><span class='file'>Item2</span></li></ul></li>").prependTo("#folder21");
        $("#browser1").treeview({
            add: branches
        });
    });

    $("#browser2").treeview();
    $("#add").click(function() {
        var branches = $("<li><span class='folder'>New Sublist</span><ul>" +
			"<li><span class='file'>Item1</span></li>" +
			"<li><span class='file'>Item2</span></li></ul></li>").appendTo("#browser2");
        $("#browser2").treeview({
            add: branches
        });
        branches = $("<li class='closed'><span class='folder'>New Sublist</span><ul><li><span class='file'>Item1</span></li><li><span class='file'>Item2</span></li></ul></li>").prependTo("#folder21");
        $("#browser2").treeview({
            add: branches
        });
    });

    $("#browser3").treeview();
    $("#add").click(function() {
        var branches = $("<li><span class='folder'>New Sublist</span><ul>" +
			"<li><span class='file'>Item1</span></li>" +
			"<li><span class='file'>Item2</span></li></ul></li>").appendTo("#browser3");
        $("#browser3").treeview({
            add: branches
        });
        branches = $("<li class='closed'><span class='folder'>New Sublist</span><ul><li><span class='file'>Item1</span></li><li><span class='file'>Item2</span></li></ul></li>").prependTo("#folder21");
        $("#browser3").treeview({
            add: branches
        });
    });

    $("#browser4").treeview();
    $("#add").click(function() {
        var branches = $("<li><span class='folder'>New Sublist</span><ul>" +
			"<li><span class='file'>Item1</span></li>" +
			"<li><span class='file'>Item2</span></li></ul></li>").appendTo("#browser4");
        $("#browser4").treeview({
            add: branches
        });
        branches = $("<li class='closed'><span class='folder'>New Sublist</span><ul><li><span class='file'>Item1</span></li><li><span class='file'>Item2</span></li></ul></li>").prependTo("#folder21");
        $("#browser4").treeview({
            add: branches
        });
    });

    $("#browser5").treeview();
    $("#add").click(function() {
        var branches = $("<li><span class='folder'>New Sublist</span><ul>" +
			"<li><span class='file'>Item1</span></li>" +
			"<li><span class='file'>Item2</span></li></ul></li>").appendTo("#browser5");
        $("#browser5").treeview({
            add: branches
        });
        branches = $("<li class='closed'><span class='folder'>New Sublist</span><ul><li><span class='file'>Item1</span></li><li><span class='file'>Item2</span></li></ul></li>").prependTo("#folder21");
        $("#browser5").treeview({
            add: branches
        });
    });

    // third example
    $("#red").treeview({
        animated: "fast",
        collapsed: true,
        unique: true,
        persist: "cookie",
        toggle: function() {
            window.console && console.log("%o was toggled", this);
        }
    });

    // fourth example
    $("#black, #gray").treeview({
        control: "#treecontrol",
        persist: "cookie",
        cookieId: "treeview-black"
    });

});
//加载目录树（目录中心、媒体、课程）
function load_tree(category, type, tree_div, browser,tagname) {

    function OnSuccess(result) {
        if (result != null) {
            var temp = result;
            document.getElementById(tree_div).innerHTML = '<ul id="' + browser + '" class="treeview-gray"><li class="open" style="text-align: left; vertical-align: text-bottom">' + tagname + '<ul>' + result + '</ul></li></ul>';
            // window.document.getElementById("browser").style.display = "block";
            $("#" + browser).treeview();
            $("#add").click(function() {
                var branches = $("<li><span class='folder'>New Sublist</span><ul>" +
			"<li><span class='file'>Item1</span></li>" +
			"<li><span class='file'>Item2</span></li></ul></li>").appendTo("#" + browser);
                $("#" + browser).treeview({
                    add: branches
                });
                branches = $("<li class='closed'><span class='folder'>New Sublist</span><ul><li><span class='file'>Item1</span></li><li><span class='file'>Item2</span></li></ul></li>").prependTo("#folder21");
                $("#" + browser).treeview({
                    add: branches
                });
            });
        }
    }
    $.ajax({ type: "get", url: "../uc/tree_handler.aspx", dataType: "html", data: "category=" + category + "&type=" + type, success: OnSuccess });
}
//加载目录树（目录中心、媒体、课程）_展开
function load_open_tree(category, type, tree_div, browser, tagname,id,tag) {

    function OnSuccess(result) {
        if (result != null) {
            var temp = result;
            document.getElementById(tree_div).innerHTML = '<ul id="' + browser + '" class="treeview-gray"><li class="open" style="text-align: left; vertical-align: text-bottom">' + tagname + '<ul>' + result + '</ul></li></ul>';
            // window.document.getElementById("browser").style.display = "block";
            $("#" + browser).treeview();
            $("#add").click(function() {
                var branches = $("<li><span class='folder'>New Sublist</span><ul>" +
			"<li><span class='file'>Item1</span></li>" +
			"<li><span class='file'>Item2</span></li></ul></li>").appendTo("#" + browser);
                $("#" + browser).treeview({
                    add: branches
                });
                branches = $("<li class='closed'><span class='folder'>New Sublist</span><ul><li><span class='file'>Item1</span></li><li><span class='file'>Item2</span></li></ul></li>").prependTo("#folder21");
                $("#" + browser).treeview({
                    add: branches
                });
            });
        }
    }
    $.ajax({ type: "get", url: "../uc/tree_handler.aspx", dataType: "html", data: "category=" + category + "&type=" + type+"&id="+id+"&tag="+tag, success: OnSuccess });
}
//加载专题树
function load_special_tree(type,specialid,itemid, tree_div, browser, tagname) {

    function OnSuccess(result) {
        if (result != null) {
            var temp = result;
            document.getElementById(tree_div).innerHTML = '<ul id="' + browser + '" class="treeview-gray"><li class="open" style="text-align: left; vertical-align: text-bottom">' + tagname + '<ul>' + result + '</ul></li></ul>';
            // window.document.getElementById("browser").style.display = "block";
            $("#" + browser).treeview();
            $("#add").click(function() {
                var branches = $("<li><span class='folder'>New Sublist</span><ul>" +
			"<li><span class='file'>Item1</span></li>" +
			"<li><span class='file'>Item2</span></li></ul></li>").appendTo("#" + browser);
                $("#" + browser).treeview({
                    add: branches
                });
                branches = $("<li class='closed'><span class='folder'>New Sublist</span><ul><li><span class='file'>Item1</span></li><li><span class='file'>Item2</span></li></ul></li>").prependTo("#folder21");
                $("#" + browser).treeview({
                    add: branches
                });
            });
        }
    }
    $.ajax({ type: "get", url: "../uc/tree_special_handler.aspx", dataType: "html", data: "specialid=" + specialid + "&type=" + type + "&itemId=" + itemid, success: OnSuccess });
}