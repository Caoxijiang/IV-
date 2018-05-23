/**
 * Created by Jackie on 2018-05-12.
 */
$(function(){
    $(function(){
        $("#swiperAdd-btn").click();
        
    })
    
    $("#swiperAdd-btn").on("click",function(){
        var addswiper = '<div class="news-box"> '+
            '<div class="news-title"> '+
            '<h2 class="">添加轮播</h2> '+
            /*<button id="add-img" class="btn btn-warning">添加轮播</button>*/
        '</div> '+
        '<div class="news-content"> '+
        '<div class="add-swiper"> '+
        '<div class="add-img"> '+
        '<fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;"> '+
        '<legend>上传轮播图片</legend> '+
        '</fieldset> '+
        '<div class="layui-upload">'+
        '<button type="button" class="layui-btn" id="upImg">上传图片</button>'+
        '<div class="layui-upload-list">'+
        '<img class="layui-upload-img news-upImg" id="demo1">'+
        '<p id="demoText"></p>'+
        '</div></div>'+
        '</div> '+
        '</div> '+
        '</div> '+
        '</div>'
        $(".news-box").remove();
        $(".main-right").append(addswiper);
        upImg();
    })
    $("#swiperManage-btn").on("click",function(){
        var  swiperManage =  '<div class="news-box"><div class="news-title">'+
            '<h2>轮播管理</h2>'+
            '</div>'+
            '<div class="news-content">'+
            '<table class="table-box table-sort " id="addSwiperImg">'+
            '<thead>'+
            '  <tr >'+
            '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
            '   <th style="text-align: center;">图片</th>'+
            '    <th style="text-align: center;">操作</th>'+
            '  </tr>'+
            '   </thead>'+
            '   <tbody>'+
            '  </tbody>'+
            '   </table>'+
            '</div></div>'
        $(".news-box").remove();
        $(".main-right").append(swiperManage);
        $.ajax({
            type:"get",
            url:"/admincarousel/selectcarousel",
            success:function(data){
               console.log(data);
              // var addImgHtml = ''
              $(data).each(function(index,element){
                index+=1;
                // console.log(index);
                // console.log(element.carousel_url);
               var  addImgHtml = '<tr>'+
                            '<td>'+index+'</td>'+
                            '<td><img style="width: 100px; height: 100px;" src="'+element.carousel_url+' " alt=""></td>'+
                            '<td ><button id="delImg-btn" data-carousel_id="'+element.carousel_id+'" class="btn btn-primary">删除</button></td>'+
                            '</tr>';
           $("#addSwiperImg tbody").append(addImgHtml);
           })
           //删除轮播图片接口
           $("#addSwiperImg").on("click","#delImg-btn",function(){
           // var getImgUrl = $(this).attr("data-img");
            var getImgId = $(this).attr("data-carousel_id");
            console.log(getImgId);
         $.ajax({
             url:"/admincarousel/dellcarousel",
             data:{
                 "carouselid" : getImgId
             },
             success:function(data){
               //console.log(data);
               if(data == 1){
                 $("#swiperManage-btn").click();
               }else{
                 layer.msg('您的操作有误', {
                     icon: 1,
                     time: 1000
                   });
               }
             }
         })
         })  
            }
        })
    })

    addimportBtn();
    function addimportBtn(){
      
    $("#add-importent").on("click",function(){
        var jaychou = [];
        //强力推荐
        //$.get("/admincomm/selectcomminfo",function(result){
           $.ajax({
            url:'/admincomm/selectcomminfo',
            cache:false,
            success:function(result){
            if(result){
               for(var obj1 of result){
                   for(obj2 of obj1){
                      
                       jaychou.push(obj2);
                     
                   }
               }
            }else{
                 alert("没有数据")
            }
        }
        })
        var addimportent =  '<div class="news-box"><div class="news-title">'+
        '<h2>添加内容</h2>'+
        '</div>'+
        '<div class="news-content">'+
        '<table class="table-box table-sort " id="add-importentTable">'+
        '<thead>'+
        '  <tr >'+
        '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
        '   <th style="text-align: center;">标题</th>'+
        '   <th style="text-align: center;">内容</th>'+
        '    <th style="text-align: center;">图片</th>'+
        '    <th style="text-align: center;">时间</th>'+
        '    <th style="text-align: center;">操作</th>'+
        '  </tr>'+
        '   </thead>'+
        '   <tbody>'+
        '  </tbody>'+
        '   </table>'+
        '</div></div>'
    $(".news-box").remove();
    $(".main-right").append(addimportent);
    $.ajax({
        type:"get",
        url:"/adminmetting/meetingList",
        async:true,
        success:function(data){
            console.log(data);
            $(data).each(function(index,element){
                 index+=1;
                // console.log(index);
                // console.log(element.metting_topic);
                var  newsManageTR =  '<tr class="metting">'+
                 '<td>'+index+'</td>'+
                 '<td>'+element.metting_topic+'</td>'+
                 '<td>'+element.metting_Summary+'</td>'+
                 '<td><img src="'+element.metting_imageUrl+'"/></td>'+
                 '<td>'+element.metting_startTime+'</td>'+
                 '<td >'+
                 //'<button class="btn btn-danger">修改</button>'+
                 '<button id="addimport-btn" data-id="'+element.metting_id+'"   data-img="'+element.metting_imageUrl+'" class="addimport-btn btn btn-primary">添加</button>'+
                 '</td>'+
                 '</tr>'         
            $("#add-importentTable tbody").append(newsManageTR);
            })
            //addimportBtn()
           
       
       
       // console.log(aaa);
        var fff = jaychou;
        $(".addimport-btn").on("click",function(){
            var getImportId = parseInt($(this).attr("data-id"));
            var improtentArr = [];
            console.log(getImportId);
            improtentArr.push(getImportId);
            $.ajax({
             url:"/admincomm/insertcomminfo",
             data:{
                  "metid":improtentArr
             },
             beforeSend:function(){
                 console.log(fff);
                if(fff){
                    for(var a1 of fff){
                        if(getImportId==a1.metting_id){
                            layer.msg('提交重复', {
                                icon: 1,
                                time: 1000
                              });
                           return false;
                          }
                    }
                }
             // console.log(fff)
                
             },
             success:function(data){
                 console.log(data);
                 if(data.msg== "SUCCESS"){
                    layer.msg('成功提交', {
                        icon: 1,
                        time: 1000
                      });
                      $("#add-importent").click();
                 }else{
                    layer.msg('您的操作有误', {
                        icon: 1,
                        time: 1000
                      });
                 }
               
             }
         })
           // console.log(improtentArr);
            //   $.get("/admincomm/selectcomminfo",function(result){
            //       if(result){
            //          for(var obj1 of result){
            //              for(obj2 of obj1){
            //                  console.log(obj2.metting_id)
            //                  console.log(typeof(obj2.metting_id))//number
            //                  console.log(typeof(getImportId))//string
            //                  if(getImportId===obj2.metting_id){
            //                      alert("一样的")
            //                  }else{
            //                     improtentArr.push(getImportId);
            //                      alert("no"+improtentArr);
            //                  }
            //              }
            //          }
            //       }else{
            //            alert("没有数据")
            //       }
            //   })
         })
      
        }         
    });
    });
}
        //内容管理
        $("#add-importentManage").on("click",function(){
            
             var  addImportentManage =  '<div class="news-box"><div class="news-title">'+
             '<h2>内容管理</h2>'+
             '</div>'+
             '<div class="news-content">'+
             '<table class="table-box table-sort " id="importManageTable">'+
             '<thead>'+
             '  <tr >'+
             '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
             '   <th style="text-align: center;">标题</th>'+
             '   <th style="text-align: center;">内容</th>'+
             '    <th style="text-align: center;">图片</th>'+
             '    <th style="text-align: center;">时间</th>'+
             '    <th style="text-align: center;">操作</th>'+
             '  </tr>'+
             '   </thead>'+
             '   <tbody>'+
            
             '  </tbody>'+
             '   </table>'+
             '</div></div>'
         $(".news-box").remove();
         $(".main-right").append(addImportentManage);
         $.ajax({
             url:"/admincomm/selectcomminfo",
             cache:false,
             success:function(data){
                 console.log(data);
                 $.each(data,function(idx,element){
                 //     console.log(idx);
                 //    console.log(element);
                 idx+=1;
                    $.each(element,function(i,ele){
                
                     // console.log(index);
                     // console.log(element.metting_topic);
                     var  newsManageTR =  '<tr class="metting">'+
                      '<td>'+idx+'</td>'+
                      '<td>'+ele.metting_topic+'</td>'+
                      '<td>'+ele.metting_Summary+'</td>'+
                      '<td><img src="'+ele.metting_imageUrl+'"/></td>'+
                      '<td>'+ele.metting_startTime+'</td>'+
                      '<td >'+
                      //'<button class="btn btn-danger">修改</button>'+
                      '<button  data-id="'+ele.metting_id+'"    class="delImport-btn btn btn-primary">删除</button>'+
                      '</td>'+
                      '</tr>'         
                 $("#importManageTable tbody").append(newsManageTR);
                    })
                    $(".delImport-btn").on("click",function(){
                        var _that = $(this);
                        var delImportId = $(this).attr("data-id");
                        $.ajax({
                            url:"/admincomm/dellcomminfo",
                            data:{
                                "metid":delImportId
                            },
                            success:function(data){
                              if(data.msg=="删除成功"){
                                _that.parent().parent().remove();
                            // $("#add-importentManage").click();
                              }
                            }
                        })
                    })
                 })
             }
         })
     
         })
    //大会简介
    $("#meeting-synopsis").on("click",function(){
        $(".upUserMsg").css("display","none");
        var meetingSynopsisHtml = '<div class="news-box"><div class="news-title">'+
          //  ' <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModal">添加</button>'+
                '<h2>大会简介</h2>'+
        '</div>' +
            '<div class="news-content">' +
           ' <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">' +
           ' <ul class="layui-tab-title">' +
           ' <li class="layui-this">大会简介</li>' +
           ' <li>简介提交</li>' +
           ' </ul>' +
           ' <div class="layui-tab-content" style="height: 100px;">' +
           ' <div class="layui-tab-item layui-show">'+
           '<table class="table-box table-sort " id="getMeetingTable">'+
           '<thead>'+
           '  <tr >'+
         //  '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
         '   <th style="text-align: center;">标题</th>'+
           '   <th style="text-align: center;">时间</th>'+
           '   <th style="text-align: center;">地点</th>'+
           '    <th style="text-align: center;">价格</th>'+
           '    <th style="text-align: center;">内容</th>'+
           '    <th style="text-align: center;">操作</th>'+
           '  </tr>'+
           '   </thead>'+
           '   <tbody>'+
          
          
           '  </tbody>'+
           '   </table>'+
           '</div>' +
           ' <div class="layui-tab-item">'+
                    '<form class="layui-form" >' +
                    '<div class="layui-form-item">' +
                            '<label class="layui-form-label">标题</label>' +
                            '<div class="layui-input-block">' +
                            '<input type="text" name="title" id="meetingTitle" lay-verify="title" style=" width: 308px; float: left" autocomplete="off" placeholder="请输入主题" class="layui-input">' +
                            // '<button class="layui-btn layui-btn-primary layui-btn-sm" >' +
                            //  '<i class="layui-icon">f</i>'+
                            // '</button>'+
                             //   '<button class="layui-btn layui-btn-primary " style="float: left"><i class="layui-icon"></i></button>'+
                            '</div>' +
                    '</div>' +
                    '<div class="layui-form-item">' +
                            '<label class="layui-form-label">时间</label>' +
                            '<div class="layui-input-block">' +
                            '<input type="text" id="meetingDate" class="layui-input" id="meeting" style=" width: 308px; float: left;" placeholder=" - ">' +
                            //'<button class="layui-btn layui-btn-primary " style="float: left"><i class="layui-icon"></i></button>'+
                            '</div>' +
                    '</div>'+
                    '<div class="layui-form-item">' +
                            '<label class="layui-form-label">地点</label>' +
                            '<div class="layui-input-block">' +
                                '<input type="text" id="meetingSite" name="title" lay-verify="title" style=" width: 308px; float: left" autocomplete="off" placeholder="请输入地点" class="layui-input">' +
    
                               // '<button class="layui-btn layui-btn-primary " style="float: left"><i class="layui-icon"></i></button>'+
                            '</div>' +
                    '</div>'+
                        '<div class="layui-form-item">' +
                            '<label class="layui-form-label">价格</label>' +
                                '<div class="layui-input-block">' +
                                '<input type="text" name="title" id="meetingPrice" lay-verify="title" style=" width: 308px; float: left" autocomplete="off" placeholder="请输入价格" class="layui-input">' +
    
                              //  '<button class="layui-btn layui-btn-primary " style="float: left"><i class="layui-icon"></i></button>'+
                                    '</div>' +
                        '</div>'+
                      
                    '<div class="layui-form-item">' +
                        '<label class="layui-form-label">内容</label>' +
                        '<div class="layui-input-block">' +
                '<textarea placeholder="请输入内容" class="layui-textarea" id="metingContent"></textarea>'+
                        '</div>' +
                    '</div>'+
                '<div class="layui-form-item">'+
                '<div class="layui-input-block">'+
                '<button id="upMeetingMsg-btn" class="layui-btn" >立即提交</button>'+
            //  '<button class="layui-btn layui-btn-primary " ><i class="layui-icon"></i></button>'+
                ' <button type="reset" class="layui-btn layui-btn-primary">重置</button>'+
                ' </div>'+
                ' </div>'+
                '</form>'+
                '</div>' +
           ' </div>' +
           ' </div> ' +
                '</div>'+
            '</div>'
        $(".news-box").remove();
        $(".main-right").append(meetingSynopsisHtml);
        laydate.render({
            elem: '#meetingDate'
            ,type: 'datetime'
            ,range: true
        });
        //获取大会简介接口
        var meetingInfoNum;
       $.ajax({
           url:"/adminIntroductionInfo/select",
           success:function(data){
                meetingInfoNum = data.length;
               console.log(data)
               if(meetingInfoNum != 0){
                var  getMeetingInfoHtml =  '<tr>'+
                '   <td>'+data[0].topic+'</td>'+
                '   <td>'+data[0].time+'</td>'+
                '   <td>'+data[0].address+'</td>'+
               
                '   <td>'+data[0].money+'</td>'+
                '<td>'+data[0].Introduction+'</td>'+
                '<td ><button id="delMeetingTable" data-title="'+data[0].topic+'" class="btn btn-primary">删除</button></td>'+
                '   </tr>'
                $("#getMeetingTable tbody").append(getMeetingInfoHtml);
               }else{
                $("#getMeetingTable").html("<h2>暂无内容</h2>");
               }
             
           }
       })
       $("#getMeetingTable").on("click","#delMeetingTable",function(){
           var meetingTableTitle = $(this).attr("data-title");
           var TableMeetingTrDel = $(this);
           $.ajax({
               url:"/adminIntroductionInfo/dell",
               data:{
                   "topic":meetingTableTitle
               },
               success:function(data){
                      console.log(data);
                      TableMeetingTrDel.parent().parent().remove();
               } 
           })
       })
       //提交大会简介信息
        $("#upMeetingMsg-btn").on("click",function(){
            console.log(meetingInfoNum);
          
            if($("#meetingTitle").val()==""||$("#meetingDate").val()==""||$("#meetingSite").val()==""||$("#meetingPrice").val()==""||$("#metingContent").val()==""){
                layer.msg('您的输入内容不能为空', {
                    icon: 1,
                    time: 1000
                  });
                  return false;
               }
               var meetingTitle = $("#meetingTitle").val();
               var meetingDate = $("#meetingDate").val();
               var meetingSite = $("#meetingSite").val();
               var meetingPrice = $("#meetingPrice").val();
               var meetingContent = $("#metingContent").val();
               console.log(meetingTitle +  meetingDate +meetingSite+meetingPrice+ meetingContent);
               if(meetingInfoNum == 0){
              $.ajax({
               async:true,
               type:"get",
               url:"/adminIntroductionInfo/add",
               
               data:{
                   "topic":meetingTitle,
                   "time":meetingDate,
                   "address":meetingSite,
                   "Introduction":meetingContent,
                   "money":meetingPrice
               },
               success:function(result){
                   alert(JSON.stringify(result));
                   $("#meeting-synopsis").click();
               }
           })
               }else{
                layer.msg('您的大会简介只能有一条', {
                    icon: 1,
                    time: 1000
                  });
                  return false;
               }
        })  
    });

    //大会日程
    $("#meeting-schedule").click(function(){
        var meetingSchecduleHtml = '<div class="news-box"><div class="news-title">'+
           // ' <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModal2">添加日程</button>'+
                '<h2>大会日程</h2>'+
            '</div>'+
            '<div class="news-content" >' +
           '<div class="layui-tab">'+
            '<ul class="layui-tab-title">' +
                '<li class="layui-this">26日</li>' +
                '<li>27日</li>' +
                '<li>28日</li>' +
                '<li>29日</li>' +
                '<li>30日</li>' +
            '</ul>' +
        ' <div class="layui-tab-content" id="mymodal-Box">' +
                '<div class="layui-tab-item layui-show" >' +
                '<button style="margin:10px 0px;" id="my26modal"  class="layui-btn layui-btn-normal">添加26号日期</button>'+     
                        '<table class="table-box table-sort " id="get26table">'+                                   
                        '<thead>'+
                            '  <tr >'+
                            '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                            '<th style="text-align: center;">时间段</th>'+
                            '<th style="text-align: center;">内容</th>'+
                            '<th style="text-align: center;">操作</th>'+
                            '  </tr>'+
                        '   </thead>'+
                        '   <tbody>'+
                          
                        '  </tbody>'+
                        '   </table>'+
                        //提交

                '</div>' +

                //27table
                '<div class="layui-tab-item">' +
                '<button style="margin:10px 0px;" id="my27modal" class="layui-btn">添加27p</button>'+     
            '<table class="table-box table-sort " id="get27table">'+
            '<thead>'+
            '  <tr >'+
            '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
            '<th style="text-align: center;">时间段</th>'+
            '<th style="text-align: center;">内容</th>'+
            '<th style="text-align: center;">操作</th>'+
            '  </tr>'+
            '   </thead>'+
            '   <tbody id="adddate27">'+
            
            '  </tbody>'+
            '   </table>'+
            //提交
     
                '</div>'+
                 //28table
                '<div class="layui-tab-item">' +
                '<button style="margin:10px 0px;" id="my28modal"  class="layui-btn layui-btn-normal">添加28号日期</button>'+     
                '<table class="table-box table-sort " id="get28table">'+                                   
                '<thead>'+
                    '  <tr >'+
                    '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                    '<th style="text-align: center;">时间段</th>'+
                    '<th style="text-align: center;">内容</th>'+
                    '<th style="text-align: center;">操作</th>'+
                    '  </tr>'+
                '   </thead>'+
                '   <tbody>'+
                  
                '  </tbody>'+
                '   </table>'+
            '   </table>'+
           
                '</div>' +
                 //29table
                '<div class="layui-tab-item">' +
                '<button style="margin:10px 0px;" id="my29modal"  class="layui-btn layui-btn-normal">添加29号日期</button>'+     
                '<table class="table-box table-sort " id="get29table">'+                                   
                '<thead>'+
                    '  <tr >'+
                    '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                    '<th style="text-align: center;">时间段</th>'+
                    '<th style="text-align: center;">内容</th>'+
                    '<th style="text-align: center;">操作</th>'+
                    '  </tr>'+
                '   </thead>'+
                '   <tbody>'+
                  
                '  </tbody>'+
                '   </table>'+
            //提交        
                '</div>' +
                 //30table
                '<div class="layui-tab-item">' +
                '<button style="margin:10px 0px;" id="my30modal"  class="layui-btn layui-btn-normal">添加30号日期</button>'+     
                '<table class="table-box table-sort " id="get30table">'+                                   
                '<thead>'+
                    '  <tr >'+
                    '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                    '<th style="text-align: center;">时间段</th>'+
                    '<th style="text-align: center;">内容</th>'+
                    '<th style="text-align: center;">操作</th>'+
                    '  </tr>'+
                '   </thead>'+
                '   <tbody>'+
                  
                '  </tbody>'+
                '   </table>'+
            //提交
               '</div>' +
            '</div>' +
        '</div>' +
            '</div>'+
            '</div></div>';
        $(".news-box").remove();
        $(".main-right").append(meetingSchecduleHtml);
        getdateTable2(26);
        getdateTable2(27);
        getdateTable2(28);
        getdateTable2(29);
        getdateTable2(30);
       //修改
        getMsgmodification(26);
        getMsgmodification(27);
        getMsgmodification(28);
        getMsgmodification(29);
        getMsgmodification(30);
     
        //修改26号接口
    //     $("#get26table").on("click",".get26modification",function(){
    //         var modification26content = $(this).attr("data-content");
    //         var modification26time   = $(this).attr("data-time");
    //         var modification26Id  = $(this).attr("data-timeId");
    //         console.log(modification26content + modification26time);
    //         layer.open({
    //            type: 1,
    //            title:'2016-06-26',
    //            closeBtn: 1, //不显示关闭按钮
    //            area: ['600px', '300px'],
    //            fixed: false, //不固定
    //            maxmin: true,
    //            content: '<div class="" class="modification26">'+
    //                      //  '<button class="layui-btn" id="mymodal27-addDate">增加时段</button>'+
    //                     '<div>'+
    //                     ' <table class="table-box table-sort " id="modification26">'+
    //                     '<thead>'+
    //                     '<tr >'+	       
                  
    //                       '  <th style="text-align: center;">时间</th>'+
    //                        '<th style="text-align: center;">内容</th>'+
    //                     '</tr>'+
    //                     '</thead>'+	
    //                     '<tbody>'+   
    //                     '<tr>'+                    
    //                     '  <td style="text-align: center;"><input type="text" id="modificationValue" value="'+modification26time+'" name="title" lay-verify="title" autocomplete="off" placeholder="请输入时间" class="layui-input"></td>'+
    //                     '<td style="text-align: center;"><input type="text" id="modificationContentValue" value="'+modification26content+'" placeholder="请输入大会内容" class="layui-input"></td>'+
    //                     '</tr>'+ 
    //                     '</tbody>'+	     
    //                         '</table>'+
    //                         '<button class="layui-btn sub26modification" data-timeId="'+modification26Id+'" style="float:right;margin-top:20px;margin-right:30px;">提交</button>'+
    //                     '</div>'+
    //                   '</div>'
    //          });
    //          $(".sub26modification").on("click",function(){
    //              var sub26modificationTimeValue =  $("#modificationValue").val();
    //              var sub26modificationContentValue = $("#modificationContentValue").val();
    //              var sub26modificationTimeId  = $(this).attr("data-timeId");
    //              $.ajax({
    //                 url:"/adminschedule/updatadaninfo",
    //                  data:{
    //                     "ID":sub26modificationTimeId,
    //                     "dan":sub26modificationTimeValue,
    //                     "concent":sub26modificationContentValue
    //                  },
    //                  success:function(data){
    //                      if(data){
    //                         layer.msg('添加成功', {
    //                             icon: 1,
    //                             time: 1000
    //                             });
    //                             layer.closeAll();
    //                             $("#meeting-schedule").click();
    //                      }else{
    //                         layer.msg('您的修改内容有误', {
    //                             icon: 1,
    //                             time: 1000
    //                             });
    //                      }
    //                  }
    //              })
    //          })
    //    })
       delTrdate(26);
       delTrdate(27);
       delTrdate(28);
       delTrdate(29);
       delTrdate(30);
        // $("#get26table").on("click","#delTrTime",function(){
        //     var TRtimeId = $(this).attr("data-timeId");
        //     var delTrTimeThis = $(this);
        //     console.log(TRtimeId);
        //     $.ajax({
        //         url:"/adminschedule/delltimeId",
        //         data:{
        //            "ID":TRtimeId
        //         },
        //         success:function(data){
        //             if(data.msg == "SUCCESS"){
        //                 delTrTimeThis.parent().parent().remove();
        //             }
                  
        //         }
        //     })
        //    })
        //26号日期点击事件
    $("#mymodal-Box").on("click","#my26modal",function(){
        var edit_close = layer.open({
            type: 1,
            title:'2016-06-26',
            closeBtn: 1, //不显示关闭按钮
            area: ['600px', '500px'],
            fixed: false, //不固定
            maxmin: true,
            content: '<div class="" id="show26">'+
                        '<button class="layui-btn" id="mymodal26-addDate">增加时段</button>'+
                     '<div>'+
                     ' <table class="table-box table-sort " id="modal-addTable">'+
                     '<thead>'+
                     '<tr >'+	       
                  //   '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                       '  <th style="text-align: center;">时间</th>'+
                        '<th style="text-align: center;">内容</th>'+
                        '<th>操作</th>'+
                     '</tr>'+
                     '</thead>'+	
                     '<tbody><tr><td><input type="text" class="layui-input date26" id="modol26date" placeholder="HH:mm:ss"></td>'+
                                  '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input date26-val"></td>'+
                                 '<td><button class="layui-btn" id="updateTable26" data-id="26" style="float:right;margin-top:20px;margin-right:30px;">提交</button></td>'+
                                 '</tr></tbody>'+	     
                         '</table>'+
                       
                     '</div>'+
                   '</div>'
          });
          //时间选择器
          laydate.render({
            elem: '#modol26date'
            ,type: 'time'
        });   
        //提交日期内容
        addDateTable(26);
    //     $("#show26").on("click",'#updateTable26',function(){
    //         var time26_val  = $('#modol26date').val();
    //         var content_val = $('.date26-val').val();
    //         console.log(time26_val + content_val);
    //         $.ajax({
    //             url:"/adminschedule/addschedule",
    //             data:{
    //                 "content":content_val,
    //                 "days":"26",
    //                 "dan":time26_val
    //             },
    //             success:function(data){
    //                 layer.msg('添加成功', {
    //                     icon: 1,
    //                     time: 1000
    //                     });
    //                     layer.closeAll();
    //                     $("#meeting-schedule").click();
    //             },error:function(err){
    //                    console.log(err)
    //             }
    //         })
    //   })    
       //   var datanumAdd = 0;
        //   $("#show26").on("click","#mymodal26-addDate",function(){
        //     datanumAdd++;
        //     var addModalDate = '<tr><td>'+datanumAdd+'</td><td><input type="text" class="layui-input date26" id="modol26date'+datanumAdd+'" placeholder="HH:mm:ss"></td>'+
        //                           '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input date26-val'+datanumAdd+'"></td>'+
        //                           '<td><button class="layui-btn" id="updateTable26'+datanumAdd+'" data-id="26" style="float:right;margin-top:20px;margin-right:30px;">提交</button></td>'+
        //                         '</tr>';
        //     $("#modal-addTable tbody").append(addModalDate);
       
        // })
    })
    //27号添加事件
    $("#mymodal-Box").on("click","#my27modal",function(){
        var edit_close = layer.open({
            type: 1,
            title:'2016-06-27',
            closeBtn: 1, //不显示关闭按钮
            area: ['600px', '500px'],
            fixed: false, //不固定
            maxmin: true,
            content: '<div class="" id="show27">'+
                     //   '<button class="layui-btn" id="mymodal27-addDate">增加时段</button>'+
                     '<div>'+
                     ' <table class="table-box table-sort " id="modal-addTable">'+
                     '<thead>'+
                     '<tr >'+	       
                     '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                       '  <th style="text-align: center;">时间</th>'+
                        '<th style="text-align: center;">内容</th>'+
                     '</tr>'+
                     '</thead>'+	
                     '<tbody><tr><td><input type="text" class="layui-input date26" id="modol27date" placeholder="HH:mm:ss"></td>'+
                     '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input date27-val"></td>'+
                     '<td><button class="layui-btn" id="updateTable27" data-id="27" style="float:right;margin-top:20px;margin-right:30px;">提交</button></td>'+
                        '</tr></tbody>'+	     
                     '</table>'+
                     '</div>'+
                   '</div>'
          });
          //时间选择器
                    laydate.render({
                  elem: '#modol27date'
                  ,type: 'time'
              });  
              //添加table
              addDateTable(27);
        //       $("#show27").on("click",'#updateTable27',function(){
        //         var time27_val  = $('#modol27date').val();
        //         var content_val = $('.date27-val').val();
                
        //         console.log(time27_val + content_val);
        //         $.ajax({
        //             url:"/adminschedule/addschedule",
        //             data:{
        //                 "content":content_val,
        //                 "days":"27",
        //                 "dan":time27_val
        //             },
        //             success:function(data){
        //                 layer.msg('添加成功', {
        //                     icon: 1,
        //                     time: 1000
        //                     });
        //                     layer.closeAll();
        //                     $("#meeting-schedule").click();
        //             },error:function(err){
        //                    console.log(err)
        //             }
        //         })
        //   })  

        
     //     var datanumAdd = 0;
    //       $("#show27").on("click","#mymodal27-addDate",function(){
    //         datanumAdd++;
    //         var addModalDate = '<tr><td>'+datanumAdd+'</td><td><input type="text" class="layui-input" id="modol27date'+datanumAdd+'" placeholder="HH:mm:ss"></td>'+
    //                               '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input"></td>'+
    //                             '</tr>';
    //         $("#modal-addTable tbody").append(addModalDate);
    //    //时间选择器
    //           laydate.render({
    //               elem: '#modol27date'+datanumAdd+''
    //               ,type: 'time'
    //           });       
    //     })
    })
    //28号添加事件
    $("#mymodal-Box").on("click","#my28modal",function(){
        var edit_close = layer.open({
            type: 1,
            title:'2016-06-28',
            closeBtn: 1, //不显示关闭按钮
            area: ['600px', '500px'],
            fixed: false, //不固定
            maxmin: true,
            content:  '<div class="" id="show28">'+
         '<div>'+
         ' <table class="table-box table-sort " id="modal-addTable">'+
         '<thead>'+
         '<tr >'+	       
      //   '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
           '  <th style="text-align: center;">时间</th>'+
            '<th style="text-align: center;">内容</th>'+
            '<th>操作</th>'+
         '</tr>'+
         '</thead>'+	
         '<tbody><tr><td><input type="text" class="layui-input date28" id="modol28date" placeholder="HH:mm:ss"></td>'+
                      '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input date28-val"></td>'+
                     '<td><button class="layui-btn" id="updateTable28" data-id="28" style="float:right;margin-top:20px;margin-right:30px;">提交</button></td>'+
                     '</tr></tbody>'+	     
             '</table>'+
           
         '</div>'+
       '</div>'
          });
            //时间选择器
            laydate.render({
                elem: '#modol28date'
                ,type: 'time'
            });  
            addDateTable(28);
    //       var datanumAdd = 0;
    //       $("#show28").on("click","#mymodal28-addDate",function(){
    //         datanumAdd++;
    //         var addModalDate = '<tr><td>'+datanumAdd+'</td><td><input type="text" class="layui-input" id="modol28date'+datanumAdd+'" placeholder="HH:mm:ss"></td>'+
    //                               '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input"></td>'+
    //                             '</tr>';
    //         $("#modal-addTable tbody").append(addModalDate);
    //    //时间选择器
    //           laydate.render({
    //               elem: '#modol28date'+datanumAdd+''
    //               ,type: 'time'
    //           });       
    //     })
    })
    //29号添加事件
    $("#mymodal-Box").on("click","#my29modal",function(){
        var edit_close = layer.open({
            type: 1,
            title:'2016-06-29',
            closeBtn: 1, //不显示关闭按钮
            area: ['600px', '500px'],
            fixed: false, //不固定
            maxmin: true,
            content:  '<div class="" id="show29">'+
           // '<button class="layui-btn" id="mymodal29-addDate">增加时段</button>'+
         '<div>'+
         ' <table class="table-box table-sort " id="modal-addTable">'+
         '<thead>'+
         '<tr >'+	       
      //   '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
           '  <th style="text-align: center;">时间</th>'+
            '<th style="text-align: center;">内容</th>'+
            '<th>操作</th>'+
         '</tr>'+
         '</thead>'+	
         '<tbody><tr><td><input type="text" class="layui-input date29" id="modol29date" placeholder="HH:mm:ss"></td>'+
                      '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input date29-val"></td>'+
                     '<td><button class="layui-btn" id="updateTable29" data-id="29" style="float:right;margin-top:20px;margin-right:30px;">提交</button></td>'+
                     '</tr></tbody>'+	     
             '</table>'+
           
         '</div>'+
       '</div>'
          });      
       //时间选择器
              laydate.render({
                  elem: '#modol29date'
                  ,type: 'time'
              });    
              addDateTable(29);
    })
    //30号添加事件
    $("#mymodal-Box").on("click","#my30modal",function(){
        var edit_close = layer.open({
            type: 1,
            title:'2016-06-30',
            closeBtn: 1, //不显示关闭按钮
            area: ['600px', '500px'],
            fixed: false, //不固定
            maxmin: true,
            content:  '<div class="" id="show30">'+
            //2'<button class="layui-btn" id="mymodal30-addDate">增加时段</button>'+
         '<div>'+
         ' <table class="table-box table-sort " id="modal-addTable">'+
         '<thead>'+
         '<tr >'+	       
      //   '<th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
           '  <th style="text-align: center;">时间</th>'+
            '<th style="text-align: center;">内容</th>'+
            '<th>操作</th>'+
         '</tr>'+
         '</thead>'+	
         '<tbody><tr><td><input type="text" class="layui-input date30" id="modol30date" placeholder="HH:mm:ss"></td>'+
                      '<td> <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入内容" class="layui-input date30-val"></td>'+
                     '<td><button class="layui-btn" id="updateTable30" data-id="30" style="float:right;margin-top:20px;margin-right:30px;">提交</button></td>'+
                     '</tr></tbody>'+	     
             '</table>'+
           
         '</div>'+
       '</div>'
          });
     //时间选择器
     laydate.render({
        elem: '#modol30date'
        ,type: 'time'
    });    
    addDateTable(30);
    })
    
    
    })
    // $("#tlist-btn1").on("click",function(){
    //     var listHtml1= '<tr>'+
    //         '<td><input type="text" value="09:00"  class="ipt-center form-control"></td>'+
    //         '<td><input type="text" value="第二十九届国际智能大会开幕智能汽车跨界融合高峰科技论坛开幕" class="form-control"></td>'+
    //         '</tr>'
    //     $("tbody").append(listHtml1);
    // })
    
    //大会嘉宾
    $("#meeting-guest").on("click",function(){
        var meetingGuestHtml = '<div class="news-box">' +
                                   '<div class="news-title">'+
                                      ' <h2>大会嘉宾</h2>'+
                                   '</div>'+
                                    '<div class="news-content">' +
                                         '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">' +
                                              '<ul class="layui-tab-title">' +
                                                '<li class="layui-this">大会嘉宾</li>' +
                                                '<li>大会嘉宾管理</li>' +
                                              ' </ul>' +
                                            '  <div class="layui-tab-content" style="height: 100px;">' +
                                            
                                                '<div class="layui-tab-item layui-show">' +
                                                '<form id="GuestsuploadForm"  method="post" enctype="multipart/form-data">'+
                                                '<div class="upImgBox">'+
                                                '<input id="upGuestImage" type="file" name="image3"  >'+//onchange="preview(this)"
                                                '<div id="preview"></div>'+
                                                '</div>'+
    
                                                '<div class="layui-form-item">'+
                                                '<label class="layui-form-label">姓名</label>'+
                                                '<div class="layui-input-block">'+
                                                '<input type="text" name="name" lay-verify="title" autocomplete="off" placeholder="请输入姓名" class="layui-input">'+
                                                '</div>'+
                                                '</div>'+
                                                
                                                '<div class="layui-form-item">'+
                                                '<label class="layui-form-label">职务</label>'+
                                                '<div class="layui-input-block">'+
                                                '<input type="text" name="job" lay-verify="title" autocomplete="off" placeholder="请输入职务" class="layui-input">'+
                                                '</div>'+
                                                '</div>'+
                                                
                                                 '<div class="layui-form-item" >'+
                                                  '<label class="layui-form-label">状态</label>'+
                                                //  '<div class="layui-input-block">'+
                                                //  '邀请中<input type="radio" name="sex" value="男" title="男" checked>'+
                                                //  '已确定<input type="radio" name="sex" value="女" title="女">'+
                                                //  '</div>'+
                                                '<div class="layui-input-block">'+
                                                //'<span>状态&nbsp;&nbsp;&nbsp;</span>' +
                                                '<label>' +
                                                '<input type="radio" name="status" id="optionsRadios1" value="1" checked>已确定' +
                                                '</label>	' +									
                                                '<label>' +
                                                '<input type="radio" name="status" id="optionsRadios2" value="2">邀请中' +
                                                '</label>' +
                                                 '</div>'+
                                                 '</div>'+
                                                 '<div class="news-btn date-style">'+
                                                 '<button id="uploadGuest" class="btn btn-danger">发表</button>'+
                                                 '</form>'+
                                                 '</div>'+
                                                '</div>' +
                                                //全部嘉宾
                                            '  <div class="layui-tab-item">'+
                                            '<table class="table-box table-sort " id="guestTable">'+
                                            '<thead>'+
                                            '  <tr >'+
                                            '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
                                            '   <th style="text-align: center;">姓名</th>'+
                                            '   <th style="text-align: center;">照片</th>'+
                                            '   <th style="text-align: center;">职务</th>'+
                                            '   <th style="text-align: center;">状态</th>'+
                                            '    <th style="text-align: center;">操作</th>'+
                                            '  </tr>'+
                                            '   </thead>'+
                                            '<tbody></tbody>'+
                                            '   </table>'+
                                            '</div>' +
                                            '   </div>' +
                                    '     </div>' +
                                    '</div>' +
                                '</div>'
        $(".news-box").remove();
        $(".main-right").append(meetingGuestHtml);
        //上次大会简介
           $("#uploadGuest").on("click",function(){
            var image=$("#upGuestImage")[0].files[0];
            // var a = new FormData();
            // a.append("image3", image);
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
    
        $("#upGuestImage").on("change",function(){
            var file = this;
           console.log(file.files);
           var prevDiv = document.getElementById('preview');
           if (file.files && file.files[0]) {
               var reader = new FileReader();
               reader.onload = function (evt) {
                   console.log(evt);
                   prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
               }
               reader.readAsDataURL(file.files[0]);
           } else {
               prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
           }
        })
        $.ajax({
            url:"/guests/selectguestsinfo",
            success:function(data){
                console.log(data);
                //var getGuestsHtml = ''
                var  guestsStatus = "";
                $(data).each(function(index,element){
                    index+=1;
                    console.log(element.guests_id)
                    if(element.guests_status==1){
                              guestsStatus = "已确定";
                    }else if(element.guests_status==2){
                        guestsStatus = "邀请中";
                    }else{
                        guestsStatus = "不确定";
                    }
                   // console.log(index);
                   // console.log(element.metting_topic);
                   var  getGuestsHtml =  '<tr class="metting">'+
                    '<td>'+index+'</td>'+
                    '<td>'+element.guests_name+'</td>'+
                    '<td><img src="'+element.guests_url+'" /></td>'+
                    '<td>'+element.guests_job+'</td>'+
                    '<td>'+guestsStatus+'</td>'+
                    '<td >'+
                    //'<button class="btn btn-danger">修改</button>'+
                    '<button id="delguestUser-btn" data-id="'+element.guests_id+'"    class="btn btn-primary">删除</button>'+
                    '</td>'+
                    '</tr>'         
               $("#guestTable tbody").append(getGuestsHtml);
               })
               //删除大会嘉宾接口
               $("#guestTable").on("click","#delguestUser-btn",function(){
                    var getGuestsID = $(this).attr("data-id");
                    var that = $(this);
                    $.ajax({
                        url:"/guests/dellguestsInfo",
                        data:{
                            "ID":getGuestsID
                        },
                        success:function(data){
                            console.log(data);
                            that.parent().parent().remove();
                        }
                    })
            })
            }
        })
    })
       //合作单位btn
$("#meeting-cooperation").click(function(){
    var meetingGuestHtml = '<div class="news-box">' +
    '<div class="news-title">'+
       ' <h2>合作单位</h2>'+
    '</div>'+
     '<div class="news-content">' +
          '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">' +
               '<ul class="layui-tab-title">' +
                 '<li class="layui-this">合作单位</li>' +
                 '<li>合作单位管理</li>' +
               ' </ul>' +
             '  <div class="layui-tab-content" style="height: 100px;">' +
             
                 '<div class="layui-tab-item layui-show">' +
                 '<form id="cooperationsuploadForm"  method="post" enctype="multipart/form-data">'+
                 '<div class="upImgBox">'+
                 '<input id="upcooperationImage" type="file" name="upimage"  >'+//onchange="preview(this)"
                 '<div id="preview"></div>'+
                 '</div>'+
                 ' <fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">'+
                 '<legend>单位名称</legend>'+
               '</fieldset>'+
               '<div class="layui-form-item">'+
               '<label class="layui-form-label">名称</label>'+
               '<div class="layui-input-block">'+
               '<input type="text" name="companyname" lay-verify="title" autocomplete="off" placeholder="请输入名称" class="layui-input">'+
               '</div>'+
               '</div>'+
               
               '<div class="layui-form-item">'+
               '<label class="layui-form-label">类型</label>'+
               '<div class="layui-input-block">'+
               '<input type="text" name="companyType" lay-verify="title" autocomplete="off" placeholder="请输入类型" class="layui-input">'+
               '</div>'+
               '</div>'+
                  '<div class="news-btn date-style">'+
                  '<button id="uploadcooperation" class="layui-btn">发表</button>'+
                  '</form>'+
                  '</div>'+
                 '</div>' +
                 //全部嘉宾
             '  <div class="layui-tab-item">'+
             '<table class="table-box table-sort " id="companyTable">'+
             '<thead>'+
             '  <tr >'+
             '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
             '   <th style="text-align: center;">单位名称</th>'+
             '   <th style="text-align: center;">单位类型</th>'+
             '   <th style="text-align: center;">图片</th>'+
             '   <th style="text-align: center;">操作</th>'+
             '  </tr>'+
             '   </thead>'+
             '<tbody></tbody>'+
             '   </table>'+
             '</div>' +
             '   </div>' +
     '     </div>' +
     '</div>' +
 '</div>'
$(".news-box").remove();
$(".main-right").append(meetingGuestHtml);
$.ajax({
    url:"/damincputilInfo/cpAllselect",
    success:function(data){
        //console.log(data.data.length);
        $.each(data.data,function(idx,ele){
            idx+=1;
              console.log(idx + ele.cputil_name)
          var companyTableHtml = '<tr><td>'+idx+'</td><td>'+ele.cputil_name+'</td><td>'+ele.cputil_type+'</td><td><img style="width:100px;height:100px" src="'+ele.cputil_url+'" /></td><td><button id="companyTr" data-id="'+ele.cputil_id+'" class="layui-btn"><i class="layui-icon"></i></button></td></tr';
          $("#companyTable tbody").append(companyTableHtml);
        })
        $("#companyTr").on("click",function(){
            //alert(1230);
            var companyThis = $(this);
            var companyTrId = $(this).attr("data-id");
            console.log(companyTrId);
            $.ajax({
                url:"/damincputilInfo/dellcpinfo",
                data:{
                    "cpid":companyTrId
                },
                success:function(data){
                    if(data){
                        layer.msg('您的删除成功', {
                            icon: 1,
                            time: 1000
                          });
                        companyThis.parent().parent().remove();
                        $("#meeting-cooperation").click();
                    }else{
                        layer.msg('您的操作有误', {
                            icon: 1,
                            time: 1000
                          });
                    }
                }
            })
        })
    }
})

$("#upcooperationImage").on("change",function(){
    var file = this;
   console.log(file.files);
   var prevDiv = document.getElementById('preview');
   if (file.files && file.files[0]) {
       var reader = new FileReader();
       reader.onload = function (evt) {
           console.log(evt);
           prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
       }
       reader.readAsDataURL(file.files[0]);
   } else {
       prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
   }
})

$("#uploadcooperation").on("click",function(){
    //var image=$("#upcooperationImage")[0].files[0];
    //  var a = new FormData();
    //  a.append("image3", image);
    var formData = new FormData($( "#cooperationsuploadForm" )[0]); 
   // alert(JSON.stringify(formData))
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
                layer.msg(data.msg, {
                    icon: 1,
                    time: 1000
                  });
                  $("#meeting-cooperation").click();
            }else{
                layer.msg('您的上传有误', {
                    icon: 1,
                    time: 1000
                  });
            }
        }

    })  
})
})
//联系我们
$("#meeting-call").click(function(){
    var   contactUSHtml = '<div class="news-box">' +
    '<div class="news-title">'+
       ' <h2>合作单位</h2>'+
    '</div>'+
     '<div class="news-content">' +
          '<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">' +
               '<ul class="layui-tab-title">' +
                 '<li class="layui-this">联系我们</li>' +
                 '<li>联系我们管理</li>' +
               ' </ul>' +
             '  <div class="layui-tab-content" style="height: 100px;">' +
             
                 '<div class="layui-tab-item layui-show">' +
                 '<form id="contactsuploadForm"  method="post" enctype="multipart/form-data">'+
                 
                 
                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">姓名</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="ctname" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+
                    
                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">中文职位</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="chChJname" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+

                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">英文职位</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="ctUnJname" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+

                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">邮箱</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="ctemail" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+

                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">手机</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="ctphone" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+

                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">微信</label>'+
                    '<div class="layui-input-inline">'+
                    '<input type="text" name="ctwxnum" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'+
                    '</div>'+
                    '</div>'+

                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">上传头像</label>'+
                    '<div class="layui-input-inline">'+
                    '<div class="upImgBox">'+
                    '<input id="PersonalImage1" type="file" name="ctavatarUrl" value="" >'+//onchange="preview(this)"
                    '<div id="PersonalBox1"></div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                   
                    '<div class="layui-form-item">'+
                    '<label class="layui-form-label" style="width:102px;">上传二维码</label>'+
                    '<div class="layui-input-inline">'+
                    '<div class="upImgBox">'+
                    '<input id="PersonalImage2" type="file" name="ctQrurl" value="" >'+//onchange="preview(this)"
                    '<div id="PersonalBox2"></div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
               
               
              
               
                    '<input type="button" id="contact_btn" class="btn" value="发表" />'+
        
                  
                  '</form>'+
                 '</div>' +
                 //全部嘉宾
             '  <div class="layui-tab-item">'+
             '<table class="table-box table-sort " id="contactTable">'+
             '<thead>'+
             '  <tr >'+
             '   <th lay-data="{field:"id", width:177, sort: true}" style="text-align: center;">序号</th>'+
             '   <th style="text-align: center;">姓名</th>'+
             '   <th style="text-align: center;">中文职位</th>'+
             '   <th style="text-align: center;">英文职位</th>'+
             '   <th style="text-align: center;">邮箱</th>'+
             '   <th style="text-align: center;">手机</th>'+
             '   <th style="text-align: center;">微信</th>'+
             '   <th style="text-align: center;">头像</th>'+
             '   <th style="text-align: center;">二维码</th>'+
             '   <th style="text-align: center;">操作</th>'+
             '  </tr>'+
             '   </thead>'+
             '<tbody></tbody>'+
             '   </table>'+
             '</div>' +
             '   </div>' +
     '     </div>' +
     '</div>' +
 '</div>'
$(".news-box").remove();
$(".main-right").append(contactUSHtml);//contactsuploadForm

upimg123("#PersonalImage1","PersonalBox1");
upimg123("#PersonalImage2","PersonalBox2");
//上传联系管理
$("#contact_btn").on("click",function(){
    var formData = new FormData($( "#contactsuploadForm" )[0]); 
    //$("#meeting-call").click();
    $.ajax({
        url:"/image/adminctInfo",
        data: formData,
        type: "POST",
        cache: false,
        processData: false,
        contentType:false,
        async: false,
        success:function(data){
            if(data){
                //   alert(JSON.stringify(data))
                layer.msg('您的提交成功', {
                  icon: 1,
                  time: 1000
                });
                $("#meeting-call").click();
               }
        }
    })
})
//获取联系管理
$.ajax({
    url:"/adminctInfo/selectAllctinfo",
    success:function(data){      
        if(data){
            // console.log(data);
            // console.log(JSON.stringify(data))
            $.each(data,function(idx,element){
                 console.log(element);
                 idx+=1;
                //  console.log(element.ct_name);
                 console.log(element.ct_type_id);
                 var contactHtml = '<tr>'+
                                '<td>'+idx+'</td><td>'+element.ct_name+'</td>'+
                                '<td>'+element.ct_CHjobname+'</td>'+
                                '<td>'+element.ct_UNjobname+'</td>'+
                                '<td>'+element.ct_email+'</td>'+
                                '<td>'+element.ct_phoneNum+'</td>'+
                                '<td>'+element.ct_wxNum+'</td>'+
                                '<td><img style="width:100px;height:100px" src="'+element.ct_AvatarUrl+'" /></td><td><img style="width:100px;height:100px"  src="'+element.ct_QrcodeUrl+'" /></td>'+
                                '<td><button data-id="'+element.ct_type_id+'" class="layui-btn delContact-btn">删除</button></td>'+
                                '</tr>';
                $("#contactTable tbody").append(contactHtml);                
            })
            //删除联系管理
            $(".delContact-btn").on("click",function(){
                var delContactThat = $(this);
                var ContactID = $(this).attr("data-id");
                console.log(ContactID)
                $.ajax({
                    url:"/adminctInfo/dellallctinfo",
                    data:{
                     "ID":ContactID
                    },
                    success:function(data){
                         if(data){
                          //   alert(JSON.stringify(data))
                          layer.msg('您的删除成功', {
                            icon: 1,
                            time: 1000
                          });
                          delContactThat.parent().parent().remove();
                        //  $("#meeting-call").click();
                         }
                    }
                })
            })
        }
    }
})
    
})

