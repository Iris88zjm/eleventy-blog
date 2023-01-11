---
layout: posts-zh.liquid
pageSlug: single-post
title: 论id和class属性值加双引号与不加双引号的影响
pageDescription: ""
tags: 
  - html
date: 2022-05-08
---

在开发过程中，遇见客户反映，移动页面的某个数值，在刷新页面的时候时而出现，时而不出现，特别是在UC浏览器

首先想到的是：是不是因为不同浏览器的原因，或者是因为网速慢，数据还没有加载出来

通过不同浏览器的测试，同时在不同网速下模拟，都没有发现问题，就是在网速差的时候，数值出现的慢，但是不至于不出现

最后，

才发现，原来是对应的属性值没有加上双引号

原来是
```html
<span class=num></span>
```
改成
```html
<span class="num"></span>
```
通过测试，没问题了