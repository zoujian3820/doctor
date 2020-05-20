<template>
  <div class="page">
    <NavBar v-if="needHeader">
      <slot name="navbar"></slot>
    </NavBar>
    <slot v-else name="navbar"></slot>
    <main class="page-main">
      <v-scroll
        ref="scroll"
        :scrollbar="scrollbar"
        :pull-down-refresh="pullDownRefresh"
        :pull-up-load="pullUpLoad"
        :start-y="parseInt(startY)"
        :click="click"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
        <slot name="content"></slot>
      </v-scroll>
    </main>
    <!--    <slot name="header"></slot>-->

    <!--    <template slot="header">-->
    <!--      <p>我是name为header的slot</p>-->
    <!--    </template>-->
  </div>
</template>

<script>
import { NavBar } from 'vant'
import { isObject, isArray } from '~/untils'
import timeout from '~/untils/timeout'

export default {
  name: 'VPage',
  components: { NavBar },
  props: {
    needHeader: {
      type: null,
      default: false
    },
    // 需要扩展的分页参数
    expanParams: {
      type: Object,
      default: null
    },
    // 分页单次get条目数
    pageSize: {
      type: Number,
      default: 10
    },
    /**
     * 下拉刷新 || 上拉加载的 Api
     * */
    pullingApi: {
      type: String,
      default: ''
    },
    /**
     * 下拉刷新 || 上拉加载的 回调
     * */
    pullingCb: {
      type: Function,
      default: null
    },
    /**
     * pullDownRefresh
     * 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，
     * 可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
     * {
     *   threshold: 90,
     *   stop: 40,
     *   txt: '刷新了'
     * }
     * */
    pullDownRefresh: {
      type: null,
      default: false
    },
    /**
     * pullUpLoad
     * 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，
     * 可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
     * {
     *   threshold: 0,
     *   txt: {
     *     more: '加载更多...',
     *     noMore: '没有更多数据啦'
     *   }
     * }
     * */
    pullUpLoad: {
      type: null,
      default: false
    },
    // 是否开启滚动条，默认为 false
    scrollbar: {
      type: null,
      default: false
    },
    // 纵轴方向初始化位置
    startY: {
      type: Number,
      default: 0
    },
    click: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      items: []
    }
  },
  watch: {
    needHeader(newV, oldV) {
      if (newV !== oldV) {
        this.refresh()
      }
    }
  },
  async mounted() {
    // 开启了上拉加载 || 下拉刷新， 进来都先拉一屏数据下来
    this.$loading()
    if (this.pullDownRefresh || this.pullUpLoad) {
      await this.onPullingDown()
    }
    this.$toast.clear()
  },
  methods: {
    refresh() {
      this.$nextTick(() => {
        this.$refs.scroll && this.$refs.scroll.refresh()
      })
    },
    // 滚动到页面顶部
    scrollTo({ scrollToX, scrollToY, scrollToTime }) {
      this.$nextTick(() => {
        this.$refs.scroll.scrollTo(scrollToX, scrollToY, scrollToTime)
      })
    },
    onPullingDown() {
      // 模拟下拉刷新
      console.log('下拉刷新')
      this.page = 1
      this.getData().then(({ data, ...res }) => {
        try {
          this.page++
          this.pullingCb((list) => {
            list.splice(0, list.length, ...data)
          })
          this.forceUpdate(true)
        } catch (e) {
          console.log(e, '下拉刷新pullingCb')
        }
      })
    },
    onPullingUp() {
      // 模拟上拉 加载更多数据
      console.log('上拉加载')
      if (!this.pullingApi) return
      const pageSize = this.pageSize
      this.getData().then(({ data, ...res }) => {
        this.page++
        this.pullingCb((list) => {
          list.push(...data)
        })
        if (data.length < pageSize) {
          this.forceUpdate(false)
        } else {
          this.forceUpdate(true)
        }
      })
    },
    fetch(params = {}) {
      return this.$fetch[this.pullingApi](this, {
        page: this.page,
        perPage: this.pageSize,
        ...params
      })
        .then(({ data: { data, ...res }, success }) => {
          try {
            if (isArray(data)) {
              const timer = timeout.setTimeout.set(() => {
                this.refresh()
                timeout.setInterval.remove(timer)
              }, 200)
              return Promise.resolve({ data, ...res })
            } else {
              throw new Error('property data: not Array')
            }
          } catch (e) {
            return Promise.resolve({ data: [] })
          }
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    },
    getData() {
      const params = this.expanParams
      if (isObject(params)) {
        return this.fetch(params)
      } else {
        return this.fetch()
      }
    },
    forceUpdate() {
      this.$nextTick((bool) => {
        this.$refs.scroll.forceUpdate(bool)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.page-main {
  @include format-page;
  flex: 1;
  max-height: 100%;
  overflow: hidden;
}
</style>
