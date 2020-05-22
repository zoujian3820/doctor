<template>
  <v-page>
    <template slot="content">
      <count-Down :time="countTime"></count-Down>
      <ul>
        <li v-for="i in 100" :key="i">{{ i }}</li>
      </ul>
    </template>
  </v-page>
</template>

<script>
import CountDown from './components/CountDown'
export default {
  name: 'PatientOrderDetail',
  components: {
    CountDown
  },
  data() {
    return {
      prescriptionId: '',
      countTime: 30 * 60 * 60 * 1000
    }
  },
  mounted() {
    const { id, uuid } = this.$route.query
    this.prescriptionId = id || uuid
    this.getOrderDetail()
  },
  methods: {
    async getOrderDetail() {
      const data = await this.$fetch.getPatientOrderDetail(this, {
        prescription_id: this.prescriptionId,
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
