export const state = () => ({
  needHeader: false
})

export const getters = {
  type: (state) => state.needHeader
}

export const mutations = {
  updateNeedHeader(state, payload) {
    state.needHeader = payload
  }
}

export const actions = {}
