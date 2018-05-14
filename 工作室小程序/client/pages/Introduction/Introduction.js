// pages/Introduction/Introduction.js
import host from '../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    IntroductionInfo:"",
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self=this;
    wx.request({
      url: serverURL + '/Introduction/select',
      data:{
        token: app.globalData.token,
      },
      success:function(res){
        console.log(res)
        if (res.data == "err") {
          wx.showModal({
            title: '提示',
            content: '登陆过期',
            complete: function () {
              wx.redirectTo({
                url: '/pages/login/login',
                success:function(){
                  app.login();
                }
              })
            }
          })
        } else if (res.data == "SERVERERR") {
          wx.showModal({
            title: '提示',
            content: "服务器错误",
          })
        } else {
          self.setData({
            IntroductionInfo: res.data
          })
        }
      }
    })
  }

})