export const state = () => ({
  // 当前选中的中药材
  selectHerbs: [],
  // 当前制法和药房下的所有中药材列表
  allHerbs: []
})

export const getters = {
  selectList: (state) => state.selectList
}

export const mutations = {
  updateSelectHerbs(state, payload = []) {
    state.selectHerbs = payload
  }
}

export const actions = {
  fetchAllHerbs({ commit, state }, { remove, ...payload }) {
    if (remove) {
      return commit('updateSelectHerbs', [])
    }
    return this.$fetch
      .getAllHerbs(this, payload)
      .then((res) => {
        commit('updateSelectHerbs', res)
      })
      .catch(() => commit('updateSelectHerbs', []))
  }
}
