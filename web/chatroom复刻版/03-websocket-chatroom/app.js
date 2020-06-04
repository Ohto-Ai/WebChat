const ws = require('nodejs-websocket')

//记录当前的总用户数
var count = 0;
//conn每个连接到服务器的用户，都会有一个conn
const server = ws.createServer(conn => {
    console.log('新连接')
    count++
    //此处的类似单引号的符号是``
    conn.userName = `用户${count}`
    //1、告诉所有用户，有人加入了聊天室
    broadcast( `${conn.userName}进入了聊天室`)

    //接收到了客户端的数据
    conn.on('text', data => {
        //2、 当我们收到了用户发来的信息，我们要广播告诉所有人，消息的内容
        broadcast(data)
    })
    //连接断开
    conn.on('close', data => {
        console.log('关闭连接')
        count--
        //3、告诉所有用户，有人离开了聊天室
        broadcast(`${conn.userName}离开了聊天室`)
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
        item.send(msg)
    })
}

server.listen(3000, () => {
    console.log('服务器启动成功了')
})