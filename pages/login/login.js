var httpsApi = "https://www.rexjoush.com";
var wsApi = "wss://www.rexjoush.com";
// var httpsApi = "https://127.0.0.1:443";
// var wsApi = "wss://127.0.0.1:443";
var app = getApp();
Page({
  data: {
      encryptedData: '',
      iv: '',
      JSCODE: '',
      room: 'default',
  },
  onLoad: function (e) {
    if (JSON.stringify(e) != "{}"){
      this.setData({
        room: e.room,
      });
    }
    //console.log(this.data.room);
    var that = this;
 
    // 登录
    wx.login({
      success: function (res) {
        that.setData({
          JSCODE: res.code,
        })
      }
    });
   
  },
  bindGetUserInfo: function (e) {
    var that = this;
    //console.log(e);
    this.setData({
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
    })
    wx.showToast({
      title: '授权中',
      icon: 'loading',
      duration: 10000,
    });
    wx.request({
      url: httpsApi,
      data: that.data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success: function (res) {
        //console.log(res.data);
        if (!app.globalData.isHost){
          app.globalData.room = res.data;
        }
        else{
          app.globalData.room = that.data.room;
        }
        wx.showToast({
          title: '授权成功',
          icon: 'success',
          duration: 1000,
        });
        setTimeout(function () {
          wx.redirectTo({
            url: '../shareGroup/shareGroup',
          })
        }, 1000)
      },
      fail: function(){
        wx.showToast({
          title: '授权失败,请检查网络连接',
          image: '../../images/fail.png',
          duration: 2000,
        });
      }
    });
  },
})