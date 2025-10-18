
















if(typeof doyoo=='undefined' || !doyoo){
var d_genId=function(){
    var id ='',ids='0123456789abcdef';
    for(var i=0;i<34;i++){ id+=ids.charAt(Math.floor(Math.random()*16));  }  return id;
};
var doyoo={
env:{
secure:false,
mon:'http://m149.looyu.com/monitor',
chat:'http://ali76.looyu.com/chat',
file:'http://static.doyoo.net/110402',
compId:51000,
confId:110835,
vId:d_genId(),
lang:'sc',
fixFlash:1,
subComp:0
}

, monParam:{
index:-1,

style:{mbg:'http://www.400up.com/images/leyubg.jpg',mh:146,mw:436,
elepos:'0 0 0 0 100 25 321 200 325 12 79 23 391 116 45 30',
mbabg:'http://www.400up.com/images/leyubtn.gif',
mbdbg:'http://www.400up.com/images/leyuguanbi.gif'},

title:'\u5728\u7ebf\u5ba2\u670d',
text:'<span style="font-size:small;"><span style="font-family:Microsoft YaHei;color:#333333;"> </span></span><p><span style="font-size:small;"><span style="font-family:Microsoft YaHei;color:#333333;">\u4f01\u4e1a400\u7535\u8bdd\u5b98\u65b9\u53d7\u7406\u4e2d\u5fc3 \u6b22\u8fce\u60a8<br /></span><span style="font-family:Microsoft YaHei;color:#ff0000;">\u8054\u901a\u7535\u8bdd\u6b22\u4eab\u5b63\uff087.1--7.31\uff09<br /></span><span style="font-family:Microsoft YaHei;"><span style="font-size:medium;color:#333333;">3600\u5143=7100\u5143\u8bdd\u8d39\uff0c\u6027\u4ef7\u6bd4\u6700\u9ad8\uff01<br />\u51b0\u70b9\u8d44\u8d39\uff0c\u5168\u7f51\u6700\u4f4e\u81f30.06\u5143/\u5206\u949f\uff01<br /></span><span style="color:#333333;">\u2605\u9650\u65f6\u62a2\u8d2d\uff0c\u8d85\u503c\u4f18\u60e0\u2605 </span></span></span></p><p>&nbsp;</p>',
auto:140,
group:'72770',
start:'00:00',
end:'24:00',
mask:false,
status:false,
fx:1,
mini:0,
pos:0,
offShow:1,
loop:0,
autoHide:0,
hidePanel:0,
miniStyle:1,
monHideStatus:[0,0,0],
monShowOnly:''
}


, panelParam:{
category:'icon',
position:1,
vertical:210,
horizon:2


,mode:1,
target:'72770',
online:'http://www.400up.com/images/kefu.gif',
offline:'http://www.400up.com/images/kefulx.gif',
width:108,
height:160,
status:0,
closable:0


}


,sniffer:{
ids:'zxbnt.gif,zx.gif,\u53f7\u7801\u8be6\u60c5\uff0c\u54a8\u8be2\u5ba2\u670d,gdwt.png,new_hmzx.gif,new_kf.gif',
gids:'72770,72770,72770,72770,72770,72770'
}

};


document.write('<div id="doyoo_panel"></div>');


document.write('<div id="doyoo_monitor"></div>');

document.write('<div id="doyoo_share" style="display:none;"></div>');
document.write('<lin'+'k rel="stylesheet" type="text/css" href="http://static.doyoo.net/110402/looyu.css?140702"></li'+'nk>');
document.write('<scr'+'ipt type="text/javascript" src="http://static.doyoo.net/110402/looyu.js?140702"></scr'+'ipt>');

}

