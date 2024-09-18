
// 本地存储用户信息
export const SET_TOKEN = (userInfo: string) => {
    sessionStorage.setItem('USERINFO', userInfo)
}

// 获取用户信息
export const GET_TOKEN = () => {
    return sessionStorage.getItem('USERINFO')
}

// 清楚用户信息缓存
export const REMOVE_TOKEN = () => {
    sessionStorage.removeItem('USERINFO')
}