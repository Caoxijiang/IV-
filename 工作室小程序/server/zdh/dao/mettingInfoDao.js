mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./mettingInfoMapping');
var time=require('../util/TimeUtil');
var async = require('async');

var pool  = mysql.createPool($util.extend({},$conf.mysql));

module.exports={
    insertmeetingInfo:function(req,callback){
        pool.getConnection(function(err,connection){
            var data={};
            async.waterfall([
                function(callback){
                    connection.query($sql.selectadminUserid,[req.admin],function(err,results,fields){
                        if(err)throw err;
                        data.adminUserid=results[0].user_id;
                        callback(null,data)
                    });
                },function(data,callback){
                    connection.query($sql.insertmeetingInfo,[data.adminUserid,req.topic,req.Summary,req.url],function(err,results,fields){
                        if(err) throw err;
                        data.msg="SUCCESS";
                        callback(null,data);
                    });
                },
                // function(data,callback){
                //     connection.query($sql.selectmeetingId,[data.adminUserid],function(err,results,fields){
                //         if(err) throw err;
                //         data.meetingID=results[0].metting_id;
                //         callback(null,data);
                //     });
                // },
                // function(data,callback){
                //     connection.query($sql.insertmeetingImageinfo,[data.meetingID,req.url],function(err,results,fields){
                //         if(err)throw err;
                //         data.msg1="SUCCESS"
                //         callback(null,data);
                //     })
                // }
            ],function(err,res){
                connection.release();	
                callback(res);
            });
        });
    }
}