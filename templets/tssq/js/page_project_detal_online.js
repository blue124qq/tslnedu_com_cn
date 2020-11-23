$().ready(function() {
    InitNewsData(0);
    $("#pageTheme").change(function() {
        $("#newsPagination").attr('class', $(this).val());
    });
});
function pageselectCallback(page_id) {
    InitNewsData(page_id);
}
function pageselectCourseCallback(page_id) {
    InitCourseData(page_id);
}


function checklearnuserlogin(uProject) {
    function OnSuccess(result) {
        if (result != null) {
            var returnvaluearr = result.split('$$$');
            if (returnvaluearr[0] == "ERR") { alert('您尚未登录，请先登录！'); document.getElementById("arrcity").focus(); } else {
                var uArray = returnvaluearr[1].split('_');
                if (uArray[0] == "0") {
                    checkuserdeny(uArray[1], uProject);
                } else {
                    alert("管理员或教师不能报名。");
                }
            }
        }
    }
    $.ajax({ type: "get", url: "/user/UserLoginajax.aspx", dataType: "html", data: "action=checkprojcetuser", success: OnSuccess });
}
function closeProjectRegisterWin() {
    $("#windownbg").remove();
    $("#windown-box").fadeOut("slow", function() { $(this).remove(); });
}
function checkuserdeny(uName, uProject) {
    function OnSuccess(result) {
        if (result != null) {
            if (result == "0") {
                //可进行报名
                tipsWindown("授权码认证", "iframe:/projectRegister.aspx?classId=" + uProject, "340", "220", "true", "", "true", "leotheme");
            } else if (result == "1") {
                function OnSuccess(result) {
                    if (result != null) {
                        window.open(result, '');
                    }
                } $.ajax({ type: "get", url: "/user/UserLoginajax.aspx", dataType: "html", data: "action=entryProject", success: OnSuccess });
            } else if (result == "2") {
                alert("您已报名成功，请耐心等待审核。");
            } else {
                alert("对不起，您的报名信息审核未通过。请联系管理员。");
            }
        }
    }
    $.ajax({ type: "get", url: "/user/UserLoginajax.aspx", dataType: "html", data: "action=projectCheck&uName=" + uName + "&uProject=" + uProject, success: OnSuccess });
}

function entryProject() {
    function OnSuccess(result) {
        if (result != null) {
            var returnvaluearr = result.split('$$$');
            if (returnvaluearr[0] == "ERR") { alert('您尚未登录，请先登录！'); document.getElementById("arrcity").focus(); } else {
                function OnSuccess(result) {
                    if (result != null) {
                        //alert(result);
                        window.open(result, '');
                    }
                }
                $.ajax({ type: "get", url: "/user/UserLoginajax.aspx", dataType: "html", data: "action=entryProject", success: OnSuccess });
            }
        }
    }
    $.ajax({ type: "get", url: "/user/UserLoginajax.aspx", dataType: "html", data: "action=checkprojcetuser", success: OnSuccess });
}

function InitCourseData(pageindx) {

    var tbody = "";
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/manage/read/sys_data_service.ashx', //目标地址
        data: "p=" + (pageindx + 1) + "&action=projectCourse&project=" + $("#classid").val(),
        beforeSend: function() { $("#divload").show(); $("#coursePagination").hide(); }, //发送数据之前
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
                $("#coursePagination").hide();
            } //有数据时加载
            else {
                var productData = json.CommQuestionOptionInfo;
                $.each(productData, function(i, n) {
                    var trs = "";
                    trs += "<li><img src=\"" + n.CourseImage + "\" width=\"100\" height=\"76\"/><span class=\"name\">" + n.CourseName + "</span></li>";
                    tbody += trs;
                });
                //显示分页控件
                $("#coursePagination").show();
            }
            document.getElementById("divCourseContent").innerHTML = tbody;
        }
    });
}

function SetCoursePager(pageindx) {
    $("#coursePagination").pagination($("#coursecount").val(), {
        callback: pageselectCourseCallback,
        prev_text: '« 上一页',
        next_text: '下一页 »',
        items_per_page: 12,
        num_display_entries: 5,
        current_page: pageindx,
        num_edge_entries: 2
    });
}

function InitNewsData(pageindx) {

    var tbody = "";
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/manage/read/sys_data_service.ashx', //目标地址
        data: "p=" + (pageindx + 1) + "&action=onlineprojectNews&project=" + $("#classid").val(),
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
                var productData = json.CommQuestionOptionInfo;
                $.each(productData, function(i, n) {
                    var trs = "<li><span>[" + dateSubstr(n.PostDate) + "]</span><a href=\"/onlinenews/" + n.Id + ".aspx\">" + n.Title + "</a></li>";
                    tbody += trs;
                });
                //显示分页控件
                $("#Pagination").show();
            }
            document.getElementById("divNewsContent").innerHTML = tbody;
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

function dateSubstr(sValue) {
    var returnvaluearr = sValue.split(' ');              // 返回 "Spain"。
    return returnvaluearr[0];

}
function chinaSubstr(lenth, sValue) {              // 声明变量。
    var s = sValue.substr(0, lenth); // 获取子字符串。
    return s;               // 返回 "Spain"。
}