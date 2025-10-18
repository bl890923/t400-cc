// JavaScript Document

$(document).ready(function(){
	$('.navbox ul li').chufa({add_class:'navhover'})//导航hover Class
	
	$('.nav03').hover(function(){
		$(this).children('img').stop().animate({top:'-12px'},200)
		if($(this).children('img').css({top:'-12px'})){
		  $(this).children('img').stop().animate({top:'-4px'},200)
		}else{	
		}
	},function(){
		$(this).children('img').css({top:'-4px'})
	});
	
	$('.nav04').hover(function(){
		$(this).children('img').stop().animate({top:'-12px'},200)
		if($(this).children('img').css({top:'-12px'})){
		  $(this).children('img').stop().animate({top:'-4px'},200)
		}else{	
		}
	},function(){
		$(this).children('img').css({top:'-4px'})
	});

	
	$('.youshilist > li').each(function(i){						
		$(this).hover(function(){
			$('.yshover').stop().animate({left: i*122},300);
			$('.ystextlist').stop().animate({top:i*-85+10},200);
		});						
	});
	
	$('.youshilist > li').hover(function(){	
		$(this).css({color:'#4093d8',cursor:'pointer'})
			},function(){
		$(this).css({color:''})
	});

	$('.youshtext > p').each(function(i){
		$(this).css({top: i*50+15});								  
	});


	$('.gnlist > li').chufa({donghuaObj:'.gnpr',top:-146,hoverAp:0.2,sudu:500});//了解400特色

	
	/*开通流程*/
	$('.liucheng > ul > li').chufa({donghuaObj:'.jiantou',left:190,shijian:'hover'})
	
	/*促销号码*/
	$('.haomatitle').uiEnd({borderRight:'none',width:186});
	$('.hm').uiEnd({marginRight:0});
	$('.haomasw').tabs({add_class:'taghover',xiaoguo:'huadong',auto:3000});
	
	$('.tcbox > li').each(function(i){
		$(this).hover(function(){
			$(this).css({background:'#ededed'});
		},function(){
			$(this).css({background:''});
		});
	});

	//子页面标签切换
	$('#right').tag('r_tag_h');
	
	$('.diqubox').tag('dqhover');
	$('.hangye').tag('dqhover');
    
	//关于我们
	$('.aboutbox').tag('r_tag_h');
	
	/*号码库*/
	$('.btn > input').op(200,0.8);
	
	//常见问题
   // $('.qalist').zk('qatitle');	
	$('.apply').tag('applyh');
	
	
  
});

//Cookie 操作
var com = window.com || {}; 
com.Cookie = (function(){
	var Days = 30;
	var getsec = function(str) {
		if(!str){
			return Days * 24 * 60 * 60 * 1000;
		}
		else{
			var str1 = str.substring(1, str.length) * 1;
			var str2 = str.substring(0, 1);
			if (str2 == 's') {
				return str1 * 1000;
			} else if (str2 == 'h') {
				return str1 * 60 * 60 * 1000;
			} else if (str2 == 'd') {
				return str1 * 24 * 60 * 60 * 1000;
			}
		}
	};
	var set = function (name,value,time){
		var strsec = getsec(time);
		var exp = new Date();
		exp.setTime(exp.getTime() + strsec*1);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	};
	var get = function(name){
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if (arr != null) return unescape(arr[2]);
		return null;
	};
	var del = function(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = get(name);
		if (cval != null) document.cookie = name + " = " + cval + "; expires = " + exp.toGMTString();
	};
	return {
		/* 写cookie
		 * s指示秒，20秒 ：s20
		 * h指小时，12小时：h12
		 * d指天数，30天：d30
		 */
		setCookie: set,
		//读取cookies
		getCookie: get,
		//删除cookie
		delCookie: del
	};
})();


