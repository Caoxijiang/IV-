var express = require('express');
var router = express.Router();
var scheduleDao=require('../dao/scheduleDao');


router.all("/addschedule",function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
        var scheduleInfo={};
        scheduleInfo.admin=req.session.userName;
        scheduleInfo.info=req.query;
        scheduleDao.insertscheduleInfo(scheduleInfo,function(data){
            if(data.msg=="SUCCESS"){
                res.send({msg:"提交成功"})
            }else{
                res.send({msg:"提交失败"})
            }
        })
    }
});
















module.exports = router;