<template>
  <v-page>
    <template slot="content">
      <count-down :time="countTime" :state="state"></count-down>
      <page-state :orderids="orderids" :state-text="stateText"></page-state>
      <page-address></page-address>
      <ul>
        <li v-for="i in 100" :key="i">{{ i }}</li>
      </ul>
    </template>
  </v-page>
</template>

<script>
import CountDown from './components/CountDown'
import PageState from './components/PageState'
import PageAddress from './components/PageAddress'
export default {
  name: 'PatientOrderDetail',
  components: {
    CountDown,
    PageState,
    PageAddress
  },
  data() {
    return {
      prescriptionId: '',
      countTime: 30 * 60 * 60 * 1000,
      orderids: '822386、822366、822271'
    }
  },
  computed: {
    state() {
      return 'need_pay'
    },
    stateText() {
      return '待支付'
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
