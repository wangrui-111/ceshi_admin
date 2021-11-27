<template>
  <div>
    <svg-icon
      :iconName="isScreenFull ? 'exit-fullscreen' : 'fullscreen'"
      @click="toggleScreenFull"
      className="screenIcon"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import screenfull from 'screenfull'
const isScreenFull = ref(false)
const toggleScreenFull = () => {
  isScreenFull.value = !isScreenFull.value
  // 使用screenfull 插件完成全屏的切换
  screenfull.toggle() // 默认body
}
</script>

<style lang="scss" scoped>
.screenIcon {
  font-size: 1.4em;
  // 改颜色
  fill: currentColor;
  color: #4a4a4a;
}
</style>
