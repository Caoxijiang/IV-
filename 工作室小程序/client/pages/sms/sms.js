import host from '../../host/host';
var serverURL = host.SERVER_URL;

Page({
  data: {
    send: false,
    alreadySend: false,
    second: 60,
    disabled: true,
    buttonType: 'default',
    phoneNumber: '',
    code: '',
  },
  back: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  // 手机号部分
  inputPhoneNum: function (e) {
    let phoneNumber = e.detail.value
    if (phoneNumber.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNumber)
      if (checkedNum) {
        this.setData({
          phoneNumber: phoneNumber
        })
        console.log('phoneNumber' + this.data.phoneNumber)
        this.showSendMsg()
        this.activeButton()
      }
    } else {
      this.setData({
        phoneNumber: ''
      })
      this.hideSendMsg()
    }
  },
      
  checkPhoneNum: function (phoneNumber) {
    let str = /^1\d{10}$/
    if (str.test(phoneNumber)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        image: '../../images/fail.png'
      })
      return false
    }
  },

  showSendMsg: function () {
    if (!this.data.alreadySend) {
      this.setData({
        send: true
      })
    }
  },

  hideSendMsg: function () {
    this.setData({
      send: false,
      disabled: true,
      buttonType: 'default'
    })
  },

  sendMsg: function () {
    console.log("qqqq",this.data.phoneNumber)
    wx.request({
      url: serverURL +'/sms/phonelogin',
      data: {
        phoneNumber: this.data.phoneNumber
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
           if(res.data.code==1){
          wx.showModal({
            title: '提示',
            content: res.data.msg
          })
        }else if(res.data.code==2){
          wx.showToast({
            title: '发送成功',
            icon: 'success'
          })
        } else if (res.data.code == "isv.BUSINESS_LIMIT_CONTROL"){
          wx.showModal({
            title: '提示',
            content: "您的请求过于频繁，请稍后再试"
          })
        }else{
          wx.showModal({
            title: '提示',
            content: "发送失败"
          })
        }
      },
      fail:function(res){
           wx.showModal({
          title: '提示',
          content: '服务器错误',
          showCancel: true,
        })
      }
    })
    this.setData({
      alreadySend: true,
      send: false
    })
    this.timer()
  },

  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              alreadySend: false,
              send: true
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },

  // 其他信息部分
  // addOtherInfo: function (e) {
  //   this.setData({
  //     otherInfo: e.detail.value
  //   })
  //   this.activeButton()
  //   console.log('otherInfo: ' + this.data.otherInfo)
  // },

  // 验证码
  addCode: function (e) {
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
    console.log('code' + this.data.code)
  },

  // 按钮
  activeButton: function () {
    let { phoneNumber, code } = this.data
    console.log(code)
    if (phoneNumber && code ) {
      this.setData({
        disabled: false,
        buttonType: 'primary'
      })
    } else {
      this.setData({
        disabled: true,
        buttonType: 'default'
      })
    }
  },

  onSubmit: function () {
    wx.request({
      url: serverURL +'/sms/submitphoneInfo',
      data: {
        phoneNumber: this.data.phoneNumber,
        code: this.data.code,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if ((parseInt(res.statusCode) === 200) && res.data.code === 0) {
          wx.showToast({
            title: '注册登录成功',
            icon: 'success',
            complete:function(){
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
        } else if ((parseInt(res.statusCode) === 200) && res.data.code === 3){
          wx.showToast({
                title: '登录成功',
                icon: 'success',
                complete: function () {
                 wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
        } else if ((parseInt(res.statusCode) === 200) && res.data.code === "ADMINTOKEN"){
          console.log(res.data.code);
          wx.showToast({
            title: '管理员登录成功',
            icon: 'success',
            complete: function () {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
        }  else{
          wx.showToast({
            title:"登陆失败",
            image: '../../images/fail.png'
          })
        }
      },
      fail: function (res) {
          wx.showModal({
            title: '提示',
            content: '服务器错误',
            showCancel: true,
          })
      }
    })
  }
})
