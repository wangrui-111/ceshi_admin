<template>
  <div>
    <el-card class="toggle">
      <el-button type="primary" @click="toggle">{{
        isShowChildren
          ? $t('msg.role.toggleTittle2')
          : $t('msg.role.toggleTittle1')
      }}</el-button>
    </el-card>
    <el-card>
      <el-table
        ref="table"
        :data="permissionData"
        style="width: 100%; margin-bottom: 20px"
        border
        row-key="id"
        :default-expand-all="isShowChildren"
        :tree-props="{ children: 'children' }"
        :header-cell-style="{
          background: store.getters.cssVar['light-1'],
          fontWeight: 900,
          color: '#eee'
        }"
      >
        <el-table-column
          prop="permissionName"
          :label="$t('msg.permission.name')"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getAllPermissions } from '@/api/permission.js'
import { useStore } from 'vuex'
const store = useStore()
const permissionData = ref([])
/*eslint-disable*/
/*
权限分类
[
  { --->页面权限 （一级）1.能在左边的菜单看到这个选项，2可以点击进入当前组价
    children:[
      {}-->该页面中的操作权限 （二级） -->
    ]
  }
]
*/

const initPermission = async () => {
  const data = await getAllPermissions()
  permissionData.value = data
}
initPermission()
// 全部展开和收起二级菜单
const isShowChildren = ref(false)
const table = ref(null)
const toggle = () => {
  isShowChildren.value = !isShowChildren.value
  // 展开二级tr
  permissionData.value.forEach((row) => {
    table.value.toggleRowExpansion(row, isShowChildren.value)
  })
}
// 修改二级菜单的背景
const childreBgColor = ref(store.getters.cssVar['light-6'])
// 修改hove 状态的背景
const hoverBgColor = ref(store.getters.cssVar['light-3'])

watch(
  () => {
    return store.getters.cssVar
  },
  () => {
    childreBgColor.value = store.getters.cssVar['light-6']
    hoverBgColor.value = store.getters.cssVar['light-3']
  }
)
// 如果语言切换了 重新请求接口
watch(
  () => {
    return store.getters.language
  },
  () => {
    initPermission()
  }
)
</script>

<style lang="scss" scoped>
:deep(.el-table__row--level-1 > td) {
  background-color: v-bind(childreBgColor);
}
:deep(.el-table__body tr:hover > td) {
  background-color: v-bind(hoverBgColor) !important;
  color: #fff;
}
.toggle {
  text-align: right;
  margin-bottom: 20px;
}
</style>
