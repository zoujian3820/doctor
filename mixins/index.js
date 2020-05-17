/**
 *  全局的混入，页面局部的另起文件
 * */
export default {
  install(Vue) {
    Vue.mixin({
      computed: {},
      created() {
        if (process.client) {
          this.$mat.init({
            sid: '500411881', // 必填，统计用的appid
            cid: '500432840', // 如果开启自定义事件，此项目为必填，否则不填
            autoReport: 0, // 是否开启自动上报(1:init完成则上报一次,0:使用pgv方法才上报)
            senseHash: 0, // hash锚点是否进入url统计
            senseQuery: 0, // url参数是否进入url统计
            performanceMonitor: 0, // 是否开启性能监控
            ignoreParams: [] // 开启url参数上报时，可忽略部分参数拼接上报
          })
          this.$mat.pgv()
        }
      },
      methods: {
        navigateTo({ path, query = {}, native = false }) {
          if (!path) return
          if (native) {
            window.location.href = path
          } else {
            this.$router.push({ path, query })
          }
        },
        navigateBack(num = -1) {
          // num: 0 刷新当前页 正数前进 负数回退
          this.$router.go(num)
        },
        navigateRepl({ path, query = {}, native = false }) {
          if (!path) return
          if (native) {
            document.location.replace(path)
          } else {
            this.$router.replace({ path, query })
          }
        }
      }
    })
  }
}
