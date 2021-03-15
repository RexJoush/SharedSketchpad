
//app.js
App({
  
  // config: {
  //   host: '127.0.0.1:3000' // 这个地方填写你的域名
  // },

  // onLaunch: function () {
  //   var APPID = 'wx77df43d108881919';
  //   var SECRET = '7d9f75ec9556c44051bebe3030d071a3';
  //   // 展示本地存储能力
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)
  //   // 登录
  //   wx.login({
  //     success: function (res) {
  //       var JSCODE = res.code;
  //       wx.request({
  //         url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + JSCODE + '&grant_type=authorization_code',
  //         success: function (res) {
  //            console.log(res);
  //         }
  //       })
  //     }
  //   })
  //   // 获取用户信息S
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo
  //             //console.log(this.globalData.userInfo);
  //             // wx.sendSocketMessage({
  //             //   data:['join',this.globalData.userInfo.nickName,this.globalData.userInfo.gender,this.globalData.userInfo.city,]
  //             // }) 
  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  
  globalData: {
    isHost: true,
    room: '',
  },
  
})