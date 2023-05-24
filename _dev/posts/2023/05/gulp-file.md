---
layout: posts-zh.liquid
pageSlug: single-post
title: 使用 gulp 读取写入文件
pageDescription: 使用 gulp readdirSync readFileSync writeFileSync 读取写入文件 
tags: 
- gulp
date: 2023-05-18
---

在项目中，我们经常需要从大量的 json 中提取自己想要的数据。这么文章告诉我们，如何从文件夹中读取 json 数据，同时抓取项目所需数据，写入到另一个文件中。

本文项目需求：
1. 博客数据(多个 json)都放在 _dev/_data/blogs 目录下
2. 读取json 文件中的数据，提取每个博客的 title/description/image，这些数据用于添加到 page meta 属性
3. 把所有数据写入 blogsmeta.json 中

## 读取文件：
我们可以用 <code>fs.readdirSync(path)</code> 找到文件夹中的文件。

然后遍历文件夹下的所有文件，对数据进行逻辑处理，提取对应的信息赋值到 blogMeta

## 写入文件
把 blogMeta 写入对应的文件中 <code>fs.writeFileSync(path, JSON.stringify(Object, undefined, 2));</code>

注意写入文件是异步事件

```javascript
const fs = require("fs");
async function writeBlogMeta() {  
  let files = [],
      blogMeta = {};
  files = fs.readdirSync('_dev/_data/blogs');
  files.forEach(function (file) {
    let blogFile = fs.readFileSync(`_dev/_data/blogs/${file}`, { encoding: 'utf8', flag: 'r' });
    let jsonData = JSON.parse(blogFile.toString());
    jsonData.posts.map((blog) => {
      let blogKey = blog.ID.toString();
      if(!(blogKey in blogMeta)) {
        blogMeta[blogKey] = { title: blog.title, description: blog.excerpt, image: blog.featured_image };
      }
    })
  })
  try {
    fs.writeFileSync(
      `_dev/_data/blogsmeta.json`, JSON.stringify(blogMeta, undefined, 2)
      );
  } catch (e) {
    console.log("Error: ", e);
  }
}
```


