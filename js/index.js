// JavaScript Document
var curIndex = 0;
var time = 500;
var slideTime = 5000;
var adTxt = $(".piclist > li > .bannertext");

var adImg = $(".piclist > li > .bannerpic");

var int = setInterval("autoSlide()", slideTime);
 
$(".bannernav > ul > li").click(function () {
    show($(this).index(".bannernav > ul > li[class!='first-item'][class!='last-item']"));
    window.clearInterval(int);
    int = setInterval("autoSlide()", slideTime);
});
function autoSlide() {
    curIndex + 1 >= $(".piclist > li").size() ? curIndex = -1 : false;
    show(curIndex + 1);
}
$('.piclist').hover(function(){
	window.clearInterval(int);
},function(){
	int = setInterval("autoSlide()", slideTime);
});
function show(index) {
    $.easing.def = "easeOutQuad";
    $(".bnavh,.gaizhu").stop(false, true).animate({ left: index * 128 }, 300);
    $(".piclist>li").eq(curIndex).stop(false, true).fadeOut(time);
    adTxt.eq(curIndex).stop(false, true).animate({ top:-10,opacity:0}, time);
    adImg.eq(curIndex).stop(false, true).animate({ right:-80,opacity:0 }, time);
    setTimeout(function () {
        $(".piclist>li").eq(index).stop(false, true).fadeIn(time);
        adTxt.eq(index).css({ top: "0", opacity: "0" }).stop(false, true).animate({ top:70, opacity:1 }, time);
        adImg.eq(index).css({ right: "-50px", opacity: "0" }).stop(false, true).animate({ right:0,top:0, opacity:1 }, time);
		
		$('.piclist > li > .bannertext').eq(index).children(".bannerxx").css({ paddingTop:-300}).stop(false, true).animate({ paddingTop:16}, 800);
		
    }, 200)
    curIndex = index;
}






// JavaScript Document
$(document).ready(function(){
	$('.f_hide').jCarouselLite({
		btnPrev: '.btn_l',
		btnNext: '.btn_r',
		visible:5
	});
	
	$('.kehu_list > ul >li > img').chufa({
		top:'0'
	   ,outTop:-54
	});
});





// JavaScript Document
$('#bannerlb').hover(function(){
	$('.anniu').fadeIn();
},function(){
	$('.anniu').fadeOut();
	});





// JavaScript Document
(function($){
	$.fn.qh = function(o){
		var defaults = {
			add_class:null
		   ,xiaoguo:null
		   ,bl:null
		   ,br:null
		   ,add_class:null
		   ,auto:null//设置自动播放
	 	   ,time:200
		   ,op:500//切换透明度
		}	
		var o = $.extend(defaults, o);
		var t = $(this);
		var sw = 0;
		return t.each(function(i) {
		   var title     = t.children().eq(0).children(); 
           var nrListbox = t.children().eq(1);//内容大盒子
		   var nrlist     = nrListbox.children();////内容列表
		   nrlist.hide();
		   nrlist.eq(0).show();
		   title.eq(0).addClass(o.add_class);
		
		   //设置CSS样式
		   nrListbox.css({width:$(this).width(),height:$(this).height(),overflow:'hidden'});
		   
		   //普通切换效果	
			function qh(i){
				title.eq(i).addClass(o.add_class).siblings().removeClass(o.add_class);
				nrlist.eq(i).fadeIn(o.op).siblings().hide();	
			};
			
		   if(o.xiaoguo == 'danru'){
			  title.hover(function(){
			  	  sw = title.index(this);
				  qh(sw);
			  });
			  //左切
			  $(o.bl).click(function(){
				sw--;
				qh(sw)    
				if(sw == -1){
					sw= title.length-1;
					qh(sw)
				}
			  });
			  //右切
			  $(o.br).click(function(){
				sw++;
				qh(sw);    
				if(sw >= title.length){
					sw= 0;
					qh(sw)
				}
			  });
		   };
		   
		   //是否自动切换
			if(o.auto){
				ks();
				t.hover(function(){
					tz();
				},function(){
					ks();
				});
			};
			function ks(){
				mc = setInterval(function(){			
					if(o.xiaoguo == 'danru'){
						sw++;
						qh(sw)
						if(sw>=title.length){
							sw=0;
							qh(sw)
						};
					};
				}, o.auto+o.time);	
			};
			function tz(){
				clearTimeout(mc);
			};

        });
	}
})(jQuery);
$('#bannerlb').qh({xiaoguo:'danru',bl:'.btn_l',br:'.btn_r',auto:3000,add_class:'wubo',op:200});
$('.gnlist > li').chufa({
	donghuaObj:'.gnpr'
   ,top:-150
   ,hoverAp:0.2
   ,sudu:500
});



// JavaScript Document
$('.gbpng').click(function(){
	$('.appsx').fadeOut(300);	
});
$('.taocannr .newhaomalist ul li').each(function(i){
	$(this).hover(function(){
		$('.taocannr .newhaomalist ul li h4').eq(i).css({fontSize:24})	
	},function(){
		$('.taocannr .newhaomalist ul li h4').eq(i).css({fontSize:23})	
	})
});

$('.gnimglist').each(function(i) {
	$(this).hover(function(){
		$('.boxgn').eq(i).stop().animate({top:-28},300);
		$('.gnjg').eq(i).stop().animate({bottom:12},300)
	},function(){
		$('.boxgn').eq(i).stop().animate({top:0},300);
		$('.gnjg').eq(i).stop().animate({bottom:-30},300)
	});
});







// JavaScript Document
$('.newhaomatitle > li').each(function(i) {
    $(this).hover(function(){
		$(this).addClass('nhmhover').siblings().removeClass('nhmhover')
		$('.newhaomalist > ul').eq(i).show().siblings().hide()
	});
});







// JavaScript Document
if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
	$('.guang360').remove()
} 
if ($.browser.msie && ($.browser.version == "7.0") && !$.support.style) {
	$('.guang360').remove()
} 
if ($.browser.msie && ($.browser.version == "8.0") && !$.support.style) {
	$('.guang360').remove()
} 

//禁止复制
function disableselect(e){
return false}
function reEnable(){return true
}
file://if IE4+
//document.onselectstart=new Function ("return false")
//file://if NS6
//if (window.sidebar){
//document.onmousedown=disableselect
//document.onclick=reEnable
//}


function stop(){

//return false;

}

//document.oncontextmenu=stop;
