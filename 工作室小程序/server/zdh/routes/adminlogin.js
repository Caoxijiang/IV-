/**
 * Created by Kay on 2016/3/8.
 */
var secret = require('../conf/secret');
var express = require('express');
var router = express.Router();
var Redis=require('redis');
var adminDao=require('../dao/adminDao');
var client=require('../Redis/RedisServer');

router.all('/',function(req,res){
        
    res.render('admin/adminlogin',{})
})
router.all('/admin',function(req,res){
var session =req.session;
console.log(session);
   


    var info=req.body || req.query;
    var admininfo={};
    admininfo.username=info.username;
    admininfo.pwd=info.pwd;
    adminDao.selectadminAccountAndPWD(admininfo,function(data){
        if(!data){
            res.send({msg:"无管理员账号"})
        }else if(data.admin_account!=info.username || data.admin_pwd!=info.pwd){
           // alert("登陆失败，请检查账号和密码");
            res.send({msg:"登陆失败，请检查账号和密码"})
        }else {
                 var amintoken=secret.ADMIN;
                adminStatusSaveRedis(amintoken,data.user_id);
              //  res.redirect('/welcome')
              res.send({msg:"href",amintoken:amintoken})
        }
    })

    
})

router.all('/welcome',function(req,res){

    res.render('admin/welcome')
})

function adminStatusSaveRedis(admintoken,sms){
    if(client){
        client.set(admintoken,sms);
        client.expire(admintoken,10*60); 
    }else{
        console.log('redis client instance is not exist.');
    }
} 
module.exports = router;