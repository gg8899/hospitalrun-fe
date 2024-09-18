<template>
    <div class="order_container">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>挂号订单</span>
                </div>
            </template>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="就诊人">
                    <el-select v-model="formInline.patientId" placeholder="请选择就诊人" clearable>
                        <el-option label="请选择全部就诊人" value=""></el-option>
                        <el-option v-for="item in patientList" :key="item.id" :value="item.id" :label="item.contactsName" />
                    </el-select>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="formInline.orderStatus" placeholder="请选择订单状态" clearable>
                        <el-option label="请选择全部订单状态" value="" />
                        <el-option v-for="item in orderStatusList" :value="item.status" :label="item.comment"
                            :key="item.status" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="reserveDate" label="就诊时间" />
                <el-table-column prop="hosname" label="医院" />
                <el-table-column prop="depname" label="科室" />
                <el-table-column prop="title" label="医生" />
                <el-table-column prop="number" label="服务费" />
                <el-table-column prop="patientName" label="就诊人" />
                <el-table-column prop="param.orderStatusString" label="订单状态" />
                <el-table-column prop="opr" label="操作">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="goDetils(scope.row.id)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" layout="prev, pager, next, jumper"
                :total="tableData.length" @size-change="handleChange" @current-change="handleChange" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reqOrderList, reqPaientList, reqOrderStatusList } from '@/apis/user/index'
import { UserOrderInfoResponseData, Records, AllUserResponseData, AllUser, AllOrderStatusResponseData, AllOrderStatus } from '@/apis/user/type'

import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const $router = useRouter()
const formInline = reactive({
    patientId: '',
    orderStatus: '',
})
const tableData = ref<Records>([])
const patientList = ref<AllUser>([])
const orderStatusList = ref<AllOrderStatus>([])
const pageNo = ref<number>(1)
const limit = ref<number>(10)
onMounted(() => {
    getPaientList()
    getOrderStatusList()
    handleChange()
})
// 获取病人列表
const getPaientList = async () => {

    const result: AllUserResponseData = await reqPaientList()
    if (result.code === 200) {
        patientList.value = result.data
    }

}
const getOrderStatusList = async () => {

    const result: AllOrderStatusResponseData = await reqOrderStatusList()
    if (result.code === 200) {
        orderStatusList.value = result.data
    }

}
const handleChange = async (orderStatus: string = '', patientId: string = '') => {

    const result: UserOrderInfoResponseData = await reqOrderList(pageNo.value, limit.value, orderStatus, patientId)
    if (result.code === 200) {
        tableData.value = result.data.records
    }

}
const onSubmit = () => {
    console.log(formInline);
    const { orderStatus, patientId } = formInline
    handleChange(orderStatus, patientId)
}
// 携带id跳转至详情页面
const goDetils = (id: string) => {
    $router.push({ path: '/user/order', query: { orderId: id } })
}
</script>

<style scoped lang="scss">
.order_container {
    width: 100%;

}
</style>