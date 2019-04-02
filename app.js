//引入express模块
const express = require('express');
//引入用户路由器
const myproRouter=require('./routes/mypro.js')
const bodyParser = require('body-parser');
var server = express();
server.listen(8080);



server.use(express.static('mypro'))

//使用body-parser中间件
server.use( bodyParser.urlencoded({
  extended:false
}))
//挂载路由器 挂载到/user  路由访问 /user/reg
server.use('/mypro',myproRouter);
