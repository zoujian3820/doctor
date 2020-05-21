<template>
  <v-page>
    <template slot="content">
      <ul>
        <li v-for="i in 100" :key="i">{{ i }}</li>
      </ul>
    </template>
  </v-page>
</template>

<script>
export default {
  name: 'PatientOrderDetail',
  mounted() {},
  methods: {
    async getPatientOrderDetail() {
      const data = await this.$fetch.getPatientOrderDetail(this, {
        prescription_id: '',
        shipping_info_id: ''
      })
      console.log(data)
    }
  },
  head() {
    return {
      title: '订单详情'
    }
  }
}
</script>

<style scoped lang="scss"></style>
