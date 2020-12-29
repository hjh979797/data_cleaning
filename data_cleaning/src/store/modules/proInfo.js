const state = {
  prolist: window.sessionStorage.getItem("prolist") || "",
  datalist: window.sessionStorage.getItem("datalist") || "",
  datacol: window.sessionStorage.getItem("datacol") || "",
  page: window.sessionStorage.getItem("page") || "",
  pagesize: window.sessionStorage.getItem("pagesize") || ""
}

const mutations = {
  prolistFix(state, prolist) {
    sessionStorage.setItem("prolist", prolist)
    state.prolist = prolist
  },
  datalistFix(state, datalist) {
    let datas = JSON.stringify(datalist.tableData)
    sessionStorage.setItem("datalist", datas)
    state.datalist = datas
    for (var key in datalist.tableColumns) {
      datalist.tableColumns[key].flag = false
      console.log("加入flag结果: " + datalist.tableColumns[key])
    }
    sessionStorage.setItem("datacol", JSON.stringify(datalist.tableColumns))
    state.datacol = JSON.stringify(datalist.tableColumns)
  },
  pageFix(state, value) {
    sessionStorage.setItem("page", value)
    state.page = value
  },
  pagesizeFix(state, value) {
    sessionStorage.setItem("pagesize", value)
    state.pagesize = value
  },
  colstaFix(state, value) {
    let origin = JSON.parse(sessionStorage.getItem("datacol"))
    for (var key in origin) {
      if (origin[key].cloumnName === value) {
        origin[key].flag = !origin[key].flag
        break
      }
    }
    console.log("修改列状态结果： " + origin)
    sessionStorage.setItem("datacol", JSON.stringify(origin))
    state.datacol = JSON.stringify(origin)
  },
  renameProFix(state, value) {
    let originData = state.prolist
    for(var item in originData){
      if(originData[item].projectId === value.projectId){
        originData[item].projectName = value.projectName
      }
    }
    sessionStorage.setItem("prolist", originData)
    state.prolist = originData
  },
  delPro(state, value) {
    let originData = state.prolist
    let newData = originData.filter((e => { return e.projectId !== value }))
    sessionStorage.setItem("prolist", newData)
    state.prolist = newData
  },
  createPro(state, value) {
    let originData = state.prolist
    originData.push(value)
    console.log("新增后： ")
    console.log(originData)
  }
}

const getters = {
  dataListSize(state) {
    return JSON.parse(state.datalist).length
  },
  getProList(state) {
    return state.prolist
  },
  getDataList(state) {
    let pagesize = state.pagesize
    let page = state.page
    let start = (page - 1) * pagesize
    let end = page * pagesize
    let len = JSON.parse(state.datalist).length
    if (end > len) end = len
    console.log("起始和终点数据： " + start + " " + end)
    return JSON.parse(state.datalist).slice(start, end)
  },
  getDataCol(state) {
    return JSON.parse(state.datacol)
  }
}

const actions = {
  uploadProList(context, value) {
    context.commit("prolistFix", value)
  },
  updateDataList(context, value) {
    context.commit("datalistFix", value)
  },
  updataPage(context, value) {
    context.commit("pageFix", value)
  },
  updataPageSize(context, value) {
    context.commit("pagesizeFix", value)
  },
  updateColStatus(context, value) {
    context.commit("colstaFix", value)
  },
  renamePro(context, value) {
    context.commit("renameProFix", value)
  },
  delPro(context, value) {
    context.commit("delPro", value)
  },
  createPro(context, value) {
    context.commit("createPro", value)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}