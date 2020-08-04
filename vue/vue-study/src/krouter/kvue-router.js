let _Vue
class VueRouter {
  constructor (options) {
    this.$options = options

    // 缓存path和Route映射关系
    this.routes = options.routes
    this.routeMap = {}
    this.routes.forEach(e => {
      this.routeMap[e.path] = e
    })

    // 需要定义一个响应式的current属性
    const initial = window.location.hash.slice(1) || '/'
    _Vue.util.defineReactive(this, 'current', initial)

    // 监控URL变化
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }

  onHashChange () {
    // 只要#后面的
    this.current = window.location.hash.slice(1)
    console.log('this.current', this.current)
  }
}
// 1. 挂载$router
VueRouter.install = function (Vue) {
  _Vue = Vue
  // 1.挂载$router - 这里为啥要用混入方式写
  Vue.mixin({
    beforeCreate () {
      // TODO:这里的this是Vue的实例，不是router的实例吧
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  // TODO:为啥没有直接写 Vue.prototype.$router = this.$options.router 而是写在了全局mixin中并且是注入到所有组件的beforeCreate钩子中
  // use代码在前，Router实例创建在后，⽽install逻辑⼜需要⽤到该实例
  // install这里用到`this.$options.router`实例上的router在前，new Vue（）之后才会在实例上增加$options.router属性，所以这里不能直接用

  // 2. 定义两个全局组件 router-link router-view
  Vue.component('router-view', {
    render (h) {
      console.log('this.$router', this.$router, this.$router.routes)
      // TODO: 这里每次都需要循环根据path找component，可以事先缓存path和route映射关系
      // const currentRoute = this.$router.routes.filter(item => item.path === this.$router.current)
      // const component = currentRoute[0] ? currentRoute[0].component : null
      // return h(component)
      const { routeMap, current } = this.$router // router 实例
      const component = routeMap[current] ? routeMap[current].component : null
      return h(component)
    }
  })

  // 3. 定义两个全局组件 router-link
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        require: true
      }
    },
    render (h) {
      return h('a', {
        attrs: { href: '#' + this.to }
      }, this.$slots.default)
    }
  })
}

export default VueRouter
