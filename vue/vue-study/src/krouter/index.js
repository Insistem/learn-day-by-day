import Vue from 'vue'
import VueRouter from './kvue-router'
import Home from '../views/Home.vue'
import about from '../views/About.vue'
// 1. 注册插件
Vue.use(VueRouter)

// 2. 地址栏与组件的映射关系配置表
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: about
    // TODO: lazy-loaded 是怎么实现的
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
// 3. 创建router实例
const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})

export default router
