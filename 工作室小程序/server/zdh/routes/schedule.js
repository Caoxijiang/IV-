var express = require('express');
var router = express.Router();
var secret = require('../conf/secret');
var client=require("../Redis/RedisServer")
var scheduleDao=require('../dao/scheduleDao');
router.all('/wxschedule', function(req, res, next) {
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if(token!=secret.SECRET){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var ID=req.query.ID;
            scheduleDao.select2(ID,function(data){
             if(data){
                 var tid=data.schedule_time_id;
     
                 var daninfo=[];
                 for( var obj of tid){
                     scheduleDao.select3(obj.schedule_time_id,function(res2){
                         if(res2){
                             daninfo.push(res2);
                             if(daninfo.length==tid.length){
                                 res.json(daninfo)
                             }
                         }
                     })
                 }   
     
                 // var tid=data.schedule_time_id;
                 
                 console.log(daninfo)
             }else{
                var status_err="SERVERERR"
                res.end(status_err);
             }
            })
        }
  
    });
  })



  
module.exports = router;