var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./scheduleSqlMapping');
var $sql2 = require('./mettingInfoMapping');
var async = require('async');
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports={
    insertscheduleInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql2.selectadminUserid,[req.admin],function(err,results,fields){
                        if(err) throw err;
                        data.adminUserid=results[0].user_id;
                        callback(null,data);
                    })
                },function(data,callback){
                    connection.query($sql.addscheduleinfo,[data.adminUserid,req.info.days],function(err,results,fields){
                        if(err) throw err ;
                        //data.schedule_id=results.insertId;
                        callback(null,data);
                    });
                },function(data,callback){
                    connection.query($sql.addscheduleidinfo,[req.info.days],function(err,results2,fields){
                        if(err) throw err ;
                        data.schedule_time_id=results2.insertId;
                        callback(null,data);
                    })
                },function(data,callback){
                    connection.query($sql.addscheduletimeinfo,[data.adminUserid,data.schedule_time_id,req.info.content,req.info.dan],function(err,results2,fields){
                        if(err) throw err ;
                         data.msg="SUCCESS"
                         callback(null,data);
                    })
                }
            ],function(err,res){
                connection.release;
                callback(res)
            });
        });
    }
}
