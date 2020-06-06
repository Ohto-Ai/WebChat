/*
    聊天室的主要功能
*/ 
/*
    1.连接socketio服务
*/
var socket = io('http://localhost:3000')

/*
    2.登录功能
*/
$('#login_avatar li').on('click',function() {
    $(this)
    .addClass('now')
    .siblings()
    .removeClass('now')
})
//点击按钮登录
$('#loginBtn').on('click',function() {
    // 获取用户名
    var username = $("#username")
      .val()
      .trim()
    if(!username) {
        alert('请输入用户名')
        return
    }
    // 获取选择头像
    //这里的.now很精妙 既加了边框，醒目 又可以通过它来找到所选的头像
    //attr 获取属性
    var avatar = $('#login_avatar li.now img').attr('src')
    console.log(username,avatar)

    // 需要告诉socket io服务，登录
    socket.emit('login',{
        username: username,
        avatar: avatar
    }) 

})

//监听登陆失败的请求
socket.on('loginError', data => {
    alert('登陆失败了')
})

//监听登陆成功的请求
socket.on('loginSuccess', data => {
    // 需要显示聊天窗口 淡入效果
    // 需要隐藏登陆窗口 淡出效果
    $('#login_box').fadeOut()
    $('#container').fadeIn()
    //设置个人信息 显示在界面上
    $('avatar_url').attr('src', data.avatar)
    $('.user-list .username').text(data.username)

})

//监听添加用户的消息
socket.on('addUser',data => {
    //添加一条系统消息
    $('#box-bd').append(`
    <div class="system">
        <p class="message_system">
            <span class="content">"${data.username}"加入了群聊</span>
        </p>
    </div>
    `)      
})

// 监听用户列表消息
socket.on('userList',users => {
    //打印出来
    // console.log(users)
    //更新列表之前先清空
    $('user-list ul').html('')
    users.forEach( item => {
        $('.user-List ul').append(`
          <li class="user">
            <div class="avatar"><img src="${item.avatar}" alt="" /></div>
            <div class="name">${item.username}</div>
          </li> 
        `)
    })

    //更新用户数
    $('#userCount').text(data.length)
})

//监听用户离开的消息
socket.on('deleteUser',data => {
    //添加一条系统消息
    $('#box-bd').append(`
    <div class="system">
        <p class="message_system">
            <span class="content">"$(data.username)"加入了群聊</span>
        </p>
    </div>
    `)      
})
