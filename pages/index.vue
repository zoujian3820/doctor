<template>
  <div class="container">
    <div>
      {{ 'dddd' | firstUpperCase }}
    </div>
    <van-button type="primary">主要按f钮</van-button>
  </div>
</template>

<script>
import { Button } from 'vant'
import { uaParser } from '~/transformers/ua'
export default {
  components: {
    'van-button': Button
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.$mat, uaParser(navigator.userAgent))
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
