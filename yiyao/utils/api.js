import {
  fetch, coordFormat,
  alert, confirm,
} from './util'


// 短信验证码
export function getCode(options) {
  const {
    phone, success, error
  } = options

  fetch({
    url: "user/getCheckCode",
    data: {
      phone,
      key: 'fast_login'
    },
    success, error
  })
}

export function getShareQr(options) {
  var { project_id, success } = options

  fetch({
    url: 'project/getShareQrWx',
    data: {
      project_id
    },
    success
  })

}

export function getTuiguangQr(options) {
  var { project_id, success } = options
  var { user_id } = wx.getStorageSync("userInfo")

  fetch({
    url: 'project/getTuiguangQrWx',
    data: {
      project_id,
      user_id
    },
    success
  })

}

// 登录
export function bindPhone(options) {
  const {
    ency, iv, session_key,
    success, error
  } = options

  var { user_id } = wx.getStorageSync("userInfo")
  
  fetch({
    url: "user/bindPhoneWx",
    data: {
      ency,
      iv,
      session_key,
      user_id
    },
    success, error
  })

}
/*
// 退出账号
export function logout(options) {
  const {
    phone,
    success, error
  } = options
  fetch({
    url: 'index.php?m=Api&c=WeixinMall&a=logout',
    data: {
      phone
    },
    success, error
  })
}
*/

// 获取登录信息
export function getLoginInfo(options) {
  const {
    success, error, fail
  } = options

  //调用登录接口
  wx.login({
    success(res) {
      wx.getUserInfo({
        success: function (userRes) {
          fetch({
            url: 'user/toLoginWx',
            data: {
              wx_code: res.code,
              encryptedData: userRes.encryptedData,
              iv: userRes.iv
            },
            success,
            error
          })
        },
        fail
      })
    },
    error(res) {
      alert(res['errMsg'])
      error && error(res['errMsg'])
    }

  })
}

export function getMineInfo(options) {
  const {
    success
  } = options

  var { user_id } = wx.getStorageSync("userInfo")

  fetch({
    url: 'user/getMineInfoWx',
    data: {
      user_id,
    },
    success
  })
}



 //添加准订单
export function addOrder(options) {
  const {
    name, idcard, sex, hospital, hospitalArea, department, bedNo, mrNo, doctor, diseases, date, phone, concatName, concatPhone, addresstr, adDetail,
    success, error
  } = options

  var { user_id } = wx.getStorageSync("userInfo")

  fetch({
    url: 'order/addOrderWx',
    data: {
      name, idcard, sex, hospital, hospitalArea, department, bedNo, mrNo, doctor, diseases, date, phone, concatName, concatPhone, addresstr, adDetail,
      user_id
    },
    success, error
  })
}

export function uploadOrderIdCard(options) {
  const {
    front_img, back_img, summary_img, sign_img, order_id,
    success, error
  } = options

  var { user_id } = wx.getStorageSync("userInfo")

  fetch({
    url: 'order/uploadOrderIdCardWx',
    data: {
      front_img, back_img, summary_img, sign_img, order_id, 
      user_id
    },
    success, error
  })
}

export function updateOrderIdCard(options) {
  const {
    front_img, back_img, order_id,
    success, error
  } = options

  var { user_id } = wx.getStorageSync("userInfo")

  fetch({
    url: 'order/updateOrderIdCardWx',
    data: {
      front_img, back_img, order_id,
      user_id
    },
    success, error
  })
}

// 获取订单信息
export function getOrderInfo(options) {
  var {
    order_id,
    success, error
  } = options

  var { user_id } = wx.getStorageSync("userInfo")

  fetch({
    url: 'order/getOrderInfoWx',
    data: {
      user_id,
      order_id
    },
    success, error
  })
}

// 取消订单
export function cancelOrder(options) {
  var {
    order_id,
    success, error
  } = options
  
  var { user_id } = wx.getStorageSync("userInfo")

  fetch({
    url: 'order/cancelOrderWx',
    data: {
      user_id,
      order_id
    },
    success, error
  })
}

