---
layout: posts-zh.liquid
pageSlug: single-post
title: css margin collapse 
pageDescription: css 中关于 margin 崩塌的问题与解决方法
tags:  
  - css
date: 2022-08-10
---
## Margin Collapse 的定义
在W3C的规范中，关于 margin collapse 的描述如下：
>If the top and bottom margins of an element with clearance are adjoining, its margins collapse with the adjoining margins of following siblings but that resulting margin does not collapse with the bottom margin of the parent block.

直译过来
>若一个具有 clear 样式的元素，其 margin-top 与 margin-bottom 接连在一起，该元素的 margin 会与其邻接兄弟元素的 margin 合并，但其最终 margin 不会与其父亲元素的 margin-bottom 合并。

## Margin Collapse 的发生条件
我们用一个例子
```html
  <!DOCTYPE html>
  <html>
  <style>
    .case { width: 200px; background-color: yellow; }
    .container { background-color: lightblue; margin-bottom: 70px; padding-top: 1px; }
    .preface { float: left; height: 58px; width: 100px; border: 1px solid red; }
    .one .intro { clear: left; margin-top: 60px; }
    .two .intro { clear: left; margin-top: 59px; }
  </style>
  <div class="case one">
      <div class="container" >
          <div class="preface">
              lorem ipsum
          </div>
          <div class="intro"></div>
      </div>
      after
  </div>
  <hr>
  <div class="case two">
      <div class="container">
          <div class="preface">
              lorem ipsum
          </div>
          <div class="intro"></div>
      </div>
      after
  </div>
  </html>
```
*本文的实验与结论均基于windows 7系统中Chrome 49.0.2623.110版本*

例中，case one 与 case two 应用了相同的样式，除了 .intro 的 margin-top，前者为60px，后者为59px。从结果来看，case two应当是想象中的效果，而case one的效果则大相径庭。

<div class="divimg-wrapper">
  <div class="img">
    <img src="/assets/img/2022/01/04-2.png" alt="Margin collapse导致的理论与实际的差异">
  </div>
  <div class="img-desc">图 1: Margin collapse导致的理论与实际的差异</div>
</div>

图1正好验证了W3C的规范，对于case one，当 .intro 有 clear 属性时，.container 的 margin-bottom 与 .intro 的 margin-top 合并了，根据实验可知，当 .intro 的 margin-top 大于等于 .preface 的总高度时，.intro 的 margin-top 将会与 .container 的 margin-bottom 合并。

<div class="divimg-wrapper">
  <div class="img">
    <img src="/assets/img/2022/01/04-3.png" alt="页面元素的各项尺寸的计算">
  </div>
  <div class="img-desc">图 2: 页面元素的各项尺寸的计算</div>
</div>

如图2所示，各个标数与样式的对应关系如下：

1px 为 .container 样式中的 “padding-top: 1px;”，此样式设置是为了防止.intro的margin-top与.container的margin-top之间导致的collapse；

18px 为 “after” 所占据的行高；

Case one: .intro 的 margin-top 为 60px，.preface 的总高度为(58+2)px=60px。此时.intro的margin-top与.preface的总高度相等，margin collapse；

Case two: .intro 的 margin-top 为 59px，.preface 的总高度仍为60px。此时，前者比后者小，margin维持原状。

## Margin Collapse 的解决方法
在 .container 的样式中加入 “overflow: hidden;”

在 .container 的样式中加入 “border: 1px solid #00F;”

在 .container 的样式中加入 “padding: 1px;”