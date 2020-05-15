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
import filters from '~/filters'

Vue.use(Loading)
Vue.use(Notify)
Vue.use(Overlay)
Vue.use(Toast)
Vue.use(Skeleton)
/**
 * @options
 * loading	加载时的图片	string
 * error	错误时的图片 string
 * preload	预加载高度的比例
 * lazyComponent	是否能懒加载模块
 * filter	图片 URL 过滤

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

// filters
Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]))

Vue.mixin({
  computed: {},
  methods: {}
})
