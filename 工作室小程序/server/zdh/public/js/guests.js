$().ready(function(){
    //上传简介
    $("#submit3").click(function(){
        var image=$("#fileIdss")[0].files[0];
        var a = new FormData();
        a.append("image3", image);
        var formData = new FormData($( "#GuestsuploadForm" )[0]); 
        alert(JSON.stringify(formData))
        $.ajax({
            url:"/image/guestsInfo",
            data: formData,
            type: "POST",
            cache: false,
            processData: false,
            contentType:false,
            async: false,
            success:function(data){
                if(data){
                    alert(data.msg)
                }else{
                    alert("出错")
                }
            }

        })  
    })
   //删除简介
    $("#guestsdelete").click(function(){
        var ID=5;
        $.ajax({
            url:"/guests/dellguestsInfo",
            data:{
                ID:ID
            },
            success:function(data){
                alert(data)
            }
        })
    })
     //查询简介
    $("#selectguests").click(function(){
        var ID=5;
        $.ajax({
            url:"/guests/selectguestsinfo",
            success:function(data){
                alert(JSON.stringify(data))
            }
        })
    })

})