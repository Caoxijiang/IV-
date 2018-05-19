import host from '../../host/host';
var serverURL = host.SERVER_URL;
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    modalHidden2: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:""
  },
  getPhoneNumber: function (e) {
    var self=this;
    if (self.data.userInfo == undefined || self.data.userInfo == "" || self.data.userInfo==null ){
      this.scorp();
     // self.phoneUtil(e);
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
    var self=this;
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
          var encryptedData = e.detail.encryptedData;
          var iv = e.detail.iv;
        //  console.log(data.userInfo);
          wx.showLoading({
            title: '登陆中',
          })
          wx.request({
            url: serverURL + '/weixin/encryptData',
            data: {
              encryptedData: encryptedData,
              iv: iv,
              token: app.globalData.token,
              wxuserInfo: self.data.userInfo
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
  },onShow:function(){
    this.scorp()
    //this.bindGetUserInfos();
  
   
  },
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  scorp: function () {
    var self = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log("userInfo: " + JSON.stringify(res.userInfo))
             // self.globalData.userInfo = res.userInfo
              self.setData({
                userInfo: res.userInfo
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
            }
          })
        } else {
          //this.bindGetUserInfo();
           this.modalTap2();
          // console.log(this.modalTap2());

        }
      }, fail: function (res) {
        console.log("接口调用失败")    
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.errMsg =="getUserInfo:fail auth deny"){
        wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    }else{
      var self = this;
      self.setData({
        userInfo: e.detail.userInfo,
        modalHidden2: true
      })
     console.log(e)
   }
 console.log(324)
  
    
  },
  modalChange2: function (e) {
    var self=this;
    wx.showModal({
      title: '警告',
      content: '未授权将无法使用小程序',
      complete: function () {
        self.setData({
          modalHidden2: false,
        })
      }
    })

  },
  modalChange: function (e) {

    this.setData({
      modalHidden: true
    })
  },

})