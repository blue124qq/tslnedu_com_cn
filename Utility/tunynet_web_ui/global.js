
//复制URL地址
function setCopy(_sTxt) {
    if (navigator.userAgent.toLowerCase().indexOf('ie') > -1) {
        clipboardData.setData('Text', _sTxt);
        alert("网址“" + _sTxt + "”\n已经复制到您的剪贴板中\n您可以使用Ctrl+V快捷键粘贴到需要的地方");
    } else {
        prompt("请复制网站地址:", _sTxt);
    }
}

//加入收藏
function addBookmark(site, url) {
    if (navigator.userAgent.toLowerCase().indexOf('ie') > -1) {
        window.external.addFavorite(url, site)
    } else if (navigator.userAgent.toLowerCase().indexOf('opera') > -1) {
        alert("请使用Ctrl+T将本页加入收藏夹");
    } else {
        alert("请使用Ctrl+D将本页加入收藏夹");
    }
}

function setCookie(name, value) {
    var Days = 30; //此 cookie 默认保存 30 天
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
}

function changeTextboxValue(textboxID, newValue) {
    var element = document.getElementById(textboxID);
    if (element) {
        element.value = newValue;
    }
}

//刷新当前页面
function refresh() {
    window.location.reload();
}

//全选/全不选
function checkAll(allCheckBox, itemName) {
    var items = document.getElementsByName(itemName);
    for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'checkbox') {
            items[i].checked = allCheckBox.checked;
        }
    }
}

//控制字体大小
function setFontSize(elementID, selectedClassName, classNames) {
    if (classNames) {
        for (i = 0; i < classNames.length; i++) {
            $("#" + elementID).removeClass(classNames[i]);
        }
    }
    $("#" + elementID).addClass(selectedClassName);
}

//向文本框的光标处插入内容
function insertAtCaret(textObj, textFeildValue) {
    if (document.all && textObj.createTextRange && textObj.caretPos) {
        var caretPos = textObj.caretPos;
        caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == '' ? textFeildValue + '' : textFeildValue;
    } else if (textObj.setSelectionRange) {
        var rangeStart = textObj.selectionStart;
        var rangeEnd = textObj.selectionEnd;
        var tempStr1 = textObj.value.substring(0, rangeStart);
        var tempStr2 = textObj.value.substring(rangeEnd);
        textObj.value = tempStr1 + textFeildValue + tempStr2;
        textObj.focus();
        var len = textFeildValue.length;
        textObj.setSelectionRange(rangeStart + len, rangeStart + len);
        textObj.blur();
    } else {
        textObj.value += textFeildValue;
    }
}
//新消息
function newMessageHint(messageText) {
    var flag = true;
    var oldTitle = document.title;
    var stop = false;
    function star_wink(t) {
        t += 1;
        if (flag) {
            document.title = '【' + messageText + '】 - ' + oldTitle;
            flag = false;
        }
        else {
            document.title = '【' + messageText.toString().replace('*', '  ') + '】 - ' + oldTitle;
            flag = true;
        }
        if (t == 5) {
            stop = true;
            if (stop)
                settitle();
        }
        else {
            if (!stop)
                setTimeout("star_wink(" + t + ")", 800);
        }

    }

    function settitle() {
        document.title = oldTitle;
    }
}

//鼠标悬停效果
$(document).ready(function () {

    //标签式导航
    $('.spb-nav1-area li.tn-list-item-position:not(.tn-navigation-active)').hover(function () {
        $(this).addClass('tn-navigation-hover');
    }, function () {
        $(this).removeClass('tn-navigation-hover');
    });


    //交互状态 
    $('.tn-state-default,.tn-menu-item').live("mouseover", function () {
        $(this).addClass('tn-state-hover');
    }).live("mouseout", function () {
        $(this).removeClass('tn-state-hover');
    });

    //表格 
    $('.tn-table-grid-row').hover(function () {
        $(this).addClass('tn-bg-gray');
    }, function () {
        $(this).removeClass('tn-bg-gray');
    });

    //按钮
    $('.tn-button-default').live("mouseover", function () {
        $(this).addClass('tn-button-default-hover');
    }).live("mouseout", function () {
        $(this).removeClass('tn-button-default-hover');
    });

    $('.tn-button-primary').live("mouseover", function () {
        $(this).addClass('tn-button-primary-hover');
    }).live("mouseout", function () {
        $(this).removeClass('tn-button-primary-hover')
    });

    $('.tn-button-secondary').live("mouseover", function () {
        $(this).addClass('tn-button-secondary-hover');
    }).live("mouseout", function () {
        $(this).removeClass('tn-button-secondary-hover');
    });

    $('.tn-button-lite').live("mouseover", function () {
        $(this).addClass('tn-button-default');
    }).live("mouseout", function () {
        $(this).removeClass('tn-button-default');
    });

});