function upimg123(whichId,imgId){
    $(whichId).on("change",function(){
           var file = this;
          console.log(file.files);
          var prevDiv = document.getElementById(imgId);
          if (file.files && file.files[0]) {
              var reader = new FileReader();
              reader.onload = function (evt) {
                  console.log(evt);
                  prevDiv.innerHTML = '<img style="width:100px;height:100px" src="' + evt.target.result + '" />';
              }
              reader.readAsDataURL(file.files[0]);
          } else {
              prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>';
          }
       })
    }
    function upImg(){
        layui.use('upload', function(){
        var $ = layui.jquery
            ,upload = layui.upload;
    
        //普通图片上传
        var uploadInst = upload.render({
            elem: '#upImg'
            ,url: '/image/CarouseluploadImage'
            ,data:{
                topic:"eew",
                Summary:"321321",
                datetimeStart:"12312"
            }
            ,before: function(obj){
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                    $('#demo1').attr('src', result); //图片链接（base64）
                });
                console.log(obj)
            }
            ,done: function(res){
                //如果上传失败
                if(res.code > 0){
                    return layer.msg('上传失败');
                }
                //上传成功
            }
            ,error: function(){
                //演示失败状态，并实现重传
                var demoText = $('#demoText');
                demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
                demoText.find('.demo-reload').on('click', function(){
                    uploadInst.upload();
                });
            }
        });
    
    });
    }
    
