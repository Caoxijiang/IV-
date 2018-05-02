var meetingInfo={
    insertmeetingInfo:"insert into meeting_info(user_id,metting_id,metting_topic,metting_Summary) values(?,?);",
    selectadminUserid:"select user_id from adminaccount where admin_account=?",
    
    
}   
module.exports=meetingInfo;