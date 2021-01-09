const state = {
  prolist: window.sessionStorage.getItem("prolist") || "",
  datalist: window.sessionStorage.getItem("datalist") || "",
  datacol: window.sessionStorage.getItem("datacol") || "",
  page: window.sessionStorage.getItem("page") || "",
  pagesize: window.sessionStorage.getItem("pagesize") || "",
  loading: window.sessionStorage.getItem("loading") || ""
}

const mutations = {
  prolistFix(state, prolist) {
    sessionStorage.setItem("prolist", prolist)
    state.prolist = prolist
  },
  datalistFix(state, datalist) {
    if(datalist===null) {
      sessionStorage.setItem("datalist", null)
      sessionStorage.setItem("datacol", null)
      state.datalist = null
      state.datacol = null
      return;
    }
    let datas = JSON.stringify(datalist.tableData)
    sessionStorage.setItem("datalist", datas)
    state.datalist = datas
    for (var key in datalist.tableColumns) {
      datalist.tableColumns[key].flag = false
      console.log("加入flag结果: ")
      console.log(datalist.tableColumns[key])
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
  },
  setLoading(state, value){
    sessionStorage.setItem("loading", value)
    state.loading = value
  }
}

const getters = {
  dataListSize(state) {
    if(state.datalist===null) return 0
    return JSON.parse(state.datalist).length
  },
  getProList(state) {
    return state.prolist
  },
  getData(state){
    return JSON.parse(state.datalist)
  },
  getDataList(state) {
    if(state.datalist===null) return []
    let pagesize = state.pagesize
    let page = state.page
    let start = (page - 1) * pagesize
    let end = page * pagesize
    let len = JSON.parse(state.datalist).length
    if (end > len) end = len
    console.log("起始和终点数据： " + start + " " + end)
    console.log("所有数据: ")
    console.log(JSON.parse(state.datalist))
    return JSON.parse(state.datalist).slice(start, end)
  },
  getDataCol(state) {
    if (state.datacol === null) return []
    // console.log("标题格式: ")
    // field 列字段名
    // title 标题
    // 列宽度 width
    // minWidth 最小宽度
    let tableColumn = []
    let cols = JSON.parse(state.datacol)
    for(var col in cols) {
      let name = cols[col].cloumnName
      let dic = {field: name}
      dic['title'] = name.substring(1,name.length)
      dic['width'] = "auto"
      dic['minWidth'] = "100px"
      dic['resizable'] = true
      tableColumn.push(dic)
    }
    // console.log(tableColumn)
    return tableColumn
    // return JSON.parse(state.datacol)
  },
  getLoading(state) {
    return state.loading
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
  },
  setLoad(context, value) {
    context.commit("setLoading", value)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}