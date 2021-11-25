<template>
  <div>
    <el-config-provider :locale="language">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
const store = useStore()

const language = computed(() => {
  return store.getters.language === 'zh' ? zhCn : en
})
</script>
<style lang="scss" scoped></style>
