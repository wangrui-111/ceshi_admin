<template>
  <div class="login-continer">
    <el-form
      class="long-form"
      :model="loginForm"
      :rules="loginRules"
      ref="loginRef"
    >
      <div class="title-container">
        <h1 class="Litle">用户登录</h1>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon iconName="user"> </svg-icon>
        </span>

        <el-input
          placeholder="username"
          v-model="loginForm.username"
          name="username"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon iconName="clock"> </svg-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          :type="flag ? 'password' : 'text'"
          v-model="loginForm.password"
        ></el-input>
        <span @click="toggleIcon" class="svg-openclose">
          <svg-icon
            :iconName="flag ? 'closeEyes' : 'openEyes'"
            class="svg"
          ></svg-icon>
        </span>
        <!-- <span>
          <svg-icon iconName="openEyes"></svg-icon>
        </span> -->
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%; margin-top: 30px"
        @click="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { passwordValidate } from './rule'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 表单验证
const loginRules = {
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '账号必须填写'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: passwordValidate()
    }
  ]
}

const flag = ref(true)
const toggleIcon = () => {
  flag.value = !flag.value
}
// 登录
// 怎么引用dom
const loginRef = ref(null)
const store = useStore()
const router = useRouter()
const handleLogin = () => {
  // 验证一次表单的信息是否合法
  loginRef.value.validate((validate) => {
    if (!validate) {
      return
    }
    // 验证登录通过执行登录逻辑 调用定义好的
    store.dispatch('user/login', loginForm.value).then((res) => {
      router.push({
        name: 'Index'
      })
    }) // 异步请求 OK no
  })
}
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

      .default {
        width: 15px;
        margin-top: 13px;
        fill: #889aa4;
      }
    }
    .svg-openclose {
      // padding: 6px 5px 5px 15px;
      overflow: hidden;
    }
    .svg {
      width: 20px;
      height: 20px;
      margin-top: 1px;
      fill: #889aa4;
    }
  }
}
</style>
