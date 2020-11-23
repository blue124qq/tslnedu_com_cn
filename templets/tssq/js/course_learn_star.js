$().ready(function() {
    initStarData(); initLearnOrderData();
});

function initStarData() {
    var tbody = "";
    $.ajax({
        type: "GET", //用POST方式传输
        dataType: "jsonp", //数据格式:JSON
        url: space + '/ChannelLearnGrop.aspx/Control_LearnStar', //目标地址
        data: "callback=?",
        beforeSend: function() { document.getElementById("StarUlData").innerHTML = "加载中..."; }, //发送数据之前
        complete: function() { }, //接收数据完毕
        success: function(json) {
            //将查询到的记录赋值给隐藏控件
            var a = 1;
            var productData = json.commdata;
            tbody = "";
            $.each(productData, function(i, n) {
                var trs = "<li><div class=\"picText\">";
                trs += "<div class=\"imag\"><img src=\"" + n.uImg + "\" width=\"60\" height=\"60\" alt=\"" + n.uName + "\" /></div>";
                trs += "<div class=\"text\">";
                trs += "<h3 class=\"darkblue\"> <a href=\"" + space + "/u/" + n.displayName + ".aspx\" target=\"_blank\">" + n.uName + " </a></h3>";
                trs += "<p> 选择课程：<span class=\"darkyellow\">" + n.uCredits + "</span> 门</p></div></div></li>";
                tbody += trs;
            });
            document.getElementById("StarUlData").innerHTML = tbody;
        }
    });

}

function initLearnOrderData() {
    var tbody = "";

    $.ajax({
        type: "POST", //用POST方式传输
        dataType: "json", //数据格式:JSON
        url: '/manage/read/sys_data_service.ashx', //目标地址
        data: "action=userRank&random=obj0",
        beforeSend: function() { }, //发送数据之前
        complete: function() { }, //接收数据完毕
        success: function(json) {
            var itemcount = "0";
            //将查询到的记录赋值给隐藏控件
            var count = json.commcount;
            $.each(count, function(i, n) {
                itemcount = n.count;
            });
            if (itemcount == "0") { } else {
                $("#LearnOrder tr:gt(0)").remove();
                var a = 1;
                var productData = json.CommQuestionOptionInfo;
                $.each(productData, function(i, n) {
                    var trs = "";
                    trs += "<tr><td><span class=\"num\">" + a + "</span></td><td><a href=\"" + space + "/u/" + n.userName + ".aspx\" target=\"_blank\">" + n.StudentName + "</a></td><td><span class=\"darkyellow\">" + n.StudentCredit + "</span></td></tr>";
                    a++;
                    tbody += trs;
                });
                $("#LearnOrder").append(tbody);

            }
        }
    });
}
