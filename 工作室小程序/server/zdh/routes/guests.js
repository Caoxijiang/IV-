var express = require('express');
var router = express.Router();
var guestsDao=require('../dao/guestsDao');
var secret = require('../conf/secret');
var client=require("../Redis/RedisServer")
router.all('/wxguests', function(req, res, next) {
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if(token!=secret.SECRET){
        var status_err="err";
        res.send(status_err);
        }else{ 
            guestsDao.selectguestsInfo(function(data){
                if(data){   
                    res.send(data)
                    console.log(data)
                }else{
                    var status_err="SERVERERR"
                    res.end(status_err);
                }
            })
        }
  
    });
  })















module.exports = router;