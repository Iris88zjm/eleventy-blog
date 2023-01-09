---
layout: posts-zh.liquid
pageSlug: single-post
title: wordpress 邮件接收不了
pageDescription: wordpress 邮件接收不了
tags: 
  - wordpress
date: 2022-12-20
---

wordpress 使用Contact Form 7和Contact7 DB这两个插件来制作表单发送和接收

其中Contact Form 7是用来制作表单

Contact7 DB是用来接收表单的数据

当以上两个插件都安装和制作好以后, 发现提交表单时, 邮件还是接收不了

这时, 查看服务器是否安装sendmail, 在/usr/sbin/, 查看vi sendmail, 若没有则输入apt-get install sendmail