<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Carousel from './carousel/index.vue'
import Search from './search/index.vue'
import Level from './level/index.vue'
import Region from './region/index.vue'
import Card from './card/index.vue'
import Tip from './tip/index.vue'

import { reqHospitalPage } from '@/apis/home/index'
import type { Content, HospitalResponseData } from '@/api/home/type.ts'

// 请求的参数
const current = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const page = ref<Content>([])
const hostype = ref<string>('')
const districtCode = ref<string>('')

onMounted(() => {
  // 获取医院的分页数据
  getHospitalPage()

})
// 获取医院的分页数据u
const getHospitalPage = async () => {
  const result: HospitalResponseData = await reqHospitalPage(current.value, pageSize.value, hostype.value, districtCode.value)
  // console.log(result, 'data');
  if (result.code === 200) {
    page.value = result.data.content;
    total.value = result.data.totalElements;
    pageSize.value = result.data.size;
    current.value = result.data.number + 1;
  }
}
const handleChange = () => {
  getHospitalPage()
}
const sizeChange = () => {
  current.value = 1
  getHospitalPage()
}
const getLevel = (level: string) => {
  hostype.value = level
  // console.log(level, 'getLevel');
  getHospitalPage()
}

const getRegion = (level: string) => {
  districtCode.value = level
  // console.log(level, 'getRegion');
  getHospitalPage()
}
</script>

<template>
  <Carousel />
  <Search />
  <!-- 底部医院的内容 -->
  <div class="footer">
    <el-row :gutter="20">
      <el-col :span="20">
        <!-- 医院level部分 -->
        <Level @getLevel="getLevel" />
        <Region @getRegion="getRegion" />

        <!-- 展示医院的结构 -->
        <div class="list" v-if="page.length > 0">
          <Card class="item" v-for="(item, index) in page" :key="index" :hospitalInfo="item" />
        </div>
        <el-empty description="暂无数据" v-else="page.length===0" />
        <!--分页器  -->
        <el-pagination v-model:current-page="current" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
          :background="true" layout="prev, pager, next, jumper,->, sizes,total " :total="total"
          @size-change="handleChange" @current-change="sizeChange" />
      </el-col>
      <el-col :span="4">
        <Tip />
      </el-col>
    </el-row>
  </div>
</template>


<style scoped lang="scss">
.footer {
  .list {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
      width: 48%;
      margin-bottom: 20px;
    }
  }
}
</style>