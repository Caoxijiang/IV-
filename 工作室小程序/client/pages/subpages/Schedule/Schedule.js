Page({

  data: {
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
    showView: true

  },

  onLoad: function (options) {

    // 生命周期函数--监听页面加载

    showView: (options.showView == "true" ? true : false)

  }

  , onChangeShowState: function () {

    var that = this;

    that.setData({

      showView: (!that.data.showView)

    })

  }

})