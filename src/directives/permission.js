// import {mounted,update} from 'vue'
import store from '@/store/index.js'
const checkoutPermission = (el, binding) => {
  const value = binding.value
  const points = store.getters.userInfo.permission.points
  const index = points.findIndex((item) => item === value)
  if (index <= 0) {
    // 没有权限 删除dom .removeChild(el)
    el.parentNode && el.parentNode.removeChild(el)
  }
  // 有权限 不处理
  // 没有权限 删除dom
}
export default {
  mounted(el, binding) {
    checkoutPermission(el, binding)
  },
  updated(el, binding) {
    checkoutPermission(el, binding)
  }
}
