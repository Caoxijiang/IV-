var carousel = {
    insertCarouselInfo:"insert into carousel_imageinfo(user_id,carousel_url) values(?,?) ",
    selectCarouseInfo:"select * from  carousel_imageinfo"
};
module.exports = carousel;

//"http://192.168.2.102:3006/public/images/1518060481184.png"