/*
    启动服务端程序
*/
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path');
const db = require('./db/db.js')
const chinaTime = require('china-time')


// //支持截图功能
// const webshot = require('webshot');
//记录所有已经登陆过的用户
const users = []
var id_now = 1

//启动了服务器
server.listen(3000, () => {
    console.log('服务器启动成功了')
})

//express处理静态资源
//把public目录设置为静态资源
app.use(require('express').static(path.join(__dirname, 'public')))
app.get('/', function (req, res) {
    res.redirect('/index.html')
})

db.selectAll('select count(*) as sum from message',(e,r) =>{
    //id 按照消息发送的先后顺序递增
    console.log(r[0].sum)
    id_now = r[0].sum + 1
}) 

//一进入聊天室就加载信息
db.selectAll('select * from message order by id desc',(e,r) => {
    console.log(r)
    console.log(r[0])
})
//     //广播给所有用户
// io.emit('receiveMessage', data)


io.on('connection', function (socket) {

    socket.on('checkoutLogin', data => {
        // 连接数据库验证
        let msg = '',
            resultData = '';
        db.selectAll("select * from usersInformation where username ='" + data.username + "' ", (e, r) => {
            let tt = r.length;
            if (tt == 0) {
                msg = "用户名不存在";
            } else if (data.password != r[0].password) {
                msg = "用户密码错误";
            } else {
                resultData = r[0];
                msg = "用户密码正确"
            }
            socket.emit('checkoutAnswer', {
                msg: msg,
                avatar: resultData.avatar
            })
            console.log(msg, resultData)
        })

    })
    socket.on('login', data => {
        //判断，如果在data在users中存在，说明该用户登陆过了，不允许登录
        //如果data在user中不存在，说明用户没有登陆，允许登录
        let user = users.find(item => item.username === data.username)
        if (user) {
            //表示用户在线
            socket.emit('loginError', {
                msg: '登陆失败'
            })
            // console.log('登陆失败')
        } else {
            // //连接数据库获取用户头像
            // db.selectAll("select * from usersInformation where username ='" + data.username + "' ", (e, r) => {
            //     data.avatar = r[0].avatar
            //     console.log(r[0].avatar)
            // })
            //把登陆成功的用户信息存储起来
            //socket.username ? avatar 内置对象？ 不太像
            socket.username = data.username
            socket.avatar = data.avatar

            //表示用户不在线,把用户存入user数组
            users.push(data)
            //告诉用户，登陆成功
            socket.emit('loginSuccess', data)
            // console.log('登陆成功')

            //告诉所有人，有新用户加入到了聊天室，广播消息
            //socket.emit 给当前用户发消息 io.emit 给所有用户发消息
            io.emit('addUser', data)


            //告诉所有用户，当前聊天室用户列表以及数量
            io.emit('userList', users)

        }
    })

    //用户断开连接功能
    //监听用户断开连接
    socket.on('disconnect', () => {
        //把当前用户信息从user中删除
        let idx = users.findIndex(item => item.username === socket.username)
        //删除掉断开连接的人
        users.splice(idx, 1)
        // 1.告诉所有人，有人离开了聊天室
        io.emit('deleteUser', {
            username: socket.username,
            avatar: socket.avatar
        })
        // 2.告诉所有人，userList发生更新
        io.emit('userList', users)
    })

    //监听聊天的消息
    socket.on('sendMessage', data => {
        //存入数据库
        var time = chinaTime('YY/MM/DD HH:mm')
        let saveData = {
            id: id_now,
            username: data.username,
            content: data.msg,
            time: time
        }
        db.insertData('message', saveData, (e, r) => {
            console.log('消息存入成功')
            id_now++
        })
        //广播给所有用户
        io.emit('receiveMessage', data)
    })

    //接受图片的信息
    socket.on('sendImage', data => {
        //广播给所有用户
        io.emit('receiveImage', data)
    })

    // //实现截图功能
    // socket.on('webshot', url => {
    //     webshot(url, 'hello_world.png', {siteType:'html'}, function(err) {
    //         // screenshot now saved to hello_world.png
    //       })
    // })

    //注册用户
    socket.on('registerUser', data => {
        // console.log(data)
        //插入之前要查询一遍，确保用户名未被注册 
        db.selectAll("select * from usersInformation where username = '" + data.username + "' ", (e, r) => {
            let tt = r.length;
            if (tt == 1) {
                console.log("账号已经被注册")
                socket.emit('registerError')
            } else {
                let saveData = data
                //注册
                db.insertData('usersInformation', saveData, (e, r) => {
                    console.log('注册成功')
                    socket.emit('registerSuccess')

                })
            }
        })

    })

})