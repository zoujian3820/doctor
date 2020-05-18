import Vue from 'vue'
import bScroll from '~/components/v-scroll'

const plugin = {
  install(Vue) {
    Vue.component(bScroll.name, bScroll)
  }
}

Vue.use(plugin)
