<template>
  <div class="page">
    <div>
      {{ 'dddd' | firstUpperCase }}
    </div>
    <van-button type="primary" @click="preview">主要按f钮</van-button>
    <div class="demo">
      <van-skeleton avatar title :row="3" :loading="loading" avatar-size="40px">
        <div class="title">实际内容实际内容实际内容实际内容实际内容</div>
      </van-skeleton>
    </div>
    <div class="demo">
      <van-skeleton avatar title :row="3" :loading="loading" avatar-size="40px">
        <div class="title">实际内容实际内容实际内容实际内容实际内容</div>
      </van-skeleton>
    </div>
  </div>
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
import { Button } from 'vant'
export default {
  components: {
    'van-button': Button
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    console.log(this.$mat, this)
    // this.$toast('66666')
    // this.$confirm({ message: '弹窗内容' })
  },
  methods: {
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
