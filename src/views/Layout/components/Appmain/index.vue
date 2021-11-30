<template>
  <div class="app-main">
    <!-- 二级路由 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isNoTag } from '@/utils/tag.js'
import { useStore } from 'vuex'
import { getTitle as getTitle_, watchLang } from '@/utils/i18n.js'
// 监听当前路由变化 ---->增加tag到指定位置
// import Tag from '@/components/Tag/index.vue'
const route = useRoute()
const store = useStore()
const getTitle = (to) => {
  if (!to.meta || !to.meta.title) {
    // 如果不存在title
    const tmp = to.path.splite('/')
    return tmp[tmp.length - 1]
  } else {
    // 如果存在title 以path的最后一项作为他的title
    return getTitle_(to.meta.title)
  }
}
watch(
  route,
  (to, from) => {
    if (isNoTag(to.path)) {
      return true
    }
    // 合法的tag到 vuex
    const { path, fullPath, meta, name, parmas, query } = to
    store.commit('tag/addTagViewList', {
      path,
      fullPath,
      meta,
      name,
      parmas,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)
// 当国际化切换
watchLang(() => {
  // 重新更新vuex中的title的值
  const tmpArr = []
  store.getters.tagViewList.forEach((route, index) => {
    tmpArr.push({ ...route, title: getTitle(route) }) // 不能使用 getTitle_(route)
  })
  store.commit('tag/changeTitle', tmpArr)
})
</script>
<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  // padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
