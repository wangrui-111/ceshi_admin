import path from 'path'
import i18n from '@/i18n/index.js'
/*
  1.去除重复的 二级路由，保持一二级路由的关系
*/
// 获取所有的二级路由
const getChildrenRouters = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
export const filterRouter = (routes) => {
  // const result =[]
  // routes.forEach(router: any)
  // 获取所有的二级路由
  const childrenRouters = getChildrenRouters(routes)
  return routes.filter((router) => {
    // 只要在childrenRoute
    return !childrenRouters.find((childrenRoute) => {
      return childrenRoute.path === router.path
    })
  })
}

/*
  2.将route为了配合v-for遍历生成菜单，需要格式化数据
*/
const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}
export function generateMenus(routes, basePath = '') {
  const result = []
  // 遍历路由表
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}

/*
  配合fuse.js 处理路由数据源 满足fuse.js的搜索方式
  @ param routes 是filter 过滤去重以后的路由
*/
export const generateFuse = (routes, titles = []) => {
  let res = []
  // 遍历routers
  for (const route of routes) {
    const data = {
      path: route.path,
      title: [...titles] // 不迭代的话这里是个空title如果迭代这里就是以后的以一级标题的title
    }
    // 条件：1.具备meat && meta。title 2.过滤掉动态路由
    const reg = /.*\/:.*/
    if (route.meta && route.meta.title && !reg.exec(route.path)) {
      // 变成国际化后
      const title = i18n.global.t('msg.route.' + route.meta.title)
      data.title = [...data.title, title]
      res.push(data)
    }
    if (route.children && route.children.length > 0) {
      const subRes = generateFuse(route.children, data.title)
      if (subRes.length > 0) {
        res = [...res, ...subRes]
      }
    }
  }
  return res
}
