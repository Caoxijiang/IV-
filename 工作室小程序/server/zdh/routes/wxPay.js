var wxConfig = require('../conf/wxPayconfig'); 
var secret = require('../conf/secret');
var client=require('../Redis/RedisServer');
var express = require('express');
var cryptoMO = require('crypto'); // MD5算法
var parseString = require('xml2js').parseString; // xml转js对象
var router = express.Router();
var request = require('request');
// var userInfo=require('../dao/userDao');
var ordersInfo=require('../dao/ordersDao');
var time=require('../util/TimeUtil');
var key = wxConfig.Mch_key;
/*
 * 根据openid 发起微信支付  
 */
router.all('/wx_pay', function(req, res, next) {
    var param = req.query || req.params; 

    if(param.out_trade_no){
        var oldout_trade_no=param.out_trade_no;
        ordersInfo.deleteoldOrderAccount(oldout_trade_no,function(msg){
            console.log(msg.delMsg);
        })
    }else{
        var out_trade_no = wxConfig.getWxPayOrdrID();
    }
    var token= req.query.openid;
    console.log("session_token:"+token)
    client.get(token,function(err,value){
        console.log(value);
        if(token!=secret.SECRET){
            var session_token="1";
            res.end(session_token);
        }else{
            var openid = JSON.parse(value).openid;
            console.log("openid:"+openid)
        } 
         var body = param.title; // 商品描述
        //  var out_trade_no = wxConfig.getWxPayOrdrID(); // 商户订单号
         var total_fee = param.total*100; // 订单价格 单位是 分
         var timestamp = Math.round(new Date().getTime()/1000); // 当前时间
         var orderinfo={};
         orderinfo.openid=openid;
         orderinfo.account=out_trade_no;
         orderinfo.name=body;
         orderinfo.user_order_start_time=timestamp;
         orderinfo.total_fee=total_fee/100;
       
             var spbill_create_ip = req.ip.replace(/::ffff:/, ''); // 获取客户端ip
             var notify_url = 'http://dfe0757c.ngrok.io/wxPay/wxPaycallback' // 支付成功的回调地址  可访问 不带参数
             var nonce_str = ManthNum(); // 随机字符串
             var bodyData = '<xml>';
             bodyData += '<appid>' + wxConfig.AppID + '</appid>';  // 小程序ID
             bodyData += '<body>' + body + '</body>'; // 商品描述
             bodyData += '<mch_id>' + wxConfig.Mch_id + '</mch_id>'; // 商户号
             bodyData += '<nonce_str>' + nonce_str + '</nonce_str>'; // 随机字符串
             bodyData += '<notify_url>' + notify_url + '</notify_url>'; // 支付成功的回调地址 
             bodyData += '<openid>' + openid + '</openid>'; // 用户标识
             bodyData += '<out_trade_no>' + out_trade_no + '</out_trade_no>'; // 商户订单号
             bodyData += '<spbill_create_ip>' + spbill_create_ip + '</spbill_create_ip>'; // 终端IP
             bodyData += '<total_fee>' + total_fee + '</total_fee>'; // 总金额 单位为分
             bodyData += '<trade_type>JSAPI</trade_type>'; // 交易类型 小程序取值如下：JSAPI
             // 签名
             var sign = paysignjsapi(
                 wxConfig.AppID,
                 body, 
                 wxConfig.Mch_id, 
                 nonce_str,
                 notify_url, 
                 openid, 
                 out_trade_no, 
                 spbill_create_ip, 
                 total_fee
             );
             bodyData += '<sign>' + sign + '</sign>';
             bodyData += '</xml>';
                // 微信小程序统一下单接口
             var urlStr = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
             request({
                 url: urlStr,
                 method: 'POST',
                 body: bodyData
             }, function (error, response, body) {
                 if (!error && response.statusCode == 200) {
                     console.log(response);
                     var returnValue = {};
                     parseString(body, function (err, result) {
                         if (result.xml.return_code[0] == 'SUCCESS') {
                            ordersInfo.insertOrdersByuserId(orderinfo,function(data){
                             console.log("order"+JSON.stringify(data));
                             returnValue.msg = '操作成功';
                             returnValue.status = '100';
                             returnValue.out_trade_no = out_trade_no;  // 商户订单号
                             // 小程序 客户端支付需要 nonceStr,timestamp,package,paySign  这四个参数
                             returnValue.nonceStr = result.xml.nonce_str[0]; // 随机字符串
                             returnValue.timestamp = timestamp.toString(); // 时间戳
                             returnValue.package = 'prepay_id=' + result.xml.prepay_id[0]; // 统一下单接口返回的 prepay_id 参数值
                             returnValue.paySign = paysignjs(wxConfig.AppID, returnValue.nonceStr, returnValue.package, 'MD5',timestamp); // 签名
                           //  ordersInfo.insertOrdersByuserId(user_id,)
                             res.end(JSON.stringify(returnValue));
                            });
                         } else{
                             returnValue.msg = result.xml.return_msg[0];
                             returnValue.tokenaging=session_token;
                             returnValue.status = '102';
                             res.end(JSON.stringify(returnValue));
                         }
                     });
                 }
             })

     });
})
router.post('/wxPaycallback', function(req, res, next) {
    var body = req.body.xml;
    parseString(body,function(err,result){    
        if(body.return_code=="SUCCESS"){
            var wxPayCallback={};
            wxPayCallback.openid=body.openid;
            wxPayCallback.appid=body.appid;
            wxPayCallback.mch_id=body.mch_id;
            wxPayCallback.out_trade_no=body.out_trade_no;
           // wxPayCallback.result_code=body.result_code;
            wxPayCallback.sign=body.sign;
            console.log("时间"+body.time_end);
            wxPayCallback.time_end=body.time_end;
            wxPayCallback.total_fee=body.total_fee;
            wxPayCallback.transaction_id=body.transaction_id;
            wxPayCallback.status="1";
            console.log("PaySuccessCalback"+JSON.stringify(wxPayCallback));
            ordersInfo.selectOrdersAccount(wxPayCallback.openid,function(data){
                if(data){
                var account=data.Allamount;
                for(var obj in account){
                      var num=account[obj].order_account;
                }
                    console.log("obj",account[obj].order_account)
                    if(wxPayCallback.out_trade_no==num && body.result_code=="SUCCESS"){
                        console.log("13132131》》》》》")
                        ordersInfo.updataStatusAndinsertendTime(wxPayCallback,function(data){
                            if(data){
                                console.log("data==>","订单日期更新成功"+JSON.stringify(data));

                                var xml = '<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>';
                                res.send(xml);
                            }else{
                                console.log("订单更新失败");
                                var xml = '<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[error]]></return_msg></xml>';
                                res.send(xml);
                            }
                        });
                    }else{
                        console.log("无效订单"+wxPayCallback.out_trade_no);
                    };
                
              }else{
                  console.error();
              }
            });
            
        }else{
            console.log("支付结果通知失败:"+new Date().getTime());
        }
       
    })

   
});


