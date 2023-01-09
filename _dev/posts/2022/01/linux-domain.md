---
layout: posts-zh.liquid
pageSlug: single-post
title: linux 多域名绑定
postImage: /assets/img/2022/01/06-1.jpg
pageDescription: linux 多域名绑定
tags: 
  - linux
date: 2022-01-04
---

域名配置文件的路径 /etc/apache2/sites-available/

软链接路径 /etc/apache2/sites-enabled/

登录XShell进入页面

```shell
cd /etc/apache2/sites-available/ # 进入目录
ls # 查看当前目录文件列表
```

<div class="divimg-wrapper">
  <div class="img">
    <img src="/assets/img/2022/01/01-2.png" alt="当前目录文件列表">
  </div>
  <div class="img-desc">图 1: 当前目录文件列表</div>
</div>

配置新域名(www.zhufupin.cn)

```shell
cp 201519.conf zhufupin.conf # 复制文件
```

<div class="divimg-wrapper">
  <div class="img">
    <img src="/assets/img/2022/01/01-3.png" alt="复制文件">
  </div>
  <div class="img-desc">图 2: 复制文件</div>
</div>

```shell
vi zhufupin.conf # 编辑文件
# vi 命令进入文件时, 需要先按( i 键), 才能编辑文件; 编辑完成时保存, 需先按( Esc 键),然后按( : 键), 再输入 wq , 按回车, 这时文件保存成功
```

<div class="divimg-wrapper">
  <div class="img">
    <img src="/assets/img/2022/01/01-4.png" alt="编辑文件">
  </div>
  <div class="img-desc">图 3: 编辑文件</div>
</div>

此时配置文件弄好了, 还需要建立软链接

```shell
cd .. # 返回上级目录
cd /etc/apache2/sites-enabled/ # 进入目录
ln -s /etc/apache2/sites-available/zhufupin.conf # 建立新配置域名的软链接
```

然后需要重启 apache2 才能生效

```shell
/etc/init.d/apache2 restart
```

<div class="divimg-wrapper">
  <div class="img">
    <img src="/assets/img/2022/01/01-5.png" alt="建立软链接 并重启">
  </div>
  <div class="img-desc">图 4: 建立软链接 并重启</div>
</div>

此时服务器重启成功

这时需要登录 ftp

新建一个命名为 zhufupin 的文件夹上传到 /var/www/ 目录下

然后把源码放在这个 zhufupin 文件夹里

域名绑定成功, 访问 www.zhufupin.cn, 奇迹就出现啦