<template>
  <div class="">
    <input type="text" v-focus />
    <div v-pos:left="num" class="d">xxxxxx</div>
    <button @click="change">change{{ num }}</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    },
    pos: {
      mounted(el, binding) {
        console.log(binding.value)
        el.style[binding.arg] = binding.value + 'px'
      },
      updated(el, binding) {
        el.style[binding.arg] = binding.value + 'px'
      }
    }
  },
  setup() {
    const num = ref(200)
    const change = () => {
      num.value = 400
    }
    return { num: num, change }
  }
}
</script>

<style>
.d {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: red;
}
</style>
