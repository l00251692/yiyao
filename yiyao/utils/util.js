'use strict';
//import timeago from './timeago.min'
import dateFormat from './dateformat'
//import distance from './distance'
import QQMapWX from './qqmap-wx-jssdk.min'
import {
  gcj02tobd09
} from './coordtransform'

import { host, qqmapKey } from '../config'

const qqmap = new QQMapWX({
  key: qqmapKey
});

export function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  var len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

function resolveAdInfo(adInfo) {
  const { province,city, district, adcode } = adInfo
  return {
    province,city, district,
    district_id: adcode,
    city_id: adcode.replace(/\d{2}$/, '00')
  }
}

// 解析地址
export function reverseGeocoder(options) {
  const {
    location, success, complete
  } = options
  qqmap.reverseGeocoder({
    location,
    success: function (res) {
      var address = resolveAdInfo(res.result.ad_info)
      success && success(address)
    },
    fail: function (err) {
      console.log(err)
    },
    complete
  })
}

// 获取当前地理位置
export function getCurrentAddressList(options) {
  const {
    success, complete
  } = options
  wx.getLocation({
    type: 'gcj02',
    success(res) {
      getAddressFromLocation({
        location: {
          latitude: res.latitude,
          longitude: res.longitude,
        },
        success, complete
      })
    },
    fail(res) {
      console.log(res.errMsg)
      if (res.errMsg == 'getLocation:fail auth deny' && wx.openSetting) {
        confirm({
          content: '若不授权地理位置权限, 则无法正常使用服务, 请重新授权地理位置权限',
          cancelText: '不授权',
          confirmText: '授权',
          ok() {
            wx.openSetting({
              success(res) {
                console.log(res)
                if (res.authSetting['scope.userLocation']) {
                  getCurrentAddressList(options)
                } else {
                  alert('获取用户地址失败')
                }
              }
            })
          }
        })
      } else {
        alert('获取用户地址失败')
      }

    }
  })
}

// 地点搜索
export function searchAddressList(options) {
  const {
    keyword, success
  } = options
  getCurrentCity(function (cityName) {
    qqmap.getSuggestion({
      region: cityName,
      keyword,
      success(res) {
        success && success(res.data)
      }
    })
  })
}

// 获取当前地址
export function getCurrentAddress(callback) {
  getCurrentAddressList({
    success(addressList) {
      if (addressList.length > 0) {
        callback(addressList[0])
      }
    }
  })
}


// 获取当前城市
var cityName;
export function getCurrentCity(callback) {
  if (cityName) {
    return callback && callback(cityName)
  }
  wx.getLocation({
    type: 'gcj02',
    success(res) {
      qqmap.reverseGeocoder({
        location: {
          longitude: res.longitude,
          latitude: res.latitude
        },
        success: function (res) {
          cityName = res.result.address_component.city
          callback && callback(cityName)
        }
      })
    },
    fail(res) {
      console.log(res.errMsg)
      alert('获取用户地址失败')
    }
  })
}


// 根据坐标获取地址信息
export function getAddressFromLocation(options) {
  const { location, success } = options
  getPois({
    location,
    success(pois) {
      var addressList = []
      pois.forEach(poi => {
        var {
          title, location,
          address, ad_info
        } = poi
        addressList.push(Object.assign({
          title, location, address
        }, resolveAdInfo(ad_info)))
      })
      success && success(addressList)
    }
  })
}

// 获取兴趣点
export function getPois(options) {
  const {
    location, success, complete
  } = options
  qqmap.reverseGeocoder({
    location,
    get_poi: 1,
    success: function (res) {
      success && success(res.result.pois)
    },
    fail: function (err) {
      console.log(err)
    },
    complete
  })
}

export function getPrev2Page() {
  const pages = getCurrentPages()
  return pages[pages.length - 3]
}

export function getPrevPage() {
  const pages = getCurrentPages()
  return pages[pages.length - 2]
}
export function getCurrentPage() {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

export function fetch(options) {
  wx.request({
    url: `https://${host}/${options.url}`,
    data: Object.assign(options.data, {
      'app_v': 'tuishou'
    }),
    method: options.method || 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      const data = res.data
      if (data.State == 'Success') {
        options.success && options.success(data.data)
      } else {
        alert(data.info)
        options.error && options.error(data.info)
      }
      options.complete && options.complete()
    },
    fail:function(res){
      console.log(`https://${host}/${options.url}`)
      console.log("wx.request fail" + JSON.stringify(res) +":;;;" + JSON.stringify(options))
      options.error && options.error()
    }
  })
}

