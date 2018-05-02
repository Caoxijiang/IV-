var express = require('express');
var client=require("../Redis/RedisServer")
var fs=require("fs");
var router = express.Router();
var formidable = require("formidable");
// var imageInfo=require("../dao/imagesDao");
var secret = require('../conf/secret');
var url=require('../conf/imageconf').url;

router.all('/uploadImage', function(req, res) {
        console.log(req.session.userName);
        if(req.originalUrl != "/" && !req.session.userName){
            res.redirect("/");
        }else{
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; 
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小    
            form.uploadDir = "./public/images/"; //改变临时目录
            form.parse(req, function(error, fields, files) {
             //  console.log(JSON.stringify(fields));  
                if(error){
                   res.send("失败");
                }else{
                   for (var key in files) {
                       var file = files[key];
                       var fName = "";
                       switch (file.type) {
                           case "image/jpeg":
                               fName = fName + ".jpg";
                               break;
                           case "image/png": 
                               fName = fName + ".png";
                               break;
                           default:
                               fName = fName + ".png";
                               break;
                       }
                      //  console.log(file, file.size);
                       if(fName.length==0){
                          res.send('uploadIcon img type err');
                       }else{
                           var newName=(new Date()).getTime()+fName;
                           var uploadDir = "./public/images/" + newName;
                           fs.rename(file.path, uploadDir, function(err) {
                               if (err) {
                                   //res.send("");
                                   res.end('存入服务器失败');
                               }else{
                                   //res.end('SUCCESS');
                                   var meetingInfo={};
                                   meetingInfo.topic=fields.potic;
                                   meetingInfo.Summary=fields.Summary;
                                   meetingInfo.admin=req.session.userName;
                                   
                               }
                       })
           
                   }
                }
               }
            });
        } 

     });

     router.all('/webuploadImage', function(req, res) {
        // 
          var form = new formidable.IncomingForm();
          form.encoding = 'utf-8'; 
          form.keepExtensions = true;     //保留后缀
          form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小    
          form.uploadDir = "./public/images/webImage/"; //改变临时目录
          form.parse(req, function(error, fields, files) {
            // console.log(JSON.stringify(fields));  
              if(error){
                 res.send("失败");
              }
              var openidtoken=fields.openid;
              var admintoken=fields.admin;
              var mark=fields.imageId;
              client.get(openidtoken,function(err,value){
                  if(openidtoken!=secret.SECRET){
                      var session_token="1";
                      res.json(session_token);
                  }else {
                      var openid = JSON.parse(value).openid;
                      client.get(admintoken,function(err,value){
                          if(admintoken!=secret.ADMIN){
                              var session_token="1";
                              res.json(session_token);
                          }else{
                             for (var key in files) {
                                 var file = files[key];
                                 var fName = "";
                                 switch (file.type) {
                                     case "image/jpeg":
                                         fName = fName + ".jpg";
                                         break;
                                     case "image/png": 
                                         fName = fName + ".png";
                                         break;
                                     default:
                                         fName = fName + ".png";
                                         break;
                                 }
                                //  console.log(file, file.size);
                                 if(fName.length==0){
                                    res.send('uploadIcon img type err');
                                 }
                                 var newName=(new Date()).getTime()+fName;
                                 var uploadDir = "./public/images/webImage/" + newName;
                                 fs.rename(file.path, uploadDir, function(err) {
                                     if (err) {
                                         res.write(err + "\n");
                                         res.end();
                                     }
                                     var commodityInfo={};
                                     // var commodityInfo={};
                                     var url="http://192.168.1.109:3006";
                             
                                     commodityInfo.openid=openid;
                                     commodityInfo.path=url+uploadDir.replace(".","")
                                     commodityInfo.mark=mark;
                                     
                                    imageInfo.insertwebImages(commodityInfo,function(data){
                                        if(data.code=="OK" ){
                                            var msg="图片入库成功";
                                            res.send(msg);
                                        }else{
                                            var msg="图片入库失败";
                                            res.send(msg);
                                        }                      
                                    })
                                     // //res.write("upload image:<br/>");
                                     // res.write("<img src='/images/" + newName + "' />");
                                     // res.end();
                     
                                 })
                     
                             }
                          }
                      });
                  }   
              })
 
          });
      });

module.exports = router;