$().ready(function() {
    InitData(0);
    InitClickData();
    $("#pageTheme").change(function() {
        $("#Pagination").attr('class', $(this).val());
    });
});
function pageselectCallback(page_id) {
    InitData(page_id);
}

function InitData(pageindx) {
    var searchkey = document.getElementById("keyword").value;
    if (searchkey == "关键字" || searchkey == "") {
        searchkey = "";
    }
    var tbody = "";
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/manage/read/sys_data_service.ashx', //目标地址
        data: "p=" + (pageindx + 1) + "&action=list&classallid=" + $("#classallid").val() + "&key=" + escape(searchkey),
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
                    var trs = "<li><span>[" + dateSubstr(n.CreatTime) + "]</span><a href=\"/detail/" + n.NewsID + ".aspx\">" + n.NewsTitle + "</a></li>";
                    tbody += trs;
                });
                //显示分页控件
                $("#Pagination").show();
            }
            document.getElementById("divListContent").innerHTML = "<ul class=\"newslist\">" + tbody + "</ul>";
        }
    });
}


function setPageContent(control, count) {
    var message = document.getElementById(control).innerHTML;
    document.getElementById(control).innerHTML = message.replace("<span class=\"disabled\">« 上一页</span>", "共计 <font color=red>" + count + "</font> 条 <span class=\"disabled\">« 上一页</span>");
}


function InitClickData() {
    var tbody = "";
    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/manage/read/sys_data_service.ashx', //目标地址
        data: "action=Click&classallid=" + $("#classallid").val(),
        beforeSend: function() { document.getElementById("ClickData").innerHTML = "加载中..."; }, //发送数据之前
        complete: function() { }, //接收数据完毕
        success: function(json) {

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
                $.each(productData, function(i, n) {
                var trs = "<li><span>[" + dateShortStr(n.CreatTime) + "]</span><a href=\"/detail/" + n.NewsID + ".aspx\" title=\"" + n.NewsTitle + "\">" + chinaSubstr(14, n.NewsTitle) + "</a></li>";
                    tbody += trs;
                });
            }
            document.getElementById("ClickData").innerHTML = "<ul class=\"newslist\">" + tbody + "</ul>";
        }
    });
}
function dateShortStr(sValue) {
    var returnvaluearr = sValue.split(' ');
    return returnvaluearr[0].substr(5, returnvaluearr[0].lenth);
    
}
function SetPager(pageindx) {
    $("#Pagination").pagination($("#recordcount").val(), {
        callback: pageselectCallback,
        prev_text: '« 上一页',
        next_text: '下一页 »',
        items_per_page: 35,
        num_display_entries: 5,
        current_page: pageindx,
        num_edge_entries: 2
    });
}
function chinaSubstr(lenth, sValue) {              // 声明变量。
    var s = sValue.substr(0, lenth); // 获取子字符串。
    return s;               // 返回 "Spain"。
}
function dateSubstr(sValue) {
    var returnvaluearr = sValue.split(' ');              // 返回 "Spain"。
    return returnvaluearr[0];

}