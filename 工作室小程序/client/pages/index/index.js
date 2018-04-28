var app = getApp();
Page({
  data:{
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    contentItems:['','','','']
  },
  onShow:function(){
    // var d = wx.getStorageSync("only")
    // console.log(d);
    // if (d) {
    //   console.log("跳转参数==>", d)
    //   if (d == 1) {
    //     app.login();
    //     wx.removeStorageSync("only");
    //   }
    // }
  }
})