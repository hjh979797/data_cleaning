import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/LoginAndRegist/Login.vue'
import Regist from '../components/LoginAndRegist/Regist.vue'
import Home from '../components/Main/home.vue'
import Datain from '../components/Main/datain.vue'
import TextData from '../components/Main/textdatain.vue'
import DbIn from '../components/Main/dbin.vue'
import MainData from '../components/Main/Data/main_data.vue'
import MainShow from '../components/Main/Data/main_show.vue'
import MainOpra from '../components/Main/Data/main_opra.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/home' }, // 重定向路由规则,自动跳转到登陆页面
    {
      path: '/home',
      component: Home,
      // redirect: '/datain',
      children: [
        { path: '/datain', component: Datain },
        { path: '/textdatain/:proid', component: TextData},
        { path: '/dbin/:proid', component: DbIn }
      ] //子路由
    },
    { path: '/login', component: Login },
    { path: '/regist', component: Regist },
    { path: '/maindata', 
      component: MainData,
      redirect: 'mainshoworopra',
      children: [
        { path: '/mainshoworopra/:dataid', components: {
            show: MainShow,
            opra: MainOpra
          }
        }
      ]
    }
  ]
})

// //挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to: 将访问路径
//   // from: 从哪个路径跳转
//   // next: 放行
//   if(to.path === '/login' || to.path === '/regist') return next(); //直接放行
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if(!tokenStr) return next('/login') //强制回到login
//   next() //直接放行
// })

export default router
