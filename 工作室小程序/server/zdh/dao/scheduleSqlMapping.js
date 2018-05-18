var schedule={
    addscheduleinfo:"insert into schedule_info(user_id,schedule_id) values(?,?)",
    addscheduleidinfo:"insert into schedule_timeid(schedule_id) values(?)",
    addscheduletimeinfo:"insert into schedule_timeinfo(user_id,schedule_time_id,schedule_time_content,schedule_time_dan) values(?,?,?,?)",
    selectscheduleinfoByuserid:"select * from schedule_info where user_id=?",
    selecttimeInfoByscheduleid:"select schedule_timeinfo from schedule_timeinfo where schedule_time_id=?",
    selectscheduleidByuserid:"select schedule_id from schedule_info where schedule_id=?"


}
module.exports=schedule;