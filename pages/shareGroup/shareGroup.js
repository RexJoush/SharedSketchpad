// pages/shareGroup/shareGroup.js
var app = getApp();
var httpsApi = "https://www.rexjoush.com";
var wsApi = "wss://www.rexjoush.com";
// var httpsApi = "https://127.0.0.1:443";
// var wsApi = "wss://127.0.0.1:443";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    room: '',
    multiple: true,
    isHost: true,
    avatarUrl1: "", 
    avatarUrl2: "",
    avatarUrl3: "",
    avatarUrl4: "",
    avatarUrl5: "",
    avatarUrl6: "",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isHost: getApp().globalData.isHost,
      room: getApp().globalData.room
    })
    console.log(this.data.room);
    var that = this;
    wx.connectSocket({
      url: wsApi,
      data: {},
      header: {
        'content-type': 'application/json',
        'room' : this.data.room,
      },
      //protocols: ['protocol1'],
      method: "GET",
      success: function () {
        console.log("客户端连接成功！");
      }
    });
    wx.onSocketOpen(function () {
      console.log("websocket连接已打开！");
    });
    wx.onSocketMessage(function(res){
      var arr = res.data.split(',')
      console.log(arr);
      if (arr[0] == app.globalData.room){
        if (arr[1] == 'begin') {
          that.groupbegin();
        }
        else {
          if (arr.length >= 3) {
            that.setData({
              multiple: false,
            })
          }
          for (var i = 0; i < arr.length; i++) {
            that.setData({
              avatarUrl1: arr[1],
              avatarUrl2: arr[2],
              avatarUrl3: arr[3],
              avatarUrl4: arr[4],
              avatarUrl5: arr[5],
              avatarUrl6: arr[6],
            })
          }
        }
      }
    })
  },
  groupbeginmsg: function () {
    wx.sendSocketMessage({
      data: app.globalData.room + ",begin",
    })
  },
  groupbegin:function(){
    wx.redirectTo({
      url: '../Demo/Demo',
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '一起来画画吧',
      path: '/pages/login/login?room=' + app.globalData.room,
      imageUrl: '/images/invitation.png',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  onLaunch: function(){
    
    /**
     * 获取用户信息  
     */
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {

  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {

  // },

  
})