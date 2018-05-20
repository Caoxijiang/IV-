var express = require('express');
var client=require("../Redis/RedisServer")
var fs=require("fs");
var router = express.Router();
var formidable = require("formidable");
// var imageInfo=require("../dao/imagesDao");
var secret = require('../conf/secret');
var url=require('../conf/imageconf').url;
var meetingeDao=require('../dao/mettinginfoDao');
var indexDao=require('../dao/indexDao');
var guestsDao=require('../dao/guestsDao');
var cputilDao=require('../dao/cputilDao')
var deleteimages=require('../util/util').delete;
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
                                   res.end({msg:"图片存入服务器失败"});
                               }else{
                                   var meetingInfo={};
                                   meetingInfo.url=url+uploadDir.replace(".","");
                                   meetingInfo.topic=fields.topic;
                                   meetingInfo.Summary=fields.Summary;
                                   meetingInfo.datetimeStart=fields.datetimeStart.toString();
                                   meetingInfo.admin=req.session.userName;
                                   meetingeDao.insertmeetingInfo(meetingInfo,function(data){
                                        if(data.msg=="SUCCESS"){
                                            res.send({msg:"会议信息上传成功"}) 
                                        }else{
                                            deleteimages(uploadDir)
                                        }
                                   })

                            }
                       })
           
                   }
                }
               }
            });
        } 

     });

     router.all('/CarouseluploadImage', function(req, res) {
        console.log(req.session.userName);
        if(req.originalUrl != "/" && !req.session.userName){
            res.redirect("/");
        }else{
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; 
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小    
            form.uploadDir = "./public/images/webImage/"; //改变临时目录
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
                           var uploadDir = "./public/images/webImage/" + newName;
                           fs.rename(file.path, uploadDir, function(err) {
                               if (err) {
                                   res.end({msg:"图片存入服务器失败"});
                               }else{
                                   var CarouselInfo={};
                                   CarouselInfo.url=url+uploadDir.replace(".","");
                                   CarouselInfo.admin=req.session.userName;
                                   indexDao.admininsertCarouselInfo(CarouselInfo,function(data){
                                        if(data.msg=="SUCCESS"){
                                            res.send({msg:"轮播上传成功"}) 
                                        }else{
                                            deleteimages(uploadDir)

                                        }
                                   })

                            }
                       })
           
                   }
                }
               }
            });
        } 

     });


     router.all('/guestsInfo', function(req, res) {
        console.log(req.session.userName);
        if(req.originalUrl != "/" && !req.session.userName){
            res.redirect("/");
        }else{
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; 
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小    
            form.uploadDir = "./public/images/webImage/"; //改变临时目录
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
                           var uploadDir = "./public/images/guestsImage/" + newName;
                           fs.rename(file.path, uploadDir, function(err) {
                               if (err) {
                                   res.end({msg:"图片存入服务器失败"});
                               }else{
                                   var guestsInfo={};
                                   guestsInfo.url=url+uploadDir.replace(".","");
                                   guestsInfo.admin=req.session.userName;
                                   guestsInfo.name=fields.name;
                                   guestsInfo.job=fields.job;
                                   guestsInfo.status=fields.status;
                                   guestsDao.addguestsInfo(guestsInfo,function(data){
                                        if(data.msg=="SUCCESS"){
                                            res.send({msg:"嘉宾信息上传成功"}) 
                                        }else{
                                            deleteimages(uploadDir)

                                        }
                                   })

                            }
                       })
           
                   }
                }
               }
            });
        } 

     });




     router.all('/cputilInfo', function(req, res) {
        console.log(req.session.userName);
        if(req.originalUrl != "/" && !req.session.userName){
            res.redirect("/");
        }else{
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; 
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小    
            form.uploadDir = "./public/images/cputilimage/"; //改变临时目录
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
                           var uploadDir = "./public/images/cputilimage/" + newName;
                           fs.rename(file.path, uploadDir, function(err) {
                               if (err) {
                                   res.end({msg:"图片存入服务器失败"});
                               }else{
                                   var cputilInfo={};
                                   cputilInfo.cpurl=url+uploadDir.replace(".","");
                                   cputilInfo.admin=req.session.userName;
                                   cputilInfo.cpname=fields.cpname;
                                   cputilInfo.cptype=fields.cptype;
                                   cputilDao.insertcputilinfo(cputilInfo,function(data){
                                        if(data.msg=="SUCCESS"){
                                            res.send({msg:"合作单位信息上传成功"}) 
                                        }else{
                                            deleteimages(uploadDir)

                                        }
                                   })

                            }
                       })
           
                   }
                }
               }
            });
        } 

     });


module.exports = router;