var util = require('../../utils/util.js');
var api = require('../../utils/api.js');

Page({
  data: {
    orderList: [{
      orderSn: 20201010111,
      orderStatusText: '待发货',
      goodsList: [{
        picUrl: '/images/tmp/lianhua.png',
        goodsName: '莲花胶棒',
        number: 1
      }],
      actualPrice: 66.9
    }, 
      {
        orderSn: 20201010112,
        orderStatusText: '待发货',
        goodsList: [{
          picUrl: '/images/tmp/lianhua.png',
          goodsName: '莲花胶棒',
          number: 1
        },
          {
            picUrl: '/images/tmp/lianhua.png',
            goodsName: '莲花胶棒',
            number: 2
          }],
        actualPrice: 66.9
      }, ],
    showType: 0
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this
    try {
      var tab = wx.getStorageSync('tab');

      this.setData({
        showType: tab
      });
    } catch (e) {}

  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getOrderList();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  getOrderList() {
    let that = this;
    util.request(api.OrderList, {
      showType: that.data.showType
    }).then(function(res) {
      if (res.errno === 0) {
        console.log(res.data);
        that.setData({
          orderList: res.data.data
        });
      }
    });
  },
  switchTab: function(event) {
    let showType = event.currentTarget.dataset.index;
    this.setData({
      showType: showType
    });
    this.getOrderList();
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
    //this.getOrderList();
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})