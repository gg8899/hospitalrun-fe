<template>
    <div class="top">
        <div class="cont">
            <div class="left" @click="goHome">
                <img src="../../assets/logo.png" alt="">
                <p class="title">医院 预约挂号统一平台</p>
            </div>
            <div class="right">
                <div class="help">帮助中心</div>
                <div v-if="!userStore.userInfo.name" class="login" @click="userStore.visiable = true">登录/注册</div>
                <div v-else="userStore.userInfo.name" class="userInfo">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            {{ userStore.userInfo.name }}
                            <el-icon>
                                <ArrowDownBold />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="goPath('/user/certification')">实名认证</el-dropdown-item>
                                <el-dropdown-item @click="goPath('/user/order')">挂号订单</el-dropdown-item>
                                <el-dropdown-item @click="goPath('/user/manage')">就诊人管理</el-dropdown-item>
                                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowDownBold } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
// 引入仓库的user相关的数据
import useUserStore from '@/store/module/user'
const userStore = useUserStore()
import { useRouter } from 'vue-router'
const $router = useRouter()
// 回到首页
const goHome = () => {
    $router.push({ path: '/home' })
}

// 退出登录
const logout = () => {
    userStore.logout();
    // 重定向到首页
    goHome();
    ElMessage({
        message: '已退出登录！',
        type: 'success',
    })
}

// 页面跳转
const goPath = (path: string) => {
    $router.push({ path })
}
</script>

<style scoped lang="scss">
.top {
    z-index: 99;
    position: fixed;
    height: 70px;
    width: 100%;
    border-bottom: 1px solid #ccc;

    .cont {
        width: 1100px;
        height: 70px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        background-color: #fff;

        .left {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            >img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            >p {
                font-size: 20px;
                color: rgb(23, 185, 249);
                margin-left: 10px;
            }
        }

        .right {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #666;

            .help {
                margin-right: 10px;
            }

            .login {
                cursor: pointer;
            }
        }
    }
}
</style>