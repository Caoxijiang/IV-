var ticketinfo={
    insertticketinfo:"insert into ticket_info(user_id,ticket_type,ticket_details,ticket_price,ticket_status) values(?,?,?,?,?)",
    selectAllticketinfo:"select * from ticket_info",
    dellticketinfobyticketid:"delete from ticket_info where ticket_id=?",
    updteticketinfoByticketid:"update ticket_info set ticket_type=?,ticket_details=?,ticket_price=?,ticket_status=? where ticket_id=?"
}

module.exports=ticketinfo;