// 注册一个全局组件
import svgicom from './svgicon.vue'
// 注册一个全局组件
export default function initSvgicon(app) {
  app.component('svg-icon', svgicom)
}
// 加载所有的svg
const file = require.context('@/icons/svg', false, /\.svg$/)
file.keys().map(file)
