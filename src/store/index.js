import { createStore } from 'vuex'
import user from './modules/user'
import getters from './modules/getters.js'

export default createStore({
  getters,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user
  }
})
