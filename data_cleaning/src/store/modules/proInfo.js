const state = {
  prolist: window.sessionStorage.getItem("prolist") || "",
  datalist: window.sessionStorage.getItem("datalist") || "",
  datacol: window.sessionStorage.getItem("datacol") || "",
  dataLength: window.sessionStorage.getItem("datalen") || "",
  // page: window.sessionStorage.getItem("page") || "",
  // pagesize: window.sessionStorage.getItem("pagesize") || "",
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
      // console.log("加入flag结果: ")
      // console.log(datalist.tableColumns[key])
    }
    sessionStorage.setItem("datacol", JSON.stringify(datalist.tableColumns))
    state.datacol = JSON.stringify(datalist.tableColumns)
  },
  // pageFix(state, value) {
  //   sessionStorage.setItem("page", value)
  //   state.page = value
  // },
  // pagesizeFix(state, value) {
  //   sessionStorage.setItem("pagesize", value)
  //   state.pagesize = value
  // },
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
  },
  setDataLen(state, value){
    sessionStorage.setItem("datalen", value)
    state.dataLength = value
  }
}

const getters = {
  dataListSize(state) {
    console.log(state.dataLength)
    return parseInt(state.dataLength)
  },
  getProList(state) {
    return state.prolist
  },
  getData(state){
    return JSON.parse(state.datalist)
  },
  getDataList(state) {
    if(state.datalist===null) return []
    // let pagesize = state.pagesize
    // let page = state.page
    // let start = (page - 1) * pagesize
    // let end = page * pagesize
    // let len = JSON.parse(state.datalist).length
    // if (end > len) end = len
    // console.log("起始和终点数据： " + start + " " + end)
    // console.log("所有数据: ")
    // console.log(JSON.parse(state.datalist))
    // return JSON.parse(state.datalist).slice(start, end)
    return JSON.parse(state.datalist)
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
    let dic = { width: "60" }
    dic['type'] = "checkbox"
    dic['resizable'] = false
    dic['fixed'] = "left"
    tableColumn.push(dic)
    for(var col in cols) {
      let name = cols[col].cloumnName
      let dic = { width: "auto"}
      dic['title'] = name.substring(1, name.length)
      dic['minWidth'] = "100px"
      dic['resizable'] = true
      dic['sortable'] = true
      dic['field'] = name
      // dic['cellRender'] = {name: "MyHeaderSelect"}
      // dic['slots'] = {  header: "selectOpra"}
      dic['slots'] = {
        header: function ({ column, columnIndex, $columnIndex, _columnIndex, $rowIndex }, h){
        // console.log("插槽内信息；")
        // console.log(column)
        // console.log(h)
          return [
            h('headerSelect', {
              attrs: {
                label: column.title,
                column: column
              }
            })
          ]
      }}
      tableColumn.push(dic)
    }
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
  },
  setDataLen(context, value) {
    context.commit("setDataLen", value)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}