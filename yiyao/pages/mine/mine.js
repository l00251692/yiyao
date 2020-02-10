import { bindPhone } from '../../utils/api'
import { alert } from '../../utils/util'

var app = getApp();

Page({
  data: {
    order: {
      unpaid: 0,
      unship: 0,
      unrecv: 0,
      uncomment: 0
    },
    hasLogin: false,
    phone:"未绑定"
  },
  onLoad: function(options) {
    //获取用户的登录信息
    if (app.globalData.hasLogin) {
      this.setData({
        hasLogin: true,
        userInfo: wx.getStorageSync('userInfo')
      })
    }
  },
  onReady: function() {

  },
  onShow: function() {

  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭
  },

  
  goLogin() {
    console.log("" + this.data.hasLogin)
    if (!this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  goOrder() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/ucenter/order/order"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  goOrderIndex(e) {
    if (this.data.hasLogin) {
      let tab = e.currentTarget.dataset.index
      let route = e.currentTarget.dataset.route
      try {
        wx.setStorageSync('tab', tab);
      } catch (e) {

      }
      wx.navigateTo({
        url: route,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },
})