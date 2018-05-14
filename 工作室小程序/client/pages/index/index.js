import host from '../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();
Page({
  data:{
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
    metingInfo:""
  },

  //事件处理函数

  onLoad: function () {
    var self=this;
    wx.request({
      url: serverURL +'/index/carouselinfo',
      data:{
        token: app.globalData.token,
      },
      success:function(res){
        console.log(res.data)
        if (res.data == "err") {
          wx.showModal({
            title: '提示',
            content: '登陆过期',
            complete: function () {
              wx.redirectTo({
                url: '/pages/login/login',
                success: function () {
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
            imgUrls: res.data
          })
        }
      },fail:function(res){
        console.log(res)
      }
    })
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
        if (res.data == "err") {
          wx.showModal({
            title: '提示',
            content: '登陆过期',
            complete: function () {
              wx.redirectTo({
                url: '/pages/login/login',
                success: function () {
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
            metingInfo: res.data
          })
        }
      }, fail: function (res) {
        console.log(res)
      }
    })

  }
})