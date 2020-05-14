import Vue from 'vue'

const mtah5 = require('mta-h5-analysis')
const plugin = {
  install(vue) {
    vue.prototype.$mat = mtah5
  }
}

Vue.use(plugin)
