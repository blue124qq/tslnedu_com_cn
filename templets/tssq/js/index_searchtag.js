$().ready(function() {
    initTagData();
    InitIndexData();
    initLearnGroup();
});

function initTagData() {
    var tbody = "";
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/manage/read/sys_data_service.ashx', //目标地址
        data: "action=indexTag&lenth=10",
        beforeSend: function() { }, //发送数据之前
        complete: function() { }, //接收数据完毕
        success: function(json) {
            tbody = json.count;
            document.getElementById("searchTag").innerHTML = tbody;
        }
    });
}
function initLearnGroup() {
    var tbody = "";
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "jsonp", //数据格式:JSON
        url: space + '/Event.aspx/Control_ListOrSummaryEventsForCMS', //目标地址
        data: "callback=?",
        beforeSend: function() { document.getElementById("LearnUlData").innerHTML = "加载中..."; }, //发送数据之前
        complete: function() { }, //接收数据完毕
        success: function(json) {
            //将查询到的记录赋值给隐藏控件
            var a = 1;
            var productData = json.commdata;
            tbody = "";
            $.each(productData, function(i, n) {
                var trs = "<li><div class=\"picText\">";
                trs += "<div class=\"imag\"><a href=\"" + space + n.lingUrl + "\" target=\"_blank\"><img src=\"" + space + n.uImg + "\" width=\"60\" height=\"60\" alt=\"" + n.uName + "\" /></a></div>";
                trs += "<div class=\"text\">";
                trs += "<h3><a href=\"" + space + n.lingUrl + "\" target=\"_blank\">" + n.uName + "</a></h3>";
                trs += "<p class=\"t1\"> " + n.uCredits + "</p><p>" + n.displayName + "</p></div></div></li>";
                tbody += trs;
            });
            document.getElementById("LearnUlData").innerHTML = tbody;
        }
    });

}

function InitIndexData() {

    var tbody = "";
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/manage/read/sys_data_service.ashx', //目标地址
        data: "action=indexCourse",
        beforeSend: function() { tbody = "加载中..."; }, //发送数据之前
        complete: function() { }, //接收数据完毕
        success: function(json) {
            var productData = json.CommQuestionOptionInfo;
            tbody = "";
            $.each(productData, function(i, n) {
            var trs = " <li><img src=\"" + n.CourseImage + "\" style=\"cursor:hand\" width=\"128\" height=\"101\" onclick=\"checkcourselogin('" + n.UseLimit + "','" + n.Id + "')\" />";
            trs += "<span class=\"name\"><a href=\"javascript:void(0);\"  onclick=\"checkcourselogin('" + n.UseLimit + "','" + n.Id + "')\" title=\"" + n.CourseName + "\">" + chinaSubstr(10, n.CourseName) + "</a></span><span>&nbsp;&nbsp</span></li>";
			
			/* 首页课程调整前原备份
			
			function InitIndexData() {

    var tbody = "";
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/manage/read/sys_data_service.ashx', //目标地址
        data: "action=indexCourse",
        beforeSend: function() { tbody = "加载中..."; }, //发送数据之前
        complete: function() { }, //接收数据完毕
        success: function(json) {
            var productData = json.CommQuestionOptionInfo;
            tbody = "";
            $.each(productData, function(i, n) {
            var trs = " <li><img src=\"" + n.CourseImage + "\" style=\"cursor:hand\" width=\"123\" height=\"91\" onclick=\"checkcourselogin('" + n.UseLimit + "','" + n.Id + "')\" />";
            trs += "<span class=\"name\"><a href=\"javascript:void(0);\"  onclick=\"checkcourselogin('" + n.UseLimit + "','" + n.Id + "')\" title=\"" + n.CourseName + "\">" + chinaSubstr(10, n.CourseName) + "</a></span><span class=\"djl\">浏览量：<em>" + n.Hits + "</em></span></li>";
			
			*/
			

          //  var trs = " <li><a href=\"" + space + "/Learning.aspx?c=" + n.Id + "\" onclick=\"return true;\" id=\"AID"+n.Id+"\" target=\"_blank\"><a href=\"javascript:void(0);\"   onclick=\" checkcourselogin('" + n.UseLimit + "','" + n.Id + "',this)\" title=\"" + n.CourseName + "\" ><img src=\"" + n.CourseImage + "\" style=\"cursor:hand\" width=\"123\" height=\"91\" border=\"0\" /></a>";
         //   trs += "<span class=\"name\"><a href=\"javascript:void(0);\"  onclick=\" checkcourselogin('" + n.UseLimit + "','" + n.Id + "')\" title=\"" + n.CourseName + "\" >" + chinaSubstr(10, n.CourseName) + "</a></span><span class=\"djl\">浏览量：<em>" + n.Hits + "</em></span></li>";
                tbody += trs;
            });
            document.getElementById("indexcourse").innerHTML = tbody;
        }
    }); 
}
function chinaSubstr(lenth, sValue) {              // 声明变量。
    var s = sValue.substr(0, lenth); // 获取子字符串。
    return s;               // 返回 "Spain"。
}



function checkcourselogin(islimit, courseid) {
//    var space = "http://10.191.196.212:8033";
//    alert(space);
    if (islimit == "0") {
        function OnSuccess(result) {
            if (result != null) {
                var returnvaluearr = result.split('$$$');
                if (returnvaluearr[0] == "ERR") {
                    alert('您尚未登录，请先登录！');
                    document.getElementById("arrcity").focus();
                    return false;
                } else {
               // document.getElementById("AID" + courseid).click();
                //obj.href = space + "/Learning.aspx?c=" + courseid;
                //obj.click();
               // return true;
                    window.location = space + "/Learning.aspx?c=" + courseid;
                }
            }
        }
        $.ajax({ type: "get", url: "/user/UserLoginajax.aspx", dataType: "html", data: "action=checkprojcetuser", success: OnSuccess });
    } else {
    //document.getElementById("AID" + courseid).click();
    //return true;
       window.location = space + "/Learning.aspx?c=" + courseid;
    }
}