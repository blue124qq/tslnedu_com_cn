$().ready(function() {
    InitCourseData(0);
    $("#pageTheme").change(function() {
        $("#Pagination").attr('class', $(this).val());
    });
});
function pageselectCallback(page_id) {
    InitNewsData(page_id);
}
function pageselectCourseCallback(page_id) {
    InitCourseData(page_id);
}
function InitCourseData(pageindx) {
    var searchkey = document.getElementById("keyword").value;
    if (searchkey == "关键字" || searchkey == "") {
        searchkey = "";
    }
    var tbody = "";
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/manage/read/sys_data_service.ashx', //目标地址
        data: "p=" + (pageindx + 1) + "&action=" + $("#coursetype").val() + "&classid=" + escape($("#classid").val()) + "&key=" + searchkey + "&random=" + RndNum(4),
        beforeSend: function() { $("#divload").show(); $("#Pagination").hide(); }, //发送数据之前
        complete: function() { $("#divload").hide(); }, //接收数据完毕
        success: function(json) {
            //将查询到的记录赋值给隐藏控件
            var count = json.commcount;
            $.each(count, function(i, n) {
                $("#coursecount").val(n.count);
            });
            //设置分页控件值
            SetCoursePager(pageindx);
            //无数据不显示过犹不及
            if ($("#coursecount").val() == 0) {
                tbody += "暂无数据";
                //不显示分页控件
                $("#Pagination").hide();
            } //有数据时加载
            else {
                var productData = json.CommQuestionOptionInfo;
                $.each(productData, function(i, n) {
                    var trs = "";
                    trs += "<li><div class=\"imag\">";
                    trs += "<img  onclick=\"checkcourselogin('" + n.UseLimit + "','" + n.Id + "')\" style=\"cursor:hand\" src=\"" + n.CourseImage + "\" width=\"120\" alert=\"" + n.CourseName + "\" height=\"90\" /></div>";
                    trs += "<div class=\"text\"><h2 class=\"blue01\">";
                    trs += "<span class=\"darkyellow\"><a href=\"javascript:void(0)\" onclick=\"checkcourselogin('" + n.UseLimit + "','" + n.Id + "')\"><u>进入学习</u></a></span><a title=\"" + n.CourseName + "\" <a href=\"javascript:void(0)\" onclick=\"checkcourselogin('" + n.UseLimit + "','" + n.Id + "')\">" + n.CourseName + "</a></h2>";
                    trs += "<p class=\"darkblue\">分类：<b>" + n.CourseClass + "</b> 来源：<b>" + n.CourseTeacher + "</b> 更新时间：<b>" + dateSubstr(n.CreationDate) + "</b> 选课：<b>" + n.countid + "</b> </p>";
                    trs += "<p>简介：" + n.Remark + "</p>    </div></li>";
                    tbody += trs;
                });
                //显示分页控件
                $("#Pagination").show();
            }
            document.getElementById("divCourseContent").innerHTML = tbody;
        }
    });
}
function dateSubstr(sValue) {
    var returnvaluearr = sValue.split(' ');              // 返回 "Spain"。
    return returnvaluearr[0];

}
function setPageContent(control, count) {
    var message = document.getElementById(control).innerHTML;
    document.getElementById(control).innerHTML = message.replace("<span class=\"disabled\">« 上一页</span>", "共计 <font color=red>" + count + "</font> 门 <span class=\"disabled\">« 上一页</span>");
}


function SetCoursePager(pageindx) {
    $("#Pagination").pagination($("#coursecount").val(), {
        callback: pageselectCourseCallback,
        prev_text: '« 上一页',
        next_text: '下一页 »',
        items_per_page: 10,
        num_display_entries: 5,
        current_page: pageindx,
        num_edge_entries: 2
    });
}

