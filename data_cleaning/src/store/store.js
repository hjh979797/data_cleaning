import Vue from 'vue'
// 导入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 需要引出
export const store = new Vuex.Store({
  // 严格模式，不可直接操作
  strict: true,
  // state相当于组件中的data，专门用于保存共享数据 this.$store访问
  state: {
    count: 100,
    mail: '',
    password: '',
    dataList: [{
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }, {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }, {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }]
  },
  // 保存用于修改数据的方法，且可追踪
  mutations: {
    increment(state) {
      state.count++
    },
    // 自动传了一个state
    add(state, payload) {
      state.count = state.count + payload;
    },
    setUserInfo(state, payload) {
      state.mail = payload.mail
      state.password = payload.password
    }
  },
  // 用于保存计算属性，计算属性：将计算结果缓存，只要数据没有发生变化，只发生一次，以后都使用缓存中数据
  // (也就是方法不会去执行，返回的结果已经缓存，直接读取缓存数据)
  getters: {
    // 也会自动传 state 用于加工
    update(state) {
      console.log("test")
      return state.count + 1
    },
    dataList(state) {
      return state.dataList
    },
    dataListSize(state) {
      return state.dataList.length
    },getMail(state){
      return state.mail
    }
  },
  // Actions类似于Mutations，提交的是mutations而不是变更当前状态，可以包含任意异步操作
  actions: {
    // dispatch 触发，还可传参,传参需要payload来接收
    add:(context, payload) => {
      setTimeout(function() {
        context.commit("add", payload)
      },3000)
    },
    setUserInfo:(context, payload) => {
      context.commit("setUserInfo",payload)
    }
  }
})
