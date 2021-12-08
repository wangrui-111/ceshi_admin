<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="dialogShow"
    @close="close"
    width="30%"
  >
    <el-input
      :model-value="filename"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <!-- 选择下载的页码 -->
    <slot></slot>
    <template #footer>
      <el-button @click="close">{{ $t('msg.excel.close') }}</el-button>
      <el-button type="primary" @click="exportExcel">{{
        $t('msg.excel.confirm')
      }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import { exportJsonToExcel } from '@/utils/Export2Excel.js'

const props = defineProps({
  dialogShow: {
    type: Boolean,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  header: {
    type: Array,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: '下载失败'
  }
})
console.log(props)
const emit = defineEmits(['close'])
const close = () => {
  emit('closeDialog')
}

// 导出业务执行
const exportExcel = () => {
  // 1.文件名不选的话应该有默认值
  // 2.导出全部excel 数据
  // 3.利用工具 将服务器返回用户数据 --》 转化成excel 数据--》形成excel 文件

  // 4.下载该文件
  exportJsonToExcel({
    header: props.header,
    data: props.data,
    filename: props.filename,
    merges: true,
    autoWidth: true,
    bookType: 'xlsx'
  }).then((res) => {
    ElMessage.success(props.message)
  })

  // 5.关闭dialog
  close()
  // 6.
}
</script>

<style lang="scss" scoped></style>
