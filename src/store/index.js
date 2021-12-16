import { createStore } from 'vuex'
import user from './modules/user'
import getters from './modules/getters.js'
import app from './modules/app.js'
import theme from './modules/theme'
import tag from './modules/tag.js'
import roleAndPermission from './modules/role&permission.js'
import userPermission from './modules/userPermission.js'
export default createStore({
  getters,
  state: {},
  mutations: {},
  modules: {
    user,
    app,
    theme,
    tag,
    roleAndPermission,
    userPermission
  },
  actions: {}
})
