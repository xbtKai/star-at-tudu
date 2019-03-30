const express = require('express')
var router = express.Router()
const pool = require('../pool.js')

router.use('/reg',(req,res)=>{
  var uname = req.query.uname
  var upwd = req.query.upwd
  var sql1 = 'select * from user where u_name=?'
  var sql2 = 'insert into user set u_name=?,u_pwd=?'
  pool.query(sql1,[uname],(err,result)=>{
    if(err) throw err
    if(result.length>0){
      res.send("您输入的用户名已存在")
      return
    }
    pool.query(sql2,[uname,upwd],(err,result)=>{
      if(err) throw err
      console.log(result)
      if(result.affectedRows>0){
        res.send('注册成功!')
      }else{
        res.send('未知错误,注册失败')
      }
    })
  })

})




module.exports=router
