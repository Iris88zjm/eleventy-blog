---
layout: posts-zh.liquid
pageSectionID: single-post
title: linux 多域名绑定
postImage: /assets/img/2022/01/demo.jpg
pageDescription: linux 多域名绑定
tags: 
  - linux
date: 2022-01-04
---

域名配置文件的路径 /etc/apache2/sites-available/
软链接路径 /etc/apache2/sites-enabled/

登录XShell进入页面
cd /etc/apache2/sites-available/ //进入目录
ls //当前目录文件列表
linux-1.png
配置新域名(www.zhufupin.cn)
cp 201519.conf zhufupin.conf //复制文件
linux-2.png
vi zhufupin.conf //编辑文件
//vi 命令进入文件时, 需要先按( i键 ), 才能编辑文件; 编辑完成时保存, 需先按( Esc键 ),然后按( : 键 ), 再输入wq , 按回车, 这时文件保存成功
linux-4.png
此时配置文件弄好了, 还需要建立软链接
cd .. //返回上级目录
cd /etc/apache2/sites-enabled/ //进入目录
ln -s /etc/apache2/sites-available/zhufupin.conf //建立新配置域名的软链接
然后需要重启apache2才能生效
/etc/init.d/apache2 restart
linux-3.png
此时服务器重启成功

这时需要登录ftp
新建一个命名为zhufupin的文件夹上传到 /var/www/目录下
然后把源码放在这个zhufupin文件夹里
域名绑定成功,访问www. zhufupin.cn 就会渲染页面