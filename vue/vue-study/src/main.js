import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './krouter'
// import store from './store'
import store from './kstore'

Vue.config.productionTip = false
Vue.directive('color', function (el, { modifiers, value }) {
  el.style.color = 'red'
})

// 4. 在根组件上添加该router实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
