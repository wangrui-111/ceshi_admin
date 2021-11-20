// 用户鉴权 路由守卫
import router from './router/index.js'
import store from './store/index.js'
const whiteRouter = ['/login']
router.beforeEach(async (to, from, next) => {
  // 登录
  if (store.getters.token) {
    if (to.path === '/login') {
      // 不允许
      next('/')
    } else {
      // 登录成功跳转到首页
      if (!store.getters.hasUserInfo) {
        // 判断没有用户的信息 就去发送axios
        // setTimeout(async () => {
        //   await store.dispatch('user/getUserInfo')
        //   next()
        // }, 70000)
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
    // 未登录
  } else {
    if (whiteRouter.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
