var api = require('../../../utils/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');

var app = getApp();
Page({
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成

  },
  onReady: function() {

  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },
  wxLogin: function(e) {
    if (e.detail.userInfo == undefined) {
      app.globalData.hasLogin = false;
      util.showErrorToast('微信登录失败');
      return;
    }

    user.checkLogin().catch(() => {
      console.log('tmp0')
      user.loginByWeixin(e.detail.userInfo,
      ).then(res => {
        console.log('tmp1')
        app.globalData.hasLogin = true;

        wx.navigateBack({
          delta: 1
        })
      }).catch((err) => {
        //app.globalData.hasLogin = false;
        //util.showErrorToast('微信登录失败');
        console.log('tmp2')
        //tmp：show has login
        app.globalData.hasLogin = true;

        wx.navigateBack({
          delta: 1
        })
      });

    });
    
  },
  accountLogin: function() {
    wx.navigateTo({
      url: "/pages/auth/accountLogin/accountLogin"
    });
  }
})