<template>
  <div class="container">
    <div>
      555
    </div>
    <img
      preview="2"
      src="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg"
      alt=""
    />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      a: 6
    }
  },
  mounted() {
    console.log(this.$previewRefresh, this.$mat)
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
