var express = require('express');
var router = express.Router();
var secret = require('../conf/secret');
var client=require("../Redis/RedisServer")
var IntroductionDao=require('../dao/IntroductionDao');
router.all("/select",function(req,res){
    var admin="admin"
    var token=req.query.token;
    client.get(token,function(err,value){
      if(token!=secret.SECRET){
        var status_err="err";
        res.send(status_err);
        }else{ 
            IntroductionDao.selectInfo(admin,function(result){
                if(result){
                    res.send(result)
                }else{
                    var status_err="SERVERERR"
                    res.end(status_err);
                }
            })
        }
  
    });
})





















module.exports = router;
