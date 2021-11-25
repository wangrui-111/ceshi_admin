<template>
  <div class="">个人中心</div>
  <div class="demo-pagination-block">
    <p>{{ $t('msg.login.title') }}</p>
    <el-pagination :page-size="1" layout="total, prev, pager, next" :total="10">
    </el-pagination>
  </div>
</template>

<script setup>
import {} from 'vue'
// const currentPage1 = 7
// v-model:currentPage="currentPage1"
</script>

<style lang="scss" scoped></style>
