const mysql = require('mysql');

var pool = mysql.createPool({
  host:'134.175.228.77',
  port:'3306',
  user:'xbt',
  password:'524524123',
  database:'xz',
  connectionLimit:15
})

//到处连接池对象
module.exports=pool;

