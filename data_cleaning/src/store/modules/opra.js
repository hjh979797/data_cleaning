const state = {
  opratype: window.sessionStorage.getItem("opratype") || ""
}

const mutations = {
  opratypeFix(state, value) {
    sessionStorage.setItem('opratype', value)
    state.opratype = value
  }
}

const getters = {
  getOpraType(state) {
    return state.opratype
  }
}

const actions = {
  updateOpraType(context, value) {
    context.commit('opratypeFix', value)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}