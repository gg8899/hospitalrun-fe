<template>
    <div class="register">
        <div class="top">
            <h1>{{ detailStore.hospitalInfo.hospital?.hosname }}</h1>
            <div class="level">
                <svg t="1688390326807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="2314" width="16" height="16">
                    <path
                        d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                        p-id="2315" fill="#7f7f7f"></path>
                </svg>
                <span>{{ detailStore.hospitalInfo.hospital?.param.hostypeString }}</span>
            </div>
        </div>
        <div class="content">
            <div class="logo">
                <img :src="`data:image/jpeg;base64,${detailStore.hospitalInfo.hospital?.logoData}`" alt="">
            </div>
            <div class="right">
                <h3>挂号规则</h3>
                <p>预约周期：{{ detailStore.hospitalInfo.bookingRule?.cycle }}天。
                    放号时间：{{ detailStore.hospitalInfo.bookingRule?.releaseTime }} ，停挂时间：{{
                        detailStore.hospitalInfo.bookingRule?.stopTime }}</p>
                <p>具体路线：{{ detailStore.hospitalInfo.hospital?.param.fullAddress }}</p>
                <p>规划路线：{{ detailStore.hospitalInfo.hospital?.route }}</p>
                <p>退号时间：就诊前{{ Math.abs(detailStore.hospitalInfo.bookingRule?.quitDay) }}工作日{{
                    detailStore.hospitalInfo.bookingRule?.quitTime }}前取消</p>
                <h3>医院预约规则</h3>
                <p v-for="(item, index) in detailStore.hospitalInfo.bookingRule?.rule" :key="index">{{ index
                    + 1 }}.{{ item }}</p>
            </div>
        </div>
        <div class="department">
            <ul class="left">
                <li v-for="(it, i) in  detailStore.deparmentArr " :key="it.depname" :class="{ active: currentIndex === i }"
                    @click="handleClick(i)">{{
                        it.depname }}
                </li>
            </ul>
            <div class="right">
                <div class="box" v-for="(tt, key) in detailStore.deparmentArr" :key="key">
                    <h4 class="cur">{{ tt.depname }}</h4>
                    <ul>
                        <li @click="goRegister(chItem.depcode)" v-for="chItem in tt.children" :key="chItem.depcode">{{
                            chItem.depname }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入仓库详情进来使用
import useDetailStore from '@/store/module/hospitalDetials'
import useUsertore from '@/store/module/user'
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';


const detailStore = useDetailStore()
const usertore = useUsertore()
const $router = useRouter()
const $route = useRoute()
// console.log(detailStore, 'deparmentArr');
const currentIndex = ref<number>(0)
// 选择哪个科室落
const handleClick = (index: number) => {
    currentIndex.value = index;
    //点击导航获取右侧科室(大的科室H1标题)
    let allH1 = document.querySelectorAll(".cur");
    //滚动到对应科室的位置
    allH1[currentIndex.value].scrollIntoView({
        behavior: "smooth", //过渡动画效果
        block: "start", //滚动到位置 默认起始位置
    });
}
// 去挂号
const goRegister = (depcode: string) => {
    // 首先判断有无登录，没有登录的话先登录
    if (!usertore.userInfo.token) {
        usertore.visiable = true
    }
    // 登录成功跳转至预约详情页面
    $router.push({ path: 'register_step1', query: { hoscode: $route.query.hoscode, depcode } })
}
</script>

<style scoped lang="scss">
.register {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    .top {
        display: flex;
        align-items: center;
        height: 40px;

        >h1 {
            font-weight: 700;
            font-size: 24px;

        }

        .level {
            margin-left: 10px;

            >span {
                margin-left: 5px;
            }
        }
    }

    .content {
        display: flex;
        margin-top: 20px;

        .logo {
            width: 80px;
            height: 80px;

            >img {
                border-radius: 50%;
                width: 100%;
                height: 100%;
            }
        }

        .right {
            flex: 1;
            margin-left: 20px;
            line-height: 2;
            color: #7f7f7f;
            font-size: 14px;

            >h3 {
                font-weight: 700;
            }
        }
    }

    .department {
        margin-top: 30px;
        width: 100%;
        display: flex;
        height: 500px;

        .left {
            padding-right: 10px;
            width: 100px;
            background-color: #fefefe;

            >li {
                font-size: 14px;
                color: #7f7f7f;
                height: 40px;
                line-height: 40px;
                text-align: center;
                cursor: pointer;

                &.active {
                    background-color: #fff;
                    border-left: 2px solid red;
                    color: red;
                }
            }
        }

        .right {
            flex: 1;
            height: 100%;
            // 新增滚动条展示
            overflow: auto;

            // 隐藏浏览器默认的滚动条。
            &::-webkit-scrollbar {
                display: none;
            }

            .box {
                >h4 {
                    background-color: #fefefe;
                    line-height: 30px;
                    font-size: 14px;
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    align-items: center;

                    >li {
                        width: 33%;
                        line-height: 30px;
                        font-size: 14px;
                        color: #7f7f7f;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>