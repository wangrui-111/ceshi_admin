import axios from '@/utils/request.js'

// 获取用户列表数据 post --> data:{} get -->params:{}
export const getAllPermissions = (data) => {
  return axios.request({
    url: '/permission/list',
    method: 'GET'
  })
}
