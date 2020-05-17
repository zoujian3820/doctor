<template>
  <div class="page">home</div>
</template>

<script>
export default {
  name: 'Index',
  mounted() {
    this.getPharmacy()
  },
  methods: {
    async getPharmacy() {
      await this.$fetch.getOnlinePrescreptionPharmacy(this, 1)
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
