# web_qqchating

# 介绍
仿微信网页版即时聊天系统
#（目前正式版为测试版2 路径：/web/chatroom复刻版/06-websocket-测试版2/）！！！

# 软件架构
软件架构说明
基于Nodejs平台的web开发框架--Express/Socket.io

#### 各部分文件介绍
db文件夹:config.js（配置数据库）和db.js（封装数据库操作）
node_modules文件夹:node库，如果想要运行的话有些库包得自己重新下，因为作者有些包库是全局配置的；
public文件夹：前端网页，客户端，服务器端的静态资源
app.js:服务端 nodejs（Express/Socket.io框架）实现
README.md:项目说明

相关资料
websocket协议（全双工通信，HTML支持
	           过程：握手->长连接->分手
	           与http协议ajax技术相比，传输效率更高，性能消耗更小）
nodejs-websocket包（yarn/npm导入）
nodejs-socket.io包
nodejs-express包

服务端/客户端 双端开发模式

# 安装教程

1.  node(自带npm node package management 包管理工具)
2.  eclipse
3.  git
4.  vscode/webstorm（开发工具）
5.  mysql数据库配置，导入/数据库/websocket.sql文件 
![数据库配置](https://images.gitee.com/uploads/images/2021/0616/180405_91b2b780_7634285.png "屏幕截图.png")
6.  部分库需要自己下载，使用npm命令，如 npm install mysql，如下载速度过慢可使用国内镜像加速
7.  如想要部署到云服务器，需要将代码中的localhost改成云服务器的ip地址，这是一个大坑，我就被整哭了 呜呜呜

# 部署到云服务器小贴士
8.  注册登录可以，下次再登录提示用户不存在
问题： 数据库大小写不一致导致的无法访问
9.  数据库sql文件导入但没有表
解决： 手动建表，暴力美学
10. 云服务器访问数据库迷之交互到本机
解决：  开启云服务器慎用localhost，改为云服务器的ip地址
11. 数据库插入查询异常，linux太难了 呜呜呜 从部署到放弃 
未完待续。。。2021/6/16

# 使用说明

1.  使用node命令在终端(也就是命令行，最好是在某一个ide的终端中)
    运行app.js文件 (node app.js)
2.  在浏览器输入相应的地址：IP+端口
3.  注册登录进入聊天系统


本次项目遇到的问题集锦：
1.服务器连接中断 原因：app.js代码执行失败
2.npm执行失败 解决：安装包repair
3.nodejs无法启动 解决：重装
4.Cannot Get（404） 解决：引入path路径
5.数据库执行异常 解决：使用回调函数callback及最好封装数据库操作

﻿

# 项目介绍

由于WEB的易用性、实用性，它很快占据了主导地位，目前成为使用最广泛、最有前途、最具魅力的信息传播技术。本次实验就就基于web技术对社交网站开发的初步探索。本次课程设计内容为仿微信网页版Web即时聊天系统。
实现Web的多对多即时的文本消息聊天功能。
实现Web的表情的发送、接收和显示功能。
实现Web的图片的发送、接收和显示功能。
实现本地消息的存储，在离线的时候也能加载和查看历史消息；
要求使用WebSocket；

# 目录结构

![目录结构](https://img-blog.csdnimg.cn/20210325120640129.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzgyNzM3Ng==,size_16,color_FFFFFF,t_70)
项目采用html+css+js+nodejs+mysql开发。 

基于Nodejs平台的web开发框架--Express/Socket.io

文件目录

>app.js nodejs编写的后端程序

>db 封装的数据库操作

>node_modules 模块依赖

>public 静态资源，即前端三大件

>.json 配置文件，不用管

# 效果展示

![登录界面](https://img-blog.csdnimg.cn/20210325121435992.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzgyNzM3Ng==,size_16,color_FFFFFF,t_70)
![注册界面](https://img-blog.csdnimg.cn/20210325121458130.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzgyNzM3Ng==,size_16,color_FFFFFF,t_70)

![用户1聊天室界面](https://img-blog.csdnimg.cn/20210325121329514.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzgyNzM3Ng==,size_16,color_FFFFFF,t_70)
![用户2聊天室界面](https://img-blog.csdnimg.cn/2021032512134867.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzgyNzM3Ng==,size_16,color_FFFFFF,t_70)

# 数据库设计

数据库比较简单，就两张表，用户信息表和聊天信息表。
![数据库](https://img-blog.csdnimg.cn/20210325121556516.png)
![message表](https://img-blog.csdnimg.cn/2021032512162651.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzgyNzM3Ng==,size_16,color_FFFFFF,t_70)
![userinformation表](https://img-blog.csdnimg.cn/20210325121722528.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzgyNzM3Ng==,size_16,color_FFFFFF,t_70)

# 源码地址

[gitee仓库地址，开源不易，欢迎star](https://gitee.com/hebugui/web_qqchating.git)
![gitee](https://img-blog.csdnimg.cn/20210325122522515.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzgyNzM3Ng==,size_16,color_FFFFFF,t_70)

# 项目总结

做这个项目之前，我没有接触过nodejs，后来发现使用了它非常方便，语法贴近js比较好学，功能又很强大，很多封装好的模块。

这个项目我的后续计划是把它部署到阿里云上，正在尝试中。之前弄过一次失败了，所以准备重新搞一下。这个项目是大三下学期整理的，课设是大二下做的，感觉也是对自己学习的一种总结吧，记录自己学习的心路历程。