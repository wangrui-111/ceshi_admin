<template>
  <div>
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel" :min="2">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :key="index"
            :label="item.label"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <theme-table :cbs="[]">
        <template #default="{ headerStyleObj }">
          <el-table
            border
            :header-cell-style="headerStyleObj"
            :data="tableData"
          >
            <el-table-column
              v-for="(item, index) in tableLabels"
              :key="index"
              :label="item.label"
              :prop="item.prop"
              :show-overflow-tooltip="true"
            >
              <template #default="{ row }" v-if="item.prop === 'publicDate'">{{
                $filters.relativeTime(row.publicDate)
              }}</template>
              <template #default="{ row }" v-else-if="item.prop === 'action'">
                <el-button
                  size="mini"
                  type="primary"
                  @click="showArticle(row)"
                  >{{ $t('msg.article.show') }}</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="removeArticle(row)"
                  >{{ $t('msg.article.remove') }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </theme-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[5, 10, 20, 50]"
        :total="total"
        layout="total,sizes, prev, pager, next,jumper"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import { getArticleList } from '@/api/article.js'
import ThemeTable from '@/components/ThemeTable/index.vue'
import { watchLang } from '@/utils/i18n.js'
// ----------------------------动态列业务 -------------------------
import {
  selectDynamicLabel,
  dynamicData,
  tableLabels
} from './hooks/dynamic.js'
// const { selectDynamicLabel } = dynamic

// ----------------------------表格基础渲染 -------------------------

const page = ref(1)
const size = ref(5)
const total = ref(0)
// 改变当前页
const pageChange = (page_) => {
  page.value = page_
  getArticle()
}
const sizeChange = (size_) => {
  size.value = size_
  getArticle()
}
// 改变页大小
const tableData = ref([])
const getArticle = async () => {
  const data = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = data.list
  total.value = data.total
}
getArticle()
// 查看详情
const showArticle = (row) => {}
// // 删除文章
const removeArticle = (row) => {}
// 进入组件keep-alive 执行onActivated钩子函数
onActivated(getArticle)
// 语言切换
watchLang(getArticle)
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 20px;
  .dynamic-box {
    display: flex;
    align-items: center;
    .title {
      margin-right: 20px;
      font-size: 14px;
      font-weight: 900;
    }
  }
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
