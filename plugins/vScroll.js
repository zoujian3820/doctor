import Vue from 'vue'
import bScroll from '~/common/v-scroll'

const plugin = {
  install(Vue) {
    Vue.component(bScroll.name, bScroll)
  }
}

Vue.use(plugin)
