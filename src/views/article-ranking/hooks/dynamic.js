import { ref, watch } from 'vue'
import { watchLang } from '@/utils/i18n.js'
// 所有的列数据 静态导入
import getDynamicData from './dynamicData'
export const dynamicData = ref(getDynamicData())
// 所有的列数据

export const selectDynamicLabel = ref([])

// 默认勾选所有的列
const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
}
initSelectDynamicLabel()

// 监听切换语言
watchLang(() => {
  dynamicData.value = getDynamicData()
  initSelectDynamicLabel()
})
// 表格的列数据
export const tableLabels = ref([])

// 监听选择的列
watch(
  selectDynamicLabel,
  (val, old) => {
    // 执行表格列的渲染
    tableLabels.value = dynamicData.value.filter((item) =>
      val.includes(item.label)
    )
    console.log(tableLabels.value, '000000000')
  },
  {
    immediate: true
  }
)
