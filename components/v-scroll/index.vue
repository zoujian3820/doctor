<template>
  <div ref="wrapper" class="scroll-wrapper">
    <div class="scroll-content">
      <div>
        <slot></slot>
      </div>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div v-if="pullUpLoad" class="pullup-wrapper">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span>{{ pullUpTxt }}</span>
          </div>
          <div v-else class="after-trigger">
            <img class="scroll-loading" src="./image/loading.gif" />
          </div>
        </div>
      </slot>
    </div>
    <slot
      name="pulldown"
      :pullDownRefresh="pullDownRefresh"
      :pullDownStyle="pullDownStyle"
      :beforePullDown="beforePullDown"
      :pulling="pulling"
      :bubbleY="bubbleY"
    >
      <div
        v-if="pullDownRefresh"
        ref="pulldown"
        class="pulldown-wrapper"
        :style="pullDownStyle"
      >
        <div v-if="beforePullDown" class="before-trigger">
          <v-bubble :y="bubbleY"></v-bubble>
        </div>
        <div v-else class="after-trigger">
          <div v-if="pulling" class="loading">
            <img class="scroll-loading" src="./image/loading.gif" />
          </div>
          <div v-else>
            <span>{{ refreshTxt }}</span>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import VBubble from './bubble.vue'

export default {
  name: 'VScroll',
  components: { VBubble },
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    scrollbar: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    pullUpLoad: {
      type: null,
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      pulling: false,
      isPullUpLoad: false,
      pullUpDirty: true, // 此变量用来检查是否加载到了最后一页
      pullDownStyle: '',
      bubbleY: 0,
      reboundPullDownTimer: null,
      afterPullDownTimer: null
    }
  },
  computed: {
    pullUpTxt() {
      const moreTxt =
        (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) ||
        '加载更多'
      const noMoreTxt =
        (this.pullUpLoad &&
          this.pullUpLoad.txt &&
          this.pullUpLoad.txt.noMore) ||
        '没有更多数据了'
      return this.pullUpDirty ? moreTxt : noMoreTxt
    },
    refreshTxt() {
      return (this.pullDownRefresh && this.pullDownRefresh.txt) || '刷新成功'
    }
  },
  created() {
    this.pullDownInitTop = -50
  },
  mounted() {
    const thisWrapper = this.$refs.wrapper
    thisWrapper.firstElementChild.firstElementChild.style.minHeight =
      thisWrapper.offsetHeight + 'px'
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  destroyed() {
    this.scroll && this.scroll.destroy()
    this.scroll = null
    this.reboundPullDownTimer && clearTimeout(this.reboundPullDownTimer)
    this.reboundPullDownTimer = null
    this.afterPullDownTimer && clearTimeout(this.afterPullDownTimer)
    this.afterPullDownTimer = null
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      const options = Object.assign({}, this.options, {
        probeType: this.probeType,
        click: this.click,
        scrollY: true, // 下拉刷新组件 只能纵向 不能横向
        scrollX: false,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll
      })
      this.scroll = new BScroll(this.$refs.wrapper, options)
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }

      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('before-scroll-start')
        })
      }

      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }

      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    destroy() {
      this.scroll && this.scroll.destroy()
    },
    // 加载数据后更新
    forceUpdate(dirty) {
      this.$nextTick(() => {
        this.pullUpDirty = dirty
        if (this.pullDownRefresh && this.isPullingDown) {
          this.pulling = false
          this._reboundPullDown().then(() => {
            this._afterPullDown()
          })
        } else if (this.pullUpLoad) {
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.refresh()
        } else {
          this.refresh()
        }
      })
    },
    _initPullDownRefresh() {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        this.pulling = true
        this.$emit('pulling-down')
      })

      this.scroll.on('scroll', (pos) => {
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
          this.pullDownStyle = `top:${Math.min(
            pos.y + this.pullDownInitTop,
            10
          )}px`
        } else {
          this.bubbleY = 0
        }

        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 -
            (this.pullDownRefresh.stop - pos.y)}px`
        }
      })
    },
    _initPullUpLoad() {
      this.scroll.on('pullingUp', (e) => {
        if (this.pullUpDirty) {
          this.isPullUpLoad = true
          this.$emit('pulling-up')
        }
      })
    },
    _reboundPullDown() {
      const { stopTime = 600 } = this.pullDownRefresh
      return new Promise((resolve) => {
        this.reboundPullDownTimer = setTimeout(() => {
          this.isRebounding = true
          this.isPullingDown = false
          this.scroll.finishPullUp()
          this.scroll.finishPullDown()
          resolve()
        }, stopTime)
      })
    },
    _afterPullDown() {
      this.afterPullDownTimer = setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.beforePullDown = true
        this.isRebounding = false
        this.refresh()
      }, this.scroll.options.bounceTime)
    }
  }
}
</script>

<style scoped>
.scroll-wrapper {
  height: 100%;
  max-height: 100%;
  width: 100%;
  flex: 1;
  overflow: hidden;
}

.scroll-loading {
  width: 20px;
  height: 20px;
}

.pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all;
}

.pulldown-wrapper .after-trigger {
  margin-top: 10px;
}

.pullup-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
}
</style>
