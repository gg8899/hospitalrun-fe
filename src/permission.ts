// 路由鉴权

// 1、引入路由
import router from "./router";

// 引入进度条
import NProgress from 'nprogress';
// 引入进度条的样式
import 'nprogress/nprogress.css'
// 加载的小圆球不要
NProgress.configure({ showSpinner: false });

//引入用户相关的仓库
import useUserStore from '@/store/module/user';
//引入大仓库
import pinia from '@/store'
let userStore = useUserStore(pinia);
//存储用户未登录可以访问路由得路径
let whiteList = ["/home", '/details/register', '/details/detail', '/details/notice', '/details/stop', '/details/search'];

// 2、全局守卫
// 前置守卫
router.beforeEach((to, from, next) => {
    NProgress.start();
    // 标题修改
    document.title = `伤医通-${to.meta.title}`

    // 根据token来判断用户是否登录
    //判断用户是否登录-token
    let token = userStore.userInfo.token;
    //用户登陆了
    if (token) {
        next();
    } else {
        //用户未登录
        if (whiteList.includes(to.path)) {
            next();
        } else {
            //登录组件显示不来
            userStore.visiable = true;
            next({ path: '/home', query: { redirect: to.fullPath } })
        }

    }
    next()
})

// 后置守卫
router.afterEach((to, from) => {

    NProgress.done();
})