function checkcourselogin(islimit, courseid) {
    if (islimit == "0") {
        function OnSuccess(result) {
            if (result != null) {
                var returnvaluearr = result.split('$$$');
                if (returnvaluearr[0] == "ERR") { alert('您尚未登录，请先登录！'); document.getElementById("arrcity").focus(); } else {
                    window.location = space + "/Learning.aspx?c=" + courseid;
                }
            }
        }
        $.ajax({ type: "get", url: "/user/UserLoginajax.aspx", dataType: "html", data: "action=checkprojcetuser", success: OnSuccess });
    } else {
        window.location = space + "/Learning.aspx?c=" + courseid;
    }
}
function InitNewsData(pageindx) {
    var searchkey = document.getElementById("keyword").value;
    if (searchkey == "关键字" || searchkey == "") {
        searchkey = "";
    }
    var tbody = "<ul>";
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/manage/read/sys_data_service.ashx', //目标地址
        data: "p=" + (pageindx + 1) + "&action=" + $("#coursetype").val() + "&classid=" + escape($("#classid").val()) + "&key=" + searchkey + "&random=" + RndNum(4),
        beforeSend: function() { $("#divload").show(); $("#newsPagination").hide(); }, //发送数据之前
        complete: function() { $("#divload").hide(); }, //接收数据完毕
        success: function(json) {

            //将查询到的记录赋值给隐藏控件
            var count = json.commcount;
            $.each(count, function(i, n) {
                $("#newscount").val(n.count);
            });
            //设置分页控件值
            SetNewsPager(pageindx);
            //无数据不显示过犹不及
            if ($("#newscount").val() == 0) {
                tbody += "暂无数据";
                //不显示分页控件
                $("#newsPagination").hide();
            } //有数据时加载
            else {
                var f = 0;
                var productData = json.CommQuestionOptionInfo;

                $.each(productData, function(i, n) {
                    var trs = "";
                    f++;
                    trs += "<li><a href=\"/course/" + n.Id + ".aspx\" target=\"_blank\"><img src=\"" + n.CourseImage + "\" width=\"134\" height=\"111\" alert=\"" + n.CourseName + "\"/></a><span class=\"name\"><a href=\"/course/" + n.Id + ".aspx\" title=\"" + n.CourseName + "\">" + chinaSubstr(10, n.CourseName) + "</a></span><span class=\"djl\">选课量：<em>" + n.coursecount + "</em></span></li>";
                    if (f % 4 == 0) {
                        trs += "</ul><ul>";
                    }
                    tbody += trs;
                });

                //显示分页控件
                $("#newsPagination").show();
            }
            tbody += "</ul>";
            document.getElementById("divNewsContent").innerHTML = tbody.replace("<ul></ul>", "");
        }
    });
}
function SetNewsPager(pageindx) {
    $("#newsPagination").pagination($("#newscount").val(), {
        callback: pageselectCallback,
        prev_text: '« 上一页',
        next_text: '下一页 »',
        items_per_page: 10,
        num_display_entries: 5,
        current_page: pageindx,
        num_edge_entries: 2
    });
}
function InitClickData() {
    var tbody = "";
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/manage/read/sys_data_service.ashx', //目标地址
        data: "action=clickcourse",
        beforeSend: function() { tbody = "加载中..."; }, //发送数据之前
        complete: function() { }, //接收数据完毕
        success: function(json) {
            $("#courselist tr:gt(0)").remove();
            //将查询到的记录赋值给隐藏控件
            var count = json.commcount;
            $.each(count, function(i, n) {
                $("#clickcount").val(n.count);
            });
            //无数据不显示过犹不及
            if ($("#clickcount").val() == 0) {
                tbody += "暂无数据";
            } //有数据时加载
            else {
                var productData = json.CommQuestionOptionInfo;
                tbody = "";
                $.each(productData, function(i, n) {
                    var trs = "";
                    if (n.CourseOrder == "0") {
                        document.getElementById("topimg").innerHTML = "<a href=\"/course/" + n.Id + ".aspx\" target=\"_blank\"><img src=\"" + n.CourseImage + "\" width=\"134\" height=\"111\" class=\"hotinforpicborder\" /></a>";
                    }
                    trs += "<tr><td width=\"23\"><img src=\"" + n.Img + "\" width=\"18\" height=\"13\" /></td>";
                    trs += "<td><a href=\"/course/" + n.Id + ".aspx\" title=\"" + n.CourseName + "\">" + chinaSubstr(20, n.CourseName) + "</a></td>";
                    trs += "</tr>";
                    tbody += trs;
                });
            }
            $("#courselist").append(tbody);
        }
    });
}

function RndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
    return rnd;
}
function chinaSubstr(lenth, sValue) {              // 声明变量。
    var s = sValue.substr(0, lenth); // 获取子字符串。
    return s;               // 返回 "Spain"。
}