// 获取订单列表
export function getMineOrders(options) {
  var {
    page,
    success, error
  } = options

  var { user_id } = wx.getStorageSync("userInfo")
  
  fetch({
    url: 'order/getMineOrdersWx',
    data: {
      user_id,
      page
    },
    success, error
  })

}

export function updateProjectImg(options) {
  var { project_id, head_img, success, error } = options

  fetch({
    url: 'project/updateProjectImgWx',
    data: {
      project_id,
      head_img
    },
    success,
    error
  })
}

export function updateProjectInfoImg(options) {
  var { project_id, info_img_url } = options

  fetch({
    url: 'project/updateProjectInfoImgWx',
    data: {
      project_id,
      info_img_url
    },
  })
}

export function updateProjectInfoSpecImg(options) {
  var { project_id, info_img_urls } = options

  fetch({
    url: 'project/updateProjectInfoSpecImgWx',
    data: {
      project_id,
      info_img_urls
    },
  })
}

export function updateProjectInfoOperImg(options) {
  var { project_id, info_img_urls } = options

  fetch({
    url: 'project/updateProjectInfoOperImgWx',
    data: {
      project_id,
      info_img_urls
    },
  })
}

export function updateProjectInfoVideo(options) {
  var { project_id, info_video_url } = options

  fetch({
    url: 'project/updateProjectInfoVideoWx',
    data: {
      project_id,
      info_video_url
    },
  })
}

export function getQiniuToken(options) {

  var { success, error } = options

  fetch({
    url: 'project/getQiniuTokenWx',
    data: {
    },
    success,
    error
  })
}

// 获取支付参数
export function getPayment(options) {
  var {
    order_id,
    pay_money,
    success, error
  } = options

  var { user_id } = wx.getStorageSync("userInfo")

  fetch({
    url: 'pay/getPaymentWx',
    data: {
      order_id,
      user_id,
      pay_money
    },
    success, error
  })

}

export function updateOrderPayed(options) {
  var {
    order_id,
    success, error
  } = options

  var { user_id } = wx.getStorageSync("userInfo")
  fetch({
    url: 'order/updateOrderPayedWx',
    data: {
      user_id,
      order_id
    },
    success, error
  })
}

export function paySuccess(options) {
  var {
    order_id, prepay_id, success
  } = options
  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'pay/setPaySuccessWx',
    data: {
      order_id,
      user_id,
      prepay_id
    },
    success
  })
}

//获取发布的项目列表
export function createProject(options) {
  var {
    type, title, start_date, end_date, rule, salary, contact, region, count, link, detail, success, error
  } = options
  console.log(JSON.stringify(getApp().globalData.loginInfo))
  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'project/createProjectWx',
    data: {
      user_id,
      type,
      title,
      start_date,
      end_date,
      rule,
      salary,
      contact,
      region,
      count,
      link,
      detail
    },
    success,
    error
  })

}

export function getMyProjectList(options) {
  var {
    page, type, success,error
  } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'project/getMyProjectListWx',
    data: {
      user_id,
      type,
      page
    },
    success,
    error
  })

}

//获取发布的项目列表
export function getProjectList(options) {
  var {
    page, success, error
  } = options

  fetch({
    url: 'project/getProjectListWx',
    data: {
      page
    },
    success,
    error
  })

}
//获得项目详情
export function getProjectInfo(options) {
  var {
    project_id, success, error
  } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'project/getProjectInfoWx',
    data: {
      user_id,
      project_id,
    },
    success,
    error
  })

}

export function setProjectFollowStatus(options) {
  var { status, project_id, success } = options
  
  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'user/setProjectFollowStatusWx',
    data: {
      status,
      project_id,
      user_id
    },
    success
  })
  

}

export function getFollowers(options) {
  var { project_id, start_date, end_date, page,  success, error } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'project/getFollowersWx',
    data: {
      project_id,
      start_date,
      end_date,
      page,
      user_id
    },
    success,
    error
  })


}


