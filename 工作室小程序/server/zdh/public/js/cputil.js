$().ready(function(){
    $("#cpsubmit").click(function(){
        var image=$("#cpfileId")[0].files[0];
        var a = new FormData();
        a.append("cpimage", image);
        var formData = new FormData($( "#CputiluploadForm" )[0]); 
        alert(JSON.stringify(formData))
        $.ajax({
            url:"/image/cputilInfo",
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
    $("#cpselect").click(function(){
        $.ajax({
            url:"/damincputilInfo/cpAllselect",
            success:function(data){
                if(data){
                    console.log(JSON.stringify(data))
                    alert(data.msg)
                }
            }
        })
    })
    $("#cpdell").click(function(){
        var cpid=7;
        $.ajax({
            url:"/damincputilInfo/dellcpinfo",
            data:{
                cpid:cpid
            },
            success:function(data){
                if(data){
                    console.log(JSON.stringify(data))
                    alert(data)
                }
            }
        })
    })
})