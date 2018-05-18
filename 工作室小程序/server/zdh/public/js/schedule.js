$().ready(function(){
    $("#submit-btn").click(function(){
        var days=$("#days").val();
        var content=$("#concent").val();
        var dan=$("#dan").val();
        $.ajax({
            url:'/adminschedule/addschedule',
            data:{
                days:days,
                content:content,
                dan:dan
            },
            success:function(data){
                if(data){
                    alert(data.msg)
                }
            }
        })
    })
})