export function deleteProject(options) {
  var { project_id, success } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'project/deleteProjectWx',
    data: {
      project_id,
      user_id
    },
    success
  })


}

export function uploadCollectData(options) {
  var { project_id, name, phone, content, latitude,
    longitude, address, detail,success } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'project/uploadCollectWx',
    data: {
      project_id,
      user_id,
      name,
      phone,
      latitude,
      longitude,
      address,
      detail,
      content
    },
    success
  })
}

export function uploadCollectFile(options) {
  var { collect_id, file, success, error } = options

  fetch({
    url: 'project/uploadCollectFileWx',
    data: {
      collect_id,
      file
    },
    success,
    error
  })
}

export function updateLocation(options) {
  var { longitude, latitude, province, city, district, name, success, error } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'user/updateLocationWx',
    data: {
      user_id,
      longitude,
      latitude,
      province,
      city,
      district,
      name
    },
    success,
    error
  })
}


export function bindUserFromInfo(options) {
  var { from_user_id, project_id, success, error } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'user/bindUserFromInfoWx',
    data: {
      user_id,
      from_user_id,
      project_id
    },
    success,
    error
  })
}

export function getRegisterInfo(options) {
  var { user_id, success, error } = options

  if (user_id == null || user_id == '' || user_id.length == 0)
  {
    user_id = wx.getStorageSync("userInfo").user_id
  }
  
  fetch({
    url: 'user/getRegisterInfoWx',
    data: {
      user_id,
    },
    success,
    error
  })
}

export function getCollects(options) {
  var { page, success, error } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'project/getCollectsWx',
    data: {
      user_id,
      page,
    },
    success,
    error
  })
}

export function getTaskCollectSummary(options) {
  var { project_id, success, error } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'project/getTaskCollectSummaryWx',
    data: {
      project_id
    },
    success,
    error
  })
}

export function selectCollectsByuserId(options) {
  var { project_id, user_id, page, success, error } = options

  fetch({
    url: 'project/selectCollectsByuserIdWx',
    data: {
      project_id,
      user_id,
      page,
    },
    success,
    error
  })
}

export function getTaskCollects(options) {
  var { project_id,type, page, success, error } = options

  fetch({
    url: 'project/getTaskCollectsWx',
    data: {
      project_id,
      type,
      page,
    },
    success,
    error
  })
}

export function getCollectInfo(options) {
  var { collect_id, success, error } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'project/getCollectInfoWx',
    data: {
      user_id,
      collect_id,
    },
    success,
    error
  })
}

export function cancelCollect(options) {
  var { collect_id, success, error } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'project/cancelCollectWx',
    data: {
      user_id,
      collect_id,
    },
    success,
    error
  })
}

export function passCollect(options) {
  var { collect_id, success, error } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'project/passCollectWx',
    data: {
      user_id,
      collect_id,
    },
    success,
    error
  })
}

export function rejectCollect(options) {
  var { collect_id, reason, success, error } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'project/rejectCollectWx',
    data: {
      user_id,
      collect_id,
      reason
    },
    success,
    error
  })
}


export function getWithDraw(options) {
  var { success, error } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'user/getWithDrawWx',
    data: {
      user_id
    },
    success,
    error
  })
}

export function applyWithDraw(options) {
  var { balance, account, success, error } = options

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'user/applyWithDrawWx',
    data: {
      user_id,
      balance,
      account
    },
    success,
    error
  })
}


export function postFeedback(options) {
  var { phone, feedType, content, success, error } = options
  console.log("postFeedback:" + content)

  var { user_id, user_token } = wx.getStorageSync("userInfo")
  fetch({
    url: 'user/postFeedbackWx',
    data: {
      user_id,
      phone,
      feedType,
      content
    },
    success,
    error
  })
}

export function getImgDetailInfo(options) {
  var { collect_id, img_url, success, error } = options

  fetch({
    url: 'project/getImgDetailInfoWx',
    data: {
      collect_id,
      img_url
    },
    success,
    error
  })
}
