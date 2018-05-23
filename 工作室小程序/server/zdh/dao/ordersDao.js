var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./ordersSqlMapping');
var time=require('../util/TimeUtil');
var async = require('async');
 
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({},$conf.mysql));

   module.exports = {
    insertOrdersByuserId:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([  
               function(callback){  
                -    connection.query($sql.selectUserid,[req.openid],function(error,results,fields){
                        if (error) throw error;
                        data.user_id=results[0].user_id;
                        //console.log(55,user_id)
                        callback(null,data);
                      // connection.release();	
                    });
                },function(data,callback){
                    var time_end=req.user_order_start_time;
                   connection.query($sql.insert,[data.user_id,req.account,req.name,req.total_fee,time.formatTime(time_end,"Y-M-D h:m:s")],function(err,results,fields){
                        if(err)throw err;
                        data.msg="订单入库成功";
                        callback(null,data);
                       //connection.release();	
                    });
                }
            ],function(error,res){
                connection.release();	
                callback(res);
               
            });
        });
    },
    selectordersinfoByUserid:function(req,callback){
        pool.getConnection(function(err,connection){
            var orderinfo={};
            async.waterfall([
                function(callback){
                    connection.query($sql.selectUserid,[req],function(err,results,fields){
                        if(err)throw err;
                        orderinfo.user_id=results[0].user_id;
                        callback(null,orderinfo)
                    });
                },function(orderinfo,callback){
                    connection.query($sql.select,[orderinfo.user_id],function(error,results,fields){
                        if(err)throw(err);
                        orderinfo.orderList=results;
                        //orderinfo.orderList.image="http://127.0.0.1:3006/public/images/1517650289581.png";
                        // orderinfo.orderName=results[0].order_name;
                        // orderinfo.amount=results[0].order_amount*100;
                        // orderinfo.commodityId=results[0].bullupmall_commodity_id;
                        // orderinfo.satrtTime=results[0].order_start_time;
                        // orderinfo.status=results[0].order_status;
                        callback(null,orderinfo)
                    });
                }
            ],function(err,res){
                connection.release();	
                callback(res);
            });
            
        });
    },
    selectOrdersAccount:function(req,callback){   
        pool.getConnection(function(err,connection){
            var payCallbackInfo={};
            async.waterfall([
                function(callback){
                    connection.query($sql.selectUserid,[req],function(err,results,fields){
                        if(err)throw err;
                        payCallbackInfo.user_id=results[0].user_id;
                        callback(null,payCallbackInfo)
                    });
                },function(payCallbackInfo,callback){
                    connection.query($sql.selectAllUserAccount,[payCallbackInfo.user_id],function(err,results,fields){
                        if(err) throw err;
                        payCallbackInfo.Allamount=results;
                        callback(null,payCallbackInfo);
                    });
                // },function(req){
                //     connection.query($sql.insertOrdersendTime,[req.user_id],function(err,results,fields){
                //         if(err) throw err;
                //         payCallbackInfo.msgs="addOrdersendTimeOK";
                //         callback(null,payCallbackInfo);
                //     })
                }
            ],function(err,res){
                connection.release();
                callback(res);
            });
        });
    },
    updataStatusAndinsertendTime:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql.updataStatus,[req.status,req.out_trade_no],function(err,results,fields){
                        if(err) throw err;
                        data.updataMsg="Ok";
                        data.out_trade_no=req.out_trade_no;
                        callback(null,data);
                    });
                },function(data,callback){
                    connection.query($sql.updatatOrdersendTime,[req.time_end,req.out_trade_no],function(err,results,fields){
                        if(err) throw err;
                        data.updateendTimeMsg="OK";
                        callback(null,data);
                    });
                }
            ],function(err,res){
                connection.release();
                callback(res);
            });
        });
    },
    deleteoldOrderAccount:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.deleteoldAccount,[req.account],function(err,results,fields){
                if(err)throw err;
                var delMsg="DELOK";
                connection.release();
                callback(delMsg);	
            })
        })
    }
}