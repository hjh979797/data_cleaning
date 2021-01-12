import Vue from 'vue'
// 导入Vuex
import Vuex from 'vuex'
import opra from './modules/opra'
import proInfo from './modules/proInfo'
import userInfo from './modules/userInfo'
import utils from './modules/utils'

Vue.use(Vuex)

// 需要引出
export const store = new Vuex.Store({
  // 严格模式，不可直接操作
  strict: true,
  // state相当于组件中的data，专门用于保存共享数据 this.$store访问
  // state,
  // 保存用于修改数据的方法，且可追踪
  // 自动传了一个state
  // mutations, 
  // 用于保存计算属性，计算属性：将计算结果缓存，只要数据没有发生变化，只发生一次，以后都使用缓存中数据
  // (也就是方法不会去执行，返回的结果已经缓存，直接读取缓存数据)
  // 也会自动传 state 用于加工
  // getters,
  // Actions类似于Mutations，提交的是mutations而不是变更当前状态，
  // 可以包含任意异步操作 dispatch 触发，还可传参,传参需要payload来接收
  // actions,
  modules: {
    opra,
    proInfo,
    userInfo,
    utils
  }
})
