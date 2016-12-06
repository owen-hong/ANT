$(function(){
	$.fn.magnifying = function(){
		var that = $(this),
		 $imgCon = that.find('.con-fangDaIMg'),//中图容器
		 	$Img = $imgCon.find('img'),//中图、大图
		   $Drag = that.find('.magnifyingBegin'),//滑块
		   $show = that.find('.magnifyingShow'),//大图容器
		$showIMg = $show.find('img'),//放大镜图片
		
		$ImgList = that.find('.con-FangDa-ImgList > li >img'); //缩略图列表
		//multiple = $show.width()/$Drag.width(); //大图容器宽 / 滑块的宽

		$imgCon.mousemove(function(e){ //鼠标移入显示滑块和放大镜
			$Drag.css('display','block'); 
			$show.css('display','block'); 
            
		    //获取坐标
		   	var left = e.pageX - $(this).offset().left - $Drag.width()/2,
		   		top = e.pageY - $(this).offset().top - $Drag.height()/2,
		   		MaxLeft = $imgCon.width()-$Drag.width(),
		   		Maxtop = $imgCon.height()-$Drag.height();

  	   	    //判断限制滑块不能超出中图容器
		   	left = left > 0 ? left : 0;
		   	left = left < MaxLeft ? left : MaxLeft;
		   	top = top > 0 ? top : 0;
		   	top = top < Maxtop ? top : Maxtop;

		   	$Drag.css({left:left+'px',top:top+'px'});  //滑块位置

            var multipleX = left / ($imgCon.width() - $Drag.width());   //x轴占比
            var multipleY = top / ($imgCon.height() - $Drag.height());  //y轴占比
            $showIMg.css({
                marginLeft:-multipleX * ($showIMg.width() - $show.width()) +'px',
                marginTop:-multipleY * ($showIMg.height() - $show.height()) +'px'
            });
		});
		
		$imgCon.mouseout(function(){ //鼠标离开隐藏滑块和放大镜
		   	$Drag.css('display','none');
			$show.css('display','none');
		});

		$ImgList.hover(function(){ //鼠标移入缩略图列表
			var NowSrc = $(this).data('bigimg');
			$Img.attr('src',NowSrc);  //$Img为中图和放大图
			$(this).parent().addClass('active').siblings().removeClass('active');
		});	
	};

	$("#fangdajing").magnifying();

	// 控制缩略图左右移动
	var count = $("#imageMenu li").length; /* 显示5个 li标签内容 */
	var interval = $("#imageMenu li:first").width();
	var interval = interval+8;
	var curIndex = 0;
	
	$('.scrollbutton').click(function(){
		if( $(this).hasClass('disabled') ) return false;
		
		if ($(this).hasClass('smallImgUp')) --curIndex;
		else ++curIndex;
		
		$('.scrollbutton').removeClass('disabled');
		if (curIndex == 0) $('.smallImgUp').addClass('disabled');
		if (curIndex == count-1) $('.smallImgDown').addClass('disabled');
		
		$("#imageMenu ul").stop(false, true).animate({"marginLeft" : -curIndex*interval + "px"}, 300);
	});	

});