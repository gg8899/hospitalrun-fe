<template>
    <div class="loginContainer">
        <el-dialog v-model="userStore.visiable" title="用户登录" width="60%">
            <div class="content">
                <div class="left">
                    <div v-if="!isWxLogin">
                        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
                            <el-form-item prop="phone">
                                <el-input clearable placeholder="请输入手机号码" :prefix-icon="User" v-model="ruleForm.phone"
                                    autocomplete="off" />
                            </el-form-item>
                            <el-form-item prop="code">
                                <el-input clearable placeholder="请输入验证码" :prefix-icon="Lock" v-model="ruleForm.code"
                                    autocomplete="off" />
                            </el-form-item>
                            <el-form-item>
                                <el-button :disabled="!isGetCode || flag" @click="getCode()">
                                    <span v-if="!flag">获取验证码</span>
                                    <CountDown v-else :flag="flag" @getFlag="getFlag" />
                                </el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button :disabled="!isLogin" type="primary" @click="submitForm()">用户登录</el-button>
                            </el-form-item>
                        </el-form>

                        <div class="wxLogin">
                            <p @click="wxLogin">微信扫码登录</p>
                            <svg t="1688815339038" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2357" width="32" height="32">
                                <path
                                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                    fill="#28C445" p-id="2358"></path>
                                <path
                                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                    fill="#28C445" p-id="2359"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="wxScan" v-else>
                        <h1>微信扫码登录</h1>

                        <!-- 在这个容器当中显示微信扫码登录页面 -->
                        <div id="wxScanCode"></div>
                        <p @click="isWxLogin = false">手机短信验证码登录</p>
                        <p><svg t="1688827009229" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="3684" width="16" height="16">
                                <path
                                    d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                    p-id="3685" fill="#7f7f7f"></path>
                            </svg></p>
                    </div>
                </div>
                <div class="right">
                    <div class="topContent">
                        <div class="item">
                            <img src="../../assets/code_app.png" alt="">
                            <svg t="1688826562012" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2545" width="16" height="16">
                                <path
                                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                    fill="#28C445" p-id="2546"></path>
                                <path
                                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                    fill="#28C445" p-id="2547"></path>
                            </svg>
                            <p>扫一扫下载</p>
                            <p>“预约挂号”APP</p>
                        </div>
                        <div class="item">
                            <img src="../../assets/code_login_wechat.png" alt="">
                            <svg t="1688827009229" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="3684" width="16" height="16">
                                <path
                                    d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                    p-id="3685" fill="#1afa29"></path>
                            </svg>
                            <p>微信扫一扫关注</p>
                            <p>“快速预约挂号”</p>
                        </div>
                    </div>
                    <h3>医院 官方指定平台</h3>
                    <h3>快速挂号 安全放心</h3>
                </div>
            </div>
            <template #footer>
                <el-button type="primary" @click="userStore.visiable=false">
                    关闭窗口
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import CountDown from '../count_down/index.vue'
import useUserStore from '@/store/module/user'
import { reqWxLoginParams } from '@/apis/user/index.ts'
import { WxLoginResponseData } from '@/apis/user/type.ts'
import { reactive, ref, computed, watch } from 'vue';
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

import { useRouter, useRoute } from 'vue-router'
import { fa } from 'element-plus/es/locales.mjs';
// 路由导航
const $router = useRouter()
const $route = useRoute()

