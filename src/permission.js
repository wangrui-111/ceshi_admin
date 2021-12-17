// 用户鉴权 路由守卫
import router from './router/index.js'
import store from './store/index.js'
const whiteRouter = ['/login']
router.beforeEach(async (to, from, next) => {
  // if (to.matched.length === 0) {
  //   next('/404')
  // }
  // 登录
  if (store.getters.token) {
    if (to.path === '/login') {
      // 不允许
      next('/')
    } else {
      // 登录成功 跳转到首页
      if (!store.getters.hasUserInfo) {
        // 判断没有用户的信息 就去发送axios
        const {
          permission: { menus }
        } = await store.dispatch('user/getUserInfo')
        // 1、获取该用户的所有的权限
        console.log('用户的权限', menus)

        // 2、根据权限比对私有然后动态添加路由
        const filterRoutes = await store.dispatch(
          'userPermission/filterPrivateRoutes',
          menus
        )

        // 3、将获取到的路由 动态添加到路由表中

        // router.addRoute()
        filterRoutes.forEach((activeRoute) => {
          router.addRoute(activeRoute)
        })
        // 4、执行跳转 到首页
        router.push(to.path)
      }
      // 首次登录 跳转到首页
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
