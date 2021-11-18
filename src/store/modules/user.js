import { login } from '@/api/user.js'
import md5 from 'md5'
import * as utils from '../../utils/storage'

import { TOKEN } from '../../common/common.js'

console.log(utils)
const state = {
  token: utils.getItem(TOKEN) || ''
}
const getters = {}
const mutations = {
  setToken(state, token) {
    state.token = token
    utils.setItem(TOKEN, token)
  }
}
const actions = {
  login({ commit }, info) {
    // 获取账号密码的信息
    const { username, password } = info
    return new Promise((resolve, reject) => {
      login({
        username,
        password: md5(password)
      })
        .then((res) => {
          // 保存 vuex 保存到本地存储中
          commit('setToken', res.token)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
