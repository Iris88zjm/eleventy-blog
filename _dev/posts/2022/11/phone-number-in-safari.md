---
layout: posts-zh.liquid
pageSlug: single-post
title: 浏览器中电话号码样式
postImage: /assets/img/2022/01/05-1.jpg
pageDescription: 禁用手机浏览器电话号码的链接样式
tags: 
  - html
date: 2022-11-14
---
iPhone手机上的浏览器(如Safari), 在解析网页的时候会自动给出像是电话号码的数字, 再加上link样式。

可以添加下面的meta禁用掉这个功能。

```html
<meta name="format-detection" content="telephone=no">
```