				function MouseOver(id)
				{
					document.getElementById('ul_'+id).style.display='block';
//					document.images["image"+id].src="images/bt0"+id+"_up.png"; 
					document.getElementById("text"+id).className="t2";
				}
				function MouseOut(id)
				{
					document.getElementById('ul_'+id).style.display='none';
//					document.images["image"+id].src="images/bt0"+id+".png"; 
					document.getElementById("text"+id).className="t";
				}
//				  function changeImg(obImg,sNewURL)
//				{
//				     if(sNewURL!="") obImg.src=sNewURL;
//				}

$(function(){
	$("#KinSlideshow").KinSlideshow({
			moveStyle:"right",
			titleBar:{titleBar_height:30,titleBar_bgColor:"#08355c",titleBar_alpha:0},
			titleFont:{TitleFont_size:12,TitleFont_color:"#FFFFFF",TitleFont_weight:"normal"},
			btn:{btn_bgColor:"#FFFFFF",btn_bgHoverColor:"#1072aa",btn_fontColor:"#000000",btn_fontHoverColor:"#FFFFFF",btn_borderColor:"#cccccc",btn_borderHoverColor:"#1188c0",btn_borderWidth:1}
	});
})
