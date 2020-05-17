<template>
  <div class="page">home</div>
</template>

<script>
export default {
  name: 'Index',
  computed: {},
  mounted() {
    this.getPharmacy()
  },
  methods: {
    async getPharmacy() {
      const data = await this.$fetch.getPharmacys(this, 1)
      console.log(data)
    }
  },
  head() {
    return {
      title: '在线开方'
    }
  }
}
</script>

<style scoped lang="scss"></style>
