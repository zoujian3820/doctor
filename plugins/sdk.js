import Vue from 'vue'
import { uaParser } from '~/transformers/ua'
const wx = require('weixin-js-sdk')

const { isToutiao } = uaParser(navigator.userAgent)
const plugin = {
  install(Vue) {
    Vue.prototype.$wechat = wx
  }
}

if (isToutiao) {
  // require('~/static/lib/tmajssdk.js')
  // const install = plugin.install
  // plugin.install = (Vue) => {
  //   install(Vue)
  //   Vue.prototype.$toutiao = window.toutiao
  // }
}

Vue.use(plugin)
