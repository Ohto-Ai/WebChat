const ws = require('nodejs-websocket')
const TYPE_ENTER = 0;
const TYPE_LEAVE = 1;
const TYPE_MSG = 2;
/*
    分析：
      消息不应该是简单的字符串
      这个消息应该是一个对象
      type：消息的类型 0：进入 1：退出 2：聊天
      msg:消息内容
      time：具体时间 
*/

//记录当前的总用户数
var count = 0;
//conn每个连接到服务器的用户，都会有一个conn
const server = ws.createServer(conn => {
    console.log('新连接')
    count++
    //此处的类似单引号的符号是``
    conn.userName = `用户${count}`
    //1、告诉所有用户，有人加入了聊天室
    broadcast({
        type:TYPE_ENTER,
        msg:`${conn.userName}进入了聊天室`,
        //把时间转化成一个字符串
        time: new Date('August 19, 1975 23:15:30 GMT+00:00').toLocaleTimeString('it-IT')
    })

    //接收到了客户端的数据
    conn.on('text', data => {
        //2、 当我们收到了用户发来的信息，我们要广播告诉所有人，消息的内容
        broadcast({
            type:TYPE_MSG,
            msg:data,
            time: new Date().toLocaleTimeString()

        })
    })
    //连接断开
    conn.on('close', data => {
        console.log('关闭连接')
        count--
        //3、告诉所有用户，有人离开了聊天室
        broadcast({
            type:TYPE_LEAVE,
            msg:`${conn.userName}离开了聊天室`,
            time:new Date().toLocaleTimeString()
        })
    })
    //产生异常
    conn.on('error', data => { 
        console.log('发生异常') 
    })
})

//广播，给所有用户发送消息
function broadcast(msg) {
    //server.connections:表示所有用户
    server.connections.forEach(item => {
        //send内容只能是一个字符串
        //将msg转换成一个JSON格式的字符串
        item.send(JSON.stringify(msg))
    })
}

server.listen(3000, () => {
    console.log('服务器启动成功了')
})
