var mainuserInfo={
    insertmediaInfo:"insert into main_mediaInfo(ticket_id,media_name,media_phone,media_email,media_util,media_job,media_platform) values(?,?,?,?,?,?,?)",
    insertnoVipInfo:"insert into main_novipinfo(ticket_id,noVip_phone,noVip_email,noVip_util,noVip_job) values(?,?,?,?,?,?)",
    insertVipInfo:"insert into main_vipinfo(ticket_id,ticket_phone,ticket_email,ticket_util,ticket_job,ticket_VIPnum) values(?,?,?,?,?,?,?)",
    insertStuInfo:"insert into main_stuinfo(ticket_id,stu_name,stu_phone,stu_email,stu_school,stu_stuNum) values(?,?,?,?,?,?)",
  
}
module.exports=mainuserInfo;