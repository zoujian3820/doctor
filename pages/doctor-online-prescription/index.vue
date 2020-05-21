<template>
  <v-page>
    <template slot="navbar">
      <p>header</p>
    </template>
    <template slot="content">
      <ul>
        <li v-for="i in 100" :key="i">{{ i }}</li>
      </ul>
    </template>
  </v-page>
</template>

<script>
// import timeout from '~/untils/timeout'
export default {
  name: 'Index',
  components: {},
  computed: {},
  mounted() {
    // const itme = timeout.setInterval.set(() => {
    //   console.log('hhhhhhhhh', setTimeout)
    //   timeout.setInterval.remove(itme)
    // }, 2000)

    this.getPharmacy()
  },
  methods: {
    async getPharmacy() {
      const data = await this.$fetch.getDoctorPharmacys(this, 1)
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
