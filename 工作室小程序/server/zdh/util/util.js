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




    exports.delete=function(req,callback){//删除图片  
        if(req){
            //fs.unlink("./public/images/"+fileName);    
            fs.unlink(req, function(err) {
                if (err) {
                    var msg="未找到删除图片";
                   callback(msg)
                }else{
                    var msg="SUCCESS";
                    callback(msg)
                }
             });
  
        }else{
            var msg="未找到删除图片信息";
            callback(msg) ;
        }

    };  

