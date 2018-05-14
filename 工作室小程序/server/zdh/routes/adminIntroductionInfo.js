var express = require('express');
var router = express.Router();
var IntroductionDao=require('../dao/IntroductionDao');
router.get("/add",function(req,res){
   // console.log(req)
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
         var IntroductionInfo=req.query;
         var admin=req.session.userName;
         IntroductionInfo.admin=admin;
         IntroductionDao.addInfo(IntroductionInfo,function(result){
            if(result.msg){
                res.send({msg:"添加成功"})
            }else{
                res.send({msg:"添加失败"})
            }
        })
    }


})


























module.exports = router;