import dajs from 'dayjs'
// 时间相对处理事件
import rt from 'dayjs/plugin/relativeTime'
// 使用中文语言包
import 'dayjs/locale/zh-cn'
import i18n from '@/i18n/index.js'
import store from '@/store/index.js'
// dayjs使用
dajs.extend(rt)
export default (val) => {
  if (!isNaN(val)) {
    return dajs()
      .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
      .to(dajs(parseInt(val)))
  } else {
    return i18n.global.t('msg.excel.nodateFormate')
  }
}
