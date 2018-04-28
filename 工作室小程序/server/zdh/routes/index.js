var express = require('express');
var router = express.Router();
var indexInfo=require('../dao/indexDao');
/* GET home page. */
router.get('/webimageinfo', function(req, res, next) {
  var mark="1";
  indexInfo.selectwebImageinfo(mark,function(data){
    if(data){
      var url=[];
      for(var obj of data){
         url.unshift(obj.bullupmall_webcommodity_image_url)
      }
     res.send(url)
    }else{
      var msg="请求错误";
      res.end(msg);
     } 
  })
});

router.get('/shopimageinfo', function(req, res, next) {
  var mark="2";
  indexInfo.selectshopImageinfo(mark,function(data){
    if(data){
      
      var urlandid=data.urllist;
      var shopinfo=[];
      for(var obj of urlandid){
        indexInfo.selectshopinfo(String(obj.bullupmall_commodity_image_url),function(result){ 
          if(result){
             shopinfo.push(result)
            // console.log(JSON.stringify(shopinfo));
            if(shopinfo.length==urlandid.length){
             // console.log(JSON.stringify(shopinfo));
              res.json(shopinfo);
            }
            return;
          }
        });   
      } 

      
      
    }else{
      var msg="请求错误";
      res.end(msg);
     } 
  })
});


module.exports = router;
//http://192.168.2.102:3006/public/images/1518060481184.png
