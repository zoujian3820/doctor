import axios from '../axios'

export default {
  getOnlinePrescreptionPharmacy(app, manufactureId) {
    return axios(app).get(`/doctor/prescription/V2/getpharmacy`, {
      params: {
        manufactureId
      }
    })
  }
}
