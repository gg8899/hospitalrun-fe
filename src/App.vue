<script setup lang="ts">
import useUserStore from '@/store/module/user'
const userStore = useUserStore()

</script>

<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HispitalTop />
    <div class="content">
      <!-- 展示路由组件的区域 -->
      <router-view></router-view>
    </div>
    <HispitalBottom />
    <!-- 登录组件 -->
    <Login v-if="userStore.visiable" />
  </div>
</template>


<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 70px;
    min-height: 700px;
    width: 1100px;
    // background-color: red;
  }
}
</style>