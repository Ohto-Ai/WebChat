const express = require('express')
const app = express()
const router = express.Router()
const db = require('./../../db/db.js')

// 该路由使用的中间件
/*router.use(function timeLog(req, res, next) {
  console.log('Time: ', new Date());
  next();
});*/

// 定义网站主页的路由
router.get('/', function(req, res) {
  res.send('Birds home page');
});

// 登录接口，并且验证密码--查询方法的使用案例

router.post('/login', function(req, res) {
  let name = JSON.stringify(req.body.name);
  let pwd  = req.body.pwd;
  let resData = {"name":name,"pass":pwd};
  let errText = '',resultData='';
  db.selectAll('select * from user where Account = '+ name,(e,r)=>{
      if(e){
        res.status(200).json({"status":false,"msg":e,"data":[]});
      }
      let tt = r.length ;
      if(tt == 0){
        errText="账号不存在";
      }else if(pwd != r[0].Password){
        errText="密码错误";  
      }else{
        resultData = r[0];
      }
      // console.log(tt,errText);
      res.status(200).json({"status":true,"msg":errText,"data":resultData});
  })
  //res.status(200).json({"status":true,"msg":"","data":resData});
});
// 注册接口 增加的方法使用案例
router.post('/register',(req,res)=>{
  let  name = req.body.names;
  let  password = req.body.pwd;
  let errText = '',resultData='sccusee';
  let saveData = {"Account":name,"Password":password};
  db.insertData('user',saveData,(e,r)=>{
    if(e){
        res.status(200).json({"status":false,"msg":e,"data":[]});
    }
    res.status(200).json({"status":true,"msg":errText,"data":resultData});
  })
})
// 注销接口 删除的方法使用案例
router.post('/cancel',(req,res)=>{
  let datas = req.body;
  let deleteId = {UserId:11};
  console.log(datas);
  db.deleteData('user',deleteId,(e,r)=>{
    if(e){
      return  res.status(200).json({"status":false,"msg":e,"data":''});
    }
    res.status(200).json({"status":true,"msg":"ok","data":'resultData'});
  });

})
// 修改密码接口 修改的方法使用案例
router.post('/modify',(req,res)=>{
  let _where = {UserId : req.body.UserId};
  let _set = {Password :req.body.pwd};

  db.updateData('user',_set,_where,(e,r)=>{
    if(e){
      return  res.status(200).json({"status":false,"msg":e,"data":''});
    }
    res.status(200).json({"status":true,"msg":'ok',"data":'resultData'});
  })
})
module.exports = router;
