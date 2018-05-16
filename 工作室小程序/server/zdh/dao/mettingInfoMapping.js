var meetingInfo={
    insertmeetingInfo:"insert into meeting_info(user_id,metting_topic,metting_Summary,metting_imageUrl,metting_startTime) values(?,?,?,?,?);",
    selectadminUserid:"select user_id from adminaccount where admin_account=?",
    insertmeetingImageinfo:"insert into meeting_imageinfo(metting_id,images_url) values(?,?);",
    selectmeetingId:"select metting_id from meeting_info where user_id=?",
    selectAllmeetingList:"select * from meeting_info where user_id=?",
    dellmeetingList:"delete from meeting_info where metting_topic=?",
    
}   
module.exports=meetingInfo;