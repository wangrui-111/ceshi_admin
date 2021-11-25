import { createStore } from 'vuex'
import user from './modules/user'
import getters from './modules/getters.js'
import app from './modules/app.js'
import theme from './modules/theme'

export default createStore({
  getters,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    app,
    theme
  }
})
