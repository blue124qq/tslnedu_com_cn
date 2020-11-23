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
        data: "p=" + (pageindx + 1) + "&action=projectNews&project=" + $("#classid").val(),
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
                var trs = "<li><span>[" + dateSubstr(n.Create_date) + "]</span><a href=\"/project/news/" + n.Column_Id + ".aspx\">" + n.News_Title + "</a></li>";               
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