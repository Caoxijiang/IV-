import host from './host/host';
var serverURL = host.SERVER_URL;
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录

  },
  onShow:function(){
    var self = this;
    self.login();
    // self.scorp();
  },
  globalData: {
    userInfo: {},
    token:null
  },
  login:function(){
    var self = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
          wx.request({
            url: serverURL + '/weixin/wx_login',
            data: { code: code },
            header: { 'content-type': 'application/json' },
            success: function (res) {
              var openid = res.data.wxtoken;
              console.log("openid: " + JSON.stringify(res.data));
              self.globalData.token = openid;
            },
            fail: function (res) {
              wx.showModal({
                title: '提示',
                content: '请检查您的网络',
                showCancel: false
              })
            }
          })
        } else {
          console.log("获取用户登录态失败：" + res.errMsg);
        }
      }
    })
  },
  // scorp:function(){
  //   var self=this;
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             console.log("userInfo: " + JSON.stringify(res.userInfo))
  //             self.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (self.userInfoReadyCallback) {
  //               self.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       } else {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             console.log(JSON.stringify(res.userInfo))
  //             self.globalData.userInfo = res.userInfo
  //             if (self.userInfoReadyCallback) {
  //               self.userInfoReadyCallback(res)
  //             }
  //           },
  //           fail:function(res){
  //             console.log("aaaaaa")
  //             wx.showModal({
  //               title: '警告',
  //               content: '您如果不开启权限将无法使用该小程序',
  //               showCancel: true,
  //               success: function(res) {
  //                 wx.openSetting({
  //                   success: function(res) {
  //                     self.globalData.userInfo = res.userInfo
  //                     if (self.userInfoReadyCallback) {
  //                       self.userInfoReadyCallback(res)
  //                     }
  //                   },
  //                   fail: function(res) {
                      
  //                   },
  //                 })
  //               },
  //               fail: function(res) {},
  //               complete: function(res) {},
  //             })

  //           }
  //         })
  //       }
  //     }, fail: function (res) {
  //       console.log("接口调用失败")
  //     }
  //   })
  // },
})