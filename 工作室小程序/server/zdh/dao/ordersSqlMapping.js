
var orders={
	insert:"insert into user_orderinfo(user_id,`order_account`,order_name,order_amount,bullupmall_commodity_id,order_start_time,order_status,order_end_time) values(?,?,?,?,1,?,0,0)",
    select:"select order_account,order_name,order_amount,bullupmall_commodity_id,order_start_time,order_status,order_end_time from user_orderinfo where user_id=?",
    selectUserid:"select user_id from user_wxinfo where wx_openid=?",
    updataStatus:"update user_orderinfo set order_status=? where order_account=?",
    updatatOrdersendTime:"update user_orderinfo set order_end_time=? where order_account=?",
    selectAllUserAccount:"select order_account from user_orderinfo where user_id=? group by order_account",
    deleteoldAccount:"delete from user_orderinfo where order_amount=?"
};
module.exports = orders;