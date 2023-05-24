---
layout: posts-zh.liquid
pageSlug: single-post
title: HTML meta 标签
pageDescription: HTML 基本的头部标签
tags: 
  - html
date: 2023-01-03
---
# HTML基本的头部标签

下面是HTML基本的头部元素:
```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <!–移动端的页面这个可以忽略，具体可以查看本文Internet Explorer浏览器部分–>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!–具体可以查看本文 为移动设备添加 viewport 部分–>
    <!– 以上 3 个 meta 标签 必须 放在 head 的最前面；其他任何的 head 内容必须在这些标签的 后面 –>
    <title>页面标题</title>
    …
</head>
```
其中
```html
<meta http-equiv="x-ua-compatible" content="ie=edge">
```

在桌面开发的时候可以让IE浏览器以最新的模式渲染页面，具体可以查看本文Internet Explorer浏览器部分。
如果你的页面确定只在桌面浏览器中运行，那么
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
也可以省略。

## DOCTYPE
DOCTYPE(Document Type)，该声明位于文档中最前面的位置，处于 html 标签之前，此标签告知浏览器文档使用哪种 HTML 或者 XHTML 规范。
使用 HTML5 doctype，不区分大小写。
```html
<!DOCTYPE html> <!– 使用 HTML5 doctype，不区分大小写 –>
```
## charset
声明文档使用的字符编码
```html
<meta charset="utf-8">
```

html5 之前网页中会这样写
```html
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
```
这两个是等效的，具体可移步阅读：<a href="https://stackoverflow.com/questions/4696499/meta-charset-utf-8-vs-meta-http-equiv-content-type" target="_blank">meta charset='utf-8' vs meta http-equiv='Content-Type'</a>，所以建议使用较短的，易于记忆。

## lang属性
更加标准的 lang 属性写法 <a target="_blank" href="http://zhi.hu/XyIa">http://zhi.hu/XyIa</a>

简体中文
```html
<html lang="zh-cmn-Hans"> <!– 更加标准的 lang 属性写法 http://zhi.hu/XyIa –>
```
繁体中文
```html
<html lang="zh-cmn-Hant"> <!– 更加标准的 lang 属性写法 http://zhi.hu/XyIa –>
```
很少情况才需要加地区代码，通常是为了强调不同地区汉语使用差异，例如：
```html
<p lang="zh-cmn-Hans">
<strong lang="zh-cmn-Hans-CN">菠萝</strong>和<strong lang="zh-cmn-Hant-TW">鳳梨</strong>其实是同一种水果。只是大陆和台湾称谓不同，且新加坡、马来西亚一带的称谓也是不同的，称之为<strong lang="zh-cmn-Hans-SG">黄梨</strong>。
</p>
```
为什么 lang="zh-cmn-Hans" 而不是我们通常写的 lang="zh-CN" 呢，请移步阅读: <a target="_blank" href="https://www.zhihu.com/question/20797118?utm_source=weibo&utm_medium=weibo_share&utm_content=share_question&utm_campaign=share_sidebar">页头部的声明应该是用 lang="zh" 还是 lang="zh-cn"</a>。

## Meta 标签
meta标签是HTML中head头部的一个辅助性标签，它位于HTML文档头部的 <code>head</code> 和 <code>title</code> 标记之间，它提供用户不可见的信息。虽然这部分信息用户不可见，但是其作用非常强大，特别是当今的前端开发工作中，设置合适的meta标签可以大大提升网站页面的可用性。
桌面端开发中，meta标签通常用来为搜索引擎优化（SEO）及 robots定义页面主题，或者是定义用户浏览器上的cookie；它可以用于鉴别作者，设定页面格式，标注内容提要和关键字；还可以设置页面使其可以根据你定义的时间间隔刷新自己，以及设置RASC内容等级，等等。
移动端开发中，meta标签除了桌面端中的功能设置外，还包括，比如viewport设置，添加到主屏幕图标，标签页颜色等等实用设置。具体可以看后面详细的介绍。

### meta标签分类
meta标签根据属性的不同，可分为两大部分：http-equiv 和 name 属性。
http-equiv：相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助浏览器正确地显示网页内容。
name属性：主要用于描述网页，与之对应的属性值为content，content中的内容主要是便于浏览器，搜索引擎等机器人识别，等等。

