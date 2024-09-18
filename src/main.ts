// vue3框架提供的方法createApp，可以用来创建实例。
import { createApp } from 'vue'
// 引入element Plus 组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入pinia仓库
import pinia from '@/store'
// 引入默认重置样式
import '@/style/reset.scss'
// 引入根组件APP
// import App from './App.vue'
import App from '@/App.vue'

// 引入全局组件---顶部组件和底部组件
import HispitalTop from '@/components/hospital_top/index.vue'
import HispitalBottom from '@/components/hospital_bottom/index.vue'

// 引入登录弹窗组件
import Login from '@/components/login/index.vue'

// 引入vue-router核心插件
import router from './router'

// 创建应用实例，且将它挂载到指定挂载点中。
const app = createApp(App)
// 注册组件
app.component('HispitalTop', HispitalTop)
app.component('HispitalBottom', HispitalBottom)
app.component('Login', Login)

// 安装组件库
app.use(ElementPlus, { locale: zhCn })

// 安装vue-router
app.use(router)

//安装pinia仓库
app.use(pinia);

// 引入路由鉴权的文件
import './permission'

app.mount('#app')
