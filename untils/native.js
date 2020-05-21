import TYPE from '~/store/mutation-types'
import getData from '~/api/global'

let vue = {}
let operating = false
let configuring = false
let successWXConfigList = []
let isWX = !process.server ? setWxCheckVal() : false

function setWxCheckVal() {
  isWX = /MicroMessenger/i.test(window.navigator.userAgent)
}

function handlerMiniProgram(fn1, fn2) {
  if (isWX) {
    const wxObj = vue.$wechat.miniProgram
    wxObj.getEnv(function(res) {
      if (res.miniprogram) {
        // 小程序相关处理
        typeof fn1 === 'function' && fn1(wxObj)
      } else {
        typeof fn2 === 'function' && fn2()
      }
    })
  } else {
    typeof fn2 === 'function' && fn2()
  }
}

// 是否开启微信调试模式
const wxDebug = false

/**
 * 切换处理状态
 * @param toggle {boolean}
 */
function toggleOperating(toggle) {
  if (operating !== toggle) {
    operating = toggle
  }
}

/**
 * 重写参数中的回调函数
 * @param params
 * @returns {*} 重写后的参数
 */
function remakeCallback(params, method) {
  if (params.success) {
    const successFun = params.success
    params.success = function(res) {
      toggleOperating(false)
      if (method === 'chooseWXPay') {
        if (res.errMsg === 'chooseWXPay:ok') {
          successFun(res)
        }
      } else {
        successFun(res)
      }
    }
  }
  if (params.cancel) {
    const cancel = params.cancel
    params.cancel = function(res) {
      toggleOperating(false)
      cancel(res)
    }
  }
  if (params.fail) {
    const failFun = params.fail
    params.fail = function(res) {
      toggleOperating(false)
      failFun(res)
    }
  }
  if (params.complete) {
    const completeFun = params.complete
    params.complete = function(res) {
      toggleOperating(false)
      completeFun(res)
    }
  }
  return params
}

/**
 * 内部通用弹窗
 * @param content 内容
 */
// function alert(content) {
//   window.alert(content)
// }

/**
 * 所有下列功能的统一处理（主要针对微信相同部分进行处理）
 * @param params
 * @param method
 */
function commonDeal({ params, method }) {
  if (isWX) {
    if (successWXConfigList.includes(method)) {
      toggleOperating(true)
      params = remakeCallback(params, method)
      vue.$wechat[method](params)
    } else if (configuring) {
      const taskId = setInterval(() => {
        if (!configuring) {
          clearInterval(taskId)
          commonDeal({ params, method })
        }
      }, 200)
      // alert('微信功能正在配置中，请稍候')
    } else {
      console.warn('该微信功能未配置或发生错误，请刷新重试！')
    }
    // eslint-disable-next-line no-prototype-builtins
  } else if (nativeMethods.hasOwnProperty(method)) {
    nativeMethods[method](params)
  } else {
    console.warn('该功能暂未提供，请登录微信公众号获取更多功能！')
  }
}

// 非微信时本地实现的可调用的功能
const nativeMethods = {}

