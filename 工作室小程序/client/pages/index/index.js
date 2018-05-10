import host from '../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data:{
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    metingInfo:""
  },

  //事件处理函数

  onLoad: function () {

  },
  // toDetail: function (e) {
  //   console.log(e);
  //   var index = e.currentTarget.dataset.index;
  //   console.log(index);
  // }
  onShow:function(){
    var self = this;
    wx.request({
      url: serverURL + '/index/mettinginfo',
      data: {
        token: app.globalData.token,
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.status_err == "err") {
          wx.showModal({
            title: '提示',
            content: '登陆过期',
            complete: function () {
              //app.login();
            }
          })
        } else if (res.data.status_err == "SERVERERR") {
          wx.showModal({
            title: '提示',
            content: "服务器错误",
          })
        } else {
          self.setData({
            metingInfo: res.data
          })
        }
      }, fail: function (res) {
        console.log(res)
      }
    })

  }
})