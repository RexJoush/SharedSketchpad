//index.js
//获取应用实例
const app = getApp();
Page({
  data: {

  },
  onLoad: function(){

  },
  shareSingle: function(){
    wx.navigateTo({
      url: '../shareSingle/shareSingle',
    })
  },
  shareGroup: function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
 
  onShow: function () {
    
  },
  onHide: function (){
    app.globalData.isHost = false;
  }
})