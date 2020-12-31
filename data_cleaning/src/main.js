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
// 发送请求需要的包
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://120.26.162.152:8088'
// 挂载到vue的原型变量上
Vue.prototype.$http = axios
// 右击菜单
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
Vue.use(contentmenu)
// 表格
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
// 挂载vxe表格内部对象
 Vue.use(VXETable)
Vue.prototype.$XModal = VXETable.modal
Vue.prototype.$XPrint = VXETable.print
Vue.prototype.$XSaveFile = VXETable.saveFile
Vue.prototype.$XReadFile = VXETable.readFile
// 拖拽
// import Sortable from 'sortablejs'
// Vue.use(Sortable)

import GlobalIndex from './components/zujian/index.vue'
Vue.use(GlobalIndex) //引用自定义组件
Vue.component('global-index', GlobalIndex) // 初始化组件


Vue.use(ElementUI)
import {store} from './store/store'

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
