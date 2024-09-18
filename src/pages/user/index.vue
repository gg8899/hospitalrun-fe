<script setup lang="ts">
import { HomeFilled, Grid, Document, Setting, Warning, Search } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue'

const $router = useRouter()
const $route = useRoute()

const changeMenu = (path: string) => {
  console.log($route.path);
  $router.push(path)

}


onMounted(() => {
});
</script>

<template>
  <div class="user">
    <el-row :gutter="20">
      <el-col :span="4">
        <h5 class="mb-2"><el-icon color="#666">
            <HomeFilled />
          </el-icon>
          <span> / 会员中心</span>
        </h5>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
          <el-menu-item index="/user/certification" @click="changeMenu('/user/certification')">
            <el-icon>
              <Grid />
            </el-icon>
            <span>实名认证</span>
          </el-menu-item>
          <el-menu-item index="/user/order" @click="changeMenu('/user/order')">
            <el-icon>
              <Document />
            </el-icon>
            <span>挂号订单</span>
          </el-menu-item>
          <el-menu-item index="/user/manage" @click="changeMenu('/user/manage')">
            <el-icon>
              <Setting />
            </el-icon>
            <span>就诊人管理</span>
          </el-menu-item>
          <el-menu-item index="/user/accInfo" @click="changeMenu('/user/accInfo')">
            <el-icon>
              <Warning />
            </el-icon>
            <span>账户信息</span>
          </el-menu-item>
          <el-menu-item index="/user/feedback" @click="changeMenu('/user/feedback')">
            <el-icon>
              <Search />
            </el-icon>
            <span>意见反馈</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>


<style scoped lang="scss">
.user {
  margin-top: 20px;
  h5 {
    margin-bottom: 20px;
  }
}
</style>