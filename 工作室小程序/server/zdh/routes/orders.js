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
    var OldAccount=req.query.Account;

    console.log(OldAccount);
    // client.get(token,function(err,value){
    //     if(token!=secret.SECRET){
    //         var session_token="1";
    //         res.json(session_token);
    //     }else{
    //         var openid = JSON.parse(value).openid;
    //        // console.log("openid:"+openid)
    //     }
            var updateStatus={};
            updateStatus.out_trade_no=OldAccount;
            updateStatus.time_end=Math.round(new Date().getTime()/1000);
            updateStatus.status="3";
            ordersInfo.updataStatusAndinsertendTime(updateStatus,function(result){
                if(result){
                    var msg="updataStatusOK";
                    res.json(msg);
                  console.log("更新取消订单:"+OldAccount+" 状态成功");  
                }else{
                    console.log("更新取消订单:"+OldAccount+" 状态失败"); 
                    var msg="updataStatuserr";
                    res.json(msg);
                }
         })
    // });   
});
module.exports = router;