//引入express
const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//获取用户名和密码
router.post("/login_post",(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	//验证
	if(!$uname){
		res.send("用户名为空");
		return;
	}
	if(!$upwd){
		res.send("密码为空");
		return;
	}
	var sql="select * from xz_user where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("登录成功");
		}else{
			res.send("用户名或密码不正确");
		}
	});
});

//用户注册
router.post("/user_reg",(req,res)=>{
	var num=400;
	var obj=req.body;
	for(var key in obj){
		num++;
		if(!obj[key]){
		res.send({code:num,msg:key+" required"});
		return;
		}
	}
	var sql="INSERT INTO xz_user SET ?";
	pool.query(sql,[obj],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:"注册成功！"});
		}
	});
});

//用户列表
router.get("/userlist",(req,res)=>{
	var sql="select * from xz_user";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});

//删除用户
router.get("/delUser",(req,res)=>{
	var obj=req.query;
	var $uid=obj.uid;
	if(!$uid){
		res.send("uid不存在");
		return;
	}
	var sql="delete from xz_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		res.send("1");
	});
});

//根据uid查询用户详细信息
router.get("/query",(req,res)=>{
	var $uid=req.query.uid;
	if(!$uid){
		res.send("uid不存在");
		return;
	}
	var sql="select * from xz_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result[0]);
		}else{
			res.send("没有查到用户信息");
		}
	});
});

//修改用户
router.post("/update",(req,res)=>{
	console.log(req.body)
	var obj=req.body;
	var $uid=obj.uid;
	var $upwd=obj.upwd;
	var $uname=obj.uname;
	var $email=obj.email;
	var $phone=obj.phone;
	var $user_name=obj.user_name;
	var $gender=obj.gender;
	
	if(!$uid){res.send("uid为空");return;}
	if(!$uname){res.send("用户名为空");return;}
	if(!$upwd){res.send("密码为空");return;}
	if(!$email){res.send("邮箱为空");return;}
	if(!$phone){res.send("联系方式为空");return;}
	if(!$user_name){res.send("真实姓名为空");return;}
	if(!$gender){res.send("用户性别为空");return;}

	var sql="update xz_user set uname=?,upwd=?,email=?,phone=?,user_name=?,gender=? where uid=?";
	pool.query(sql,[$uname,$upwd,$email,$phone,$user_name,$gender,$uid],(err,result)=>{
		if(err) throw err;
		//跳转回list页面
		res.send("1");//1就是修改成功
	});
});

// 用户注册界面
router.post('/reg',(req,res)=>{
	var $uname = req.body.uname
	var $upwd = req.body.upwd
	var $email = req.body.email
	var $phone = req.body.phone
	var $user_name = req.body.user_name
	var $gender = req.body.gender

	console.log($uname,$upwd,$email,$phone,$user_name,$gender)
	// res.send('you connect with back')
	var sql = 'insert into xz_user set uname=?,upwd=?,email=?,phone=?,user_name=?,gender=?'

	var infor = [$uname,$upwd,$email,$phone,$user_name,$gender]

	pool.query(sql,infor,(err,result)=>{
		if(err) throw err
		if(result.affectedRows>0){
			res.send('1') // 后台回复1,代表注册成功
		}else{
			res.send('0') // 后台回复2,代表注册失败
		}
	})

})

//导出路由
module.exports=router;