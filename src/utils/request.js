import axios from 'axios'
import { ElMessage } from 'element-plus'
import { isCheckTimeOut } from './auth.js'
// 导入store
import store from '../store/index.js' // router useRoute useRouter
// 封装token
const server = axios.create({
  // 后台带路 + cros
  timeout: 5000,
  baseURL: '/api'
})
// 不需要登录（不需要token）就能访问的接口 白名单
// const whiteUrl = ['/sys/login']
// 请求拦截 封装token
server.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      if (!isCheckTimeOut()) {
        // 过期执行退出
        store.dispatch('user/logout')
        // 不应该请求
        return Promise.reject(new Error('token 过期'))
      }
      // 请求的不是login
      // 如果存在token 不存在 不封装
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // config.headers.Authorization = getItem(TOKEN)
    // 在发送请求之前做些什么
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 错误的处理 服务器返回错误 消息提醒
server.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { success, data } = response.data
    if (success) {
      return data
    } else {
      ElMessage({
        type: 'error',
        message: '111111'
      })
    }
    return Promise.reject(new Error('xxx'))
  },
  (error) => {
    // token code=401失效单点登录 后台会返回特定的状态码 执行退出
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    const { message } = error
    // 对响应错误做点什么
    ElMessage({
      type: 'error',
      message: message
    })
    return Promise.reject(error)
  }
)
// 封装好的token 。。。
export default server
