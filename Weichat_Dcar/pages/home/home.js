// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  getSwiperList:function(){
    wx.request({
      url:"http://127.0.0.1:8080/imagelist",
      success:(res)=>{
        this.setData({pics:res.data})
      }
    })
  },




  onLoad: function (options) {
    this.getSwiperList();

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})