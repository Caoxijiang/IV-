var express = require('express');
var router = express.Router();
var client=require('../Redis/RedisServer');
var ordersInfo=require('../dao/ordersDao');
var secret = require('../conf/secret');
router.all('/orders',function(req,res,next){
    var token= req.query.openid;
    client.get(token,function(err,value){
        if(token!=secret.SECRET){
            var session_token="1";
            res.json(session_token);
        }else{
            var openid = JSON.parse(value).openid;
           // console.log("openid:"+openid)
        } 
        ordersInfo.selectordersinfoByUserid(openid,function(data){
            //console.log("订单列表》》》"+JSON.stringify(data))
            if(data){
                var orderInfo={};
                var account=[];
                orderInfo.account=data.orderList;
                // orderInfo.bullupmall_commodity_id=data.orderList.bullupmall_commodity_id;
                // orderInfo.name=data.orderList.order_name;
                // orderInfo.status=data.orderList.order_status;
                // orderInfo.money=data.orderList.order_amount;
               // console.log("订单列表数据包>>>>>",orderInfo);
              //  console.log(orderInfo);
                res.json(orderInfo)
            }else{
                var msg="订单列表获取失败,请检查你的网络";
                res.json(msg);
            }
        });
    });
});
router.all('/updateOrderAccountList',function(req,res,next){
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if(token!=secret.SECRET){
        var status_err="err";
        res.send(status_err);
        }else{ 
            ordersInfo.updataorderstatus(orderinfo,function(data){
                if(data=="SUCCESS"){
                   var  status_err="SUCCESS";
                   res.send(status_err);
                }else{
                    var status_err="SERVERERR"
                    res.end(status_err);
                }
            })
        }
  
    });
});


router.all("/insertorderInfo",function(req,res){
    var token=req.query.token || req.body.token;
    client.get(token,function(err,value){
      if(token!=secret.SECRET){
        var status_err="err";
        res.send(status_err);
        }else{ 
            var orderinfo={};
            orderinfo.Num=req.query.Num;
            orderinfo.total=req.query.total;
            orderinfo.tname=req.query.tname;
            orderinfo.phoneNum=req.query.phoneNum;
            orderinfo.startTime=req.query.startTime;
            ordersInfo.insertInfo(orderinfo,function(data){
                if(data=="SUCCESS"){
                   var  status_err="SUCCESS";
                   res.send(status_err);
                }else{
                    var status_err="SERVERERR"
                    res.end(status_err);
                }
            })
        }
  
    });
})




module.exports = router;