//获取日期内容
function getdateTable2(whichId){
    //获取26号信息
$.ajax({
 url:"/adminschedule/selectschedule",
 data:{
     ID:whichId
 },
success:function(data){             
      console.log(data);
      console.log(data.length)
      $(data).each(function(idx,element){
         // console.log(idx + element)
         idx+=1;
     $(element).each(function(i,ele){
         console.log(ele);
         console.log(ele.schedule_time_content);
         var add26tableHtml  =   ' <tr>'+
         '   <td>'+idx+'</td>'+
         '   <td>'+ele.schedule_time_dan+'</td>'+
         '<td>'+ele.schedule_time_content+'</td>'+
         '<td >'+
         '<button class="layui-btn layui-btn-primary get'+whichId+'modification"  data-timeId="'+ele.schedule_time_id+'"  data-content="'+ele.schedule_time_content+'" data-time = "'+ele.schedule_time_dan+'"><i class="layui-icon"></i></button>'+
         '<button class="layui-btn" id="del'+whichId+'TrTime" data-timeId="'+ele.schedule_time_id+'" >删除</button></td>'+
         '   </tr>';
         $('#get'+whichId+'table tbody').append(add26tableHtml);

     })
      })             
}       
})
}
   //修改
   function getMsgmodification(whichId) {
    $('#get'+whichId+'table').on("click", '.get'+whichId+'modification', function() {
        var modificationcontent = $(this).attr("data-content");
        var modificationtime = $(this).attr("data-time");
        var modificationId = $(this).attr("data-timeId");
      //  console.log(modification26content + modification26time);
        layer.open({
            type: 1,
            title: '2016-06-'+whichId+'',
            closeBtn: 1, //不显示关闭按钮
            area: ['600px', '300px'],
            fixed: false, //不固定
            maxmin: true,
            content: '<div class="" class="modification'+whichId+'">' +
                //  '<button class="layui-btn" id="mymodal27-addDate">增加时段</button>'+
                '<div>' +
                ' <table class="table-box table-sort " id="modification26">' +
                '<thead>' +
                '<tr >' +

                '  <th style="text-align: center;">时间</th>' +
                '<th style="text-align: center;">内容</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr>' +
                '  <td style="text-align: center;"><input type="text" id="modificationValue" value="' + modificationtime + '" name="title" lay-verify="title" autocomplete="off" placeholder="请输入时间" class="layui-input"></td>' +
                '<td style="text-align: center;"><input type="text" id="modificationContentValue" value="' + modificationcontent + '" placeholder="请输入大会内容" class="layui-input"></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '<button class="layui-btn sub'+whichId+'modification" data-timeId="' + modificationId + '" style="float:right;margin-top:20px;margin-right:30px;">提交</button>' +
                '</div>' +
                '</div>'
        });
        $('.sub'+whichId+'modification').on("click", function() {
            var submodificationTimeValue = $("#modificationValue").val();
            var submodificationContentValue = $("#modificationContentValue").val();
            var submodificationTimeId = $(this).attr("data-timeId");
            $.ajax({
                url: "/adminschedule/updatadaninfo",
                data: {
                    "ID": submodificationTimeId,
                    "dan": submodificationTimeValue,
                    "concent": submodificationContentValue
                },
                success: function(data) {
                    if(data) {
                        layer.msg('添加成功', {
                            icon: 1,
                            time: 1000
                        });
                        layer.closeAll();
                        $("#meeting-schedule").click();
                    } else {
                        layer.msg('您的修改内容有误', {
                            icon: 1,
                            time: 1000
                        });
                    }
                }
            })
        })
    })
}
function delTrdate(whichId){
    $('#get'+whichId+'table').on("click",'#del'+whichId+'TrTime',function(){
         var TRtimeId = $(this).attr("data-timeId");
         var delTrTimeThis = $(this);
         console.log(TRtimeId);
         $.ajax({
             url:"/adminschedule/delltimeId",
             data:{
                "ID":TRtimeId
             },
             success:function(data){
                 if(data.msg == "SUCCESS"){
                     delTrTimeThis.parent().parent().remove();
                 }
               
             }
         })
        })
}
    //获取日期
    	   function getdateTable(){
		   	//获取26号信息
        $.ajax({
            url:"/adminschedule/selectschedule",
            data:{
                ID:"26"
            },
           success:function(data){             
                 console.log(data);
                 console.log(data.length)
                 $(data).each(function(idx,element){
                    // console.log(idx + element)
                    idx+=1;
                $(element).each(function(i,ele){
                    console.log(ele);
                    console.log(ele.schedule_time_content);
                    var add26tableHtml  =   ' <tr>'+
                    '   <td>'+idx+'</td>'+
                    '   <td>'+ele.schedule_time_dan+'</td>'+
                    '<td>'+ele.schedule_time_content+'</td>'+
                    '<td >'+
                    '<button class="layui-btn layui-btn-primary get26modification"  data-timeId="'+ele.schedule_time_id+'"  data-content="'+ele.schedule_time_content+'" data-time = "'+ele.schedule_time_dan+'"><i class="layui-icon"></i></button>'+
                    '<button class="layui-btn" id="delTrTime" data-timeId="'+ele.schedule_time_id+'" >删除</button></td>'+
                    '   </tr>';
                    $("#get26table tbody").append(add26tableHtml);
          
                })
                 })             
           }       
        })
         	//获取27号信息
        $.ajax({
            url:"/adminschedule/selectschedule",
            data:{
                ID:"27"
            },
           success:function(data){             
                 console.log(data);
                 console.log(data.length)
                 $(data).each(function(idx,element){
                    // console.log(idx + element)
                    idx+=1;
                $(element).each(function(i,ele){
                    console.log(ele);
                    console.log(ele.schedule_time_content);
                    var add27tableHtml  =   ' <tr>'+
                    '   <td>'+idx+'</td>'+
                    '   <td>'+ele.schedule_time_dan+'</td>'+
                    '<td>'+ele.schedule_time_content+'</td>'+
                    '<td >'+
                    '<button class="layui-btn layui-btn-primary get26modification"  data-timeId="'+ele.schedule_time_id+'"  data-content="'+ele.schedule_time_content+'" data-time = "'+ele.schedule_time_dan+'"><i class="layui-icon"></i></button>'+
                    '<button class="layui-btn" id="delTrTime" data-timeId="'+ele.schedule_time_id+'" >删除</button></td>'+
                    '   </tr>';
                    $("#get27table tbody").append(add27tableHtml);
          
                })
                 })             
           }       
        })
         	//获取28号信息
        $.ajax({
            url:"/adminschedule/selectschedule",
            data:{
                ID:"28"
            },
           success:function(data){             
                 console.log(data);
                 console.log(data.length)
                 $(data).each(function(idx,element){
                    // console.log(idx + element)
                    idx+=1;
                $(element).each(function(i,ele){
                    console.log(ele);
                    console.log(ele.schedule_time_content);
                    var add28tableHtml  =   ' <tr>'+
                    '   <td>'+idx+'</td>'+
                    '   <td>'+ele.schedule_time_dan+'</td>'+
                    '<td>'+ele.schedule_time_content+'</td>'+
                    '<td >'+
                    '<button class="layui-btn layui-btn-primary get26modification"  data-timeId="'+ele.schedule_time_id+'"  data-content="'+ele.schedule_time_content+'" data-time = "'+ele.schedule_time_dan+'"><i class="layui-icon"></i></button>'+
                    '<button class="layui-btn" id="delTrTime" data-timeId="'+ele.schedule_time_id+'" >删除</button></td>'+
                    '   </tr>';
                    $("#get28table tbody").append(add28tableHtml);
          
                })
                 })             
           }       
        })
         	//获取29号信息
        $.ajax({
            url:"/adminschedule/selectschedule",
            data:{
                ID:"29"
            },
           success:function(data){             
                 console.log(data);
                 console.log(data.length)
                 $(data).each(function(idx,element){
                    // console.log(idx + element)
                    idx+=1;
                $(element).each(function(i,ele){
                    console.log(ele);
                    console.log(ele.schedule_time_content);
                    var add29tableHtml  =   ' <tr>'+
                    '   <td>'+idx+'</td>'+
                    '   <td>'+ele.schedule_time_dan+'</td>'+
                    '<td>'+ele.schedule_time_content+'</td>'+
                    '<td >'+
                    '<button class="layui-btn layui-btn-primary get26modification"  data-timeId="'+ele.schedule_time_id+'"  data-content="'+ele.schedule_time_content+'" data-time = "'+ele.schedule_time_dan+'"><i class="layui-icon"></i></button>'+
                    '<button class="layui-btn" id="delTrTime" data-timeId="'+ele.schedule_time_id+'" >删除</button></td>'+
                    '   </tr>';
                    $("#get29table tbody").append(add29tableHtml);
          
                })
                 })             
           }       
        })
         	//获取30号信息
        $.ajax({
            url:"/adminschedule/selectschedule",
            data:{
                ID:"30"
            },
           success:function(data){             
                 console.log(data);
                 console.log(data.length)
                 $(data).each(function(idx,element){
                    // console.log(idx + element)
                    idx+=1;
                $(element).each(function(i,ele){
                    console.log(ele);
                    console.log(ele.schedule_time_content);
                    var add30tableHtml  =   ' <tr>'+
                    '   <td>'+idx+'</td>'+
                    '   <td>'+ele.schedule_time_dan+'</td>'+
                    '<td>'+ele.schedule_time_content+'</td>'+
                    '<td >'+
                    '<button class="layui-btn layui-btn-primary get26modification"  data-timeId="'+ele.schedule_time_id+'"  data-content="'+ele.schedule_time_content+'" data-time = "'+ele.schedule_time_dan+'"><i class="layui-icon"></i></button>'+
                    '<button class="layui-btn" id="delTrTime" data-timeId="'+ele.schedule_time_id+'" >删除</button></td>'+
                    '   </tr>';
                    $("#get30table tbody").append(add30tableHtml);
          
                })
                 })             
           }       
        })
           }
           
           function addDateTable(whichId){
            $('#show'+whichId+'').on("click",'#updateTable'+whichId+'',function(){
                        var time27_val  = $('#modol'+whichId+'date').val();
                        var content_val = $('.date'+whichId+'-val').val();
                        
                        console.log(time27_val + content_val);
                        $.ajax({
                            url:"/adminschedule/addschedule",
                            data:{
                                "content":content_val,
                                "days":whichId,
                                "dan":time27_val
                            },
                            success:function(data){
                                layer.msg('添加成功', {
                                    icon: 1,
                                    time: 1000
                                    });
                                    layer.closeAll();
                                    $("#meeting-schedule").click();
                            },error:function(err){
                                   console.log(err)
                            }
                        })
                  }) 
        }

    })
    
    
    
    
    
    
    
    
    
    
    
    
    