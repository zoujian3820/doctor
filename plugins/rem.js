// 直接import会导致在server端跑dom节点报错
if (process.client) {
  require('lib-flexible/flexible')
}
