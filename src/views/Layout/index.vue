<template>
  <div
    class="app-wrapper"
    :class="store.getters.sideBarOpen ? '' : 'hideSidebar'"
  >
    <!-- 侧边栏 -->
    <side-bar
      class="sidebar-container"
      :style="{ background: store.getters.cssVar.menuBg }"
    />
    <!-- 右边 -->
    <div class="main-container">
      <div class="fixed-header">
        <nav-bar />
        <!-- tag view -->
        <tag-view></tag-view>
      </div>

      <app-main class="appmain" />
    </div>
  </div>
</template>
<script setup>
import SideBar from './components/Sidebar/index.vue'
import NavBar from './components/Navbar/index.vue'
import AppMain from './components/Appmain/index.vue'
import TagView from '@/components/TagView/index.vue'

import { useStore } from 'vuex'
const store = useStore()
</script>
<style lang="scss" scoped>
@import '~@/styles/common.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.fixed-header {
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 10;
  width: calc(100% - #{$sideBarWidth}); // 用来动态计算宽度的
  transition: 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$sideBarhideWidth});
  transition: 0.28s;
}
</style>
