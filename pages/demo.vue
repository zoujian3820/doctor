<template>
  <v-page
    :pulling-cb="pullingCb"
    pulling-api="getDoctorArticles"
    :need-header="true"
    :pull-down-refresh="pullDownRefreshObj"
    :pull-up-load="pullUpLoadObj"
  >
    <template slot="navbar-left">
      <van-icon name="arrow-left" size="18" />
    </template>
    <template slot="navbar-title">
      <p>title</p>
    </template>
    <template slot="navbar-right">
      <van-icon name="search" size="18" />
    </template>

    <template slot="content">
      <div>
        {{ 'dddd' | firstUpperCase }}
      </div>
      <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow />
      <van-button type="primary" @click="preview">主要按f钮</van-button>
      <div v-for="(item, index) in list" :key="index" class="demo">
        <van-skeleton
          avatar
          title
          :row="3"
          :loading="loading"
          avatar-size="40px"
        >
          <div class="title">实际内容实际内容实际内容实际内容实际内容</div>
        </van-skeleton>
      </div>
    </template>
  </v-page>
</template>

<script>
/*  row	段落占位图行数	number | string	0
  row-width	段落占位图宽度，可传数组来设置每一行的宽度	number | string |  (number | string)[]	100%
  title	是否显示标题占位图	boolean	false
  avatar	是否显示头像占位图	boolean	false
  loading	是否显示骨架屏，传false时会展示子组件内容	boolean	true
  animate	是否开启动画	boolean	true
  title-width	标题占位图宽度	number | string	40%
  avatar-size	头像占位图大小	number | string	32px
  avatar-shape	头像占位图形状，可选值为square	string	round
   */
import { Button, NavBar, icon } from 'vant'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
// import storage from 'good-storage'
import { isFunction } from '~/untils/'
// import { uaParser } from '~/transformers/ua'
export default {
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [icon.name]: icon
  },
  data() {
    return {
      loading: true,
      // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
      scrollbarObj: {
        fade: true
      },
      // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
      pullDownRefreshObj: {
        threshold: 90,
        stop: 40,
        txt: '刷新了哈'
      },
      // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: '加载更多...',
          noMore: '没有更多数据啦'
        }
      },
      list: []
    }
  },
  computed: {
    ...mapState({
      selectHerbs: (state) => state.onlinePrescription.selectHerbs,
      allHerbs: (state) => state.onlinePrescription.allHerbs
    }),
    ...mapGetters(['onlinePrescription/selectHerbs'])
  },
  mounted() {
    // console.log(this.$mat, uaParser(navigator.userAgent))
    // console.log(this['onlinePrescription/selectHerbs'])
    // console.log(this.selectHerbs)
    // console.log(this.$store.state.onlinePrescription.selectHerbs)
    // this.fetchAllHerbs({
    //   remove: 0,
    //   mid: 1,
    //   pharmacyId: 2
    // })
    // this.$store.commit('onlinePrescription/updateSelectHerbs', [1, 2])
    // this.$store.dispatch('onlinePrescription/fetchAllHerbs', { remove: 1 })
    // this.$toast('66666')
    // this.$confirm({ message: '弹窗内容' })
    // storage.set('test0', 'abc')
    // console.log(storage.get('test0', '123'))
  },
  methods: {
    pullingCb(handleCb) {
      isFunction(handleCb) && handleCb(this.list)
    },
    ...mapMutations({
      updateSelectHerbs: 'onlinePrescription/updateSelectHerbs'
    }),
    ...mapActions({
      fetchAllHerbs: 'onlinePrescription/fetchAllHerbs'
    }),
    preview() {
      this.$imagePreview({
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg'
        ],
        startPosition: 1
      })
    }
  }
}
</script>

<style lang="scss">
.demo {
  width: 100%;
  margin-bottom: 16px;
}
</style>
