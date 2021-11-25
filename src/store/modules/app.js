import { getItem, setItem } from '../../utils/storage.js'
import { LANGUAGE } from '../../common/common.js'
const state = {
  sideBarOpened: true,
  language: getItem(LANGUAGE) || ''
}
const getters = {}
const mutations = {
  toggleSideBar(state) {
    state.sideBarOpened = !state.sideBarOpened
  },
  setLanguage(state, lang) {
    state.language = lang
    setItem(LANGUAGE, lang)
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