### 推荐使用的meta标签
```html
<!– 设置文档的字符编码 –>
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<!– 以上 3 个 meta 标签 必须 放在 head 的最前面；其他任何的 head 内容必须在这些标签的 后面 –>
 
<!– 允许控制资源的过度加载 –>
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
<!– 尽早地放置在文档中 –>
<!– 仅应用于该标签下的内容 –>
 
<!– Web 应用的名称（仅当网站被用作为一个应用时才使用）–>
<meta name="application-name" content="应用名称">
 
<!– 针对页面的简短描述（限制 150 字符）–>
<!– 在某些情况下，该描述是被用作搜索结果展示片段的一部分 –>
<meta name="description" content="一个页面描述">
 
<!– 控制搜索引擎的抓取和索引行为 –>
<meta name="robots" content="index,follow,noodp"><!– 所有的搜索引擎 –>
<meta name="googlebot" content="index,follow"><!– 仅对 Google 有效 –>
 
<!– 告诉 Google 不显示网站链接的搜索框 –>
<meta name="google" content="nositelinkssearchbox">
 
<!– 告诉 Google 不提供此页面的翻译 –>
<meta name="google" content="notranslate">
 
<!– 验证 Google 搜索控制台的所有权 –>
<meta name="google-site-verification" content="verification_token">
 
<!– 用来命名软件或用于构建网页（如 - WordPress、Dreamweaver）–>
<meta name="generator" content="program">
 
<!– 关于你的网站主题的简短描述 –>
<meta name="subject" content="你的网站主题">
 
<!– 非常简短（少于 10 个字）的描述。主要用于学术论文。–>
<meta name="abstract" content="">
 
<!– 完整的域名或网址 –>
<meta name="url" content="https://example.com/">
 
<meta name="directory" content="submission">
 
<!– 基于网站内容给出一般的年龄分级 –>
<meta name="rating" content="General">
 
<!– 允许控制 referrer 信息如何传递 –>
<meta name="referrer" content="never">
 
<!– 禁用自动检测和格式化可能的电话号码 –>
<meta name="format-detection" content="telephone=no">
 
<!– 通过设置为 "off" 完全退出 DNS 预取 –>
<meta http-equiv="x-dns-prefetch-control" content="off">
 
<!– 在客户端存储 cookie，web 浏览器的客户端识别 –>
<meta http-equiv="set-cookie" content="name=value; expires=date; path=url">
 
<!– 指定要显示在一个特定框架中的页面 –>
<meta http-equiv="Window-Target" content="_value">
 
<!– 地理标签 –>
<meta name="ICBM" content="latitude, longitude">
<meta name="geo.position" content="latitude;longitude">
<!– 国家代码 (ISO 3166-1): 强制性, 州代码 (ISO 3166-2): 可选; 如 content="US" / content="US-NY" –>
<meta name="geo.region" content="country[-state]">
<!– 如 content="New York City" –>
<meta name="geo.placename" content="city/town">
```

