<template>
  <v-page>
    <template slot="navbar">
      <p>header</p>
    </template>
    <template slot="content">
      <ul>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
        <li>555</li>
      </ul>
    </template>
  </v-page>
</template>

<script>
// import timeout from '~/untils/timeout'
import vPage from '~/components/v-page'
export default {
  name: 'Index',
  components: { vPage },
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
