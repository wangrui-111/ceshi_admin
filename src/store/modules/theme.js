import { getItem, setItem } from '@/utils/storage.js'
import { MYCOLOR } from '@/common/common.js'
export default {
  namespaced: true,
  state: {
    myColor: getItem(MYCOLOR) || '#cccccc'
  },
  mutations: {
    setMyColor(state, color) {
      setItem(MYCOLOR, color)
      state.myColor = color
    }
  }
}