export default {
  self: this,
  // 设置是否是微信浏览器
  setWxCheckVal,
  // 组合服务器地址(用到的地方包括：api调用、资源文件地址)
  comboBaseURL(
    url,
    domain = window.location.protocol + '//' + window.location.host + '/'
  ) {
    if (!url) return
    return url.includes('wxLocalResource://') ||
      url.includes('file://') ||
      url.includes('http://') ||
      url.includes('https://')
      ? url
      : domain + url.replace(/^\//, '')
  },
  /**
   * 清理微信已经配置的列表
   */
  clearWXConfigList() {
    successWXConfigList = []
  },
  /**
   * 返回是否微信浏览器
   * @returns {boolean}
   */
  isWxBroswer() {
    return isWX
  },
  /**
   * 设置vue对象
   * @param _vue
   */
  setVue(_vue) {
    vue = _vue
  },
  /**
   * 设置当前页面需求的微信API
   * @param apis 微信API String/Array 如:'previewImage' 或 ['chooseImage', 'previewImage', 'uploadImage']
   */
  setWXApiList(apis) {
    // 仅在微信浏览器时才执行操作setWXApiList
    !isWX && setWxCheckVal()
    isWX && vue.$store.commit(TYPE.SET_WX_API_LIST, apis)
  },
  /**
   * 请求微信接口调用权限
   * @param applyApis
   */
  async configWX(applyApis) {
    configuring = true
    const isIos = /iP(hone|od|ad)/gi.test(navigator.userAgent.toLowerCase())
    const signUrl = isIos
      ? window.sessionStorage.getItem('firstHref')
      : window.location.href
    const res = await getData.wx_config(vue, {
      params: {
        apiList: applyApis,
        url: signUrl
      }
    })

    // 设置wxsdk debug模式
    res.debug = wxDebug
    vue.$wechat.ready(function() {
      configuring = false
      successWXConfigList = successWXConfigList.concat(applyApis)
    })
    vue.$wechat.error(function() {
      configuring = false
    })
    vue.$wechat.config(res)
  },
  // 选择图片
  chooseImage(params) {
    commonDeal({
      params,
      method: 'chooseImage'
    })
  },
  // 预览图片
  previewImage(params) {
    params.current = this.comboBaseURL(params.current)
    params.urls = params.urls.map((url) => {
      return this.comboBaseURL(url)
    })
    commonDeal({
      params,
      method: 'previewImage'
    })
  },
  // 上传图片
  uploadImage(params) {
    commonDeal({
      params,
      method: 'uploadImage'
    })
  },
  // 分享到朋友圈
  onMenuShareTimeline(params) {
    commonDeal({
      params,
      method: 'onMenuShareTimeline'
    })
  },
  // 分享给朋友
  onMenuShareAppMessage(params) {
    commonDeal({
      params,
      method: 'onMenuShareAppMessage'
    })
  },
  // 分享给朋友（新）
  updateAppMessageShareData(params) {
    commonDeal({
      params,
      method: 'updateAppMessageShareData'
    })
  },
  // 分享
  onShare(params) {
    commonDeal({
      params,
      method: 'onMenuShareTimeline'
    })
    commonDeal({
      params,
      method: 'onMenuShareAppMessage'
    })
  },
  pay(params) {
    handlerMiniProgram(
      (wxObj) => {
        if (params.token) {
          const token = encodeURIComponent(params.token)
          const api = encodeURIComponent(params.api)
          params.params || (params.params = {})
          params.params.mini = 1 // 增加小程序标识
          const _params = encodeURIComponent(JSON.stringify(params.params))
          const callback = encodeURIComponent(location.href)
          wxObj.navigateTo({
            url: `/pages/wxPay/main?token=${token}&api=${api}&params=${_params}&callback=${callback}&method=${params.reqMethod}&actualPrice=${params.actualPrice}`
          }) // 带参跳转到小程序内部页面
        }
      },
      () => {
        params.timestamp = params.timeStamp
        delete params.timeStamp
        delete params.reqMethod
        delete params.actualPrice
        commonDeal({
          params,
          method: 'chooseWXPay'
        })
      }
    )

    /***
     * 旧版支付方法，不需引入jsdk，不需wx.config，新版用chooseWXPay
     * *
     WeixinJSBridge.invoke('getBrandWCPayRequest', {
        'appId': params['appId'], //公众号名称,由商户传入
        'timeStamp': params['timeStamp'], //时间戳,自 1970 年以来的秒数
        'nonceStr': params['nonceStr'], //随机串
        'package': params['package'],
        'signType': 'MD5', //微信签名方式:
        'paySign': params['paySign'] //微信签名
        }, (res) => {
          if (typeof params.success !== 'function') {
            params.success = () => {
              // 您已支付完成，我们将尽快确认 history.back()
            }
          }
          if (typeof params.error !== 'function') {
            // 支付失败，错误信息 history.back()
          }
          let callback
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            callback = params.success
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            callback = params.cancel
          } else {
            callback = params.error
          }

          setTimeout(() => {
            typeof callback === 'function' && callback()
          }, 0)
          setTimeout(() => {
            params.complete && typeof params.complete === 'function' && params.complete()
          }, 0)
        },
     (e) => {})
     ****/
  },
  closeWebView() {
    const handler = () => {
      // let timer = null
      let isNotClose = true
      !isWX && setWxCheckVal()
      isWX &&
        vue.$wechat.closeWindow({
          success(res) {
            if (res.errMsg === 'closeWindow:ok') {
              isNotClose = false
            }
          }
        })
      if (isNotClose) {
        // timer =
        setTimeout(() => {
          handler()
        }, 100)
      }
    }
    handler()
    // isWX && WeixinJSBridge.call('closeWindow') //不支持了
  }
}
