let _Vue
class VueRouter {
  constructor (options) {
    this.$options = options

    // 缓存path和Route映射关系
    this.route =

    // 需要定义一个响应式的current属性
    const initial = window.location.hash.slice(1) || '/'
    _Vue.util.defineReactive(this, 'current', '/')

    // 监控URL变化
    window.addEventListener('hashchange', this.onHashChange.call(this))
  }
  onHashChange () {
    // 只要#后面的
    this.current = window.location.hash.slice(1)
  }
}

VueRouter.install = function (Vue) {
  _Vue = Vue
  // 1.挂载$router - 这里为啥这么写
  Vue.mixin({
    beforeCreate() {

    }
  })

  // 2. 定义两个全局组件 router-link router-view
  Vue.component('router-view', {
    render(h) {
      return h
    }
  })
}

export default VueRouter
