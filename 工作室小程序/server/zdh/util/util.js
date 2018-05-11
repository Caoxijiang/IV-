/**
 * Created by fujunou on 2015/3/6.
 */
var fs=require('fs')
  exports. extend=function(target, source, flag) {
        for(var key in source) {
            if(source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    }




    exports.delete=function(req,res){//删除图片  
        if(req){
            var fileName=req;  
            fs.unlink("./public/images/"+fileName);  
            res.send({msg:"失败"})  
            res.redirect('/');  
        }else{
            res.send({msg:"未找到删除图片信息"})
        }

    };  

