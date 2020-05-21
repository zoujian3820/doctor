<template>
  <div id="app">
    <nuxt />
  </div>
</template>
<script>
import storage from 'good-storage'
import native from '~/untils/native'
import { uaParser } from '~/transformers/ua'

export default {
  computed: {
    wxApis() {
      return this.$store.state.wxApis
    }
  },
  watch: {
    // 检测微信api列表，如果有新申请的API，则发起申请并配置
    wxApis(newApis, oldApis) {
      const Apis = []
      for (const api of newApis) {
        if (!oldApis.includes(api)) {
          Apis.push(api)
        }
      }
      if (Apis.length > 0) {
        native.configWx(Apis)
      }
    }
  },
  created() {
    native.setVue(this)
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
  mounted() {
    // 保存首次进入地址，解决ios签名失败
    const { isIOS } = uaParser(navigator.userAgent)
    if (isIOS) {
      storage.session.set('firstHref', window.location.href)
    }

    // 解决ios丢失上一级url问题
    window.history.replaceState(
      null,
      null,
      `${this.$router.options.base}${this.$route.fullPath}`.replace(
        /\/\//g,
        '/'
      )
    )
  },
  methods: {}
}
</script>
