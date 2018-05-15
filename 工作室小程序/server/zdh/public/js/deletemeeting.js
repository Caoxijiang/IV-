$().ready(function(){
    $("#delete").click(function(){
        var topic="IV 2018智能车峰会";
        var Meturl="https://192.168.3.117:3006/public/images/1525935322148.jpg";
        $.ajax({
            url:"/adminmetting/dellmeetingList",
            data:{
                topic:topic,
                Meturl:Meturl
            },
            success:function(data){
                alert(data)
            }
        })
    })
})