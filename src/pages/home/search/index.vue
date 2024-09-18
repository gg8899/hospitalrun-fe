<template>
    <div class="search">
        <el-autocomplete v-model="hosname" :fetch-suggestions="querySearchAsync" placeholder="请输入医院名称"
            :trigger-on-focus="false" @select="goDetail" />
        <el-button :icon="Search" type="primary" />
    </div>
</template>

<script setup lang="ts">
import {
    Search,
} from '@element-plus/icons-vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { reqHospitalInfo } from '@/apis/home'
import { HospitalInfo } from '@/apis/home/type'
const $router = useRouter()
const hosname = ref<string>('')

//点击某一个推荐项
const goDetail = (item: any) => {
    // console.log(item, 'item');

    //点击推荐项目进入医院详情页,将来需要携带query参数(医院的编码)
    $router.push({ path: "/details/register", query: { hoscode: item.hoscode } });
};
// 获取关键字查询内容
const querySearchAsync = async (value: string, cb: any) => {
    hosname.value = value
    // getList()
    const result: HospitalInfo = await reqHospitalInfo(hosname.value)
    if (result.code === 200) {
        const list = result.data.map(item => ({
            value: item.hosname,
            hoscode: item.hoscode, //存储医院的编码
        }))
        cb(list)
    }
}
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;

    ::v-deep(.el-input__wrapper) {
        // 深度选择器
        width: 400px;
        margin-right: 10px;
    }
}
</style>