<template>
    <el-card class="wrapper" shadow="hover">
        <div class="content" @click="goDetail">
            <div class="left">
                <div class="title">{{ hospitalInfo.hosname }}</div>
                <div class="details">
                    <div class="level">
                        <svg t="1688045502862" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2319" width="16" height="16">
                            <path
                                d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                                p-id="2320" fill="#7f7f7f"></path>
                        </svg>
                        <span>{{ hospitalInfo.param?.hostypeString }}</span>
                    </div>
                    <div class="level">
                        <svg t="1688045567219" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3652" width="16" height="16">
                            <path
                                d="M917.333333 512c0-223.850667-181.482667-405.333333-405.333333-405.333333S106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333z m-425.984-5.333333a21.333333 21.333333 0 0 0 6.101334 20.928l124.8 116.394666a21.333333 21.333333 0 0 0 29.12-31.189333l-118.08-110.122667L533.333333 501.333333v-170.666666a21.333333 21.333333 0 0 0-42.666666 0v170.666666c0 1.834667 0.213333 3.626667 0.682666 5.333334zM149.333333 512c0-200.298667 162.368-362.666667 362.666667-362.666667s362.666667 162.368 362.666667 362.666667-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512z m612.501334 305.002667a21.333333 21.333333 0 1 0-30.336 29.994666l74.304 75.157334a21.333333 21.333333 0 1 0 30.336-29.994667l-74.304-75.157333z m-480.362667 29.994666a21.333333 21.333333 0 0 0-30.336-29.994666L176.832 892.16a21.333333 21.333333 0 1 0 30.336 29.994667l74.304-75.157334zM778.496 128A117.525333 117.525333 0 0 1 896 245.333333a21.333333 21.333333 0 0 0 42.666667 0C938.666667 157.077333 866.901333 85.333333 778.496 85.333333h-20.992a21.333333 21.333333 0 1 0 0 42.666667h20.992zM245.504 85.333333C157.098667 85.333333 85.333333 157.077333 85.333333 245.333333a21.333333 21.333333 0 0 0 42.666667 0C128 180.629333 180.672 128 245.504 128h20.992a21.333333 21.333333 0 1 0 0-42.666667h-20.992z"
                                fill="#7f7f7f" p-id="3653"></path>
                        </svg>
                        <span>每天{{ hospitalInfo.bookingRule.releaseTime }}放号</span>
                    </div>
                </div>
            </div>
            <div class="right">
                <img :src="`data:image/jpeg;base64,${hospitalInfo.logoData}`" alt="">
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const $router = useRouter()
// 回到详情页
const goDetail = () => {
    // console.log(hospitalInfo.hoscode, 'props');
    // console.log(props.hospitalInfo.hoscode, 'props.hospitalInfo.hoscode');

    $router.push({ path: "/details/register", query: { hoscode: props.hospitalInfo.hoscode } });
}
const props = defineProps(['hospitalInfo'])
</script>

<style scoped  lang="scss" >
.wrapper {

    .content {
        display: flex;
        height: 100%;
        justify-content: space-between;
        cursor: pointer;

        .left {
            display: flex;
            flex-direction: column;
            width: 80%;
            justify-content: space-between;

            .details {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: #7f7f7f;

                .level {
                    span {
                        vertical-align: top;
                        margin-left: 5px;
                    }
                }
            }

        }

        .right {
            width: 15%;
            align-items: center;
            height: 100%;

            img {
                display: block;
                width: 50px;
                height: 50px;
                margin: 0 auto;
            }
        }
    }
}
</style>