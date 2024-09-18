<template>
    <div class="reg_details">
        <div class="top">
            <h1>{{ workData.baseMap?.hosname }}</h1>
            <div class="line">|</div>
            <div>{{ workData.baseMap?.bigname }}</div>
            <div class="line">·</div>
            <div>{{ workData.baseMap?.depname }}</div>
        </div>
        <div class="middle">
            <h3>{{ workData.baseMap?.workDateString }}</h3>
            <div class="content">
                <div :class="`pCard ${(item.status === 0 && item.availableNumber > 0 || item.status === 1) ? '' : 'gray_bg'} ${curIndex === i && 'check_item'}`"
                    v-for="(item, i) in workData.bookingScheduleList" :key="i" @click="changeCard(i)">
                    <div class="item_top">
                        {{ item.workDate }}-{{ item.dayOfWeek }}
                    </div>
                    <div class="item_bottom">
                        <span v-if="item.status === -1 || item.status === 0 && item.availableNumber === -1">约满了</span>
                        <span v-else-if="item.status === 0 && item.availableNumber > 0">有号({{ item.availableNumber
                        }})</span>
                        <span v-else-if="item.status === 1">即将放号</span>
                    </div>
                </div>
            </div>
            <el-pagination v-model:current-page="pageNo" :total="workData.total" @current-change="getHospitalWork"
                layout="prev, pager, next" />
        </div>
        <div class="bottom">
            <div class="morning">
                <h3>
                    <svg t="1688882419023" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1530" width="26" height="26">
                        <path
                            d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                            fill="#1296db" p-id="1531"></path>
                    </svg>
                    <span>上午号源</span>
                </h3>
                <div class="regisiterItem" v-for="item in morningDocData" :key="item.id">
                    <div class="left">
                        <div class="left_top">
                            <h3>{{ item.title }}</h3>
                            <span>|</span>
                            <h3>{{ item.docname }}</h3>
                        </div>
                        <div class="left_bottom">
                            {{ item.skill }}
                        </div>
                    </div>
                    <div class="right">
                        <div class="money">¥ {{ item.amount }}</div>
                        <el-button @click="gotoRegister(item.id)" type="primary">{{ item.availableNumber }}</el-button>
                    </div>
                </div>
            </div>
            <div class="afternoon">
                <h3>
                    <svg t="1688883495658" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2497" width="20" height="20">
                        <path
                            d="M181.9648 406.3744h644.5568v160.2048a322.2528 322.2528 0 0 1-322.2528 322.2528 322.2528 322.2528 0 0 1-322.2528-322.2528V406.3744z"
                            fill="#1296db" p-id="2498"></path>
                        <path
                            d="M916.1216 391.1168c-20.48-22.3744-49.9712-22.3744-62.464-22.3744h-76.8V346.112a25.6 25.6 0 0 0-25.6-25.6H106.5472a25.6 25.6 0 0 0-25.6 25.6v160.1536a347.648 347.648 0 0 0 610.5088 227.7888c78.7968-8.96 140.7488-37.9904 184.32-86.528 45.5168-51.2 59.0336-110.5408 62.4128-151.6032 3.8912-50.8416-3.0208-84.1216-22.0672-104.8064z m-487.2704 411.8528a296.96 296.96 0 0 1-296.704-296.96V371.712H725.504v134.5536a296.96 296.96 0 0 1-296.6528 296.704z m458.0864-311.1936c-3.7376 46.08-26.8288 148.1216-153.6 182.4256a345.4976 345.4976 0 0 0 43.3152-167.936V419.84h76.8c13.9264 0 20.8896 1.6384 24.832 5.888s12.5952 18.9952 8.6528 66.048z"
                            fill="#1296db" p-id="2499"></path>
                        <path
                            d="M503.1424 710.656a25.6 25.6 0 0 1-5.632-50.5856c114.5856-25.6 122.88-135.2704 122.88-139.9296a25.6 25.6 0 0 1 51.2 2.9184c-2.9184 52.6336-40.6528 159.488-162.9696 186.9824a26.7264 26.7264 0 0 1-5.4784 0.6144zM269.056 314.3168a25.6 25.6 0 0 1-23.04-14.336c-26.1632-53.6064 7.7824-87.04 28.0576-107.1616C282.7776 184.32 291.84 175.2576 293.0688 168.96c2.9696-15.36-21.8112-37.2224-33.536-44.8A25.6 25.6 0 0 1 286.72 80.7936c6.912 4.352 66.56 43.9808 56.32 97.7408-4.2496 22.016-19.6608 37.2736-33.3312 50.7392-22.3232 22.0672-27.0336 29.696-17.9712 48.2304a25.6 25.6 0 0 1-11.776 34.2528 25.9584 25.9584 0 0 1-10.9056 2.56zM419.84 314.3168a25.6 25.6 0 0 1-23.04-14.336c-26.1632-53.6064 7.7824-87.04 28.0064-107.1616 8.9088-8.4992 17.9712-17.5616 19.2-23.8592 2.9696-15.36-21.8112-37.2224-33.536-44.8a25.6 25.6 0 0 1 27.392-43.2128c6.8608 4.352 66.56 43.9808 56.32 97.7408-4.2496 22.016-19.712 37.2736-33.3312 50.7392-22.3232 22.0672-27.0336 29.696-17.9712 48.2304a25.6 25.6 0 0 1-11.776 34.2528 25.9584 25.9584 0 0 1-11.264 2.4064zM570.88 314.3168a25.6 25.6 0 0 1-22.9888-14.336c-26.1632-53.6064 7.7312-87.04 28.0064-107.1616C584.6528 184.32 593.92 175.2576 594.944 168.96c2.9696-15.36-21.8112-37.2224-33.5872-44.8a25.6 25.6 0 0 1 27.4432-43.3664c6.8608 4.352 66.56 43.9808 56.32 97.7408-4.2496 22.016-19.712 37.2736-33.3312 50.7392-22.3744 22.0672-27.0336 29.696-18.0224 48.2304a25.6 25.6 0 0 1-22.9888 36.8128zM742.4 921.9584H135.4752a25.6 25.6 0 0 1 0-51.2H742.4a25.6 25.6 0 1 1 0 51.2z"
                            fill="#1296db" p-id="2500"></path>
                    </svg>
                    <span>下午号源</span>
                </h3>
                <div class="regisiterItem" v-for="item in aftnDocData" :key="item.id">
                    <div class="left">
                        <div class="left_top">
                            <h3>{{ item.title }}</h3>
                            <span>|</span>
                            <h3>{{ item.docname }}</h3>
                        </div>
                        <div class="left_bottom">
                            {{ item.skill }}
                        </div>
                    </div>
                    <div class="right">
                        <div class="money">¥ {{ item.amount }}</div>
                        <el-button @click="gotoRegister(item.id)" type="primary">{{ item.availableNumber }}</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, computed } from 'vue';
