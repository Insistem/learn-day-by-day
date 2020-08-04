// 实现一个插件
let _Vue
class Store {
  constructor(options) {
    this._mutations = options.mutations
    this._actions = options.actions
    // 创建响应式的state
    // -- 如果这么写有什么坏处，
    // this.state = new _Vue({
    //   data() {
    //     return options.state
    //   }
    // })
    // --
    // 官方写法
    this._vm = new _Vue({
      data () {
        return {
          $$state: options.state
        }
      }
    })
    // 修改this的指向 -- 重点
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    // 定义getters
    this.getters = {}

    // computed - 通过计算属性的缓存性，使getters变得响应式 + 缓存性

    get state() {

    }

    set state() {

    }
    // 修改state
    // this.$store.commit('add' , 1)
    commit(type, payload) {
      // 获取type对应的mutaitons
      const entry = this._mutations[type]
      if (!entry) {
        console.error('unknown')
        return
      }
      entry(this.state, payload)
    }

    dispatch(type, payload) {
      const entry = this._actions[type]
      if (!entry) {
        console.error('unknown')
        return
      }
      // 传入当前的store实例做上下文 - 为保证这里的this指向，上面应该主动绑定this
      return entry(this, payload)
    }
  }

}

function install (Vue) {
  _Vue = Vue

  // 混入 - 为啥要用混入呢？
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}


export default { Store, install }
