const environment = process.env
const NODE_ENV = environment.NODE_ENV
const PORT = 3000
const HOST = 'localhost'

const apisMap = {
  dev: {
    proxy: 'http://localhost:6484',
    baseURL: `http://${HOST}:${PORT}`
  },
  development: {
    baseURL: 'https://wxdev.kuaiwen.cn'
  },
  testelopment: {
    proxy: 'http://localhost:8888',
    baseURL: 'https://wxtest.kuaiwen.cn'
  },
  production: {
    baseURL: 'https://wx.kw13.cn'
  }
}

// export default { ...apisMap[NODE_ENV], env: NODE_ENV }
module.exports = { ...apisMap[NODE_ENV], env: NODE_ENV, port: PORT, host: HOST }
