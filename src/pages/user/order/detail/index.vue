<template>
    <div class="order_details">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span class="title">挂号详情</span>
                </div>
            </template>
            <div class="content">
                <div class="top">
                    <el-tag class="mx-1" effect="dark" type="success">
                        √ {{ orderDetails.param?.orderStatusString }}
                    </el-tag>
                    <div class="logo">
                        <img src="../../../../assets/code_app.png" alt="">
                        <div class="info">
                            <p>微信 关注 “北京114预约挂号”</p>
                            <p>“快速预约挂号”</p>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <el-descriptions class="margin-top" :column="1" border>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            就诊人信息
                                        </div>
                                    </template>
                                    {{ orderDetails.patientName }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            就诊日期
                                        </div>
                                    </template>
                                    {{ orderDetails.reserveDate }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            就诊医院
                                        </div>
                                    </template>
                                    {{ orderDetails.hosname }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            就诊科室
                                        </div>
                                    </template>
                                    {{ orderDetails.depname }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            医生职称
                                        </div>
                                    </template>
                                    {{ orderDetails.title }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            医事服务费
                                        </div>
                                    </template>
                                    <span style="color: red">{{ orderDetails.number }}</span>
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            挂号单号
                                        </div>
                                    </template>
                                    {{ orderDetails.outTradeNo }}
                                </el-descriptions-item>
                                <el-descriptions-item>
                                    <template #label>
                                        <div class="cell-item">
                                            挂号时间
                                        </div>
                                    </template>
                                    {{ orderDetails.createTime }}
                                </el-descriptions-item>
                            </el-descriptions>
                            <div class="btns" v-if="orderDetails.orderStatus == 0 || orderDetails.orderStatus == 1">
                                <el-button @click="handleCancel()">取消预约</el-button>
                                <el-button type="primary" @click="pay">支付</el-button>
                            </div>
                        </el-col>
                        <el-col :span="14">
                            <el-card class="box-card">
                                <template #header>
                                    <div class="card-header">
                                        <span>注意事项</span>
                                    </div>
                                </template>
                                <div class="tip_content">
                                    <p>1、请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
                                    <p>2、【取号】就诊当天需在{{ orderDetails.fetchTime }}
                                        在医院取号，未取号视为爽约，该号不退不换；</p>
                                    <p>3、【退号】在{{ orderDetails.quitTime }}前可在线退号 ，逾期将不可办理退号退费；</p>

                                    <p>4、北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
                                    </p>

                                    <p>5、请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>

                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
                <el-dialog @close="close" v-model="dialogVisible" title="微信支付" width="500px">
                    <div class="erweima">
                        <img :src="ulr" alt="">
                        <span>请使用微信扫一扫</span>
                        <span>扫描二维码支付</span>
                    </div>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="closeDialog">
                                关闭窗口
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode'
import { OrderDetailsData, Order, QrcodeResponseData } from '@/apis/user/type'
import { reqOrderDetails, reqCancelOrder, reqOrderCode, reqWXPayStatus } from '@/apis/user/index'
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';


const orderDetails = ref<Order>({} as Order)
const orderId = ref<string>('')
const ulr = ref<string>('')
const timer = ref<any>(null)
const dialogVisible = ref<boolean>(false)
const $route = useRoute()
const getOrderDetails = async (id: string) => {
    const result: OrderDetailsData = await reqOrderDetails(id)
    if (result.code === 200) {
        orderDetails.value = result.data
    }
}
onMounted(() => {
    orderId.value = $route.query.orderId as string
    getOrderDetails(orderId.value)
})
// 取消订单
const handleCancel = async () => {
    try {
        await reqCancelOrder(orderId.value)
        ElMessage({
            type: 'success',
            message: '取消成功'
        })
        getOrderDetails(orderId.value)
    } catch (error) {
        ElMessage({
            type: 'error',
            message: '请求失败'
        })
    }
}
// 扫码支付
const pay = async () => {
    dialogVisible.value = true
    const result: QrcodeResponseData = await reqOrderCode(orderId.value)
    ulr.value = await QRCode.toDataURL(result.data.codeUrl)

    // 微信支付状态回调
    timer.value = setInterval(async () => {
        const res = await reqWXPayStatus(orderId.value)
        if (res.data) {
            //关闭对话框
            dialogVisible.value = false;
            //提示信息
            ElMessage({
                type: "success",
                message: "支付成功",
            });
            //清除定时器
            clearInterval(timer.value);
            timer.value = null
            //再次获取订单详情的数据
            getOrderDetails(orderId.value);
        }
    }, 2000)

}
//关闭窗口的回调
const closeDialog = () => {
    console.log(dialogVisible.value, 'dialogVisible.value')
    //关闭对话框,对话框隐藏
    dialogVisible.value = false;
    //清除定时器
    clearInterval(timer.value);
};
//对话框右上角关闭的叉子的回调
const close = () => {
    clearInterval(timer.value);
}
</script>

<style scoped lang="scss">
.order_details {
    width: 100%;

    .title {
        font-weight: 700;
        font-size: 20px;
    }

    .content {
        ::v-deep(.el-dialog__body) {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;

        }

        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #ccc;

            .logo {
                display: flex;
                justify-content: space-between;

                img {
                    width: 40px;
                    height: 40px;
                    margin-right: 10px;
                }

                .info {
                    font-size: 14px;
                    line-height: 20px;
                }
            }
        }

        .bottom {
            margin-top: 20px;

            .tip_content {
                >p {
                    line-height: 25px;
                    font-size: 14px;
                }
            }

            .btns {
                margin-top: 20px;
            }
        }

        .erweima {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            >span {
                margin: 5px 0;
            }
        }
    }
}
</style>