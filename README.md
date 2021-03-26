# web_qqchating

#### 介绍
仿微信网页版即时聊天系统
（目前正式版为测试版2）

#### 软件架构
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

#### 安装教程

1.  nodejs
2.  eclipse
3.  git
4.vscode

#### 使用说明

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