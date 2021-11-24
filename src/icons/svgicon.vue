<template>
  <svg aria-hidden="true" :class="getClassName" :style="props.style">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  iconName: {
    type: String,
    require: true
  },
  className: {
    type: String
  }
})
const iconName = computed(() => {
  return `#icon-${props.iconName}`
})
const getClassName = computed(() => {
  if (props.className) {
    // 如果传了className ==》defaultSvgClass sideClass
    return `defaultSvgClass ${props.className}`
  } else {
    return 'defaultSvgClass'
  }
})
</script>
<style scoped lang="scss">
.defaultSvgClass {
  width: 1.2em;
  height: 1.2em;
  fill: currentColor;
  // vertical-align: -0.15em;
  overflow: hidden;
  margin-right: 10px;
}
</style>
