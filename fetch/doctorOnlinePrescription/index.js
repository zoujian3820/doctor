export default {
  /**
   * @desc: 获取支持当前制法的所有药房列表数据
   * @param: {key: value}
   * key: manufactureId
   * */
  getDoctorPharmacys(app, params) {
    return app.$axios.get(`/doctor/prescription/V2/getpharmacy`, {
      params
    })
  },
  /**
   * @desc: 获取该药房当前制法下的所有中药材列表数据
   * @param: {key: value}
   * key: mid
   * key: pharmacy_id
   * */
  getDoctorAllHerbs(app, params) {
    return app.$axios.get(`/doctor/prescription/V2/herbs`, {
      params
    })
  },
  /**
   * @desc: 获取当前类型和来源下的文章分页列表数据
   * @param: {key: value}
   * key: page
   * key: per_page
   * key: type
   * key: source
   * */
  getDoctorArticles(app, { type = 'FuEr', source = 'home_page', ...params }) {
    return app.$axios.get(`/user/get-doctor-articles`, {
      params: {
        ...params,
        type,
        source
      }
    })
  }
}
