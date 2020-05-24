import native from '~/untils/native'

export default ({ app, store }) => {
  app.router.afterEach(() => {
    // 微信浏览器时
    if (native.getBroswerEnv()) {
      if (store) {
        // 进入每个路由之前，清空WxApis
        // store.commit('updateWxApis')
        native.setWxConfigList()
        native.clearWxConfigList()
      }
    }
  })
}
