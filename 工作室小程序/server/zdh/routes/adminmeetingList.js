var express = require('express');
var router = express.Router();
var meetingeDao=require('../dao/mettinginfoDao');
var deleteimages=require('../util/util').delete;
router.all('/meetingList',function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
         var admin=req.session.userName;
        meetingeDao.adminfindmettingList(admin,function(result){
            if(result){
                res.send(result)
            }
        })
    }

})



router.all('/dellmeetingList',function(req,res){
    if(req.originalUrl != "/" && !req.session.userName){
        res.redirect("/");
    }else{
         var admin=req.session.userName;
         var topic=req.query.topic;
         var Meturl=req.query.Meturl;
        meetingeDao.dellmeetingList(topic,function(result){
            if(result="DELLSUCCESS"){
                //deleteimages(Meturl)
                //res.send(deleteimages(Meturl))
                deleteimages(Meturl,function(data){
                    if(data){
                        res.send(data);
                    }
                })
               // console.log(JSON.stringify( deleteimages(Meturl)))
                //console.log(res.send(deleteimages(Meturl))

            }else{
                res.send({
                    msg:"删除失败"
                })
            }
        })
    }

})









module.exports = router;