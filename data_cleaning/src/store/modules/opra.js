const state = {
  opratype: window.sessionStorage.getItem("opratype") || "",
  ColName: window.sessionStorage.getItem("ColName") || ""
}

const mutations = {
  opratypeFix(state, value) {
    sessionStorage.setItem('opratype', value)
    state.opratype = value
  },
  setCurrentCol(state, value) {
    sessionStorage.setItem("ColName", value)
    state.ColName = value
  }
}

const getters = {
  getOpraType(state) {
    return state.opratype
  },
  getCurrentCol(state) {
    return state.ColName
  }
}

const actions = {
  updateOpraType(context, value) {
    context.commit('opratypeFix', value)
  },
  setCurrentCol(context, value) {
    context.commit("setCurrentCol", value)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}