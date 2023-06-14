---
layout: posts-zh.liquid
pageSlug: single-post
title: 磨砂玻璃渐变背景
pageDescription: 妙用滤镜构建高级感拉满的磨砂玻璃渐变背景
tags: 
- css
date: 2023-06-06
---

想要实现磨砂玻璃渐变背景色，我们需要用到多块不规则图形 + 高斯模糊蒙版。在 CSS 中用 <code>background + backdrop-filter: blur()</code> 即可实现。

## 多块不规则图形
使用了 3 个 div 实现了 3 个图形，每个图形再使用 clip-path 随机裁剪成不规则的多边形：
```html
<div class="g-bg">
    <div class="g-polygon g-polygon-1"></div>
    <div class="g-polygon g-polygon-2"></div>
    <div class="g-polygon g-polygon-3"></div>
</div>
```
```css
#frosted-glass .g-bg {
    position: relative;
    width: 100%;
    height: 60vh;
    min-height: 600px;
    overflow: hidden;
  }

  #frosted-glass .g-polygon {
    position: absolute;
    opacity: .5;
  }

  #frosted-glass .g-bg::before {
    content: "";
    position: absolute;
    top: 0; 
    left: 0; 
    bottom: 0; 
    right: 0;
    backdrop-filter: blur(150px);
    z-index: 1;
  }

  #frosted-glass .g-polygon-1 {
    left: 35%;
    bottom: 0%;
    width: 60%;
    height: 70%;
    background: #ffee55;
    clip-path: polygon(0 10%, 30% 0, 100% 40%, 70% 100%, 20% 90%);
  }

  #frosted-glass .g-polygon-2 {
    left: 0%;
    bottom: 35%;
    width: 50%;
    height: 60%;
    background: #E950D1;
    clip-path: polygon(10% 0, 100% 70%, 100% 100%, 20% 90%);
  }

  #frosted-glass .g-polygon-3 {
    right: 0%;
    bottom: 20%;
    width: 50%;
    height: 75%;
    background: rgba(87, 80, 233);
    clip-path: polygon(80% 0, 100% 70%, 100% 100%, 20% 90%);
  }
```
<div class="divimg-wrapper">
  <div class="img">
    <img src="/assets/img/2023/06/css-frosted-glass-1.jpg" alt="多块不规则图形">
  </div>
  <div class="img-desc">图 1: 多块不规则图形</div>
</div>

## 使用 backdrop-filter 实现高斯模糊蒙版
查看 <a href="https://caniuse.com/?search=backdrop-filter" target="_blank">backdrop-filter</a> 兼容性

这一步最为关键，叠在上述几个元素上方即可，最关键的一行代码 <code>backdrop-filter: blur(150px)</code>。注意，这里使用的是 backdrop-filter: blur()，而不是 filter: blur()。
```css
  #frosted-glass .g-bg::before {
    content: "";
    position: absolute;
    top: 0; 
    left: 0; 
    bottom: 0; 
    right: 0;
    backdrop-filter: blur(150px);
    z-index: 1;
  }
```
<div class="divimg-wrapper">
  <div class="img">
    <img src="/assets/img/2023/06/css-frosted-glass-2.jpg" alt="高斯模糊蒙版">
  </div>
  <div class="img-desc">图 2: 高斯模糊蒙版</div>
</div>

## 借助 CSS-doodle 工具，生成更酷炫的效果
简单了解了原理之后，我们就可以借助 CSS-doodle 尝试批量来生成这个效果了。

>CSS-doodle 它是一个基于 Web-Component 的库。允许我们快速的创建基于 CSS Grid 布局的页面，并且提供各种便捷的指令及函数（随机、循环等等），让我们能通过一套规则，得到不同 CSS 效果。

感兴趣可以在官网了解 -- <a href="https://css-doodle.com" target="_blank">CSS-doodle</a>

代码非常简单，也非常好理解，就是随机场景不同尺寸、不同定位、不同颜色、不同形式的几个图形：
```html
<css-doodle>
    :doodle {
        @grid: 1x8 / 100vmin;
    }
    @place-cell: center;
    width: @rand(40vmin, 80vmin);
    height: @rand(40vmin, 80vmin);
    transform: translate(@rand(-200%, 200%), @rand(-60%, 60%)) scale(@rand(.8, 1.8)) skew(@rand(45deg));
    clip-path: polygon(
      @r(0, 30%) @r(0, 50%), 
      @r(30%, 60%) @r(0%, 30%), 
      @r(60%, 100%) @r(0%, 50%), 
      @r(60%, 100%) @r(50%, 100%), 
      @r(30%, 60%) @r(60%, 100%),
      @r(0, 30%) @r(60%, 100%)
    );
    background: @pick(#f44336, #e91e63, #9c27b0, #673ab7, #3f51b5, #60569e, #e6437d, #ebbf4d, #00bcd4, 
                      #03a9f4, #2196f3, #009688, #5ee463, #f8e645, #ffc107, #ff5722, #43f8bf);
    opacity: @rand(.3, .8);
</css-doodle>
```
配合上蒙版，再看看效果，我们已经能够批量的去生成上述的背景效果了：
<div class="divimg-wrapper">
  <div class="img">
    <img src="/assets/img/2023/06/css-frosted-glass-3.jpg" alt="变化的多块不规则图形">
  </div>
  <div class="img-desc">图 3: 变化的多块不规则图形</div>
</div>

如果需求，配合上 hue-rotate 及简单的位移，我们甚至可以让这个渐变背景动画动起来，更加生动些

```html
<css-doodle>
    // 同上...
    position: relative;
    top: @rand(-80%, 80%);
    left: @rand(-80%, 80%);
    animation: colorChange @rand(6.1s, 16.1s) infinite @rand(-.5s, -2.5s) linear alternate;
  
  @keyframes colorChange {
    100% {
      left: 0;
      top: 0;
      filter: hue-rotate(360deg);
    }
  }
</css-doodle>
```

这样，我们就得到了带动画的磨砂玻璃渐变背景：

<div class="divimg-wrapper">
  <div class="img">
    <img src="/assets/img/2023/06/css-frosted-glass-4.jpg" alt="带动画的磨砂玻璃渐变色">
  </div>
  <div class="img-desc">图 4: 带动画的磨砂玻璃渐变色</div>
</div>

<a href="{{ baseURL | url }}/demo/css/frosted-glass/" target="_blank">看实例</a>

转载：<a href="https://github.com/chokcoco/iCSS/issues/157" target="_blank">https://github.com/chokcoco/iCSS/issues/157</a>