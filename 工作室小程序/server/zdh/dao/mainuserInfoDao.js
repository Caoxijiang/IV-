var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./mainuserInfoSqlMapping');
var async=require('async')


var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports={
    insertmedia:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.insertmediaInfo,[req.tickedId,req.name,req.phone,req.email,req.util,req.job,req.platform],function(err, results, fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg)
            })
        })
    },
    insertStu:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.insertStuInfo,[req.tickedId,req.name,req.phone,req.email,req.school,req.stuNum],function(err, results, fields){
                if(err) throw err;
                var msg ="SUCCESS";
                connection.release();
                callback(msg)
            })
        })
    },
    insertVip:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.insertVipInfo,[req.tickedId,req.name,req.phone,req.email,req.util,req.job,req.VipNum],function(err, results, fields){
                if(err) throw err;
                var msg="SUCCESS";
                connection.release();
                callback(msg)
            })
        })
    },
    insertnoVip:function(req,callback){
        pool.getConnection(function(err,connection){
            connection.query($sql.insertnoVipInfo,[req.tickedId,req.name,req.phone,req.email,req.util,req.job],function(err, results, fields){
                var msg="SUCCESS";
                connection.release();
                callback(msg)
            })
        })
    }
}