export function uploadFile(options) {
  wx.uploadFile({
    url: `http://${host}/${options.url}`,
    filePath: options.data.filePath,
    name: 'image',
    header: {
      "Content-Type": "multipart/form-data"
    },
    formData: options.data,
    success: function (res) {
      const data = JSON.parse(res.data)
      if (data.State == 'Success') {
        options.success && options.success(data.data)
      } else {
        alert(data.info)
        options.error && options.error(data.info)
      }
      options.complete && options.complete()
    }
  }) 
}

export function connectWebsocket(options) {

  wx.connectSocket({
    url: `wss://${host}/webSocketServer?x=` + options.user_id,
    data: {
      y: '',
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: "GET",
    success: function (res) {
      options.success && options.success(res)
    },
    fail: function (res) {
      options.error && options.error(res)
    },
  })
  
}

// 提示框
export function alert(content, callback) {
  wx.showModal({
    title: '提示',
    content: content,
    showCancel: false,
    success: callback
  })
}
// 确认框
export function confirm(options) {
  var {
    content, confirmText, cancelText,
    ok,
  } = options
  confirmText = confirmText || '确定'
  cancelText = cancelText || '关闭'
  wx.showModal({
    content,
    confirmText,
    cancelText,
    success(res) {
      if (res.confirm) {
        ok && ok()
      }
    }
  })
}

// 拨打电话
export function makePhoneCall(phoneNum) {
  confirm({
    content: `是否拨打电话 ${phoneNum}`,
    confirmText: '拨打',
    ok() {
      wx.makePhoneCall({
        phoneNumber: phoneNum,
      })
    }
  })
}

// 加载提示
export function showLoading() {
  wx.showToast({
    icon: 'loading',
    duration: 10000,
    title: '加载中...',
    mask: true,
  })
}
export function hideLoading() {
  wx.hideToast()
}

// 时间格式化
export function datetimeFormat(unix_timestamp) {
  return dateFormat(new Date(unix_timestamp), "yyyy-mm-dd HH:MM")
}

// 坐标格式化
export function coordFormat(location) {
  if (location.lat && location.lng) {
    location = {
      longitude: location.lng,
      latitude: location.lat
    }
  }
  // gcj02 转 bd09
  var location = gcj02tobd09(location.longitude, location.latitude)
  return {
    longitude: location[0],
    latitude: location[1]
  }
}

// 倒计时格式化
export function countdownFormat(count) {
  var seconds = count % 60
  count = Math.floor(count / 60)
  var minutes = count % 60
  return `${minutes}分钟${seconds}秒`
}

// 字符串关键字分组

export function splitByKeyword(text, keyword) {
  if (!text) {
    return []
  }
  var arr = text.split(keyword)
  var res = []
  res.push({
    text: arr[0],
    isKeyword: false
  })
  for (let i = 1, len = arr.length; i < len; i++) {
    res.push({
      text: keyword,
      isKeyword: true
    }, {
        text: arr[i],
        isKeyword: false
      })
  }
  return res
}

export function getUserInfo(cb) {
    wx.getUserInfo({
      success(res) {
          cb(res.userInfo)
      },
      fail(res) {
        console.log(res)
        if (res.errMsg == 'getUserInfo:fail auth deny' && wx.openSetting) {
          confirm({
            content: '若不授用户信息权限, 则无法正常显示用户头像和昵称, 请重新授权用户信息权限',
            cancelText: '不授权',
            confirmText: '授权',
            ok() {
              wx.openSetting({
                success(res) {
                  console.log(res)
                  if (res.authSetting['scope.userInfo']) {
                    getUserInfo(cb)
                  } else {
                    alert('获取用户信息失败')
                  }
                }
              })
            }
          })

        } else {
          alert('获取用户信息失败')
        }
      }
    })
}

// 微信支付
export function requestPayment(options) {
  var {
    data, success, error, complete
  } = options

  wx.requestPayment(Object.assign({
    'timeStamp': data.timeStamp,
    'nonceStr': data.nonceStr,
    'package': data.package,
    'signType': data.signType,
    'paySign': data.paySign,
    complete(res) {
      if (res.errMsg == 'requestPayment:ok') {
          success && success()
          complete && complete() 
      } else if (res.errMsg == 'requestPayment:fail cancel') {
        alert('取消支付', function () {
          error && error()
          complete && complete()
        })
      } else {
        alert('支付失败', function () { 
          error && error()
          complete && complete()
        })
      }
    }
  }, data))
}

export function randomString(len) {
  len = len || 32;
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

// 分享
export function share(options) {
  if (!wx.showShareMenu) {
    return alert('当前微信版本过低, 无法使用该功能, 请升级到最新微信版本后重试.')
  }

  wx.showShareMenu(options)
}