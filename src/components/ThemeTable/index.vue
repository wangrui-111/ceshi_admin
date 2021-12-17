<template>
  <div>
    <slot :headerStyleObj="headerStyleObj" />
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue'
import { useStore } from 'vuex'
import { watchLang } from '@/utils/i18n.js'

const store = useStore()
// 表头样式
const headerStyleObj = ref({
  background: store.getters.cssVar['light-1'],
  color: '#eee',
  fontWeight: 900
})
// 修改二级菜单的背景
const childreBgColor = ref(store.getters.cssVar['light-6'])
// 修改hove 状态的背景
const hoverBgColor = ref(store.getters.cssVar['light-3'])
const badgeColorHover = ref(store.getters.cssVar.primary)
const badgeColor = ref(store.getters.cssVar['light-4'])
watch(
  () => {
    return store.getters.cssVar
  },
  () => {
    childreBgColor.value = store.getters.cssVar['light-6']
    hoverBgColor.value = store.getters.cssVar['light-3']
    headerStyleObj.value.background = store.getters.cssVar['light-1']
    badgeColorHover.value = store.getters.cssVar['light-1']
    badgeColor.value = store.getters.cssVar['light-4']
  }
)
// 公共业务
// 1.当语言切换的时候 重新调用表格
const props = defineProps({
  cbs: {
    type: Array,
    validator: (cbs) => {
      // cbs 必须是一个数组
      if (Array.isArray(cbs)) {
        return cbs.every((item) => typeof item === 'function')
      } else {
        return false
      }
      // 数组中的每一个单元必须是一个函数
    }
  }
})

watchLang(...props.cbs)
</script>

<style lang="scss" scoped>
:deep(.el-table__row--level-1 > td) {
  background-color: v-bind(childreBgColor);
}
:deep(.el-table__body tr:hover > td) {
  background-color: v-bind(hoverBgColor) !important;
  color: #fff;
}
:deep(.el-badge__content.is-fixed) {
  top: 10px;
  background: v-bind(badgeColor);
  &:hover {
    background: v-bind(badgeColorHover);
  }
}
</style>
