const state = {
  opratype: window.sessionStorage.getItem("opratype") || "",
  ColName: window.sessionStorage.getItem("ColName") || "",
  logId: window.sessionStorage.getItem("logId")||"",
}

const mutations = {
  opratypeFix(state, value) {
    sessionStorage.setItem('opratype', value)
    state.opratype = value
  },
  setCurrentCol(state, value) {
    sessionStorage.setItem("ColName", value)
    state.ColName = value
  },
  setLogId(state,value){
    sessionStorage.setItem("logId",value)
    state.logId = value;
  }
}

const getters = {
  getOpraType(state) {
    return state.opratype
  },
  getCurrentCol(state) {
    return state.ColName
  },
  getLogId(){
    return state.logId;
  },
}

const actions = {
  updateOpraType(context, value) {
    context.commit('opratypeFix', value)
  },
  setCurrentCol(context, value) {
    context.commit("setCurrentCol", value)
  },
  setLogId(context,value){
    context.commit("setLogId",value)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}