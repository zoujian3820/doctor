import axios from '../axios'

export default {
  getPharmacys(app, manufactureId) {
    return axios(app).get(`/doctor/prescription/V2/getpharmacy`, {
      params: {
        manufactureId
      }
    })
  },
  getAllHerbs(app, { mid, pharmacyId }) {
    return axios(app).get(`/doctor/prescription/V2/herbs`, {
      params: {
        mid,
        pharmacy_id: pharmacyId
      }
    })
  }
}
