// pages/news/news.js
import host from '../../host/host';
var serverURL = host.SERVER_URL;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    metingInfo:"",
    imgUrlss: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: null,
  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
        var self = this;
        wx.getStorage({
          key: 'metingInfo',
          success: function(res) {
            self.setData({
               metingInfo: res.data
           })
          },
        })
          wx.getStorage({
            key: 'imgUrls',
            success: function (res) {
              console.log(res.data.carousel_url)
              self.setData({
                imgUrlss: res.data.carousel_url
              })
            },
          })

    // wx.request({
    //   url: serverURL + '/index/mettinginfo',
    //   data: {
    //     token: app.globalData.token,
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     if (res.data == "err") {
    //       wx.showModal({
    //         title: '提示',
    //         content: '登陆过期',
    //         complete: function () {
    //           wx.redirectTo({
    //             url: '/pages/login/login',
    //             success: function () {
    //               app.login();
    //             }
    //           })
    //         }
    //       })
    //     } else if (res.data == "SERVERERR") {
    //       wx.showModal({
    //         title: '提示',
    //         content: "服务器错误",
    //       })
    //     } else {
    //       self.setData({
    //         metingInfo: res.data
    //       })
    //     }
    //   }, fail: function (res) {
    //     console.log(res)
    //   }
    // })
  },


})