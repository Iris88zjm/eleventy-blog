const ORIGIN=$("html").data("origin");function scrollPageNav(e,t,o,l){if($(o).length>0){let i=$(o).offset().top;e>=i&&e<i+$(o).outerHeight()&&($(t+" .container-left ul li").removeClass("active"),$(t+" .container-left ul li:nth-child("+l+")").addClass("active"))}}function setCookie(e,t,o){let l=window.location.pathname.substring(0,1),i=new Date;i.setTime(i.getTime()+24*o*60*60*1e3),document.cookie=e+"="+t+";expires="+i.toGMTString()+";path="+l}function getCookie(e){let t=document.cookie.match(new RegExp("[sS]*"+e+"=([^;]*)"));return null!=t?t[1]:null}function removeCookie(e){let t=new Date;t.setTime(t.getTime()+-864e5),document.cookie=e+"=; expires="+t.toUTCString()+"; path=/"}if(document.getElementById("skillsChart")){var skillsChart=echarts.init(document.getElementById("skillsChart"));option={title:{},textStyle:{fontFamily:'"nanoleaf", sans-serif'},color:["#3fae29"],legend:{},grid:{left:"0%",right:"0%",containLabel:!0},xAxis:{type:"category",data:["HTML","CSS","Javascript","jQuery","Node","Vue","MySQL","SQL Server","PHP",".NET","Liquid"]},yAxis:{},series:[{data:[95,90,80,80,70,85,75,75,60,50,90],type:"bar",barWidth:"30%",itemStyle:{},label:{show:!0,position:"inside"},showBackground:!0,backgroundStyle:{color:"rgba(220, 220, 220, 0.8)"}}]},skillsChart.setOption(option)}(new WOW).init(),$((function(){$("html").attr("data-theme",getCookie("theme-color")),"dark"==getCookie("theme-color")&&$("footer .theme-switch input").prop("checked",!0),$("footer .theme-switch label").on("tap click",(function(){$(this).siblings("input")[0].checked?($("html").attr("data-theme","light"),setCookie("theme-color","light",7)):($("html").attr("data-theme","dark"),setCookie("theme-color","dark",7))})),$("header .toggle-menu").on("tap click",(function(){return $("header .menus-container").addClass("active"),!1})),$("header .menus-container .global-close-icon").on("tap click",(function(){return $("header .menus-container").removeClass("active"),!1})),$("#links .open-popup").on("tap click",(function(){return $("#links .container-left").addClass("active"),!1})),$("#links .close-popup").on("tap click",(function(){return $("#links .container-left").removeClass("active"),!1})),$("#links .container-left ul li a").on("tap click",(function(){let e=$(this).attr("href"),t=0;return t=window.screen.width>=1024?"#vue"==e?100:40:100,$("#links .container-left").removeClass("active"),$("html, body").animate({scrollTop:$("#links "+e).offset().top-t},500),!1})),$(window).scroll((function(){let e=$(this).scrollTop()+100;$("#links").length>0&&(scrollPageNav(e,"#links","#vue",1),scrollPageNav(e,"#links","#11ty",2),scrollPageNav(e,"#links","#javascript",3),scrollPageNav(e,"#links","#css",4),scrollPageNav(e,"#links","#node",5),scrollPageNav(e,"#links","#wordpress",6),scrollPageNav(e,"#links","#canvas",7),scrollPageNav(e,"#links","#charts",8),scrollPageNav(e,"#links","#tech",9),scrollPageNav(e,"#links","#blogs",10),scrollPageNav(e,"#links","#design",11))}))}));