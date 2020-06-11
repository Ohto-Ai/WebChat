const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
// 我的基础路由文件
const base = require('./routes/base/index.js')

const db = require('./db/db.js')

app.get('/',function(req,res){
  db.selectAll('select * from user',(e,r)=>{
      if(e){
        res.status(200).json({"status":false,"msg":e,"data":[]});
      }
      res.status(200).json({"status":true,"msg":"","data":r});
  })

})



// json 解析 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    next();
});
// 暴露公共资源
app.use(require('express').static(path.join(__dirname,'public')))
app.use('/base',base)
app.listen(8010)

console.log('app run port 8010')
