<template>
  <el-dialog
    :model-value="showDialogVariable"
    :title="$t('msg.theme.themeChange')"
    width="30%"
    @close="handleClose"
  >
    <!-- 取色器 -->
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker v-model="color" :predefine="predefineColors" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click.stop="handleClose">{{
          $t('msg.universal.cancel')
        }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
import { predefineColors } from '@/common/common.js'
import { generateNewStyle, writeStyleToHearTag } from '@/utils/theme.js'
const store = useStore()
defineProps({
  showDialogVariable: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['closeDialog'])
// 关闭模态框
const handleClose = () => {
  // 触发一个自定义的事件 closeSDialog
  emits('closeDialog')
}

// 取色器选中的颜色 主题色 刷新不能掉 其他地方需要使用主题颜色 vuex localStoreage

const color = ref(store.getters.theme_color)

// 切换按钮
const confirm = async () => {
  // 1.保存主题色
  store.commit('theme/setMyColor', color.value)
  // 2.替换element和本地的样式 让主题色生效
  /*
    1.获取所有的element 的样式
    2.讲样式中的 情景颜色替换成color.value
        color基本色 -->生成一系列的和他想进的请景色
    3.将替换玩的样式插入到header中，利用css的优先级让插入的样式生效
  */
  //  2-1 生成最终要替换的颜色
  const newStyle = await generateNewStyle(color.value)
  // 2-2
  writeStyleToHearTag(newStyle)
  // 3.关闭dialog
  emits('closeDialog')
}
</script>
<style lang="scss" scoped>
.content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
