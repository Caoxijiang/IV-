var express = require('express');
var router = express.Router();
var meetingeDao=require('../dao/mettinginfoDao');
var deleteimages=require('../util/util').delete;
router.all('/meetingList',function(req,res){
    console.log(11)
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
         var admin=req.session.userName;
        meetingeDao.adminfindmettingList(admin,function(result){
            if(result){
                console.log(JSON.stringify(result))
            }
        })
    }

})













module.exports = router;