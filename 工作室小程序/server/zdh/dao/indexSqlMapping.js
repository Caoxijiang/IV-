var commodity = {
    selectcommodity:"select bullupmall_commodity_name,bullupmall_commodity_unit_price from bullupmall_commodityinfo where bullupmall_commodity_id=?",
    selectwebimage:"select bullupmall_webcommodity_image_url from bullup_commodity_webimageinfo where mark=? ",
    selectcommityimageId:"select bullupmall_commodity_image_id from bullupmall_commodity_imaginfo where bullupmall_commodity_image_url=?",
    selectshopinfo:"select bullupmall_commodity_image_url,bullupmall_commodity_image_id from bullupmall_commodity_imaginfo where mark=?",
    selectcommityId:"select bullupmall_commodity_id from bullupmall_imageid where bullupmall_commodity_image_id=?"
   // insert:'INSERT INTO user_wxinfo(wx_openid,role) VALUES(?,0)',
    //update:'update user_wxinfo set wx_open_id=1 where user_id=?',
};
module.exports = commodity;

//"http://192.168.2.102:3006/public/images/1518060481184.png"