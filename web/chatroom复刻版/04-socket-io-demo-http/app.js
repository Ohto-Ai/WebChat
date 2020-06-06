//启动一个http服务器
const http = require('http')
//app创建服务
const app = http.createServer()
const fs = require('fs')


app.on('request',(req,res) => {
    fs.readFile(__dirname + '/index.html',function (err, data) {
      if (err) {
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
  
      res.writeHead(200)
      res.end(data)
    })
})

app.listen(3000, () => {
  console.log("服务器启动成功")
})

//监听事件必须放在上面
const io = require('socket.io')(app)

//监听了用户连接事件
//socket表示用户的连接
//socket.emit 表示出发某个事件，如果需要给浏览器发送数据，需要触发浏览器注册的某个事件
//socket.on 表示注册某个事件，如果需要获取浏览器的数据，需要注册一个事件，等待浏览器触发
io.on('connection', socket => {
    console.log('新用户连接了')
    // //socket.emit表示给浏览器发送数据
    // 参数1：事件的名字
    // socket.emit('send',{name: 'zs'})

    // 参数一：事件名：任意 
    // 参数二：获取到的数据
     socket.on('hehe', data => {
       console.log(data)
     })

     socket.emit('send',{
       name: 'zs'
       
     })

})