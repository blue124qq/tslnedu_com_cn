$().ready(function() {
    InitData(0);
    InitDataOff(0);
    $("#pageTheme").change(function() {
        $("#Pagination").attr('class', $(this).val());
        $("#OffPagination").attr('class', $(this).val());
    });
});
function pageselectCallback(page_id) {
    InitData(page_id);
}
function pageselectOffCallback(page_id) {
    InitDataOff(page_id);
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
                        window.location = learning + "/auth.aspx?action=urlCheck&user=" + uName + "&url=" + result;  //window.open(result, '');
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

function InitData(pageindx) {
    var tbody = "";
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/manage/read/sys_data_service.aspx', //目标地址
        data: "p=" + (pageindx + 1) + "&action=onlineproject",
        beforeSend: function() { $("#divload").show(); $("#Pagination").hide(); }, //发送数据之前
        complete: function() { $("#divload").hide(); }, //接收数据完毕
        success: function(json) {
            //将查询到的记录赋值给隐藏控件
            var count = json.commcount;
            $.each(count, function(i, n) {
                $("#recordcount").val(n.count);
            });
            //设置分页控件值
            SetPager(pageindx);
            //无数据不显示过犹不及
            if ($("#recordcount").val() == 0) {
                tbody += "暂无数据";
                //不显示分页控件
                $("#Pagination").hide();
            } //有数据时加载
            else {
                var productData = json.CommQuestionOptionInfo;
                $.each(productData, function(i, n) {
                    var trs = "<li><div class=\"imag\">";
                    trs += "<a href=\"/onlineproject/" + n.Id + ".aspx\" target=\"_blank\"> <img src=\"" + learning + "/uploadfile/" + n.ClassImage + "\" width=\"156\" height=\"111\" alt=\"\" /></a></div><div class=\"text\"><h2 class=\"blue01\">";
                    if (n.State == "1") {
                        trs += "<span> <img src=\"/templets/tssq/images/zxbm2.gif\" style=\"cursor:hand\" onclick=\"entryProject();\" width=\"80\" height=\"20\" /></span>";
                    } else if (n.State == "11") {
                        trs += "";
                    }
                    else {
                        trs += "<span> <img src=\"/templets/tssq/images/zxbm.gif\" style=\"cursor:hand\" onclick=\"checklearnuserlogin(\'" + n.Id + "\');\" width=\"80\" height=\"20\" /></span>";
                    }
                    trs += "<a href=\"/onlineproject/" + n.Id + ".aspx\">" + n.ClassName + "</a></h2>";
                    trs += "<p class=\"sx\"> 培训时间：<span class=\"darkyellow\">" + dateSubstr(n.StartTime) + "</span>至<span class=\"darkyellow\">" + dateSubstr(n.EndTime) + "</span> ";
if(Trim(n.Price)==""){}else{
trs+="费用：<span class=\"darkyellow\">" + n.Price + "</span>";}
trs+=" 包含课程：<span class=\"darkyellow\">" + n.SchoolId + "</span> 门 <a href=\"javascript:void(0)\" onclick=\"viewProjectDetail(\'" + n.Id + "\',\'" + n.ClassName + "\');\"><span class=\"darkyellow\">查看</span></a></p>";
                    trs += "<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + chinaSubstr(120, n.Introduction) + "...";
                    trs += "<span class=\"darkyellow\"><a href=\"/onlineproject/" + n.Id + ".aspx\">[详细]</a></span></p>";
                    trs += "</div></li>";
                    tbody += trs;
                });
                //显示分页控件
                $("#Pagination").show();
            }
            document.getElementById("content01").innerHTML = "<ul class=\"picText\">" + tbody + "</ul>";
        }
    });
} function dateSubstr(sValue) {
    var returnvaluearr = sValue.split(' ');              // 返回 "Spain"。
    return returnvaluearr[0];

}
function InitDataOff(pageindx) {

    var tbody = "";
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/manage/read/sys_data_service.ashx', //目标地址
        data: "p=" + (pageindx + 1) + "&action=project",
        beforeSend: function() { $("#divload").show(); $("#OffPagination").hide(); }, //发送数据之前
        complete: function() { $("#divload").hide(); }, //接收数据完毕
        success: function(json) {

            //将查询到的记录赋值给隐藏控件
            var count = json.commcount;
            $.each(count, function(i, n) {
                $("#clickcount").val(n.count);
            });
            //设置分页控件值
            SetPagerOff(pageindx);
            //无数据不显示过犹不及
            if ($("#clickcount").val() == 0) {
                tbody += "暂无数据";
                //不显示分页控件
                $("#OffPagination").hide();
            } //有数据时加载
            else {
                var productData = json.CommQuestionOptionInfo;
                $.each(productData, function(i, n) {
                    var trs = "<li><div class=\"imag\">";
                    trs += "<a href=\"/project/" + n.Journal_Info_Id + ".aspx\" target=\"_blank\"> <img src=\"" + n.Journal_img + "\" width=\"156\" height=\"111\" alt=\"\" /></a></div>";
                    trs += "<div class=\"text\"><h2 class=\"blue01\"><a href=\"/project/" + n.Journal_Info_Id + ".aspx\">" + n.Journal_title_cn + "</a></h2>";
                    trs += "<p class=\"sx\">";
if (Trim(n.Journal_language)== ""){}else {  
                        trs += "培训时间：<span class=\"darkyellow\">" + n.Journal_language + "</span> ";
                    }

                    if (Trim(n.Journal_format) == ""){}else {
                    trs += "费用：<span class=\"darkyellow\">" + n.Journal_format + "</span> 元 "; }
                    if (Trim(n.Journal_count) == ""){}else { trs += "包含课程：<span class=\"darkyellow\">" + n.Journal_count + "</span> 门"; }
                    trs += "</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + chinaSubstr(120, n.Journal_Cn) + "...";
                    trs += "<span class=\"darkyellow\"><a href=\"/project/" + n.Journal_Info_Id + ".aspx\">[详细]</a></span></p>";
                    trs += "</div></li>";
                    tbody += trs;
                });
                //显示分页控件
                $("#OffPagination").show();
            }
            document.getElementById("content02").innerHTML = "<ul class=\"picText\">" + tbody + "</ul>";
        }
    });
}

function LTrim(str)
{
    var i;
    for(i=0;i<str.length;i++)
    {
        if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
    }
    str=str.substring(i,str.length);
    return str;
}
function RTrim(str)
{
    var i;
    for(i=str.length-1;i>=0;i--)
    {
        if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
    }
    str=str.substring(0,i+1);
    return str;
}
function Trim(str)
{
    return LTrim(RTrim(str));
}
function SetPagerOff(pageindx) {
    $("#OffPagination").pagination($("#clickcount").val(), {
        callback: pageselectOffCallback,
        prev_text: '« 上一页',
        next_text: '下一页 »',
        items_per_page: 4,
        num_display_entries: 5,
        current_page: pageindx,
        num_edge_entries: 2
    });
}

function SetPager(pageindx) {
    $("#Pagination").pagination($("#recordcount").val(), {
        callback: pageselectCallback,
        prev_text: '« 上一页',
        next_text: '下一页 »',
        items_per_page: 4,
        num_display_entries: 5,
        current_page: pageindx,
        num_edge_entries: 2
    });
}

function chinaSubstr(lenth, sValue) {              // 声明变量。
    var s = sValue.substr(0, lenth); // 获取子字符串。
    return s;               // 返回 "Spain"。
}

