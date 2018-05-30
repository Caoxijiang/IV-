var express = require('express');
var router = express.Router();
var secret = require('../conf/secret');
var client=require("../Redis/RedisServer")
var mainUserinfoDao=require('../dao/mainuserInfoDao');

router.all("/media",function(req,res){
    var admin="admin"
    var token=req.query.token;
    client.get(token,function(err,value){
      if(token!=secret.SECRET){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var mediainfo={}
            mediainfo.name=req.query.name;
            mediainfo.tickedId=req.query.tickedId;
            mediainfo.phone=req.query.phone;
            mediainfo.email=req.query.email;
            mediainfo.util=req.query.util;
            mediainfo.job=req.query.job
            mediainfo.platform=req.query.platform;
            mainUserinfoDao.insertmedia(mediainfo,function(data){
                if(data=="SUCCESS"){
                    res.send({msg:"SUCCESS"});
                }else{
                    var status_err="SERVER";
                    res.send(status_err);
                }
            })
        }
  
    });
})


router.all("/Stu",function(req,res){
    var admin="admin"
    var token=req.query.token;
    client.get(token,function(err,value){
      if(token!=secret.SECRET){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var Stuinfo={}
            Stuinfo.name=req.query.name;
            Stuinfo.tickedId=req.query.tickedId;
            Stuinfo.phone=req.query.phone;
            Stuinfo.email=req.query.email;
            Stuinfo.school=req.query.school;
            Stuinfo.stuNum=req.query.stu.stuNum;
            mainUserinfoDao.insertmedia(Stuinfo,function(data){
                if(data=="SUCCESS"){
                    res.send({msg:"SUCCESS"});
                }else{
                    var status_err="SERVER";
                    res.send(status_err);
                }
            })
        }
  
    });
})

router.all("/Vip",function(req,res){
    //var admin="admin"
    var token=req.query.token;
    client.get(token,function(err,value){
      if(token!=secret.SECRET){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var Vipinfo={}
            Vipinfo.name=req.query.name;
            Vipinfo.phone=req.query.phone;
            Vipinfo.email=req.query.email;
            Vipinfo.util=req.query.util;
            Vipinfo.job=req.query.job;
            Vipinfo.job.VipNum=req.query.VipNum;
            mainUserinfoDao.insertVip(Vipinfo,function(data){
                if(data=="SUCCESS"){
                    res.send({msg:"SUCCESS"});
                }else{
                    var status_err="SERVER";
                    res.send(status_err);
                }
            })
        }
  
    });
})


router.all("/noVip",function(req,res){
    var admin="admin"
    var token=req.query.token;
    client.get(token,function(err,value){
      if(token!=secret.SECRET){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var noVip={}
            noVip.name=req.query.name;
            noVip.tickedId=req.query.tickedId;
            noVip.phone=req.query.phone;
            noVip.email=req.query.email;
            noVip.util=req.query.util;
            noVip.job=req.query.job;
            mainUserinfoDao.insertmedia(noVip,function(data){
                if(data=="SUCCESS"){
                    res.send({msg:"SUCCESS"});
                }else{
                    var status_err="SERVER";
                    res.send(status_err);
                }
            })
        }
  
    });
})


module.exports = router