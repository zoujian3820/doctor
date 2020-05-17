/* eslint-disable import/no-mutable-exports */
let api = Object.create(null)
const apiContext = require.context('./', true, /index\.js$/)

apiContext.keys().map((route) => {
  if (!route.startsWith('./index')) {
    const apiModule = apiContext(route)
    api = { ...api, ...(apiModule.default || apiModule) }
  }
})

export default api
