$().ready(function(){
    $("#submits").click(function(){
        var image=$("#fileIds")[0].files[0];
        var a = new FormData();
        a.append("image2", image);
        var formData = new FormData($( "#CputiluploadForm" )[0]);  
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
    });

    $("#dellsubmits").click(function(){
        var carouselid=6;
      $.ajax({
          url:"/admincarousel/dellcarousel",
          data:{
            carouselid:carouselid
          },
          success:function(data){
            if(data){
                alert(data)
            }

          }
      })   
    })

    $("#selectsubmits").click(function(){
        $.ajax({
            
            url:"/admincarousel/selectcarousel",
            success:function(data){
                if(data.msg){
                    
                    alert(data)
                }else{
                    console.log(JSON.stringify(data))
                }
            }
        })
   })



})