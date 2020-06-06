const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//启动了服务器
server.listen(3000, () => {
    console.log('服务器启动成功了')
})


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', (data) => {
    console.log(data)
  })
})