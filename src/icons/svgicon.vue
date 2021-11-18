<template>
  <svg aria-hidden="true" class="default" :style="props.style">
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
  style: {
    type: String
  }
})
const iconName = computed(() => {
  return `#icon-${props.iconName}`
})
</script>
<style scoped lang="scss">
.default {
  width: 25px;
  height: 25px;
}
</style>
