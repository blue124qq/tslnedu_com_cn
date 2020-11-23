function changeimg(i) {
    adNum = i;
    window.clearInterval(theTimer);
    adNum = adNum - 1;
    nextAd()
}
function goUrl() {
    window.open(imgLink[adNum], '_blank')
}
var count = 0;
for (i = 1; i < imgUrl.length; i++) {
    if ((imgUrl[i] != "") && (imgLink[i] != "") ) {
        count++
    } else {
        break
    }
}
function playTran() {
    if (document.all) {
        imgInit.filters.revealTrans.play()
    }
}
var key = 0;
function nextAd() {
    if (adNum < (imgUrl.length - 1)) {
        adNum++
    } else {
        adNum = 1
    }
    if (key == 0) {
        key = 1
    } else if (document.all) {
        imgInit.filters.revealTrans.Transition = 23;
        imgInit.filters.revealTrans.apply();
        playTran()
    }
    document.images.imgInit.src = imgUrl[adNum];
    document.getElementById('FIJ_R_IB_' + adNum).className = 'id_FIJ_R_ImgBlk_On';
    for (var i = 1; i <= count; i++) {
        if (i != adNum) {
            document.getElementById('FIJ_R_IB_' + i).className = 'id_FIJ_R_ImgBlk'
        }
    }
    document.getElementById('focustext').innerHTML = imgtext[adNum];
    document.getElementById('imgLink').href = imgLink[adNum];
    theTimer = setTimeout("nextAd()", TimeOut)
}
document.write('<div id="FocusImg_JS">');
document.write('<div id="FIJ_L">');
document.write('<span><a id="imgLink" href="' + imgLink[1] + '" target="_blank"><img style="FILTER: revealTrans(duration=1,transition=5);" src="javascript:void(0);" name="imgInit" alt=""/></a></span>');
document.write('<p id="focustext">' + imgtext[1] + '</p><p id="focustextBg"></p>');
document.write('</div>');
document.write('<div id="FIJ_R">');
for (var i = 1; i < imgUrl.length; i++) {
    document.write('<div id="FIJ_R_IB_' + i + '" class="id_FIJ_R_ImgBlk"><a href="' + imgLink[i] + '" ' + StartType + '="javascript:changeimg(' + i + ')" target="_blank"><img src="' + imgSUrl[i] + '" alt=""/></a>');
    document.write('</div>')
}
nextAd();
document.write('</div>');
document.write('</div>');