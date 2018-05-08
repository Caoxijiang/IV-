var secret = require('../conf/secret');
var WXBizDataCrypt=require('../conf/WXBizDataCrypt');
var Redis=require('redis');
var client=require("../Redis/RedisServer")
var express = require('express');
var router = express.Router();
var request = require('request');
var wxuserDao=require('../dao/wxuserDao')
var util=require('../util/util');
// var uuid = require('node-uuid');
/* 微信登陆 */
var AppID = 'wx5e7537035eaaf2ba';
var AppSecret = '48424f8224b05cae5359abf8ea6a9a23';
router.get('/wx_login', function (req, res, next) {
    var code = req.query.code
    request.get({
      uri: 'https://api.weixin.qq.com/sns/jscode2session',
      json: true,
      qs: {
        grant_type: 'authorization_code',
        appid: 'wx5e7537035eaaf2ba',
        secret: '48424f8224b05cae5359abf8ea6a9a23',
        js_code: code
      }
    },(err, response, data) => {
      if (response.statusCode === 200) {
        //  console.log(data)
          var secretValue = {
          openid: data.openid,
          session_key: data.session_key
        }
        client.set(secret.SECRET, JSON.stringify(secretValue), 'EX', 7200);
        var openid=data.openid;
        
      res.send({wxtoken: secret.SECRET})
      } else {
        console.log("[error]", err)
        var sessionValue = data.session_key + data.openid; 
        res.json(err)
      }
    })
  })

  // 根据传过来的第三方session在内存获取session_key去微信获取加密信息
router.get('/encryptData', function (req, res, next) {
  console.log(req.query)
  var wxuserInfo=req.query.wxuserInfo;
  var wxalluserinfo={};
  wxalluserinfo.wxuserInfo=JSON.parse(wxuserInfo);
  var session_key = null;
  var token = req.query.token;
  client.get(token,function(err,value){
    if(token!=secret.SECRET){
      var status_err="err";
      res.send(status_err);
      }else{ 
      var session_key = JSON.parse(value).session_key;
      var pc = new WXBizDataCrypt(AppID, session_key);
      var decrypt_data = pc.decryptData(req.query.encryptedData, req.query.iv);
      var wxphoneNum=decrypt_data.phoneNumber;
      console.log(JSON.stringify("手机号 ："+decrypt_data.phoneNumber));
      wxalluserinfo.wxphoneNum=wxphoneNum;
      wxuserDao.selectwxphoneNUm(wxphoneNum,function(result){
        if(result==undefined){
          wxuserDao.insertwxUserInfo(wxalluserinfo,function(result){
            if(result.msg=="SUCCESS"){
              res.send({
                msg:"REGISTEREDSUCCESS"
              })
            }else{
              res.send({msg:"Servererror"})
            }
          })   
        }else if(result.wx_phoneNumRole==1){
          res.send({
             msg:"ADMINLOGINSUCCESS"
          })
        }else{
          res.send({
            msg:"LOGINSUCCESS"
         })
        }
      })

     }
  }) 
    //先判断redis里的 session_key expires_in openid 是否匹配或者未过期
    // let session_key = null;
    // let token = req.query.token;
    // client.get(token, function (err, value) {
      
    //   session_key = JSON.parse(value).session_key;
    //   var pc = new WXBizDataCrypt(AppID, session_key);
    //   // decrypt_data为解密后的信息
    //   var decrypt_data = pc.decryptData(req.query.encryptedData, req.query.iv);
    //   console.log(JSON.stringify("手机号 ："+decrypt_data.phoneNumber));
    //   res.send({
    //     msg: '解密成功'
    //   })
    // })
  
  })

module.exports = router;

