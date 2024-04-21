export const state = () => ({
  ball: null,
  getBallFlag: false,
})

export const mutations = {
  ballData(state, val) {
    state.ball = val
  },
  getBallFlag(state, val) {
    state.getBallFlag = val
  },
}

export const actions = {
  ballData ({ commit }, val) {
    commit('ballData', val)
  },
  getBallFlag ({ commit }, val) {
    commit('getBallFlag', val)
  },
}