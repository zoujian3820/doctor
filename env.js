const environment = process.env
const NODE_ENV = environment.NODE_ENV
const PORT = 3000
const HOST = 'localhost'

const apisMap = {
  dev: {
    proxy: 'http://localhost:6484',
    baseURL: `http://${HOST}:${PORT}`,
    prefix: '/api/'
  },
  development: {
    baseURL: 'https://wxdev.kuaiwen.cn',
    prefix: '/'
  },
  testelopment: {
    baseURL: 'https://wxtest.kuaiwen.cn',
    prefix: '/'
  },
  production: {
    baseURL: 'https://wx.kw13.cn',
    prefix: '/'
  }
}

// export default { ...apisMap[NODE_ENV], env: NODE_ENV }
module.exports = { ...apisMap[NODE_ENV], env: NODE_ENV, port: PORT, host: HOST }
