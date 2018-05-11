$().ready(function(){
    $("#submit2").click(function(){
        var topic= $("#Introductiontopic").val();
        var time=$("#Introductiontime").val();
        var address=$("#Introductionaddress").val();
        var money=$("#Introductionmoney").val();
        var Introduction=$("#Introduction").val();
        if(topic==""|| time=="" || address=="" || money=="" || Introduction==""){
            alert("请输入完整的简介信息");
        }else{
            $.ajax({
                url:"/"
            })
        }
    })

})