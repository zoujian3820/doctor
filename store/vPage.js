export const state = () => ({
  needHeader: false,
  fetchPullingApi: ''
})

export const getters = {
  type: (state) => state.needHeader,
  fetchPullingApi: (state) => state.fetchPullingApi
}

export const mutations = {
  updateNeedHeader(state, payload) {
    state.needHeader = payload
  },
  updateFetchPullingApi(state, payload) {
    state.fetchPullingApi = payload
  }
}

export const actions = {}
