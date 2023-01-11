---
layout: posts-zh.liquid
pageSlug: single-post
title: 用Elasticlunr为Eleventy网站添加搜索功能
pageDescription: ""
tags: 
- eleventy
date: 2023-01-11
---

## Elasticlunr
Elasticlunr，一个轻量级的、用JavaScript构建的全文搜索引擎。想到如何将其整合到一个11ty的网站上，用于客户端搜索。这很容易。

首先需要安装 elasticlunr， <code>npm install elasticlunr</code>
<ul>
    <li>
        <a href="https://github.com/duncanmcdougall/eleventy-search-demo" target="_blank">Demo GitHub repo</a>
    </li>
    <li>
        <a href="https://elasticlunr-11ty.netlify.com/" target="_blank">Demo site</a>
    </li>
    <li>
        <a href="/search/" target="_blank">Search this site</a>
    </li>
</ul>

## 11ty 添加search filter
.eleventy.js
```javascript
const elasticlunr = require("elasticlunr");
module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter("search", function (collection) {
        // what fields we'd like our index to consist of
        var index = elasticlunr(function () {
            // this.addField("title")
            // this.setRef("id");
        });
        // loop through each page and add it to the index
        collection.forEach((page) => {
            index.addDoc({
                id: page.url,
                title: page.template.frontMatter.data.title,
                tags: page.template.frontMatter.data.tags,
            });
        });
        return index.toJSON();
    });

    eleventyConfig.addCollection("postsSearch", collection => {
        return [...collection.getFilteredByGlob("_dev/posts/**/*.md")];
    });
};

```

## 创建search page
search.html
```html
<div class="field">
    <input type="search" placeholder="Search..." id="searchField" />
</div>
<div class="result">
    <ul id="searchResults"></ul>
    <div id="noResultsFound">
        <p>没有搜索到你想要的结果，请重新查找.</p>
    </div>
</div>
<!--Only 5.7kb GZipped. You may want to bundle this with your application code. -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/elasticlunr/0.9.6/elasticlunr.min.js"></script>
```

search.js
```javascript
$(function () {
    $('#search input').on("input propertychange change", function () {
        let searchStr = $(this).val();
        if(searchStr){
            fetch("/search-index.json").then((response) =>
                response.json().then((rawIndex) => {
                    let resultHtml = "";
                    let docs = rawIndex.documentStore.docs;
                    for(let i in docs) {
                        if(docs[i].title.toLowerCase().indexOf(searchStr.toLowerCase()) >= 0) {
                            resultHtml += `<li><a href="${docs[i].id}" target="_blank">${docs[i].title}</a>`
                        }
                    }
                    return resultHtml;
                })
            ).then((result)=>{
                $("#searchResults").html("");
                if(result) {
                    $("#noResultsFound").removeClass("active");
                    $("#searchResults").append(result);
                } else {
                    $("#noResultsFound").addClass("active");
                }
            });
        } else {
            $("#noResultsFound").removeClass("active");
            $("#searchResults").html("");
        }
    });
});
```

相关链接：

<a href="http://elasticlunr.com/" target="_blank">ElasticLunr docs</a>

<a href="https://www.belter.io/eleventy-search/" target="_blank">https://www.belter.io/eleventy-search/</a>

<a href="https://www.raymondcamden.com/2019/10/20/adding-search-to-your-eleventy-static-site-with-lunr" target="_blank">https://www.raymondcamden.com/2019/10/20/adding-search-to-your-eleventy-static-site-with-lunr</a>
