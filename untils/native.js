import storage from 'good-storage'
import timeout from '~/untils/timeout'
import { uaParser } from '~/transformers/ua'

let App = {}
let operating = false
let configuring = false
// ready好的api列表
let wxConfigList = []
// 是否开启微信调试模式
const wxDebug = false
// 非微信时本地实现的可调用的功能
const nativeMethods = {}

export default {
  // 是否是微信浏览器
  updateBroswerEnv() {
    return uaParser(navigator.userAgent).isWechat
    // return /MicroMessenger/i.test(window.navigator.userAgent)
  },
  /**
   * 所有下列功能的统一处理（主要针对微信相同部分进行处理）
   * @param params
   * @param method
   */
  commonDeal({ params, method }) {
    if (this.updateBroswerEnv()) {
      if (wxConfigList.includes(method)) {
        this.toggleOperating(true)
        params = this.remakeCallback(params, method)
        App.$wechat[method](params)
      } else if (configuring) {
        const interval = timeout.setInterval.set(() => {
          if (!configuring) {
            timeout.setInterval.remove(interval)
            this.commonDeal({ params, method })
          }
        }, 200)
      } else {
        console.warn('该微信功能未配置或发生错误，请刷新重试！')
      }
      // eslint-disable-next-line no-prototype-builtins
    } else if (nativeMethods.hasOwnProperty(method)) {
      nativeMethods[method](params)
    } else {
      console.warn('该功能暂未提供，请登录微信公众号获取更多功能！')
    }
  },
  /**
   * 重写参数中的回调函数
   * @param params
   * @returns {*} 重写后的参数
   */
  remakeCallback(params, method) {
    if (params.success) {
      const successFun = params.success
      params.success = (res) => {
        this.toggleOperating(false)
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
      params.cancel = (res) => {
        this.toggleOperating(false)
        cancel(res)
      }
    }
    if (params.fail) {
      const failFun = params.fail
      params.fail = (res) => {
        this.toggleOperating(false)
        failFun(res)
      }
    }
    if (params.complete) {
      const completeFun = params.complete
      params.complete = (res) => {
        this.toggleOperating(false)
        completeFun(res)
      }
    }
    return params
  },
  /**
   * 切换处理状态
   * @param toggle {boolean}
   */
  toggleOperating(toggle) {
    if (operating !== toggle) {
      operating = toggle
    }
  },
  handleMiniProgram(programCb, browserCb) {
    if (this.updateBroswerEnv()) {
      const miniProgram = App.$wechat.miniProgram
      miniProgram.getEnv((res) => {
        if (res.miniprogram) {
          // 小程序相关处理
          typeof programCb === 'function' && programCb(miniProgram)
        } else {
          typeof browserCb === 'function' && browserCb()
        }
      })
    } else {
      typeof browserCb === 'function' && browserCb()
    }
  },
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
  clearWxConfigList() {
    wxConfigList = []
  },
  /**
   * 返回是否微信浏览器
   * @returns {boolean}
   */
  getBroswerEnv() {
    return this.updateBroswerEnv()
  },
  /**
   * 设置vue实例对象
   * @param: App
   */
  setVue(vm) {
    App = vm
  },
  /**
   * 设置当前页面需求的微信API
   * @param: apis
   * @desc: 微信API String/Array 'previewImage' || ['previewImage']
   */
  setWxConfigList(apis) {
    // 仅在微信浏览器时才执行操作setWxConfigList
    this.updateBroswerEnv() && App.$store.commit('updateWxApis', apis)
  },
  /**
   * 请求微信接口调用权限
   * @param: Apis
   */
  async configWx(applyApis) {
    configuring = true
    const res = await App.$fetch.wxConfig(App, {
      apiList: applyApis,
      url: storage.session.get('firstHref', window.location.href)
    })

    // 设置wxsdk debug模式
    res.debug = wxDebug
    App.$wechat.ready(() => {
      configuring = false
      wxConfigList = wxConfigList.concat(applyApis)
    })
    App.$wechat.error(() => {
      configuring = false
    })
    App.$wechat.config(res)
  },
  // 选择图片
  chooseImage(params) {
    this.commonDeal({
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
    this.commonDeal({
      params,
      method: 'previewImage'
    })
  },
  // 上传图片
  uploadImage(params) {
    this.commonDeal({
      params,
      method: 'uploadImage'
    })
  },
  // 分享到朋友圈
  onMenuShareTimeline(params) {
    this.commonDeal({
      params,
      method: 'onMenuShareTimeline'
    })
  },
  // 分享给朋友
  onMenuShareAppMessage(params) {
    this.commonDeal({
      params,
      method: 'onMenuShareAppMessage'
    })
  },
  // 分享给朋友（新）
  updateAppMessageShareData(params) {
    this.commonDeal({
      params,
      method: 'updateAppMessageShareData'
    })
  },
  // 分享
  onShare(params) {
    this.commonDeal({
      params,
      method: 'onMenuShareTimeline'
    })
    this.commonDeal({
      params,
      method: 'onMenuShareAppMessage'
    })
  },
  pay(params) {
    this.handleMiniProgram(
      (miniProgram) => {
        if (params.token) {
          const token = encodeURIComponent(params.token)
          const api = encodeURIComponent(params.api)
          params.params || (params.params = {})
          params.params.mini = 1 // 增加小程序标识
          const _params = encodeURIComponent(JSON.stringify(params.params))
          const callback = encodeURIComponent(location.href)
          miniProgram.navigateTo({
            url: `/pages/wxPay/main?token=${token}&api=${api}&params=${_params}&callback=${callback}&method=${params.reqMethod}&actualPrice=${params.actualPrice}`
          }) // 带参跳转到小程序内部页面
        }
      },
      () => {
        delete params.timeStamp
        delete params.reqMethod
        delete params.actualPrice
        this.commonDeal({
          params,
          method: 'chooseWXPay'
        })
      }
    )
  },
  closeWebView() {
    const handle = () => {
      let closed = false
      this.updateBroswerEnv() &&
        App.$wechat.closeWindow({
          success(res) {
            if (res.errMsg === 'closeWindow:ok') {
              closed = true
            }
          }
        })
      if (!closed) {
        timeout.setTimeout.set(() => {
          handle()
        }, 100)
      }
    }
    handle()
  }
}
