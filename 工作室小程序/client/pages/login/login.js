import host from '../../host/host';
var serverURL = host.SERVER_URL;
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  getPhoneNumber: function (e) {
    var self=this;
    if (app.globalData.userInfo == undefined || app.globalData.userInfo == "" || app.globalData.userInfo==null ){
      app.scorp();
      self.phoneUtil(e);
    }else{
      self.phoneUtil(e);
    }

  },
  getphone:function(e){
    console.log(11)
    wx.navigateTo({
      url: '/pages/sms/sms',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  phoneUtil:function(e){
    console.log("111", e.detail.errMsg)
    console.log("iv :", e.detail.iv)
    console.log("encryptedData :", e.detail.encryptedData)

    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) {
          var encryptedData = e.detail.encryptedData;
          var iv = e.detail.iv;
          console.log(app.globalData.userInfo.nickName);
          wx.showLoading({
            title: '登陆中',
          })
          wx.request({
            url: serverURL + '/weixin/encryptData',
            data: {
              encryptedData: encryptedData,
              iv: iv,
              token: app.globalData.token,
              wxuserInfo: app.globalData.userInfo
            },
            success: function (res) {
              console.log("132132" + JSON.stringify(res));
              if (res.data == "err") {
                wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '登陆过期',
                  complete: function () {
                    //  wx.setStorageSync('only', 1)
                    app.login();
                    console.log(121213)
                  }
                })
                wx.clearStorage()
              } else if(res.data.msg=="LOGINSUCCESS"){
                wx.switchTab({
                  url: '/pages/index/index',
                  success:function(){
                    wx.showLoading({
                      title: '登陆成功',
                      icon: 'success',
                      duration: 2000
                    })
                  },
                  fail:function(){
                    wx.showModal({
                      title: '提示',
                      content: '登陆失败',
                    })
                  }
                })
              } else if (res.data.msg == "REGISTEREDSUCCESS"){
                wx.switchTab({
                  url: '/pages/index/index',
                  success: function () {
                    wx.showLoading({
                      title: '注册登陆成功',
                      icon: 'success',
                      duration: 2000
                    })
                  },
                  fail: function () {
                    wx.showModal({
                      title: '提示',
                      content: '注册登陆失败',
                    })
                  }
                })
              } else if (res.data.msg == "ADMINLOGINSUCCESS"){
                wx.switchTab({
                  url: '/pages/index/index',
                  success: function () {
                    wx.showLoading({
                      title: '管理员登陆成功',
                      icon: 'success',
                      duration: 2000
                    })
                  },
                  fail: function () {
                    wx.showModal({
                      title: '提示',
                      content: '管理员登陆失败',
                    })
                  }
                })
              } else{
                wx.showModal({
                  title: '提示',
                  content: '服务器错误',
                })
              }
            },
            fail:function(){
              wx.showModal({
                title: '提示',
                content: '服务器未响应',
              })
            }
          })
        }
      })
    }
  }  

})