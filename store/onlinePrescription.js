export const state = () => ({
  // 当前选中的中药材
  selectHerbs: [],
  // 当前制法和药房下的所有中药材列表
  allHerbs: []
})

export const getters = {
  selectHerbs: (state) => state.selectHerbs
}

export const mutations = {
  updateSelectHerbs(state, payload = []) {
    state.selectHerbs = payload
  },
  updateAllHerbs(state, payload = []) {
    state.allHerbs = payload
  }
}

export const actions = {
  fetchAllHerbs({ commit, state }, { remove, ...payload }) {
    if (remove) {
      return commit('updateAllHerbs', [])
    }
    this._vm.$fetch
      .getAllHerbs(this, payload)
      .then(({ data: { herbs } }) => {
        commit('updateAllHerbs', herbs)
      })
      .catch(() => commit('updateAllHerbs', []))
  }
}
