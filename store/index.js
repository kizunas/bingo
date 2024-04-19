export const state = () => ({
  ball: null,
})

// export const getters = {
// }

export const mutations = {
  ballData(state, val) {
    state.ball = val
  },
}

export const actions = {
  ballData ({ commit }, val) {
    commit('ballData', val)
  },
}