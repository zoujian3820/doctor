import { isObject } from '../unitils'

export const CODE302 = 302
export const CODE401 = 401
export const CODE403 = 403

export default (app) => {
  const axios = app.$axios
  const toast = app.$toast
  const route = app.$route
  const navigateTo = app.navigateTo
  const navigateRepl = app.navigateRepl
  const query = axios.query || (route && route.query) || ''
  const { miniToken } = query

  // axios.defaults.baseURL = ''

  // 用于小程序给微信公众号登录token
  miniToken && axios.setHeader('Minitoken', miniToken)

  axios.setHeader('X-Requested-With', 'XMLHttpRequest')
  axios.setHeader('Content-Type', 'application/json;charset=UTF-8')

  // 注册状态回调
  axios.onRequest((config) => {
    const code = route && route.query && route.query.code
    if (code) {
      if (config.method === 'get') {
        if (!config.params) {
          config.params = {}
        }
        config.params.code = code
      } else {
        if (!config.data) {
          config.data = {}
        }
        config.data.code = code
      }
    }
    return config
  })

  axios.interceptors.request.use(
    (config) => {
      switch (config.method) {
        case 'post':
          isObject(config.data) &&
            (config.data = {
              ...config.data,
              timestamp: +new Date()
            })
          break
        case 'get':
          config.params = {
            ...config.params,
            timestamp: +new Date()
          }
          break
      }
      return config
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )
  // 拦截响应
  axios.interceptors.response.use((response) => {
    const { data } = response
    if (data && data.success === false) {
      // 不带特殊异常码时，直接toast到页面
      if (!data.code) {
        data.msg && toast(data.msg)
      } else {
        console.error(data.msg)
      }
    }
    return response.data
  })

  axios.onError((error) => {
    const code = Number(error.response && error.response.status)

    const redirectUrl =
      error.response &&
      error.response.headers &&
      error.response.headers.redirect_url

    switch (code) {
      case CODE302:
        navigateRepl({ path: redirectUrl, native: true })
        break
      case CODE401:
      case CODE403:
        navigateTo({ path: '/login', native: true })
        break
      default:
        code && toast(`服务器异常: ${code}`)
        break
    }
  })

  axios.onRequestError((error) => {
    console.error('onRequestError...', error)
  })

  axios.onResponseError((error) => {
    console.error('onResponseError...', error)
  })

  return axios
}
