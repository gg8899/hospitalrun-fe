<script setup lang="ts">
import { HomeFilled, Grid, Document, Setting, Warning, Search } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue'
import useDetailStore from "@/store/module/hospitalDetials";
//获取仓库对象
let detailStore = useDetailStore();

const $router = useRouter()
const $route = useRoute()

const changeMenu = (path: string) => {
  // console.log($route.path);
  $router.push(path)

}

//组件挂载完毕:通知pinia仓库发请求获取医院详情的数据，存储仓库当中
onMounted(() => {
  // console.log(detailStore, 'detailStore');

  //获取医院详情的数据
  detailStore.getHospital($route.query.hoscode as string);
  // 获取医院科室数据
  detailStore.getDeparment($route.query.hoscode as string);
});
</script>

<template>
  <div class="details">
    <el-row :gutter="20">
      <el-col :span="4">
        <h5 class="mb-2"><el-icon color="#666">
            <HomeFilled />
          </el-icon>
          <span> / 医院信息</span>
        </h5>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
          <el-menu-item index="/details/register" @click="changeMenu('/details/register')">
            <el-icon>
              <Grid />
            </el-icon>
            <span>预约挂号</span>
          </el-menu-item>
          <el-menu-item index="/details/details" @click="changeMenu('/details/details')">
            <el-icon>
              <Document />
            </el-icon>
            <span>医院详情</span>
          </el-menu-item>
          <el-menu-item index="/details/notice" @click="changeMenu('/details/notice')">
            <el-icon>
              <Setting />
            </el-icon>
            <span>预约通知</span>
          </el-menu-item>
          <el-menu-item index="/details/stop" @click="changeMenu('/details/stop')">
            <el-icon>
              <Warning />
            </el-icon>
            <span>停诊通知</span>
          </el-menu-item>
          <el-menu-item index="/details/search" @click="changeMenu('/details/search')">
            <el-icon>
              <Search />
            </el-icon>
            <span>查询/取消</span>
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
.details {
  margin-top: 20px;
}
</style>