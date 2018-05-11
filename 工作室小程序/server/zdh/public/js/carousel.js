$().ready(function(){
    $("#submits").click(function(){
        var image=$("#fileIds")[0].files[0];
        var a = new FormData();
        a.append("image2", image);
        var formData = new FormData($( "#uploadForms" )[0]);  
        $.ajax({
            url:"/image/CarouseluploadImage",
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
})