import { reqHospitalWork, reqHospitalDoctor } from '@/apis/details/index'
import { HospitalWordData, DoctorResponseData, DocArr, Doctor } from '@/apis/details/type'

let pageNo = ref<number>(1);
let limit = ref<number>(6)
const curIndex = ref<number>(0)
const workData = ref<any>({})
const docData = ref<DocArr>([])
const $router = useRouter()
const $route = useRoute()
const { hoscode, depcode } = $route.query

onMounted(() => {
    getHospitalWork()
})
// 获取排号信息
const getHospitalWork = async () => {
    const result: HospitalWordData = await reqHospitalWork(pageNo.value, limit.value, hoscode as string, depcode as string)
    if (result.code === 200) {
        curIndex.value = 0
        // console.log(result, 'result');
        workData.value = result.data;

        const workDate = result.data?.bookingScheduleList[curIndex.value]?.workDate
        getHospitalDoctor(workDate)
    }
}
// 获取医院某一个科室某一天相应医生排班的数据
// hoscode: string, depcode: string, workDate: string
const getHospitalDoctor = async (workDate: string) => {
    const result: DoctorResponseData = await reqHospitalDoctor(hoscode as string, depcode as string, workDate)
    if (result.code === 200) {
        // console.log(result, 'result');
        docData.value = result.data;
    }
}
// 计算上午或下午的数据
const morningDocData = computed(() => {
    return docData.value.filter((item: Doctor) => item.workTime === 0)
})
const aftnDocData = computed(() => {
    return docData.value.filter((item: Doctor) => item.workTime === 1)
})
// 切换卡片
const changeCard = (index: number) => {
    curIndex.value = index
    const workDate = workData.value?.bookingScheduleList[index]?.workDate
    getHospitalDoctor(workDate)
}
// 去预约第二步详情
const gotoRegister = (docId: string) => {
    $router.push({ path: '/details/register_step2', query: { docId } })
}
</script>

<style scoped lang="scss">
.reg_details {
    .top {
        margin-top: 20px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 700;
        color: #7f7f7f;

        .line {
            color: red;
            margin: 0 10px;
        }

    }

    .middle {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        >h3 {
            font-weight: 700;
            font-size: 18px;
            text-align: center;
            margin-bottom: 20px;
        }

        .content {
            display: flex;
            justify-content: flex-start;
            width: 100%;
            margin-bottom: 20px;

            .pCard {
                margin: 0 15px;
                width: 13%;
                height: 120px;
                border: 1px solid skyblue;
                text-align: center;
                flex-wrap: wrap;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s;

                .item_top {
                    height: 40px;
                    line-height: 40px;
                    background-color: #e8f2ff;


                }

                &.gray_bg {
                    border: 1px solid #ccc;

                    .item_top {

                        background-color: #ccc;
                    }
                }

                &.check_item {
                    transform: scale(1.1);
                }

                .item_bottom {
                    height: 80px;
                    line-height: 80px;
                }
            }
        }
    }

    .bottom {
        margin-top: 40px;

        .morning,
        .afternoon {
            >h3 {
                display: flex;
                align-items: center;
                color: skyblue;

                >span {
                    margin-left: 5px;
                    font-weight: 700;
                }

                margin-bottom: 20px;
            }

            .regisiterItem {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #ccc;
                margin-bottom: 30px;
                padding-bottom: 10px;

                .left {
                    display: flex;
                    flex-direction: column;

                    .left_top {
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                        font-size: 16px;
                        color: skyblue;
                        font-weight: 700;

                        >span {
                            margin: 0 10px;
                        }
                    }

                    .left_bottom {
                        color: #7f7f7f;
                    }
                }

                .right {
                    display: flex;
                    align-items: center;
                    width: 200px;
                    justify-content: space-around;
                    padding-right: 20px;
                    .money {
                        margin-right: 40px;
                        font-weight: 700;
                        color: #7f7f7f;
                        white-space: nowrap;
                    }
                }
            }
        }

    }
}
</style>