<template>
  <!-- el-icon -->
  <i :class="icon" v-if="icon.includes('el-icon')"></i>
  <!-- svg 组件 -->
  <svg-icon :iconName="icon" className="sideClass" v-else />
  <span>{{ getTitle(title) }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
import { getTitle } from '@/utils/i18n.js'
// const props = defineProps({
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
// console.log(props)
</script>

<style lang="scss" scoped>
.sideClass {
  margin-right: 10px;
  margin-left: 3px;
  // border: 1px solid red;
  vertical-align: middle;
  // padding: 20px 20px 20px 20px;
}
</style>
