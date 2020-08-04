import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    add (state) {
      return state.counter++
    }
  },
  actions: {
    // 这里可以解构各种东西
    add ({ commit, state, getters }) {
      setTimeout(() => {
        commit('add')
      }, 1000)
    }
  },
  modules: {
  }
})
