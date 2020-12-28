const state = {
  // 记录token
  token: window.sessionStorage.getItem("token") || "",
  // 用户信息
  mail: window.sessionStorage.getItem("mail") || "",
  password: window.sessionStorage.getItem("pwd") || ""
}

const getters = {
  getMail(state) {
    return state.mail
  },
  getToken(state) {
    return state.token
  }
}

const mutations = {
  userInfoFix(state, payload) {
    sessionStorage.setItem("mail", payload.mail)
    state.mail = payload.mail
    sessionStorage.setItem("pwd", payload.password)
    this.password = payload.password
  },
  //  赋值token
  tokenFix(state, token) {
    sessionStorage.setItem("token", token)
    state.token = token
  }
}

const actions = {
  updateuserinfo: (context, payload) => {
    context.commit("userInfoFix", payload)
  },
  updatetoken(context, value) {
    context.commit("tokenFix", value)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}