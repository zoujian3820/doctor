import Vue from 'vue'
import vPage from '~/common/v-page'

const plugin = {
  install(Vue) {
    Vue.component(vPage.name, vPage)
  }
}

Vue.use(plugin)
