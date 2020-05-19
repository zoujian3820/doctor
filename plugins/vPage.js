import Vue from 'vue'
import vPage from '~/components/v-page'

const plugin = {
  install(Vue) {
    Vue.component(vPage.name, vPage)
  }
}

Vue.use(plugin)
