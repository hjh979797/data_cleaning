const state = {
  opratype: window.sessionStorage.getItem("opratype") || "",
  ColName: window.sessionStorage.getItem("ColName") || ""
}

const mutations = {
  opratypeFix(state, value) {
    sessionStorage.setItem('opratype', value)
    state.opratype = value
  },
  setColName(state, value) {
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
  setResetCol(context, value) {
    context.commit("setColName", value)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}