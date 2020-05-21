export default {
  /**
   * @desc: 患者端获取订单详情数据
   * @param: {key: value}
   * key: prescription_id
   * key: shipping_info_id
   * */
  getPatientOrderDetail(app, params) {
    return app.$axios.get(`/user/prescription-show`, {
      params
    })
  }
}
