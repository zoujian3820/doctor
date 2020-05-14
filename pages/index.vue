<template>
  <div class="container">
    <div>
      555
    </div>
    <van-button type="primary">主要按f钮</van-button>
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  components: {
    'van-button': Button
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.$mat)
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  div {
    color: red;
  }
}
</style>
