// JavaScript Document
function nTabs(thisObj, Num) {
    if (thisObj.className == "active") return;
    var tabObj = thisObj.parentNode.id;
    var tabList = document.getElementById(tabObj).getElementsByTagName("li");
    for (i = 0; i < tabList.length; i++) {
        if (i == Num) {
            thisObj.className = "active";
            document.getElementById(tabObj + "_Content" + i).style.display = "block";
        } else {
            tabList[i].className = "normal";
            document.getElementById(tabObj + "_Content" + i).style.display = "none";
        }
    }
}

function nTabsClick(thisObj) {
    if (document.getElementById("li_"+thisObj).className == "active") return;
    var tabList = document.getElementById("myTab").getElementsByTagName("li");
    for (i = 0; i < tabList.length; i++) {
        if (i == thisObj) {
            document.getElementById("li_" + thisObj).className = "active";
            document.getElementById("myTab_Content" + i).style.display = "block";
        } else {
            tabList[i].className = "normal";
            document.getElementById("myTab_Content" + i).style.display = "none";
        }
    }
}
