
var Introduction={
    add:"insert into introduction_info(user_id,topic,time,address,money,Introduction) values(?,?,?,?,?,?)",
    select:"select * from introduction_info where user_id=? "
};
module.exports = Introduction;