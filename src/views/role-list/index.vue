<template>
  <div>
    <el-card>
      <theme-table :cbs="cbs">
        <template #default="{ headerStyleObj }">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :header-cell-style="headerStyleObj"
            ref="table"
            row-key="id"
          >
            <!-- 展开行显示角色下面的权限 -->
            <el-table-column type="expand" label=" > ">
              <template #default="{ row }">
                <div class="tags">
                  <el-tag
                    size="mini"
                    class="cursor"
                    v-for="item in getAllPermissions_"
                    :key="item.id"
                    :class="isActive(item, row)"
                    @click="upUserPermission(row, item)"
                    >{{ item.title }}
                    <svg-icon iconName="close" class="el-icon-close"></svg-icon>
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('msg.role.index')"
              type="index"
              width="160"
            ></el-table-column>
            <el-table-column
              :label="$t('msg.role.name')"
              prop="title"
              width="200"
            ></el-table-column>
            <el-table-column
              :label="$t('msg.role.desc')"
              prop="describe"
            ></el-table-column>
            <el-table-column :label="$t('msg.role.action')">
              <template #default="{ row }">
                <el-badge
                  type="primary"
                  :value="row.permissions ? row.permissions.length : 0"
                >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="showeditPermission(row)"
                    >{{ $t('msg.role.assignPermissions') }}</el-button
                  >
                </el-badge>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </theme-table>
    </el-card>
    <!-- 角色修改权限 模态框 -->
    <edit-permission
      v-if="isShowDialog"
      :isShowDialog="isShowDialog"
      @close="isShowDialog = false"
      :roleId="selectRoleId"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import ThemeTable from '@/components/ThemeTable/index.vue'
import EditPermission from './components/EditPermission.vue'
import { useStore } from 'vuex'
// import { deleteItem } from '../../utils/storage'
// import { ROLE, PERMISSION, PERMISSION_ } from '../../common/common'
// import { getPermissionByRoleId, updatePermissionByRoleId } from '@/api/role.js'
// import { ElMessage } from 'element-plus'
// import { useI18n } from 'vue-i18n'

// const i18n = useI18n()

// 初始化角色列表
// const table = ref(null)
const tableData = ref([])
const store = useStore()
const getAllRoles = () => {
  // 获取所有的角色 roles
  store.dispatch('roleAndPermission/initRoles')
  // 获取所有的权限列表
  store.dispatch('roleAndPermission/initPermissions').then((res) => {
    tableData.value = store.state.roleAndPermission.roles
  })
  // setTimeout(()=>{},1000)
}
getAllRoles()
watch(
  () => {
    return store.state.roleAndPermission.roles
  },
  () => {
    tableData.value = store.state.roleAndPermission.roles
  },
  {
    immediate: true
  }
)

// 语言切换
const cbs = [
  () => {
    store.dispatch('roleAndPermission/clearRoleAndPermission')
  },
  getAllRoles
]
// // 修改权限
const isShowDialog = ref(false)
const selectRoleId = ref('')

const showeditPermission = (row) => {
  isShowDialog.value = true
  selectRoleId.value = row.id
}
// // 获取所有的权限
const getAllPermissions_ = computed(() => {
  return store.state.roleAndPermission.permissions_
})

watch(
  () => {
    return store.state.roleAndPermission.roles
  },
  () => {
    getAllPermissions_.value = store.state.roleAndPermission.permissions_
  },
  {
    immediate: true
  }
)

// // 该权限是否选中

const isActive = (item, row) => {
  // console.log(item, 'qqqqq')
  const index = row.permissions.findIndex((per) => item.id === per.id)
  // console.log(index, '2')
  if (index >= 0) {
    return ''
  } else {
    return 'no-active'
  }
}
// // 判断用户某个权限是否在permission_ 中包含
// const ishasPermiss = (row, onepermiss) => {
//   let arr = []
//   row.permissions.map((item) => (arr = [...arr, item.id]))
//   arr = [...new Set(arr)]
//   if (arr.findIndex((item) => String(item) === String(onepermiss.id)) === -1) {
//     return false
//   } else {
//     return true
//   }
// }
// // 点击切换权限时的事件
// const upUserPermission = async (row, onepermiss) => {
//   console.log(ishasPermiss(row, onepermiss))
//   let res = await getPermissionByRoleId(row.id)
//   res = [...new Set(res)]
//   if (ishasPermiss(row, onepermiss)) {
//     const index = res.findIndex((item) => item === onepermiss.id)
//     res.splice(index, 1)
//   } else {
//     res.push(onepermiss.id)
//   }
//   clickToggleupPermissFn(row, res)
//   console.log(res, 'res')
//   console.log(onepermiss.id)
// }
// // 点击切换后更新服务器数据函数
// const clickToggleupPermissFn = (row, arr) => {
//   // 更新该角色权限
//   updatePermissionByRoleId({
//     roleId: row.id,
//     permissions: arr
//   })
//     .then(() => {
//       // 更新本地角色中 的添加属性permissions
//       store.commit('roleAndPermission/updatePermissonToRole', {
//         roleId: row.id,
//         permissionArray: arr
//       })
//       ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
//       // 展开当前行
//       // table.value.toggleRowExpansion(row, true)
//     })
//     .catch(() => {
//       ElMessage.success('更新角色权限失败')
//     })
// }
</script>

<style lang="scss" scoped>
.tags {
  text-align: center;
  width: 100%;
  .cursor {
    cursor: pointer;
    padding: 5px 0px 23px 8px;
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: -3px;
      margin-left: -1px;
      border-radius: 50%;
      text-align: right;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
  span {
    margin-left: 30px;
  }
  .no-active {
    background-color: orangered !important;
    color: #fff;
  }
}
</style>
