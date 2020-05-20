import Vue from 'vue'
import {
  Dialog,
  Loading,
  Notify,
  Overlay,
  Toast,
  ImagePreview,
  Lazyload,
  Skeleton
} from 'vant'
import Mixins from '~/mixins'
import filters from '~/filters'
import fetch from '~/fetch'

Vue.use(Loading)
Vue.use(Notify)
Vue.use(Overlay)
Vue.use(Toast)
Vue.use(Skeleton)

/**
 * @options
 * loading  加载时的图片  string
 * error  错误时的图片 string
 * preload  预加载高度的比例
 * lazyComponent  是否能懒加载模块
 * filter  图片 URL 过滤

 * @use
 * v-lazy: 将v-lazy指令的值设置为你需要懒加载的图片
 * */
Vue.use(Lazyload, {
  lazyComponent: true
})

Vue.prototype.$alert = ({ ...params }) => {
  return Dialog.alert(params)
}

Vue.prototype.$confirm = ({ ...params }) => {
  return Dialog.alert(params)
}

Vue.prototype.$loading = (message = '加载中...') => {
  return Toast.loading({
    message,
    forbidClick: true
  })
}

/**
 * @params
 * images: [
 'https://img.yzcdn.cn/vant/apple-1.jpg'
 ],
 startPosition: 1,
 onClose() {}
 */
Vue.prototype.$imagePreview = ({ ...params }) => {
  return ImagePreview(params)
}

// 请求接口挂载
Vue.prototype.$fetch = fetch

// filters
Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]))

// 全局的混入
Vue.use(Mixins)

// if (process.client) {
//   window.onunhandledrejection = function(e) {
//     console.error(e.reason, 'no reject catch')
//   }
// }
