<template>
  <div class="login-continer">
    <el-form class="long-form">
      <div class="title-container">
        <h1 class="Litle">用户登录</h1>
      </div>

      <el-form-item>
        <span class="svg-container">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>

        <el-input placeholder="username" name="username" type="text"></el-input>
      </el-form-item>
      <el-form-item>
        <span class="svg-container">
          <el-icon>
            <Avatar />
          </el-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          type="password"
        ></el-input>

        <span class="svg-container">
          <el-icon class="no-inherit">
            <Avatar />
          </el-icon>
        </span>
      </el-form-item>
      <el-button type="primary" style="width: 100%; margin-top: 30px"
        >登录</el-button
      >
    </el-form>
    <img :src="svg" />
    <Demo></Demo>
    <Adeir />
  </div>
</template>

<script setup>
import { Avatar } from '@element-plus/icons'
import Demo from './Demo.vue'
import Adeir from './Adeir.vue'
import svg from '@/icons/user.svg'
console.log(svg)
</script>
<style scoped lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gary: #eee;
$cursor: #fff;
.d {
  width: 200px;
  height: 200px;
  background-color: red;
  // 样式穿透  但是子组件必须只能有一个根节点，如果有多高就不会实现
  // 一般情况下样式穿透放到父集上如果子集都需要样式穿透的话放到父集上
  ::v-deep .p {
    color: blue;
  }
}
.login-continer {
  min-height: 100%;
  width: 100%;
  height: 100vh;
  background-color: $bg;
  overflow: hidden;

  .long-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 100px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);

      .el-input {
        height: 47px;
        width: 85%;

        .el-input__inner {
          background-color: transparent;
          border: 0px;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $cursor;
          height: 47px;
          // 光标颜色
          caret-color: $cursor;
        }
      }
    }
    .title-container {
      position: relative;
      .Litle {
        font-size: 26px;
        color: $dark_gray;
        margin: 0 auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
    .svg-container {
      padding: 6px 5px 5px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }
  }
}
</style>
