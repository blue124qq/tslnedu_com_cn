

var date = new Date();
var times = date.getDate() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();
var thisCodeSrc = "thisCode";
function changeSrc() {

    var img = document.getElementById("thisCode");
    img.src += Math.random();

}
function getLoginString() {
    var obj = document.getElementById("thisCode");
    var news = "";
    news += ' 用户名：<input type="text" name="arrcity" id="arrcity" class="input01"  /> &nbsp;';
    news += '密码：<input name="ctl03_txtAccountPassword" id="ctl03_txtAccountPassword" type="password" type="text" class="input01" />&nbsp;';
    news += '验证码： <input name="verifycode" id="verifycode" style="width: 36px" type="text" onfocus="changeSrc();" />';
    var numkey = Math.random();
    numkey = Math.round(numkey * 10000);
    news += '<img src=\"/comm/Image.aspx?k=' + numkey + '&random=' + RndNum(4) + '&code=' + times + '\" width=\"70\" id=\"thisCode\" onClick=\"this.src+=Math.random()\" alt=\"图片看不清？点击重新得到验证码\" style=\"cursor:pointer;\" height=\"15\" hspace=\"4\">';
    news += '<a href="javascript:void(0)" onclick=\"checkuserlogin();\">【登录】</a><a href="/site/register.html">【注册】</a><a href=\"/site/forget.html\">【忘记密码】</a>';
    return news;
}



function getInitString() {
    document.getElementById("login_top_bg").innerHTML = "<span>加载中...</span>";
    var numkey = Math.random();
    numkey = Math.round(numkey * 10000);
    function OnSuccess(result) {
        if (result != null) {
            var returnvaluearr = result.split('$$$');
            if (returnvaluearr[0] == "ERR") { $("#login_top_bg").html(getLoginString()); document.getElementById(thisCodeSrc).src='/comm/Image.aspx?k=' + numkey + '&random=' + RndNum(4) + '&code=' + times; } else { $("#login_top_bg").html(returnvaluearr[1]); }
        }
    }
    $.ajax({ type: "get", url: "/user/UserLoginajax.aspx", dataType: "html", data: "varcode=" + times + "&action=checkuser", success: OnSuccess });
}

function goLearnUrl(rebackEurl) {
    var uname = $.trim($("#learning_uid").val());
    var upwd = $.trim($("#learning_pwd").val());
    loginLearning(uname, upwd);
    sleep(500);
    window.location = rebackEurl;
}

function checkuserlogin() {
    if ($.trim($("#arrcity").val()) == "") {
        alert("用户名不能为空");
        return false;
    }
    if ($.trim($("#ctl03_txtAccountPassword").val()) == "") {
        alert("密码不能为空");
        return false;
    }
    if ($.trim($("#verifycode").val()) == "") {
        alert("验证码不能为空");
        return false;
    }
    var uname = $.trim($("#arrcity").val());
    var upwd = $.trim($("#ctl03_txtAccountPassword").val());
    var paramsurl = "action=Login&verify=" + $.trim($("#verifycode").val()) + "&varcode=" + times + "&username=" + $.trim($("#arrcity").val()) + "&password=" + $.trim($("#ctl03_txtAccountPassword").val());
    $("#login_top_bg").html('<span>正在登陆，请稍候...</span>');
    function OnSuccess(result) {
        var returnvaluearr = result.split('$$$');
        if (returnvaluearr[0] == "ERR") {
            $("#login_top_bg").html(returnvaluearr[1]);
        }
        else {
           $("#login_top_bg").html(returnvaluearr[1]);           
            loginSpace(uname, upwd);
            loginLearning(uname, upwd);
            loginNerc('u_' + uname + Predix, upwd);
        }
    }
    $.ajax({ type: "get", url: "/user/UserLoginajax.aspx", dataType: "html", data: paramsurl, success:
OnSuccess
    });
}


function checkloginurl() {
    if ($.trim($("#arrcity").val()) == "") {
        alert("用户名不能为空");
        return false;
    }
    if ($.trim($("#ctl03_txtAccountPassword").val()) == "") {
        alert("密码不能为空");
        return false;
    }
    if ($.trim($("#verifycode").val()) == "") {
        alert("验证码不能为空");
        return false;
    }
    var uname = $.trim($("#arrcity").val());
    var upwd = $.trim($("#ctl03_txtAccountPassword").val());
    var paramsurl = "action=Login&verify=" + $.trim($("#verifycode").val()) + "&varcode=" + times + "&username=" + $.trim($("#arrcity").val()) + "&password=" + $.trim($("#ctl03_txtAccountPassword").val());
    $("#login_top_bg").html('<span>正在登陆，请稍候...</span>');
    function OnSuccess(result) {
        var returnvaluearr = result.split('$$$');
        if (returnvaluearr[0] == "ERR") {
            $("#login_top_bg").html(returnvaluearr[1]);
        }
        else {
            loginSpace(uname, upwd);
            loginLearning(uname, upwd);
            loginNerc('u_' + uname + Predix, upwd);
            window.location = $("#rebackurl").val();
        }
    }
    $.ajax({ type: "get", url: "/user/UserLoginajax.aspx", dataType: "html", data: paramsurl, success:
OnSuccess
    });
}

function RndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
    return rnd;
}
function loginout(username) {
    function OnSuccess(result) {
        $("#login_top_bg").html(getLoginString());
    }
    $.ajax({ type: "get", url: "/user/UserLoginajax.aspx", dataType: "html", data: "action=LoginOut&varcode=" + times, success:
OnSuccess
    });
    loginOutElearning();
    loginOutSpace();
    loginOutNerc();
    sleep(500);
}

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}
function loginLearning(username, userpwd) {
    var tbody = "";
    $.getJSON(learning + "/auth.aspx?action=login&username=" + username + "&password=" + userpwd + "&callback=?",
                    function(json) {
                        var tglist = json.tglist;
                        $.each(tglist, function(i, n) {
                            tbody = n.CallBackMessageFromOtherWeb;
                        });
                    }
                );
    sleep(500);
}
function loginSpace(username, userpwd) {
    var url = space + "/User/MutiSiteLoginInAction.aspx?LoginUserName=" + username + "&LoginPassword=" + userpwd + "&AutoLogin=false&callback=?";
    $.getJSON(url,
                    function(json) {
                        var messtype = json.messagetype;
                        var message = json.message;

                    }
                );
    sleep(500);
}
function RegisterBbs(username, userpwd, email, tbody) {
    var tbody = "";
    $.getJSON(bbs + "/service/mutify_site_service.ashx?id=2&datatype=RegisterUser&username=" + username + "&password=" + userpwd + "&email=" + email + "&tbody=" + tbody + "&jsoncallback=?",
                    function(json) {
                        var tglist = json.tglist;
                        $.each(tglist, function(i, n) {
                            tbody = n.CallBackMessageFromOtherWeb;
                        });
                    }
                );
}
function loginNerc(username, userpwd) {
    var tbody = "";
    $.getJSON(nerc + "/IDataService/nerc_login_service.aspx?actiontype=login&username=" + username + "&password=" + userpwd + "&jsoncallback=?",
                    function(json) {
                        var tglist = json.tglist;
                        $.each(tglist, function(i, n) {
                            tbody = n.CallBackMessageFromOtherWeb;
                        });
                    }
                );
    sleep(500);
}
function loginOutNerc() {
    var tbody = "";
    $.getJSON(nerc + "/IDataService/nerc_login_service.aspx?actiontype=loginout&jsoncallback=?",
                    function(json) {

                    }
                );
}
function RegisterNerc(username, userpwd, email, tbody) {
    var tbody = "";
    $.getJSON(nerc + "/IDataService/nerc_login_service.aspx?actiontype=register&username=" + username + "&password=" + userpwd + "&email=" + email + "&tbody=" + tbody + "&jsoncallback=?",
                    function(json) {
                        var tglist = json.tglist;
                        $.each(tglist, function(i, n) {
                            tbody = n.CallBackMessageFromOtherWeb;
                        });
                    }
                );
    sleep(500);
}

function loginOutElearning() {
    var tbody = "";
    $.getJSON(learning + "/auth.aspx?callback=?",
                    function(json) {
                    }
                );
}

function loginOutSpace() {
    var tbody = "";
    $.getJSON(space + "/User/MutiSiteLogout.aspx?callback=?",
                    function(json) {
                    }
                );
}
function redirectLearnUrl(courseid) {
    var uname = $.trim($("#learning_uid").val());
    var upwd = $.trim($("#learning_pwd").val());
    function OnSuccess(result) {
        if (result != null) {
            var returnvaluearr = result.split('$$$');
            if (returnvaluearr[0] == "ERR") { alert('您尚未登录，请先登录！'); document.getElementById("arrcity").focus(); } else {
                loginLearning(uname, upwd);
                window.location = learning + "/CommunityHandler.aspx?courseid=" + courseid;
            }
        }
    }
    $.ajax({ type: "get", url: "/user/UserLoginajax.aspx", dataType: "html", data: "varcode=" + times + "&action=checkuser", success: OnSuccess });
}