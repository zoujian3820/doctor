export const state = () => ({
  wxApis: []
})

export const mutations = {
  updateWxApis(state, payload) {
    if (payload) {
      const newApis = []
      if (typeof payload === 'string') {
        if (!state.wxApis.includes(payload)) {
          newApis.push(payload)
        }
      } else if (Array.isArray(payload)) {
        for (const api of Array.from(payload)) {
          if (!state.wxApis.includes(api)) {
            newApis.push(api)
          }
        }
      }
      if (newApis.length) {
        state.wxApis = state.wxApis.concat(newApis)
      }
    } else {
      state.wxApis = []
    }
  }
}