function paysignjsapi(appid,body,mch_id,nonce_str,notify_url,openid,out_trade_no,spbill_create_ip,total_fee) {
    var ret = {
        appid: appid,
        body: body,
        mch_id: mch_id,
        nonce_str: nonce_str,
        notify_url:notify_url,
        openid:openid,
        out_trade_no:out_trade_no,
        spbill_create_ip:spbill_create_ip,
        total_fee:total_fee,
        trade_type: 'JSAPI'
    };
    var str = raw(ret);
    str = str + '&key='+key;
    var md5Str = cryptoMO.createHash('md5').update(str).digest('hex');
    md5Str = md5Str.toUpperCase();
    return md5Str;
};
function raw(args) {
    var keys = Object.keys(args);
    keys = keys.sort(); 
    var newArgs = {};
    keys.forEach(function(key) {
        newArgs[key.toLowerCase()] = args[key];
    });

    var str = '';
    for(var k in newArgs) {
        str += '&' + k + '=' + newArgs[k];
    }
    str = str.substr(1);
    return str;
};
function paysignjs(appid, nonceStr, package, signType, timeStamp) {
    var ret = {
        appId: appid,
        nonceStr: nonceStr,
        package: package,
        signType: signType,
        timeStamp: timeStamp
    };
    var str = raw1(ret);
    str = str + '&key='+key;
    return cryptoMO.createHash('md5').update(str).digest('hex');
};

function raw1(args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function(key) {
        newArgs[key] = args[key];
    });

    var str = '';
    for(var k in newArgs) {
        str += '&' + k + '=' + newArgs[k];
    }
    str = str.substr(1);
    return str;
};
function ManthNum(){
  return  Math.random().toString(36).substr(2);
};;




module.exports = router;



// wechat.wxPayCallback = function(_req, _cb) {
//     //返回来的XML数据，现在是以express4.X的返回数据为例子，实际中要以实际数据进行解析
//     var _reBody = _req.body || _req.rawBody;
//     var _payInfo = _reBody.xml;

//     if (_payInfo.return_code == 'SUCCESS') {
//         console.log('用户成功支付金额：', _payInfo.cash_fee);
//         console.log('用户openid：', _payInfo.openid);
//     } else {
//         console.log('用户支付失败：', _payInfo.return_msg);
//         console.log('用户openid：', _payInfo.openid);
//     }
//     var xml = '<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>';

//     _cb && _cb(xml);
// };

// module.


// console.log(time.formatTime(1517056961,"Y-M-D h:m:s") )