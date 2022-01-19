---
layout: posts-zh.liquid
pageSectionID: single-post
title: 图片懒加载处理
postImage: /assets/img/2022/01/07-1.jpg
pageDescription: 兼容大部分浏览器的图片懒加载处理
tags: 
  - html
  - javascript
date: 2022-01-17
---

## 前言

>HTML元素 img 延迟加载属性 —— loading 属性值 lazy 允许浏览器选择性加载 img 元素, 根据用户滚动操作至其元素附近执行加载, 一定程度起到节流的作用。

延迟加载也称为惰性加载, 即在长网页中延迟加载图像。用户滚动到它们之前, 视口外的图像不会加载。这与图像预加载相反, 在长网页上使用延迟加载将使网页加载更快。在某些情况下, 它还可以帮助减少服务器负载。

举个例子来说明, 当打开淘宝首页的时候, 只有在浏览器窗口里的图片才会被加载, 当你滚动首页向下滑的时候, 进入视口内的图片才会被加载, 而其它从未进入视口的图像不会也不会加载。

那么延迟加载有什么好处
1. 首先它能提升用户的体验, 试想一下, 如果打开页面的时候就将页面上所有的图片全部获取加载, 如果图片数量较大, 对于用户来说简直就是灾难, 会出现卡顿现象, 影响用户体验。
2. 有选择性地请求图片, 这样能明显减少了服务器的压力和流量, 也能够减小浏览器的负担。

先查看 [loading](https://caniuse.com/?search=loading) & [lazy](https://caniuse.com/?search=lazy) 有哪些浏览器能支持

## 图片懒加载处理方式

大部分浏览器是支持的, 我们可以直接在 img 标签中添加 `loading="lazy"`

```html
<img loading="lazy" src="/assets/img/xxx@1x.jpg" alt="xxx">
```

如果浏览器不支持, 那我们可以用 <a href="[{{ baseURL | url }}/loading/](https://github.com/aFarkas/lazysizes)" target="_blank">lazysizes plugin</a> 

在 img 标签中添加 `class="lazyload" loading="lazy"`, 同时使用 data-src 属性, lazysizes 会把 data-src 转成 src

```html
<div class="divimg">
  <picture>
    <source data-srcset="/assets/img/xxx@1x.webp 1x, /assets/img/xxx@2x.webp 2x">
    <source data-srcset="/assets/img/xxx@1x.jpg 1x, /assets/img/xxx@2x.jpg 2x">
    <img class="lazyload" loading="lazy" data-src="/assets/img/xxx@1x.jpg">
  </picture>
</div>
```

如果需要在图片懒加载时, 出现一个加载图片, 可以添加 src 属性
```html
<div class="divimg">
  <picture>
    <source data-srcset="/assets/img/xxx@1x.webp 1x, /assets/img/xxx@2x.webp 2x">
    <source data-srcset="/assets/img/xxx@1x.jpg 1x, /assets/img/xxx@2x.jpg 2x">
    <img class="lazyload" loading="lazy" src="/assets/img/loading.svg" data-src="/assets/img/xxx@1x.jpg">
  </picture>
</div>
```

判断浏览器是否支持 loading, 请使用 `'loading' in HTMLImageElement.prototype`

如果支持则直接用 `loading="lazy"`; 若不支持则使用 lazysizes plugin
```javascript
const supportLoading = 'loading' in HTMLImageElement.prototype;
// let targetSpan = document.getElementById('boolean');
// targetSpan.innerHTML = supportLoading;

if (supportLoading) {
  const imgTag = document.querySelectorAll('img[loading="lazy"]');
  imgTag.forEach(function(img) {
    let pictureTag = img.parentNode.children;
    for (var i = 0; i < pictureTag.length; i++) {
      if (pictureTag[i].dataset.srcset) {
        pictureTag[i].srcset = pictureTag[i].dataset.srcset
      }
      if (pictureTag[i].dataset.src) {
        pictureTag[i].src = pictureTag[i].dataset.src
      }
    }
  })
} else {
  const script = document.createElement('script');
  script.src = '/assets/js/lazysizes.min.js';
  document.body.appendChild(script);
}
```

## 相关链接

<a href="{{ baseURL | url }}/loading/" target="_blank">本站图片懒加载 demo</a>

<a href="[{{ baseURL | url }}/loading/](https://web.dev/browser-level-image-lazy-loading/)" target="_blank">浏览器不支持 lazy-loading 处理方式</a>

<a href="[{{ baseURL | url }}/loading/](https://web.dev/fast/#lazy-load-images-and-video)" target="_blank">了解更多懒加载</a>