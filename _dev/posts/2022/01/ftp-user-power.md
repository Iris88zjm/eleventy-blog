---
layout: posts-zh.liquid
pageSectionID: single-post
title: linux 指定ftp用户 特定目录及权限
postImage: /assets/img/2022/01/demo.jpg
pageDescription: linux 指定ftp用户 特定目录及权限
tags: 
  - linux
date: 2022-01-03
---

在linux中添加 ftp 用户, 并设置相应的权限, 操作步骤如下: 

要求: 被限制用户名为 test.被限制路径为 /var/www/test

## 新建建用户: 在root用户下: 
```shell
useradd -d /var/www/test test # 增加用户 test, 并制定test用户的主目录为 /var/www/test
passwd test # 为 test 设置密码
```

## 更改用户相应的权限设置
```shell
usermod -s /sbin/nologin test # 限定用户 test 不能 telnet, 只能 ftp
usermod -s /sbin/bash test # 用户 test 恢复正常
usermod -d /var/www test # 更改用户 test 的主目录为 /var/www
```

## 如果需要允许用户修改密码, 但是又没有 telnet 登录系统的权限: 
```shell
usermod -s /usr/bin/passwd test # 用户telnet后将直接进入改密界面
```

## 建工作组
```shell
groupadd test # 新建test工作组
```

## 新建用户同时增加工作组
```shell
useradd -g test phpq # 新建phpq用户并增加到test工作组
```

注: -g 所属组 -d 家目录 -s 所用的SHELL

## 给已有的用户增加工作组
```shell
usermod -G groupname username # (这个会把用户从其他组中去掉)
usermod -a groupname username # 或者: gpasswd -a user group
```

如果添加了用户, 添加了组, 然后使这个组里的人都可以sudo 到公共账号下

可以/etc/sudoers.d 下面建立一个文件内容如下 , 就可以是etl组的所有用户都可以无密码的切到etl用户下.

```shell
%etl ALL=(ALL) NOPASSWD: /bin/su etl
%etl ALL=(ALL) NOPASSWD: /bin/su – etl
```

## 临时关闭: 
在 /etc/shadow 文件中属于该用户的行的第二个字段(密码)前面加上*就可以了.想恢复该用户, 去掉*即可.
或者使用如下命令关闭用户账号: passwd peter –l

重新释放: passwd peter –u

## 永久性删除用户账号
```shell
userdel peter
groupdel peter
usermod –G peter peter # (强制删除该用户的主目录和主目录下的所有文件和子目录)
```

## 从组中删除用户
编辑 /etc/group 找到 GROUP1 那一行, 删除 A

或者用命令 gpasswd -d A GROUP

## 显示用户信息
```shell
id user
cat /etc/passwd
```