const ruleFormRef = ref<FormInstance>()
const userStore = useUserStore()
// 设置初始值吗
const ruleForm = reactive({
    phone: '',
    code: '',
})
// 校验手机号格式
const validatePhone = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入手机号'))
    } else {
        if (!(/^1[3-9]\d{9}$/.test(value))) {
            callback(new Error('请输入正确格式的手机号'))
        }
        callback()
    }
}
// 校验验证码格式
const validateCode = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入验证码'))
    } else {
        if (!(/^\d{6}$/.test(value))) {
            callback(new Error('请输入正确格式的验证码'))
        }
        callback()
    }
}
const rules = reactive<FormRules<typeof ruleForm>>({
    phone: [{ validator: validatePhone, trigger: 'change' }],
    code: [{ validator: validateCode, trigger: 'change' }],
})
// 倒计时间内不可以重复获取验证码
const flag = ref<boolean>(false)
//计数器子组件绑定的自定义事件
//当倒计时为零的时候,通知父组件倒计时组件隐藏
const getFlag = (val: boolean) => {
    //倒计时模式结束
    flag.value = val;
};
// 是否能获取验证码
const isGetCode = computed(() => {
    return /^1[3-9]\d{9}$/.test(ruleForm.phone)
})
// 是否能够登录
const isLogin = computed(() => {
    return /^1[3-9]\d{9}$/.test(ruleForm.phone) && /^\d{6}$/.test(ruleForm.code)
})
// 获取验证码
const getCode = async () => {
    if (!flag || !isGetCode.value) return
    flag.value = true
    try {
        await userStore.getCode(ruleForm.phone)
        ruleForm.code = userStore.code
    } catch (error) {
        ElMessage({
            type: "error",
            message: (error as Error).message,
        });
    }
}
// 用户登录
const submitForm = async () => {
    if (!isLogin.value) return
    try {
        await userStore.login(ruleForm)
        ElMessage({
            message: '登录成功！',
            type: 'success',
        })
        // 将弹窗隐藏
        userStore.visiable = false

        // 根据路径是否有参数实现跳转
        const redirect: string = $route.query.redirect as string
        // console.log(redirect, 'redirect');

        if (redirect) {
            $router.push(redirect)
        } else {
            $router.push('')
        }

    } catch (error) {
        ElMessage({
            type: "error",
            message: (error as Error).message,
        });
    }

}

const isWxLogin = ref<boolean>(false)
const getWxLoginScanCode = async () => {
    const redirect_URL = encodeURIComponent(window.location.origin + "/wxlogin");
    const result: WxLoginResponseData = await reqWxLoginParams(redirect_URL)
    if (result.code === 200) {
        const { appid, redirectUri, state } = result.data
        // 直接微信登陆
        //@ts-ignore
        new WxLogin({
            self_redirect: true, //true:手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
            id: "wxScanCode", //显示二维码容器设置
            appid, //应用位置标识appid
            scope: "snsapi_login", //当前微信扫码登录页面已经授权了
            redirect_uri: redirectUri, //填写授权回调域路径,就是用户授权成功以后，微信服务器向公司后台推送code地址
            state, //state就是学校服务器重定向的地址携带用户信息
            style: "black",
            href: "",
        });
    }
}
// 监听场景的数据
watch(
    () => isWxLogin.value,
    (val: boolean) => {
        if (isWxLogin) {
            userStore.queryState();
        }
    }
);
// 微信登录
const wxLogin = () => {
    isWxLogin.value = true
    // console.log('微信登录');
    // 获取微信登录的二维码
    getWxLoginScanCode()

}
</script>

<style scoped lang="scss">
.loginContainer {
    .content {
        display: flex;
        justify-content: space-around;
        min-height: 260px;

        .left {


            ::v-deep(.el-button--primary) {
                width: 100%;
            }

            border: 1px solid #ccc;
            width: 45%;
            padding: 15px;


            .wxLogin {
                text-align: center;

                >p {
                    cursor: pointer;
                    margin: 10px 0;
                }
            }

            .wxScan {
                text-align: center;

                >h1 {
                    font-size: 20px;
                    font-weight: 700;
                }

                >p {
                    cursor: pointer;
                    margin-top: 15px;
                }
            }
        }

        .right {
            padding: 15px;
            border: 1px solid #ccc;
            width: 45%;

            .topContent {
                display: flex;
                justify-content: space-around;
                align-items: center;

                .item {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    >img {
                        width: 130px;
                        height: 130px;
                        margin-bottom: 10px;
                    }

                    >p {
                        margin-top: 10px;
                    }
                }
            }

            >h3 {
                font-weight: 700;
                font-size: 20px;
                text-align: center;
                margin-top: 15px;
            }

        }
    }

    ::v-deep(.el-dialog__footer) {
        border-top: 1px solid #ccc;
    }

    ::v-deep(.el-dialog__header) {
        border-bottom: 1px solid #ccc;
    }
}
</style>