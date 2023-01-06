---
layout: posts-zh.liquid
pageSlug: single-post
title: 如何在 Eleventy 中创建草稿
postImage: /assets/img/2022/01/07-1.jpg
pageDescription: 如何在 Eleventy 中创建草稿
tags: 
date: 2023-02-04
---

博客网站草稿是很有用的，尤其是当帖子需要写很多东西的时候。 让我们看看如何将它们添加到我们的站点。

## Eleventy 中的草稿：
我们的想法是在帖子的 Front Matter 中添加 "draft"，这样当我们将其设置为 true 时，帖子将被视为草稿。

然后我们将为所有已发布的帖子创建一个集合，并使用它来打印列表。

## 下面来写11ty中添加草稿的代码
我假设您在 _dev/posts 文件夹中有您的帖子和一个 .eleventy.js 文件用于您的配置。 打开它并添加以下代码：

```javascript
const now = new Date();
const publishedPosts = (post) => post.date <= now && !post.data.draft; // [1]
eleventyConfig.addCollection("posts", (collection) => { // [2]
  return collection
      .getFilteredByGlob("./_dev/posts/*.md") // [3]
      .filter(publishedPosts); // [4]
});
```
让我们一步一步来。
在 [1] 中，我们定义了一个函数 publishedPosts，它接受一个 post 参数并检查两件事：
如果 post.date 早于 now：那么该帖子不计划在未来发布
如果帖子在前面的内容中有一个 "draft" 被设置为真实值
然后在 [2] 中我们创建了一个 posts 集合，使用 Eleventy 提供的 addCollection 方法。 此方法接受一个集合 API 对象作为参数。
在 [3] 中，我们使用 getFilteredByGlob 方法获取 _dev/posts 文件夹中的所有 markdown 文件，这允许我们使用 *.md 来指定这组文件。
最后在 [4] 中我们过滤掉所有不符合 publishedPosts 函数中定义的条件的帖子，我们的草稿！
现在我们有了已发布帖子的集合，现在可以列出它们了

```liquid
{% raw %}
{%- set postslist = collections.posts | reverse -%}

{%- for post in postslist -%}
    <h3>
        <a href="{{ post.url | url }}">{{ post.data.title }}</a>
    </h3>
{%- endfor -%}
{% endraw %}
```

就是这样，Eleventy 生成草稿啦！

参考链接：<a href="https://giustino.blog/how-to-drafts-eleventy/">https://giustino.blog/how-to-drafts-eleventy/</a>