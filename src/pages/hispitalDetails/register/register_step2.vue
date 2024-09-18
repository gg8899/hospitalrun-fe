<template>
    <div class="reg_details2">
        <h1>确认挂号信息</h1>
        <div class="pepople">
            <!-- <Vistor :users="users" :currentIndex="currentIndex" @changeVisitor="changeVisitor" /> -->
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>请选择就诊人</span>
                        <el-button type="primary" :icon="User" @click="addPatient">添加就诊人</el-button>
                    </div>
                </template>
                <div class="pp_list">
                    <Vistor class="pp_item" v-for="(item, index) in users" :item="item" :currentIndex="currentIndex"
                        :index="index" @changeVisitor="changeVisitor" />
                </div>

            </el-card>
        </div>
        <div class="pepopleInfo">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>挂号信息</span>
                    </div>
                </template>
                <el-descriptions class="margin-top" :column="2" border>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊日期：
                            </div>
                        </template>
                        {{ doctorInfo.workDate }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊医院：
                            </div>
                        </template>

                        {{ doctorInfo.param?.hosname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                就诊科室：
                            </div>
                        </template>
                        {{ doctorInfo.param?.depname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生姓名：
                            </div>
                        </template>
                        {{ doctorInfo.docname }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生职称：
                            </div>
                        </template>
                        {{ doctorInfo.title }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生专长：
                            </div>
                        </template>
                        {{ doctorInfo.skill }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                医生服务费：
                            </div>
                        </template>
                        <span style="color: red">{{ doctorInfo.amount }}</span>
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
            <div class="sumBottom">
                <el-button :disabled="currentIndex === -1" type="primary" @click="executeOrder">确认挂号</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Vistor from '@/components/register_vistor/index.vue'
import { reqGetUser, reqDoctorInfo } from '@/apis/details/index'
import { reqExecuteOrder } from '@/apis/user/index'
import { CodeInfo } from '@/apis/user/type'
import { UserResponseData, DoctorInfoData, UserArr, Doctor } from '@/apis/details/type'
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { User, Edit } from '@element-plus/icons-vue';
const users = ref<UserArr>([])
const doctorInfo = ref<Doctor>({} as Doctor)
const $route = useRoute()
const $router = useRouter()
const currentIndex = ref<number>(-1)
onMounted(() => {
    getUser()
    getDoctorInfo()
})
const getUser = async () => {
    const result: UserResponseData = await reqGetUser()
    if (result.code === 200) {
        currentIndex.value = -1
        users.value = result.data
    }
}
const getDoctorInfo = async () => {
    const result: DoctorInfoData = await reqDoctorInfo($route.query.docId as string)
    if (result.code === 200) {
        doctorInfo.value = result.data
    }
}
// 选择就诊人
const changeVisitor = (index: number) => {
    currentIndex.value = index

}
// 生成订单
const executeOrder = async () => {
    //医院编号
    let hoscode = doctorInfo.value.hoscode;
    //医生的ID
    let scheduleId = doctorInfo.value.id;
    //就诊人的ID
    let patientId = users.value[currentIndex.value].id;
    console.log(hoscode, scheduleId, patientId, 'hoscode, scheduleId, patientId');

    const result: CodeInfo = await reqExecuteOrder(hoscode, scheduleId, patientId)
    // 提交订单成功
    if (result.code == 200) {
        $router.push({ path: "/user/order", query: { orderId: result.data } });
    } else {
        ElMessage({
            type: "error",
            message: result.message,
        });
    }
}
// 添加就诊人
const addPatient = () => {
    $router.push({ path: '/user/manage', query: { type: 'add' } })
}


</script>

<style scoped lang="scss">
.reg_details2 {
    >h1 {
        font-weight: 700;
        color: #7f7f7f;
        font-size: 22px;
    }

    .pepople {
        margin-top: 30px;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .pp_list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;

            .pp_item {
                cursor: pointer;
                margin: 10px 3px;
                width: 32%;
                border: 1px solid #c4c4c4;


            }
        }


    }

    .pepopleInfo {
        margin-top: 30px;
    }

    .sumBottom {
        margin: 20px auto;
        text-align: center;
    }
}
</style>