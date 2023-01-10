---
layout: posts-zh.liquid
pageSlug: single-post
title: css linear-gradient
pageDescription: css linear-gradient
tags: 
- css
date: 2023-01-10
---
linear-gradient(): 创建了一个由两个或多个颜色沿直线渐进过渡的图像。其结果是一个<gradient>数据类型的对象，它是<image>的一种特殊类型。
```css
/* A gradient tilted 45 degrees,
   starting blue and finishing red */
linear-gradient(45deg, blue, red);

/* A gradient going from the bottom right to the top left corner,
   starting blue and finishing red */
linear-gradient(to left top, blue, red);

/* Color stop: A gradient going from the bottom to top,
   starting blue, turning green at 40% of its length,
   and finishing red */
linear-gradient(0deg, blue, green 40%, red);

/* Color hint: A gradient going from the left to right,
   starting red, getting to the midpoint color
   10% of the way across the length of the gradient,
   taking the rest of the 90% of the length to change to blue */
linear-gradient(.25turn, red, 10%, blue);

/* Multi-position color stop: A gradient tilted 45 degrees,
   with a red bottom-left half and a blue top-right half,
   with a hard line where the gradient changes from red to blue */
linear-gradient(45deg, red 0 50%, blue 50% 100%);
```
### side-or-corner
梯度线的起点位置。如果指定了，它由 to 这个词和最多两个关键词组成：一个表示水平面（left 或 right），另一个表示垂直面（top 或 bottom）。侧面关键词的顺序并不重要。如果没有指定，则默认为 to bottom。
to top, to bottom, to left, 和 to right 分别相当于0度、180度、270度和90度的角度。其他的值被翻译成一个角度。
### angle
梯度线的方向角。0deg的值相当于 to top；增加的值从这里开始顺时针旋转。

### linear-color-stop
一个 color-stop 的<color>值，后面是一个或两个可选的stop positions，（每个都是沿梯度轴的<percentage>或<length>）。

### color-hint
一个插值提示，定义渐变在相邻色块之间的进展情况。长度定义了在两个色块之间，渐变的颜色应该在哪一点达到颜色过渡的中点。如果省略，颜色过渡的中点就是两个色块之间的中点。