var util = require('../../utils/util.js');
var api = require('../../utils/api.js');

Page({
  data: {
    navList: [
      { id: 0, name: '清热降温' },
      { id: 1, name: '润喉止咳' },
      { id: 2, name: '咽喉干燥' },
      { id: 3, name: '幼儿类' }
    ],
    goodsList: [
      { id: 10001, picUrl: '/images/tmp/kuaike.png', name: '快克感冒颗粒', retailPrice: 5.99},
      { id: 10002, picUrl: '/images/tmp/banlangen.png', name: '板蓝根冲剂', retailPrice: 6.99 },
      { id: 10003, picUrl: '/images/tmp/kuaike.png', name: '马戏感冒颗粒', retailPrice: 7.99 },
      { id: 10004, picUrl: '/images/tmp/banlangen.png', name: '板蓝根冲剂', retailPrice: 8.99 },
      { id: 10005, picUrl: '/images/tmp/banlangen.png', name: '板蓝根冲剂', retailPrice: 5.99 },
    ],
    id: 0,
    currentCategory: { name: '当前名字', frontName: 'frontName'},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    size: 100
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    /*
    if (options.id) {
      that.setData({
        id: parseInt(options.id)
      });
    }
    */
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });


    //this.getCategoryInfo();
    
  },
  getCategoryInfo: function() {
    let that = this;
    util.request(api.GoodsCategory, {
        id: this.data.id
      })
      .then(function(res) {

        if (res.errno == 0) {
          that.setData({
            navList: res.data.brotherCategory,
            currentCategory: res.data.currentCategory
          });

          wx.setNavigationBarTitle({
            title: res.data.parentCategory.name
          })

          // 当id是L1分类id时，这里需要重新设置成L1分类的一个子分类的id
          if (res.data.parentCategory.id == that.data.id) {
            that.setData({
              id: res.data.currentCategory.id
            });
          }

          //nav位置
          let currentIndex = 0;
          let navListCount = that.data.navList.length;
          for (let i = 0; i < navListCount; i++) {
            currentIndex += 1;
            if (that.data.navList[i].id == that.data.id) {
              break;
            }
          }
          if (currentIndex > navListCount / 2 && navListCount > 5) {
            that.setData({
              scrollLeft: currentIndex * 60
            });
          }
          that.getGoodsList();

        } else {
          //显示错误信息
        }

      });
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
    console.log(1);
  },
  onHide: function() {
    // 页面隐藏
  },
  getGoodsList: function() {
    var that = this;

    util.request(api.GoodsList, {
        categoryId: that.data.id,
        page: that.data.page,
        size: that.data.size
      })
      .then(function(res) {
        that.setData({
          goodsList: res.data.goodsList,
        });
      });
  },
  onUnload: function() {
    // 页面关闭
  },
  switchCate: function(event) {
    if (this.data.id == event.currentTarget.dataset.id) {
      return false;
    }
    var that = this;
    var clientX = event.detail.x;
    var currentTarget = event.currentTarget;
    if (clientX < 60) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft - 60
      });
    } else if (clientX > 330) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft
      });
    }
    this.setData({
      id: event.currentTarget.dataset.id
    });

    this.getCategoryInfo();
  }
})