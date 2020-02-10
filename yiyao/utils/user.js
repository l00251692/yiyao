/**
 * 用户相关服务
 */
const util = require('../utils/util.js');
const api = require('../utils/api.js');


/**
 * Promise封装wx.checkSession
 */
function checkSession() {
  return new Promise(function(resolve, reject) {
    wx.checkSession({
      success: function() {
        resolve(true);
      },
      fail: function() {
        reject(false);
      }
    })
  });
}

/**
 * Promise封装wx.login
 */
function login() {
  return new Promise(function(resolve, reject) {
    wx.login({
      success: function(res) {
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}

/**
 * 调用微信登录
 */
function loginByWeixin(userInfo) {
  console.log("loginByWeixin:" + JSON.stringify(userInfo) )
  //tmp save
  wx.setStorageSync('userInfo', userInfo);
  //wx.setStorageSync('token', "tmptoken");

  return new Promise(function(resolve, reject) {
    return login().then((res) => {
      //登录远程服务器
      wx.getUserInfo({
        success: function (userRes) {
          util.request('user/toLoginWx', {
            code: res.code,
            encryptedData: userRes.encryptedData,
            iv: userRes.iv
          }, 'POST').then(res => {
            if (res.errno === 0) {
              //存储用户信息
              wx.setStorageSync('userInfo', res.data.userInfo);
              wx.setStorageSync('token', res.data.token);

              resolve(res);
            } else {
              reject(res);
            }
          }).catch((err) => {
            reject(err);
          });
        },
        fail(res){
          console.log("wx.getUserInfo fail")
        }
      })
      
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function(resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      reject(false);
    }
  });
}

module.exports = {
  loginByWeixin,
  checkLogin,
};