$().ready(function(){
    $("#submit2").click(function(){
        alert(22)
        var topic= $("#Introductiontopic").val();
        var time=$("#Introductiontime").val();
        var address=$("#Introductionaddress").val();
        var money=$("#Introductionmoney").val();
        var Introduction=$("#Introduction").val();
        if(topic==""|| time=="" || address=="" || money=="" || Introduction==""){
            alert("请输入完整的简介信息");
        }else{
            $.ajax({
                url:"/adminIntroductionInfo/add",
                data:{
                    topic:topic,
                    time:time,
                    address:address,
                    money:money,
                    Introduction:Introduction,
                },
                success:function(data){
                    alert(data.msg)
                }
            })
        }
    })

})