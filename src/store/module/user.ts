import { defineStore } from "pinia";
import type { UserState } from "./interface";
import type { UserInfo } from '@/apis/details/type'
import { reqUserCode, reqUserLogin } from '@/apis/user/index'
import type { CodeInfo, LoginData, UserLoginResponseData } from '@/apis/user/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/session'

const useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            visiable: false, // 登录的弹窗
            code: '',  // 登录验证码
            userInfo: JSON.parse(GET_TOKEN() as string) || {} as UserInfo, // 用户登录信息
        }
    },

    actions: {
        async getCode(phone: string) { // 不要用箭头函数！
            const result: CodeInfo = await reqUserCode(phone)
            if (result.code === 200) {
                this.code = result.data;
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        // 用户登录
        async login(data: LoginData) {
            const result: UserLoginResponseData = await reqUserLogin(data)
            if (result.code === 200) {
                const data = result.data;
                this.userInfo = data;
                // 持久化存储
                SET_TOKEN(JSON.stringify(data))
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        // 用户退出登录
        logout() {
            this.userInfo = {} as UserInfo;
            REMOVE_TOKEN()
        },
        //查询微信扫码的接口(看本地存储是否存储数据)
        queryState() {
            //开启定时器每隔一段时间问:本地村是都拥有用户信息
            let timer = setInterval(() => {
                //本地存储已有有数据:扫码成功
                if (GET_TOKEN()) {
                    //关闭对话框
                    this.visiable = false;
                    this.userInfo = JSON.parse(GET_TOKEN() as string);
                    clearInterval(timer);
                }
            }, 1000);
        }

    },
    getters: {},

})

export default useUserStore