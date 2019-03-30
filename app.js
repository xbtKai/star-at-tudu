// 引入express模块,创建服务器,使用并监听8080端口
const express = require('express')
var server = express()
server.listen(8080)
// 引入user路由
const userRouter = require('./routes/user.js')
// 引入body_parser模块
const bodyParser = require('body-parser')

// 使用中间件 让public目录托管静态资源
server.use(express.static('public'))
// 使用中间件 激活bodyParser,使post方法提交请求时,req.body方法可用
server.use(bodyParser.urlencoded({
  extended:false
}))

// 使用中间件 挂载user路由
server.use('/user',userRouter)
