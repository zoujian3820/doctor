<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
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
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
