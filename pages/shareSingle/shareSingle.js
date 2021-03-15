var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLPencilSelect: false, //是否选中粗笔
    isMPencilSelect: false, //是否选中中笔
    isSPencilSelect: true, //是否选中细笔
    isColorSelect: true,    //颜色菜单
    isEraser: false,        //是否选中橡皮
    isMore: true,           //更多 菜单是否弹出
    obvious: 'black',       //颜色菜单默认颜色
    touch: {
      distance: 0,
      scale: 1,
      baseWidth: null,
      baseHeight: null,
      scaleWidth: null,
      scaleHeight: null
    },
    pen: 3, //画笔粗细默认值
    color: '#000000', //画笔颜色默认值
    eraser: 20, //橡皮默认宽度
  },

  //选中粗笔
  //把粗笔置为true，其他置为false，下面同理
  lpencil:function(){
    this.setData({
      isEraser: false,
      isLPencilSelect: true,
      isMPencilSelect: false,
      isSPencilSelect: false,
      pen: 15,
    })
    this.isEraserSelect = false;
  },

  //选中中笔
  mpencil: function () {
    this.setData({
      isEraser: false,
      isLPencilSelect: false,
      isMPencilSelect: true,
      isSPencilSelect: false,
      pen: 8,
    })
    this.isEraserSelect = false;
  },

  //选中细笔
  spencil: function () {
    this.setData({
      isEraser: false,
      isLPencilSelect: false,
      isMPencilSelect: false,
      isSPencilSelect: true,
      pen: 3,
    })
    this.isEraserSelect = false;
  },
  //选中橡皮
  eraser: function () {
    if (this.isEraserSelect) {
      this.isEraserSelect = false;
    } else {
      this.isEraserSelect = true;
    }
    this.setData({
      isMore: true,
      isEraser: true,
      isLPencilSelect: false,
      isMPencilSelect: false,
      isSPencilSelect: false,
    })
  },
  changeEarser: function(e){
    this.setData({
      eraser: e.detail.value
    })
  },
  //颜色菜单的隐藏
  colorMenu: function(){
    this.setData({
      isColorSelect: false,
    })
  },
  //更改画笔颜色的方法
  hidecolor: function (e) { 
    this.setData({
      isColorSelect: true,
      obvious: e.currentTarget.dataset.param,
      color: e.currentTarget.dataset.param,
    });
  },

  startX: 0, //保存X坐标轴变量
  startY: 0, //保存Y坐标轴变量
  isEraserSelect: false, //是否启用橡皮擦标记
  touchStart: function (e) {
    //得到触摸点的坐标
    this.startX = e.changedTouches[0].x
    this.startY = e.changedTouches[0].y
    this.context = wx.createContext()
    this.context.fillStyle = '#fff';

    if (this.isEraserSelect) { //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
      this.context.setStrokeStyle('#FFFFFF') //设置线条样式 此处设置为画布的背景颜色  橡皮擦原理就是：利用擦过的地方被填充为画布的背景颜色一致 从而达到橡皮擦的效果 
      this.context.setLineCap('round') //设置线条端点的样式
      this.context.setLineJoin('round') //设置两线相交处的样式
      this.context.setLineWidth(this.data.eraser) //设置线条宽度
      this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
      this.context.beginPath() //开始一个路径 
      this.context.arc(this.startX, this.startY, 5, 0, 2 * Math.PI, true);  //添加一个弧形路径到当前路径，顺时针绘制  这里总共画了360度  也就是一个圆形 
      this.context.fill();  //对当前路径进行填充
      this.context.restore();  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
    } else {
      this.context.setStrokeStyle(this.data.color)
      this.context.setLineWidth(this.data.pen)
      this.context.setLineCap('round') // 让线条圆润
      this.context.beginPath()
    }
  },
  //手指触摸后移动
  touchMove: function (e) {

    var startX1 = e.changedTouches[0].x
    var startY1 = e.changedTouches[0].y

    if (this.isEraserSelect) { //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
      this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
      this.context.moveTo(this.startX, this.startY);  //把路径移动到画布中的指定点，但不创建线条
      this.context.lineTo(startX1, startY1);  //添加一个新点，然后在画布中创建从该点到最后指定点的线条
      this.context.stroke();  //对当前路径进行描边
      this.context.restore()  //恢复之前保存过的坐标轴的缩放、旋转、平移信息

      this.startX = startX1;
      this.startY = startY1;

    } else {
      this.context.moveTo(this.startX, this.startY)
      this.context.lineTo(startX1, startY1)
      this.context.stroke()

      this.startX = startX1;
      this.startY = startY1;

    }
    wx.drawCanvas({
      canvasId: 'myCanvas',
      reserve: true,
      actions: this.context.getActions() // 获取绘图动作数组
    })
  },
  //手指触摸动作结束
  touchEnd: function () {

  },

  //清空画布
  clearAll: function(){
    this.setData({
      isMore: 'true',
    })
    var context = wx.createContext();
    context.clearRect(100, 100, 50, 50)
    wx.drawCanvas({
      canvasId: 'myCanvas',
      actions: context.getActions()
    });
  },
  //显示分享的菜单
  more:function(){
    this.setData({
      isMore: false,
    })
  },

  //分享的实现
  share: function () {
    var that = this;
    this.setData({
      isMore: 'true',
    });
    //弹出底部的Sheet菜单
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function (res) {
        console.log(res.tapIndex);
        if(res.tapIndex == 0){
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: '750rpx',
            height: '950rpx',
            canvasId: 'myCanvas',
            fileType: 'jpg',
            success: function (res1) {
              wx.saveImageToPhotosAlbum({
                filePath: res1.tempFilePath,
              });
              //弹出分享成功的提示
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 1500
              });
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    });
  },
  
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
    })
    const ctx = wx.createCanvasContext("myCanvas");
    ctx.rect(0,0,750,950);
    ctx.setFillStyle('white');
    ctx.fill();
    ctx.draw();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow() {
    
  // },
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我的画图',
      success: function (res) {
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 1500
        });
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})