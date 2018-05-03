var meetingInfo={
    insertmeetingInfo:"insert into meeting_info(user_id,metting_topic,metting_Summary,metting_imageUrl) values(?,?,?,?,?);",
    selectadminUserid:"select user_id from adminaccount where admin_account=?",
    insertmeetingImageinfo:"insert into meeting_imageinfo(metting_id,images_url) values(?,?);",
    selectmeetingId:"select metting_id from meeting_info where user_id=?"
    
    
}   
module.exports=meetingInfo;