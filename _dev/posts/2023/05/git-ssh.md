---
layout: posts-zh.liquid
pageSlug: single-post
title: Linux git ssh 拉取项目
pageDescription: git ssh 拉取项目，配置 key 验证
tags: 
- git
date: 2023-05-24
---
<!-- https://jessieji.com/2019/pure-css-masonry 
https://masonry.desandro.com/-->

由于 git 弃用之前账号密码的方式，现在用 key 来进行验证。

当进行拉取新项目时(SSH)：<code>git clone git@github.com:yourr_username/your_project.git</code>

他会告诉我们需要权限验证
<div class="divimg-wrapper">
  <div class="img">
    <img src="/assets/img/2023/05/git-ssh-1.jpg" alt="git clone 项目">
  </div>
  <div class="img-desc">图 1: git clone 项目</div>
</div>

这时我们需要生成 git 所需的 ssh key。

先进入文件路径 <code>cd ~/.ssh/</code>

再ed25519加密方式生成： <code>ssh-keygen -t ed25519 -C "your_email_address@.gmail.com"</code>

添加 key 文件名（路径为/root/.ssh/）: key_file_name

输入口令：

在输入刚刚的口令

请记住这个口令，一会需要用到。这时我们所需要的 key 已经生成
<div class="divimg-wrapper">
  <div class="img">
    <img src="/assets/img/2023/05/git-ssh-2.jpg" alt="生成 ssh key">
  </div>
  <div class="img-desc">图 2: 生成 ssh key</div>
</div>

把刚刚生成的文件添加到 ssh-agent 的高速缓存中 <code>ssh-add ~/.ssh/key_file_name</code>

这是需要刚刚输入我们新建 key 的口令

把文件的内容显示出来 <code>cat key_file_name.pub</code>

把文件的内容复制到粘贴板
<div class="divimg-wrapper">
  <div class="img">
    <img src="/assets/img/2023/05/git-ssh-3.jpg" alt="复制 ssh key">
  </div>
  <div class="img-desc">图 3: 复制 ssh key</div>
</div>

下一步是需要把这个 key 添加到你的git 账号里ssh key 进行同步验证

在git setting -> Access -> SSH and GPG keys -> New SSH key

为这个key 命名，同时把刚刚的key 粘贴到文本框中
<div class="divimg-wrapper">
  <div class="img">
    <img src="/assets/img/2023/05/git-ssh-4.jpg" alt="设置git ssh key code">
  </div>
  <div class="img-desc">图 4: 设置git ssh key code</div>
</div>

最后在 <code>git clone git@github.com:yourr_username/your_project.git</code>, 成功拉取项目。