<template>
  <div v-if="time && state === 'need_pay'" class="time">
    <van-icon name="warn-o" size="14" color="#e14123" />还剩
    <van-count-down :time="time" format="DD 天 HH 小时 mm 分 SS秒" />
  </div>
  <div v-else-if="state === 'new'" class="time">订单审核后可进行支付</div>
</template>

<script>
import { CountDown, icon } from 'vant'
export default {
  name: 'CountDown',
  components: {
    [CountDown.name]: CountDown,
    [icon.name]: icon
  },
  props: {
    state: {
      type: String,
      default: ''
    },
    time: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">
.time {
  height: 34px;
  background: #fefdf6;
  font-size: 14px;
  color: #e14123;
  padding: 9px 35px 9px 21px;
  display: flex;
  .van-count-down {
    color: #e14123;
  }
  .van-icon {
    margin-right: 3px;
  }
}
</style>
