var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./indexSqlMapping');
var async = require('async');
var pool  = mysql.createPool($util.extend({},$conf.mysql));
module.exports={
    selectwebImageinfo:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.selectwebimage,[req],function(err,results,fields){
                if(err) throw err;
                callback(results);
            });
        });
    },
    selectshopImageinfo:function(req,callback){
        pool.getConnection(function(err,connection){
            var shoplist={};
            async.waterfall([
                function(callback){
                    connection.query($sql.selectshopinfo,[req],function(err,results,fields){
                        if(err)throw err;
                        shoplist.urllist=results;
                        callback(null,shoplist);
                    });
                },
            ],function(err,res){
                connection.release();
                callback(res);
            })
        });
    },
    selectshopinfo:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql.selectcommityimageId,[req],function(err,results,fields){
                        if(err) throw err;
                        data.url=req;
                        data.commodityimageid=results[0].bullupmall_commodity_image_id;
                        callback(null,data) 
                    });
               },
                function(data,callback){
                    connection.query($sql.selectcommityId,[data.commodityimageid],function(err,results,fields){
                        if(err) throw err;
                        data.commodityid=results[0].bullupmall_commodity_id;
                        callback(null,data) 
                    });  
                },function(data,callback){
                    connection.query($sql.selectcommodity,[data.commodityid],function(err,results,fields){
                        if(err) throw err;
                        data.commodityname=results[0].bullupmall_commodity_name;
                        data.commoditprice=results[0].bullupmall_commodity_unit_price;
                        callback(null,data)
                    })
                }
            ],function(res,res){
                connection.release();	
                callback(res);             
            })
        });
    }
}
