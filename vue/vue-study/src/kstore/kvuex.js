// 实现一个插件
let _Vue
class Store {
  constructor (options) {
    this._mutations = options.mutations
    this._actions = options.actions
    this._getters = options.getters || {}
    // 创建响应式的state
    // -- 如果这么写有什么坏处，
    // this.state = new _Vue({
    //   data() {
    //     return options.state
    //   }
    // })
    // --
    // 定义getters, 将getters中的内容搬到computed中
    const computed = {}
    const store = this
    store.getters = {}
    const partial = function (fn, arg) {
      return fn(arg)
    }
    Object.keys(store._getters).forEach(key => {
      computed[key] = partial(store._getters[key], store)
      console.log('key', key)
      // TODO:为啥这样写 设置不了get,出来的 store.getters为{}
      Object.defineProperty(store.getters, key, {
        get () {
          return store._vm[key]
        },
        enumerable: true
      })
    })
    console.log('this.getters', store.getters)
    // computed - 通过计算属性的缓存性，使getters变得响应式 + 缓存性

    // 官方写法
    this._vm = new _Vue({
      data () {
        return {
          $$state: options.state
        }
      },
      computed
    })
    // 修改this的指向 -- TODO:重点, 两种写法有啥区别
    /*
      防止在后面调用过程中出现this指向不为vuex的问题
      如果外面的actions这样写，this会指向window
      actions: {
        add ({ commit }) {
          setTimeout(() => {
            commit('add')
          }, 1000)
        }
      },
     */
    // this.commit = this.commit.bind(this)
    const { commit } = this
    this.commit = (type, payload) => {
      return commit.call(this, type, payload)
    }
    this.dispatch = this.dispatch.bind(this)
  }

  get state () {
    return this._vm._data.$$state
  }

  set state (v) {
    console.error('cannot set')
  }
  // 修改state
  // this.$store.commit('add' , 1)
  // 触发mutations中的同步函数

  commit (type, payload) {
    // 获取type对应的mutaitons
    const entry = this._mutations[type]
    if (!entry) {
      console.error('unknown')
      return
    }
    entry(this.state, payload)
  }

  // 触发actions中的同步函数
  dispatch (type, payload) {
    const entry = this._actions[type]
    if (!entry) {
      console.error('unknown')
      return
    }
    // 传入当前的store实例做上下文 - 为保证这里的this指向，上面应该主动绑定this
    return entry(this, payload)
  }
}

function install (Vue) {
  _Vue = Vue

  // 混入
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
export default { Store, install }
