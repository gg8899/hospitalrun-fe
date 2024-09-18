import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'


export default createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes: [
        {
            path: '/home',
            component: () => import('@/pages/home/index.vue'),
            meta: { title: "首页" },
        },
        {
            path: '/details',
            component: () => import('@/pages/hispitalDetails/index.vue'),
            meta: { title: "医院详情" },
            children: [
                {
                    path: 'register', // 子路径名不需要带斜杠，，，，！！！
                    component: () => import('@/pages/hispitalDetails/register/index.vue'),
                    meta: { title: "预约挂号" },
                },
                {
                    path: 'register_step1',
                    component: () => import('@/pages/hispitalDetails/register/register_step1.vue'),
                    meta: { title: "预约第一步" },
                },
                {
                    path: 'register_step2',
                    component: () => import('@/pages/hispitalDetails/register/register_step2.vue'),
                    meta: { title: "预约第二步" },
                },
                {
                    path: 'details',
                    component: () => import('@/pages/hispitalDetails/details/index.vue'),
                    meta: { title: "医院详情" },
                },
                {
                    path: 'notice',
                    component: () => import('@/pages/hispitalDetails/notice/index.vue'),
                    meta: { title: "预约通知" },
                },
                {
                    path: 'search',
                    component: () => import('@/pages/hispitalDetails/search/index.vue'),
                    meta: { title: "搜索查询" },
                },
                {
                    path: 'stop',
                    component: () => import('@/pages/hispitalDetails/stop/index.vue'),
                    meta: { title: "停诊通知" },
                }
            ]
        },
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/wxlogin',
            component: () => import('@/pages/wxLogin/index.vue')
        },
        {
            path: '/user',
            component: () => import('@/pages/user/index.vue'),
            children: [
                {
                    path: 'accInfo', // 子路径名不需要带斜杠，，，，！！！
                    component: () => import('@/pages/user/accInfo/index.vue'),
                    meta:{
                        title:'账号信息'
                    }
                },
                {
                    path: 'certification',
                    component: () => import('@/pages/user/certification/index.vue'),
                    meta:{
                        title:'实名认证'
                    }
                },
                {
                    path: 'feedback',
                    component: () => import('@/pages/user/feedback/index.vue'),
                    meta:{
                        title:'信息反馈'
                    }
                },
                {
                    path: 'manage',
                    component: () => import('@/pages/user/manage/index.vue'),
                    meta:{
                        title:'就诊人管理'
                    }
                },
                {
                    path: 'order',
                    component: () => import('@/pages/user/order/index.vue'),
                    meta:{
                        title:'挂号订单'
                    }
                },
            ]
        }
    ],
    // 滚动行为，控制滚动条的位置；
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        }
    }
})