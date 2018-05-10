var express = require('express');
var router = express.Router();
var meetingeDao=require('../dao/mettinginfoDao');
var secret = require('../conf/secret');
var client=require("../Redis/RedisServer")
/* GET home page. */
// router.get('/webimageinfo', function(req, res, next) {
//   var mark="1";
//   indexInfo.selectwebImageinfo(mark,function(data){
//     if(data){
//       var url=[];
//       for(var obj of data){
//          url.unshift(obj.bullupmall_webcommodity_image_url)
//       }
//      res.send(url)
//     }else{
//       var msg="请求错误";
//       res.end(msg);
//      } 
//   })
// });

router.get('/mettinginfo', function(req, res, next) {
  var admin="admin"
  var token=req.query.token;
  client.get(token,function(err,value){
    if(token!=secret.SECRET){
      var status_err="err";
      res.send(status_err);
      }else{ 
            meetingeDao.adminfindmettingList(admin,function(data){
              if(data){
                console.log(JSON.stringify(data))
                res.send(data);
              }else{
                var status_err="SERVERERR"
                res.end(status_err);
              }
            });
      }

  });
})

module.exports = router;
//http://192.168.2.102:3006/public/images/1518060481184.png
