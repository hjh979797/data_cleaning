// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 入口文件
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 导入Vuex
import Vuex from 'vuex'
// 发送请求需要的包
import axios from 'axios'
// 配置请求的根路径
axios.default.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 挂载到vue的原型变量上
Vue.prototype.$http = axios
import GlobalIndex from './components/zujian/index.vue'
Vue.use(GlobalIndex) //引用自定义组件
Vue.component('global-index', GlobalIndex) // 初始化组件
Vue.use(ElementUI)
Vue.use(Vuex)

const store = new Vuex.Store({
  // state相当于组件中的data，专门用于保存共享数据 this.$store访问
  state: {
    count: 100
  },
  // 保存用于修改数据的方法
  mutations: {
    increment(state) {
      state.count++
    },
    // 自动传了一个state
    add(state) {
      state.count = state.count - 1;
    }
  },
  // 用于保存计算属性，计算属性：将计算结果缓存，只要数据没有发生变化，只发生一次，以后都使用缓存中数据
  // (也就是方法不会去执行，返回的结果已经缓存，直接读取缓存数据)
  getters: {
    // 也会自动传 state 用于加工
    update(state) {
      console.log("test")
      return state.count + 1
    }
  }
})

// import { Message } from 'element-ui'
// Vue.prototype.$message = Message;
Vue.prototype.$message = ElementUI.Message

new Vue({
  el: '#app',
  router,
  component: {
    GlobalIndex
  },
  store: store,
  render: h => h(App)
})
