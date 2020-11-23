$().ready(function() {
    InitClickData();
});

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
                var trs = "<li><span>["+dateSubstr(n.CreatTime)+"]</span><a href=\"/detail/" + n.NewsID + ".aspx\" title=\"" + n.NewsTitle + "\">" + chinaSubstr(15, n.NewsTitle) + "</a></li>";
                    tbody += trs;
                });
            }
            document.getElementById("ClickData").innerHTML = "<ul class=\"newslist\">" + tbody + "</ul>";
        }
    });
}
function chinaSubstr(lenth, sValue) {              // 声明变量。
    var s = sValue.substr(0, lenth); // 获取子字符串。
    return s;               // 返回 "Spain"。
}

function dateSubstr(sValue) {
    var returnvaluearr = sValue.split(' ');
    return returnvaluearr[0].substr(5,returnvaluearr[0].lenth);
}