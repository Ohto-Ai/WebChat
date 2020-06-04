//导入nodejs-websocket包
const ws = require('nodejs-websocket')
const PORT = 3000

//每次只要有用户连接，函数就会被执行，会给当前用户创建一个connect对象
const server = ws.createServer(connect => {
    console.log('有用户连接上来了')
    //每当接收到用户传递过来的数据data，就会触发text事件
    connect.on('text',data => {
        console.log('接收到了用户的数据',data)
        //给用户一个响应数据
        //对用户发送过来的数据，把小写转大写，并且拼接一点内容
        connect.send(data.toUpperCase() + '!!!')
    })

    //只要websocket断开连接，close时间就会被触发
    connect.on('close', () => {
        console.log('连接断开了')
    })

    //注册一个error，处理用户的错误信息
    connect.on('error', () => {
        console.log('用户连接异常')
    })
})



server.listen(PORT, () => {
    console.log('web服务器启动成功了，监听了端口' + PORT)
})
