$(document).ready(function(){
	function browserRedirect() {
		var sUserAgent = navigator.userAgent.toLowerCase();
		var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
		var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		var bIsMidp = sUserAgent.match(/midp/i) == "midp";
		var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
		var bIsAndroid = sUserAgent.match(/android/i) == "android";
		var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
		var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
		if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
			//alert("PC");
			$(".page_08 dl dd").eq(5).css({"margin-left":"100px"});

			function changePC() {
				var fold = $(window).height() + $(window).scrollTop()-170;

				if(fold >= $(".page_01").offset().top + 170){
					$(".page_01 .model_list li").animate({"top":"0px", "opacity":"1"}, 600);
					$(".menu li").eq(1).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
				}
				if(fold >= $(".page_02").offset().top + 170){
					$(".page_02 .img1").animate({"left":"20px", "opacity":"1"}, 600);
					$(".page_02 .txt").animate({"right":"200px", "opacity":"1"}, 600);
				}
				if(fold >= $(".page_03").offset().top + 170){
					$(".page_03 .txt").animate({"opacity":"1"}, 500, function () {
						$(".page_03 .imgs .img2").animate({"bottom":"135px", "left":"342px", "opacity":"1"}, 600);
						$(".page_03 .imgs .img1").animate({"bottom":"143px", "left":"563px", "opacity":"1"}, 600);
						$(".page_03 .imgs .img3").animate({"bottom":"175px", "left":"477px", "opacity":"1"}, 600);
						$(".page_03 .imgs .img4").animate({"bottom":"169px", "left":"253px", "opacity":"1"}, 600);
						$(".page_03 .imgs .img5").animate({"bottom":"250px", "left":"536px", "opacity":"1"}, 600);
						$(".page_03 .imgs .img6").animate({"bottom":"256px", "left":"366px", "opacity":"1"}, 600);
						$(".page_03 .imgs .img7").animate({"bottom":"276px", "left":"615px", "opacity":"1"}, 600);
						$(".page_03 .imgs .img8").animate({"bottom":"336px", "left":"156px", "opacity":"1"}, 600);
					});
				}
				if(fold >= $(".page_04").offset().top + 170){
					$(".page_04 .txt").animate({"opacity":"1"}, 500, function () {
						$(".page_04 .img1").animate({"left":"0", "opacity":"1"}, 500);
						$(".page_04 .img2").animate({"left":"30px", "opacity":"1"}, 500);
						$(".page_04 .img3").animate({"top":"125px", "opacity":"1"}, 500);
						$(".page_04 .img4").animate({"right":"38px", "opacity":"1"}, 500);
						$(".page_04 .img5").animate({"right":"0px", "opacity":"1"}, 500);
					});
				}
				if(fold >= $(".page_05").offset().top + 170){
					$(".menu li").eq(2).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
				}
				if(fold >= $(".page_06").offset().top + 170){
					$(".page_06 .img1").animate({"left":"0", "opacity":"1"}, 600);
					$(".page_06 .img2").animate({"right":"0", "opacity":"1"}, 600);
				}
				if(fold >= $(".page_07").offset().top + 170){
					$(".page_07 img").animate({"opacity":"1"}, 600);
				}
				if(fold >= $(".page_09").offset().top + 170){
					$(".page_09 .contact_info").animate({"top":"0","opacity":"1"}, 600);
					$(".page_09 .ditu").animate({"top":"0","opacity":"1"}, 600);
					$(".menu li").eq(4).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
				}
			}
			changePC();

			$(window).bind("scroll", function(event){
				$(".page").each(function(){
					$this = $(this);
					fold = $(window).height() + $(window).scrollTop()-170;
					changePC();
				});
			});

			//效果模式 -- 布局转换
			var oUl = document.getElementById("model_list");
			var aLi = oUl.getElementsByTagName("li");

			for (var i=0; i<aLi.length; i++){
				aLi[i].style.left = aLi[i].offsetLeft + "px";
				aLi[i].style.top = 100 + "px";
			}
			for (var i=0; i<aLi.length; i++){
				aLi[i].style.position = "absolute";
			}
		} else {
			//alert("MOBILE")

			$(".phone_menu").click(function () {
				$(this).prev().slideToggle(300);
			});
			$(".nav ul > li").click(function () {
				$(this).parent().hide();
			});

			function change() {
				var fold = $(window).height() + $(window).scrollTop()-100;

				//if(fold >= $(".page_02").offset().top + 100){
				//	$(".page_02 .txt").animate({"opacity":"1"}, 600);
				//	$(".page_02 .img1").animate({"opacity":"1"}, 600);
				//	$(".page_02 .img1").addClass('animated fadeInUp');
				//}
				//if(fold >= $(".page_03").offset().top + 100){
				//	$(".page_03 .txt").animate({"opacity":"1"}, 300);
				//	$(".page_03 .phone_img").animate({"opacity":"1"}, 300);
				//	$(".page_03 .phone_img").addClass('animated shake');
				//}
				//if(fold >= $(".page_04").offset().top + 100){
				//	$(".page_04 .txt").animate({"opacity":"1"}, 300);
				//	$(".page_04 .phone_img").animate({"opacity":"1"}, 300);
				//	$(".page_04 .phone_img").addClass('animated fadeInUp');
				//}
				//if(fold >= $(".page_05").offset().top + 100){
				//	$(".page_05 .tit").animate({"opacity":"1"}, 300);
				//	$(".page_05 .sub_tit").animate({"opacity":"1"}, 300);
				//	$(".page_05 .tit").addClass('animated fadeInUp');
				//	$(".page_05 .sub_tit").addClass('animated fadeInUp');
				//	$(".page_05 .row").addClass('animated fadeInUp');
				//}
				//if(fold >= $(".page_06").offset().top + 100){
				//	$(".page_06 .img1").addClass('animated fadeInLeft');
				//	$(".page_06 .img2").addClass('animated fadeInRight');
				//}
				//if(fold >= $(".page_07").offset().top + 100){
				//	$(".page_07 img").animate({"opacity":"1"}, 500);
				//}
				//if(fold >= $(".page_08").offset().top + 100){
				//	$(".page_08 .case").addClass('animated bounce');
				//}
				//if(fold >= $(".page_09").offset().top + 100){
				//	$(".page_09 .contact_info").addClass('animated shake');
				//}
			}
			change();

			$(window).bind("scroll", function(event){
				$(".page").each(function(){
					$this = $(this);
					fold = $(window).height() + $(window).scrollTop()-100;
					change();
				});
			});
		}
	}
	browserRedirect();


	//顶栏滚动缩小
	$(window).scroll(function(){	//窗体添加事件
		var scro = $(document).scrollTop();
		//document.title = scro;	//test
		scro>120 ? $(".topBar").addClass("minTop"):$(".topBar").removeClass("minTop");
		scro==0 ? $(".menu li").eq(0).find('a').addClass('active').parent().siblings().find('a').removeClass('active'):void 0;
	});


    //回到顶部
    $(".toTop").click(function(){
		$('html, body').animate({scrollTop: $(document).height()}, 2000);
		return false;
	});

	$(".menu li").eq(1).click(function(){
		$('html, body').animate({scrollTop: $(".page_01").offset().top - 70}, 500);
		$(this).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
		return false;
	});
	$(".menu li").eq(2).click(function(){
		$('html, body').animate({scrollTop: $(".page_05").offset().top - 70}, 500);
		$(this).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
		return false;
	});
	$(".menu li").eq(4).click(function(){
		$('html, body').animate({scrollTop: $(".page_09").offset().top - 30}, 500);
		$(this).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
		return false;
	});

});
