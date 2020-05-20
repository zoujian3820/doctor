export default {
  getPharmacys(app, manufactureId) {
    return app.$axios.get(`/doctor/prescription/V2/getpharmacy`, {
      params: {
        manufactureId
      }
    })
  },
  getAllHerbs(app, { mid, pharmacyId }) {
    return app.$axios.get(`/doctor/prescription/V2/herbs`, {
      params: {
        mid,
        pharmacy_id: pharmacyId
      }
    })
  },
  getArticles(app, { page, perPage, type = 'FuEr', source = 'home_page' }) {
    return app.$axios.get(`/user/get-doctor-articles`, {
      params: {
        page,
        per_page: perPage,
        type,
        source
      }
    })
  }
}