### 为移动设备添加 viewport
viewport 可以让布局在移动浏览器上显示的更好。 通常会写
```html
<meta name ="viewport" content ="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no">
```
width=device-width 会导致 iPhone 5 添加到主屏后以 WebApp 全屏模式打开页面时出现黑边(<a href="http://bigc.at/ios-webapp-viewport-meta.orz" target="_blank">http://bigc.at/ios-webapp-viewport-meta.orz</a>)

content 参数：
width viewport 宽度(数值/device-width)
height viewport 高度(数值/device-height)
initial-scale 初始缩放比例
maximum-scale 最大缩放比例
minimum-scale 最小缩放比例
user-scalable 是否允许用户缩放(yes/no)
minimal-ui iOS 7.1 beta 2 中新增属性（注意：iOS8 中已经删除），可以在页面加载时最小化上下状态栏。这是一个布尔值，可以直接这样写：
```html
<meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
```
而如果你的网站不是响应式的，请不要使用 initial-scale 或者禁用缩放。
```html
<meta name="viewport" content="width=device-width,user-scalable=yes">
```
相关链接：<a href="http://www.qianduan.net/non-responsive-design-viewport.html" target="_blank">非响应式设计的viewport</a>
适配 iPhone 6 和 iPhone 6plus 则需要写：
```html
<meta name="viewport" content="width=375">
<meta name="viewport" content="width=414">
```
大部分 4.7~5 寸的安卓设备的 viewport 宽设为 360px，iPhone 6 上却是 375px，大部分 5.5 寸安卓机器（比如说三星 Note）的 viewport 宽为 400，iPhone 6 plus 上是 414px。

### SEO 优化部分
页面标题<code>title</code>标签(head 头部必须)
```html
<title>your title</title>
```

页面关键词 keywords
```html
<meta name="keywords" content="your keywords">
```

页面描述内容 description
```html
<meta name="description" content="your description">
```

定义网页作者 author
```html
<meta name="author" content="author,email address">
```

定义网页搜索引擎索引方式，robotterms 是一组使用英文逗号「,」分割的值，通常有如下几种取值：none，noindex，nofollow，all，index和follow。
```html
<meta name="robots" content="index,follow">
```
相关链接：<a href="http://msdn.microsoft.com/zh-cn/library/ff724037(v=expression.40).aspx" target="_blank">WEB1038 – 标记包含无效的值</a>

### 百度禁止转码
通过百度手机打开网页时，百度可能会对你的网页进行转码，脱下你的衣服，往你的身上贴狗皮膏药的广告，为此可在 head 内添加
```html
<meta http-equiv="Cache-Control" content="no-siteapp" />
```
相关链接：<a href="http://m.baidu.com/pub/help.php?pn=22&ssid=0&from=844b&bd_page_type=1" target="_blank">SiteApp 转码声明</a>

### 不推荐的 meta 属性
下面是不推荐使用的 meta 属性，因为它们采用率低，或已弃用：
```html
<!– 用于声明文档语言，但支持得不是很好。最好使用 <html lang=""> –>
<meta name="language" content="en">
 
<!– Google 无视 & Bing 认为垃圾的指示器 –>
<meta name="keywords" content="你,关键字,在这里,不使用空格,而用逗号进行分隔">
<!– 目前没有在任何搜索引擎中使用过的声明 –>
<meta name="revised" content="Sunday, July 18th, 2010, 5:15 pm">
 
<!– 为垃圾邮件机器人收获 email 地址提供了一种简单的方式 –>
<meta name="reply-to" content="email@example.com">
 
<!– 最好使用 <link rel="author"> 或 humans.txt 文件 –>
<meta name="author" content="name, email@example.com">
<meta name="designer" content="">
<meta name="owner" content="">
 
<!– 告诉搜索机器人一段时间后重新访问该网页。这不支持，因为大多数搜索引擎使用随机时间间隔来重新抓取网页 –>
<meta name="revisit-after" content="7 days">
 
<!– 在一段时间后将用户重定向到新的 URL –>
<!– W3C 建议不要使用该标签。Google 建议使用服务器端的 301 重定向。–>
<meta http-equiv="refresh" content="300; url=https://example.com/">
 
<!– 描述网站的主题 –>
<meta name="topic" content="">
 
<!– 公司概要或网站目的 –>
<meta name="summary" content="">
 
<!– 一个已废弃的标签，和关键词 meta 标签的作用相同 –>
<meta name="classification" content="business">
 
<!– 是否是相同的 URL，年代久远且不支持 –>
<meta name="identifier-URL" content="https://example.com/">
 
<!– 和关键词标签类似的功能 –>
<meta name="category" content="">
 
<!– 确保你的网站在所有国家和语言中都能显示 –>
<meta name="coverage" content="Worldwide">
 
<!– 和 coverage 标签相同 –>
<meta name="distribution" content="Global">
 
<!– 控制在互联网上哪些用户可以访问 –>
<meta http-equiv="Pics-label" content="value"> 
 
<!– 缓存控制 –>
<!– 最好在服务器端配置缓存控制 –>
<meta http-equiv="Expires" content="0">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache">
```

## link 标签
说到 link 标签，估计大家的第一反应和我一样，就是引入外部CSS样式文件的，不错，这是 link 标签最最常用的功能。不过它还有很多别的用处，比如这是浏览器 favicon 图标，touch图标等等。
```html
<!– 有助于防止出现内容重复的问题 –>
<link rel="canonical" href="https://example.com/2010/06/9-things-to-do-before-entering-social-media.html">
 
<!– 之前用于包含 icon 链接，但已被废弃并不再使用 –>
<link rel="shortlink" href="https://example.com/?p=42">
 
<!– 链接到当前文档的一个 AMP HTML 版本 –>
<link rel="amphtml" href="https://example.com/path/to/amp-version.html">
 
<!– 表明一个 CSS 样式表 –>
<link rel="stylesheet" href="https://example.com/styles.css">
 
<!– 链接到一个指定 Web 应用程序"安装"证书的 JSON 文件 –>
<link rel="manifest" href="manifest.json">
 
<!– 链接到文档的作者 –>
<link rel="author" href="humans.txt">
 
<!– 指向一个适用于链接内容的版权申明 –>
<link rel="copyright" href="copyright.html">
 
<!– 给出可能的你的另一种语言的文档位置参考 –>
<link rel="alternate" href="https://es.example.com/" hreflang="es">
 
<!– 提供了关于作者或其他人的信息 –>
<link rel="me" href="https://google.com/profiles/thenextweb" type="text/html">
<link rel="me" href="mailto:name@example.com">
<link rel="me" href="sms:+15035550125">
 
<!– 链接到一个文档，包含当前文档的一个归档链接 –>
<link rel="archives" href="https://example.com/2003/05/" title="May 2003">
 
<!– 链接到层次结构中的顶级资源 –>
<link rel="index" href="https://example.com/" title="DeWitt Clinton">
 
<!– 给出该文档的起点 –>
<link rel="start" href="https://example.com/photos/pattern_recognition_1_about/" title="Pattern Recognition 1">
 
<!– 引导当前文档的前述资源序列 –>
<link rel="prev" href="https://example.com/opensearch/opensearch-and-openid-a-sure-way-to-get-my-attention/" title="OpenSearch and OpenID? A sure way to get my attention.">
 
<!– 给出一个自我参考 - 当文档有多个可能的参考时非常有用 –>
<link rel="self" type="application/atom+xml" href="https://example.com/atomFeed.php?page=3">
 
<!– 分别是在一系列文件中的第一个、下一个、上一个和最后一个 –>
<link rel="first" href="https://example.com/atomFeed.php">
<link rel="next" href="https://example.com/atomFeed.php?page=4">
<link rel="previous" href="https://example.com/atomFeed.php?page=2">
<link rel="last" href="https://example.com/atomFeed.php?page=147">
 
<!– 当使用第三方服务来维护 blog 时使用 –>
<link rel="EditURI" href="https://example.com/xmlrpc.php?rsd" type="application/rsd+xml" title="RSD">
 
<!– 当另一个 WordPress 博客链接到你的 WordPress 博客或文章时形成一个自动化的评论 –>
<link rel="pingback" href="https://example.com/xmlrpc.php">
 
<!– 当你在自己的页面上链接到一个 url 时通知它 –>
<link rel="webmention" href="https://example.com/webmention">
 
<!– 加载一个外部的 HTML 文件到当前 HTML 文件中 –>
<link rel="import" href="component.html">
 
<!– 打开搜索 –>
<link rel="search" href="/open-search.xml" type="application/opensearchdescription+xml" title="Search Title">
 
<!– Feeds –>
<link rel="alternate" href="https://feeds.feedburner.com/example" type="application/rss+xml" title="RSS">
<link rel="alternate" href="https://example.com/feed.atom" type="application/atom+xml" title="Atom 0.3">
 
<!– 预取，预载，预浏览 –>
<link rel="dns-prefetch" href="//example.com/">
<link rel="preconnect" href="https://www.example.com/">
<link rel="prefetch" href="https://www.example.com/">
<link rel="prerender" href="https://example.com/">
<link rel="preload" href="image.png" as="image">
<!– 更多信息：https://css-tricks.com/prefetching-preloading-prebrowsing/ –>
```

### rss订阅
```html
<link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" /> <!– 添加 RSS 订阅 –>

```

### 不推荐的link标签
```html
<link rel="shortcut icon" href="path/to/favicon.ico">
 
<!– 没有用的, 专有的和错误的, 详见 https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Y_2eFRh9BOs/gULYapoRBwAJ –>
<link rel="subresource" href="styles.css">
```

### favicon 图标
IE 11, Chrome, Firefox, Safari, Opera支持<link>形式设置：
```html
<link rel="icon" href="path/to/favicon-16.png" sizes="16x16" type="image/png">
<link rel="icon" href="path/to/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="path/to/favicon-48.png" sizes="48x48" type="image/png">
<link rel="icon" href="path/to/favicon-62.png" sizes="62x62" type="image/png">
<link rel="icon" href="path/to/favicon-192.png" sizes="192x192" type="image/png">
```
注意：对于IE 10及以下版本不支持<link>形式设置，只通过将命名为favicon.ico的文件放置在网站根目录中实现。

## 浏览器及平台详细说明
### QQ 浏览器（X5 内核）
QQ 浏览器（X5 内核）同样适用于微信，QQ等第三方应用页面开发。
```html
<!– 设置锁定横屏、竖屏显示模式，portrait（横屏），landscape（竖屏）–>
<meta name="x5-orientation" content="portrait|landscape">
<!– 设置全屏显示页面 –>
<meta name="x5-fullscreen" content="true">
<!– 开启页面以应用模式显示（全屏显示等） –>
<meta name="x5-page-mode" content="app">
```

### 360浏览器
设置 360 浏览器渲染模式：webkit 为极速内核，ie-comp 为 IE 兼容内核，ie-stand 为 IE 标准内核。
```html
<meta name="renderer" content="webkit|ie-comp|ie-stand">
```
详情文档链接：浏览器内核控制Meta标签说明文档
360 浏览器就会在读取到这个标签后，立即切换对应的极速核。 另外为了保险起见再加入
```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
``` 
这样写可以达到的效果是如果安装了 Google Chrome Frame，则使用 GCF 来渲染页面，如果没有安装 GCF，则使用最高版本的 IE 内核进行渲染。

### UC 浏览器
#### 设置屏幕方向
portrait 为横屏，landscape 为竖屏。
```html
<meta name="screen-orientation" content="portrait|landscape">
```
#### 设置全屏
```html
<meta name="full-screen" content="yes">
```

#### 设置适应屏幕排版（缩放是否显示滚动条）
UC 浏览器在标准排版效果实现的基础上，提供适应屏幕的排版方式，当设置为 uc-fitscreen=yes，页面进行缩放操作时，仅放大图片和文字等元素，但不放大屏幕宽度，保持不出现水平（横向）滚动条。
```html
<meta name="viewport" content="uc-fitscreen=no|yes">
```

#### 排版模式
UC 浏览器提供两种排版模式，分别是适屏模式（fitscreen）及标准模式（standard），其中适屏模式简化了一些页面的处理，使得页面内容更适合进行页面阅读、节省流量及响应更快，而标准模式则能按照标准规范对页面进行排版及渲染。
```html
<meta name="layoutmode" content="fitscreen|standard">
``` 

#### 夜间模式
可以帮助用户在低亮度或黑暗情况下更舒适的进行页面浏览。由于基于网页的应用愈加复杂，由浏览器实现的单一夜间模式不一定能够适应所有情况(例如游戏应用)，因此 UC 浏览器允许网页设计者对其设计的页面禁用浏览器的夜间模式，自行设计更适合用户使用的夜间模式。
注意：页面内的 frame/iframe 中的夜间模式的 meta 不生效。
```html
<meta name="nightmode" content="enable|disable">
```

#### 整页图片强制显示
为了节省流量及加快速度，UC 为用户提供了无图模式，在实际使用中存在页面中的图片是不可缺少的，例如验证码，地图等。通过强制图片显示的功能可以保证图片显示不受用户的设置影响。
**注意：整页图片强制显示仅对当前页面生效，对页面内的 frame/iframe 不生效，也不影响前进后退的页面
```html
<meta name="imagemode" content="force">
```

#### 开启应用模式
```html
<meta name="browsermode" content="application">
```
应用模式是为方便 Web 应用及游戏开发者设置的综合开关，通过meta标签进行指示打开，当进入应用模式时，浏览器将自动调整以下参数:
参数	状态	说明
全屏	生效	可通过 meta 或 JS API 调用退出全屏
长按菜单	失效	可通过 JS API 调用重新生效
浏览器默认手势	失效	可通过 JS API 调用重新生效
排版模式	标准模式	可通过 meta 或 JS API 调用设置其他排版模式
强制图片显示	生效	/
夜间模式	失效	可通过 meta 或 JS API 调用启用夜间模式

#### 缩放字体
例如：禁用的 UC 浏览器的字体缩放功能
```html
<meta name="wap-font-scale" content="no">
``` 
具体UC 浏览器文档链接：UC 浏览器文档

## Apple iOS原生浏览器
### 添加智能 App 广告条
告诉浏览器这个网站对应的app，并在页面上显示下载banner，需要注意的是Smart App Banners标签不能用在frame框架内部，否则不起作用。
其中app-id(必须), affiliate-data (可选), app-argument (可选)
```html
<meta name="apple-itunes-app" content="app-id=APP_ID,affiliate-data=AFFILIATE_ID,app-argument=SOME_TEXT">
```

例如Digg的写法：
```html
<meta name="apple-itunes-app" content="app-id=362872995, affiliate-data=bevbOqLt02I, app-argument=digg://">
```

### 忽略数字自动识别为电话号码
```html
<meta name="format-detection" content="telephone=no">
```

### 启用 WebApp 全屏模式
```html
<meta name="apple-mobile-web-app-capable" content="yes">
```

#### 添加到主屏后设置状态栏的背景颜色
```html
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```

只有在 "apple-mobile-web-app-capable" content="yes" 时生效。
如果设置为 default 或 black ，网页内容从状态栏底部开始。
如果设置为 black-translucent ，网页内容充满整个屏幕，顶部会被状态栏遮挡。

#### 添加到主屏后的标题（iOS 6 新增）
```html
<meta name="apple-mobile-web-app-title" content="App Title">
```

### iOS 图标
图片自动处理成圆角和高光等效果。
```html
<link rel="apple-touch-icon" href="path/to/apple-touch-icon.png">
```
禁止系统自动添加效果，直接显示设计原图。
```html
<link rel="apple-touch-icon-precomposed" href="path/to/apple-touch-icon-precomposed.png">
```
iOS 8+ 不再支持 precomposed, 只有 apple-touch-icon 是必须的
在大多数情况下，在head中一个180×180px的图标就足够了。如果您想要由设备确定的唯一图标，请使用不同大小的图标。
```html
<link rel="apple-touch-icon" sizes="57x57" href="path/to/icon@57.png">
<link rel="apple-touch-icon" sizes="72x72" href="path/to/icon@72.png">
<link rel="apple-touch-icon" sizes="114x114" href="path/to/icon@114.png">
<link rel="apple-touch-icon" sizes="144x144" href="path/to/icon@144.png">
```
### 启动画面 ( 不赞成使用 )
iPad 的启动画面是不包括状态栏区域的，iPhone 和 iPod touch 的启动画面是包含状态栏区域的
```html
<link rel="apple-touch-startup-image" href="path/to/startup.png">
```
具体描述设置请查看http://www.css88.com/archives/5480中相应的说明。

### iOS 应用深度链接
```html
<meta name="apple-itunes-app" content="app-id=APP-ID, app-argument=http/url-sample.com">
<link rel="alternate" href="ios-app://APP-ID/http/url-sample.com">
```
## Google Android原生浏览器

### 标签页选项卡颜色
Android Lollipop 中的 Chrome 39 增加 theme-color meta 标签，用来控制选项卡颜色。
http://updates.html5rocks.com/2014/11/Support-for-theme-color-in-Chrome-39-for-Android
```html
<meta name="theme-color" content="#db5945">
```
### 添加到主屏
```html
<!– 添加到主屏 –>
<meta name="mobile-web-app-capable" content="yes">
```
详细链接: https://developer.chrome.com/multidevice/android/installtohomescreen

### 安卓应用深度链接（网页上唤起应用）

```html
<!– Android app deep linking –>
<meta name="google-play-app" content="app-id=package-name">
<link rel="alternate" href="android-app://package-name/http/url-sample.com">
```
注：貌似没测试成功，如果你知道如何正确设置，欢迎留言斧正。

## Apple Safari 浏览器
Safari 10开始支持固定书签页的SVG favicons了，你可以这样使用：
```html
<!– Pinned Site –>
<link rel="mask-icon" href="path/to/icon.svg" color="red">
```
扩展阅读：https://yoast.com/dev-blog/safari-pinned-tab-icon-mask-icon/

## Google Chrome浏览器

### 关闭chrome浏览器下翻译插件
有些时候感觉chrome浏览器下翻译插件很烦人，可以通过下面的代码禁用它。
```html
<meta name="google" value="notranslate" />
```

### chrome浏览器插件安装
有时候，你需要在你的页面上点击某个安卓，直接安卓你的chrome浏览器插件，而不是链接到Chrome webstore 的详细地址再安装，那么你可以使用：
```html
<link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/APP_ID">
```
具体使用，请查看：Using Inline Installation

## Google Chrome Mobile (只针对 Android)
从 Chrome 31 开始，你可以设置你的 Web 应用为"app mode"，如 Safari。
```html
<!– 链接到一个 manifest 并定义 manifest 的元数据。–>
<!– manifest.json 中的例子也可以通过以下链接找到。–>
<link rel="manifest" href="manifest.json">
 
<!– 定义你的网页为 Web 应用 –>
<meta name="mobile-web-app-capable" content="yes">
 
<!– 第一个是官方推荐格式。–>
<link rel="icon" sizes="192x192" href="nice-highres.png">
<link rel="icon" sizes="128x128" href="niceicon.png">
<!– 所有带 apple 前缀的格式已废弃，所以不要使用它们。–>
<link rel="apple-touch-icon" sizes="128x128" href="niceicon.png">
<link rel="apple-touch-icon-precomposed" sizes="128x128" href="niceicon.png">
```

## Internet Explorer浏览器
### 模式设置
```html
//IE8以下以IE7标准模式呈现网页，而IE9则以IE9的标准模式呈现网页：
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7; IE=EmulateIE9">
//如果安装了GCF，则使用GCF来渲染页面（"chrome=1"），
//如果没有安装GCF，则使用最高版本的IE内核进行渲染（"IE=edge"）
<meta http-equiv="x-ua-compatible" content="ie=edge">
```

GCF（Google Chrome Frame ）相关链接：https://www.chromium.org/developers/how-tos/chrome-frame-getting-started
X-UA-Compatible相关链接：https://blogs.msdn.microsoft.com/ie/2010/06/16/ies-compatibility-features-for-site-developers/

### win8,win10下的一些设置
```html
<meta http-equiv="cleartype" content="on">
<meta name="skype_toolbar" content="skype_toolbar_parser_compatible">
 
<!– 
Disable link highlighting on IE 10 on Windows Phone 
具体说明查看：https://blogs.windows.com/buildingapps/2012/11/15/adapting-your-webkit-optimized-site-for-internet-explorer-10/--&gt;
<meta name="msapplication-tap-highlight" content="no">
 
<!– 
Pinned sites
具体说明查看：https://msdn.microsoft.com/en-us/library/dn255024(v=vs.85).aspx--&gt;
<meta name="application-name" content="Contoso Pinned Site Caption">
<meta name="msapplication-tooltip" content="Example Tooltip Text">
<meta name="msapplication-starturl" content="/">
 
<meta name="msapplication-config" content="http://example.com/browserconfig.xml">
 
<meta name="msapplication-allowDomainApiCalls" content="true">
<meta name="msapplication-allowDomainMetaTags" content="true">
<meta name="msapplication-badge" content="frequency=30; polling-uri=http://example.com/id45453245/polling.xml">
<meta name="msapplication-navbutton-color" content="#FF3300">
<meta name="msapplication-notification" content="frequency=60;polling-uri=http://example.com/livetile">
<meta name="msapplication-square150x150logo" content="path/to/logo.png">
<meta name="msapplication-square310x310logo" content="path/to/largelogo.png">
<meta name="msapplication-square70x70logo" content="path/to/tinylogo.png">
<meta name="msapplication-wide310x150logo" content="path/to/widelogo.png">
<meta name="msapplication-task" content="name=Check Order Status;action-uri=./orderStatus.aspx?src=IE9;icon-uri=./favicon.ico">
<meta name="msapplication-task-separator" content="1">
//Windows 8 磁贴颜色
<meta name="msapplication-TileColor" content="#FF3300">
//Windows 8 磁贴图标
<meta name="msapplication-TileImage" content="path/to/tileimage.jpg">
<meta name="msapplication-window" content="width=1024;height=768">
```
## APP 链接

```html
<!– iOS –>
<meta property="al:ios:url" content="applinks://docs">
<meta property="al:ios:app_store_id" content="12345">
<meta property="al:ios:app_name" content="App Links">
<!– Android –>
<meta property="al:android:url" content="applinks://docs">
<meta property="al:android:app_name" content="App Links">
<meta property="al:android:package" content="org.applinks">
<!– Web Fallback –>
<meta property="al:web:url" content="http://applinks.org/documentation">
<!– More info: http://applinks.org/documentation/ –>
```
具体请查看：<a href="https://developers.facebook.com/docs/applinksApp" target="_blank">Links Docs</a>

本文出处：<a href="https://vincentcwlove.github.io/2016/11/30/HTML%E5%9F%BA%E6%9C%AC%E7%9A%84%E5%A4%B4%E9%83%A8%E6%A0%87%E7%AD%BE/" target="_blank">https://vincentcwlove.github.io/2016/11/30/HTML基本的头部标签/</a>