
var orders={
    insertorderInfo:"insert into orders_info(order_Num,order_total,order_tname,order_phone,order_status,order_starttime,order_endtime) values(?,?,?,?,0,?,0)",
    selectAllorderInfo:"select * from orders_info",
    selectorderByphoneNum:"select * from orders_info where order_Num=?",
    updateorderstatus:"update  orders_info set order_status=?,order_endtime=? where order_Num=?"

};
module.exports = orders;