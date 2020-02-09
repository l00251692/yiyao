var util = require('../../utils/util.js');
var api = require('../../utils/api.js');

Page({
  data: {
    categoryList: [
      { id: 1, name: '感冒咳嗽' },
      { id: 2, name: '心脑用药' },
      { id: 3, name: '呼吸道类' },
      { id: 4, name: '高血压类' },
      { id: 5, name: '健康养生' },
      { id: 6, name: '神经用药' },
      { id: 7, name: '消化道类' },
      { id: 8, name: '皮肤类' },
      { id: 9, name: '五官用药' },
      { id: 10, name: '肿瘤用药' },
      { id: 11, name: '男性用药' },
      { id: 12, name: '女性用药' }
    ],
    currentCategory: { id: 1, picUrl: '/images/tmp/lianhua.png', frontName: '', name:'感冒咳嗽'},
    currentSubCategoryList: [
      { picUrl: '/images/tmp/lianhua.png', name: '清热降温' },
      { picUrl: '/images/tmp/lianhua.png', name: '润喉止咳' },
      { picUrl: '/images/tmp/lianhua.png', name: '咽喉干燥' },
      { picUrl: '/images/tmp/lianhua.png', name: '幼儿类' }
    ],
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0
  },
  onLoad: function(options) {
    //this.getCatalog();
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getCatalog();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  getCatalog: function() {
    //CatalogList
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    util.request(api.CatalogList).then(function(res) {
      that.setData({
        categoryList: res.data.categoryList,
        currentCategory: res.data.currentCategory,
        currentSubCategoryList: res.data.currentSubCategory
      });
      wx.hideLoading();
    });
    util.request(api.GoodsCount).then(function(res) {
      that.setData({
        goodsCount: res.data.goodsCount
      });
    });

  },
  getCurrentCategory: function(id) {
    let that = this;
    util.request(api.CatalogCurrent, {
        id: id
      })
      .then(function(res) {
        that.setData({
          currentCategory: res.data.currentCategory,
          currentSubCategoryList: res.data.currentSubCategory
        });
      });
  },
  onReady: function() {
    // 页面渲染完成
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
  switchCate: function(event) {
    var that = this;
    var currentTarget = event.currentTarget;
    if (this.data.currentCategory.id == event.currentTarget.dataset.id) {
      return false;
    }

    this.getCurrentCategory(event.currentTarget.dataset.id);
  }
})