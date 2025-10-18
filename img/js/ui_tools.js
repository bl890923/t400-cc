(function($){
//标签切换、滑动门
$.fn.tabs=function(o){
	var t=$(this);
	var defaults={
		add_class:null
	   ,block:0
	   ,shijian:'hover'
	   ,xiaoguo:'qiehua'
	   ,sudu:300
	   ,op:200
	   ,auto:null
	   ,time:200
	   ,Event:"click"
	   ,title:null
	   ,vs:1
	   ,btn_l:null
	   ,btn_r:null
	};
	var o=$.extend(defaults, o);
	var sw=0;
	var cldh=null;
	return t.each(function(i){
		
		var title   =  t.find(o.title).children();   //获取当前按钮
		var nrlist  =  t.children().eq(1).children();//获取当前显示的内容
		var listbox =  t.children().eq(1); //获取切换容器的父级
		
		//listbox.hide()
		//nrlist.hide();
		//nrlist.eq(o.block).show();
		title.eq(o.block).addClass(o.add_class);
		var t_w    =   t.children().eq(1).children().width();
		
	//	alert(t_w)
	
		//简单切换效果
		function qh(i){
			title.eq(i).addClass(o.add_class).siblings().removeClass(o.add_class);//当前样式名
			nrlist.eq(i).show().siblings().hide();//当前显示的内容
		};
		//切换淡入效果
		function dr(i){
			title.eq(i).addClass(o.add_class).siblings().removeClass(o.add_class);
			nrlist.eq(i).stop(true,true).fadeIn(o.op).siblings().hide();
		};
		
		//切换滑动效果	
		function hd(i){
			title.eq(i).addClass(o.add_class).siblings().removeClass(o.add_class);
			hide.stop().animate({left:-t_w*i},o.sudu)
		};
		
		//滑动效果		
		if(o.xiaoguo== 'huadong'){
			
			listbox.css({width:o.vs*t_w,position:'relative',overflow:'hidden'});
			var hide=$('<div>');
			hide.appendTo(listbox);
			nrlist.appendTo(hide);
			nrlist.css({float:'left',width:t_w});
			hide.css({width:t_w*nrlist.length,position:'absolute'});
			
		};
		
		$(o.btn_l).bind('click',function(){
			sw--;
			hd(sw)    
			if(sw == -1){
				sw= title.length-1;
				hd(sw);
			}
		});
		$(o.btn_r).bind('click',function(){
			sw++;
			hd(sw)    
			if(sw >= title.length){
				sw=0;
				hd(sw);
			};
		});
			
		//绑定事件
		title.bind(o.Event,function(){
			if(o.xiaoguo== 'qiehua'){
				sw=title.index(this);
				qh(sw);
			};
			if(o.xiaoguo== 'danru'){
				sw=title.index(this);
				dr(sw);
			};
			if(o.xiaoguo== 'huadong'){
				sw=title.index(this);
				hd(sw)
			};
		});
			
		//自动切换函数
		function kaishi(){
			mc = setInterval(function(){
				if(o.xiaoguo== 'huadong'){
					hd(sw);
				};
				if(o.xiaoguo== 'danru'){
					dr(sw);
					};
				if(o.xiaoguo== 'qiehua'){
					qh(sw);
				};
				sw++;
				if(sw==title.length){
					sw=0;
				};
			},o.auto+o.time);
		};
		//停止切换函数
		function tingzhi(){
			clearTimeout(mc);
		};
		//是否自动切换速度
		if(o.auto){
			kaishi();
			t.hover(function(){
				tingzhi();
			},function(){
				kaishi();
			});
		};
		
		
	});
}
,$.fn.uiEnd=function(css,o){
	var defaults = {add_class:null};
	var o=$.extend(defaults,o)
	$(this).each(function(i){
		$(this).children().last().addClass(o.add_Class).css(css);
    });
}
,$.fn.tag = function(c){
	var $t = $(this);
	var $e = $t.children();
	$e.eq(0).children().each(function(i){
		$e.eq(1).children().eq(0).show();
		$e.eq(0).children().eq(0).addClass(c);
		
		//$(this).attr('id','s'+i)
		
		$("#s"+request("type")).addClass(c).siblings().removeClass();
		$(".s"+request("type")).show().siblings().hide();
		
		$(this).click(function(){
			$(this).addClass(c).siblings(this).removeClass(c);
			$t.children().eq(1).children('div:eq('+i+')').show().siblings('div').hide();	
		});
		
	});
	function request(paras){ 
		var url = location.href;  
		var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");  
		var paraObj = {} ;
	 
		for (i=0; s=paraString[i]; i++){  
			paraObj[s.substring(0,s.indexOf("=")).toLowerCase()] = s.substring(s.indexOf("=")+1,s.length);  
		}  
		var returnValue = paraObj[paras.toLowerCase()];  
			if(typeof(returnValue)=="undefined"){  
			return "";  
		}else{  
		return returnValue; 
		}
	}
}
,$.fn.ts = function(o){
	
	var defaults = {
		text:null
	   ,w:null
	   ,bg:null
	};
	var tsdiv = '<div class="tsbox"><img src="http://img.t400.cc/images/images2014/jtbg.png"  /><p></p></div>';
	var o = $.extend(defaults,o)
	
	$(this).bind("hover",function(){
 		 $('body').append(tsdiv);
		 $('.tsbox').children('p').text(o.text)
		 $('.tsbox').hide();
		 var topz = $(this).offset().top + $(this).height();
		 $('.tsbox').css({
		 	 left:$(this).offset().left
			,top :topz
		 });
		 $('.tsbox').css({width:o.w,background:o.bg})
		 
		// if($('.tsbox').position().left < $(document).width()- $(this).width()){
		//	 alert('2')
		//	 $('.tsbox').css({right:0})	
		 //};
		 
		 $('.tsbox').show();
		 $('.tsbox').animate({top:topz + 12},200);
	});
	$(this).mouseleave(function(){
		$('.tsbox').remove();
	});
}
//鼠标触发功能
,$.fn.chufa = function(o){
	var defaults = {
	   pic_sw:null //图片开关
	  ,c:null
	  ,tihuan:null//要替换图片的对象
	  ,hover_img:null //鼠标移上去的图片
	  ,out_img:null//鼠标离开的图片
	  ,add_class:null//鼠标移上去添加一个class
	  ,donghuaObj:this
	  ,left:null //hover left 值
	  ,top:null //hover top 值
	  ,outLeft:null //out left值
	  ,outTop:null //out top值
	  ,touming:null//hover 透明度
	  ,sudu:300//动画速度
	  ,shijian:null
	};
	var o = $.extend(defaults, o);
	var w_l = $(o.donghuaObj).css('left')
	var w_t = $(o.donghuaObj).css('top')

	return $(this).each(function(i){
		
		
		
			
			$(o.donghuaObj).css({opacity:o.touming})
			$(this).hover(function(){
			$(this).addClass(o.add_class)//添加class
			$(o.tihuan).attr("src",o.hover_img);//替换图片
			$(o.donghuaObj).eq(i).stop().animate({left:o.left||w_l , top:o.top|| w_t, opacity:1},o.sudu);//要动的对象
			},function(){
				$(this).removeClass(o.add_class)//清除添加的class
				$(o.tihuan).attr("src",o.out_img);//out图标
				$(o.donghuaObj).eq(i).stop().animate({left:o.outLeft || w_l,top:o.outTop || w_t});//退出动画
			}); 
		
		
		
	})
}
//提示显示隐藏
,$.fn.s_h = function(s,t,c){
	$(this).each(function(i){
		$(this).hover(function(){
			$(this).addClass(c);
			$(this).children().fadeIn(s);
		},function(){
			$(this).children().fadeOut(t);
			$(this).removeClass(c);
		});
	});
}

//鼠标hover淡入淡出
,$.fn.op = function(s,a){
	$(this).each(function(i){
		$(this).hover(function(){
			$(this).fadeTo(s||200,a||0.6);
		},function(){
			$(this).fadeTo(s||200,1)});
	});
}
//手风琴
,$.fn.zk = function(){
	var $t = $(this ).children("h4:nth-child(odd)");
	$t.eq(0).addClass('titleH')
	$t.eq(0).next().show();
	$t.click(function(){
		$(this).next("p").slideToggle(300)
		.siblings("p:visible").slideUp(300);
		$(this).toggleClass("titleH");
		$(this).siblings(".titleH").removeClass("titleH");
	});
}
//新版上下左右局中
,$.fn.md=function(){
	t = $(this);
	t.css({position:'relative'});
	function md(){
		var t_e = t.children();
		t_e.css({position:'absolute',left:t.width()/2 - t_e.width()/2});
	}
	window.onload = function(){
		md()
	}
	$(window).resize(function(){
		md()
	});
}
//左右上下居中
,$.fn.middle = function(){
	var $t = $(this)
	window.onload = function(){
		md()
	}
	$(window).resize(function(){
		md()
	});
	function md(){
		var $wh  = $(window).height();
		var $dw  = $(document).width();
		var $tw  = $t.width()
		var $th  = $t.height()
		$t.css({left:$dw/2-$tw/2,top:$wh/2 - $th/2});
	}
	
}
,$.fn.qiehuan = function(o){
	var defaults = {
		xianshishu:1
	   ,qiehuanshu:1
	   ,left_cut:'left_cut'
	   ,right_cut:'right_cut'
	   ,sudu:300 //切换速度
	   ,bofangsudu:3000//播放速度
	   
	}	
	var o = $.extend(defaults, o);
	return $(this).each(function(i){
		var obj  = $(this);
		var erzi = obj.children();
		erzi.children().last().after(erzi.html());
		var list = erzi.children();
		
		obj.css({position:'relative',width:list.width()*o.xianshishu,height:123,overflow:'hidden'});//设置切换区域样式
		erzi.css({width:list.width()*list.length,position:'absolute',left:0});//列表父样式
		list.css({float:'left'});//列表样式
		var left = erzi.left;
		yiban = erzi.width()/2
		function z_dong(){
			if(erzi.position().left <= -yiban){
				erzi.css({left:0});
			};
			//alert()
			erzi.stop().animate({left:'-='+ list.width()*o.qiehuanshu},o.shudu);
		};
		function r_dong(){
			if(erzi.position().left <= -yiban){
				erzi.css({left:0});
			};
			//alert()
			erzi.stop().animate({left:'-='+ list.width()*o.qiehuanshu},o.shudu);
		};
		
		$(o.left_cut).click(function(){
			z_dong()
		});
		$(o.right_cut).click(function(){
			r_dong();
		});
		var myTime = setInterval(function(){
	  		 z_dong();
	  	 } , o.bofangsudu);
		 
		
		 list.mouseover(function(){
			 clearInterval(myTime)
			 
		 });
		 list.mouseout(function(){
			var myTime = setInterval(function(){
	  		 z_dong();
	  	 	} , o.bofangsudu)
		 })

	});
	
}
})(jQuery)