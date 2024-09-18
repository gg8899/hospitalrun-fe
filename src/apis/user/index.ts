import request from '@/utils/request'
import type { UserParams, CodeInfo, UserLoginResponseData, LoginData, WxLoginResponseData, UserOrderInfoResponseData, AllUserResponseData, AllOrderStatusResponseData, OrderDetailsData, QrcodeResponseData, CertationTypeResponseData, AddOrUpdateUser, UseringoResponseData } from './type'


enum API {
    // 获取登录验证码
    USERCODE_URL = '/sms/send/',
    USERLOGIN_URL = '/user/login',
    WXLOGINPARAMS_URL = '/user/weixin/getLoginParam',
    ORDERLIST_URL = '/order/orderInfo/auth/',
    FINDALLPATIENT_URL = '/user/patient/auth/findAll',
    ORDERSTATUSLIST_URL = '/order/orderInfo/auth/getStatusList',
    OREDERDETAILS_URL = '/order/orderInfo/auth/getOrderInfo/',
    ORDERCANCEL_URL = '/order/orderInfo/auth/cancelOrder/',
    CREATECODE_URL = '/order/weixin/createNative/',
    WXPAYSTATUS_URL = 'order/weixin/queryPayStatus/',
    EXECUTEORDER_URL = '/order/orderInfo/auth/submitOrder/',
    DELPATIENT_URL = '/user/patient/auth/remove/',
    //获取证件的类型的接口地址
    CERTIFICATIONTYPE_URL = '/cmn/dict/findByDictCode/',
    CITY_URL = '/cmn/dict/findByParentId/',
    //新增就诊人接口
    ADDUSER_URL = '/user/patient/auth/save',
    //更新已有的就诊人接口
    UPDATEUSER_URL = '/user/patient/auth/update',
    CERTIFYUSERS_URL = 'user/auth/getUserInfo',
    //用户认证的结构
    USERCERTATION_URL = '/user/auth/userAuah',
    
}

//用户认证接口
export const reqUserCertation = (data: UserParams) => request.post<any, any>(API.USERCERTATION_URL, data);

// 获取验证码
export const reqUserCode = (phone: string) => request.get<any, CodeInfo>(API.USERCODE_URL + phone)

// 用户登录
export const reqUserLogin = (data: LoginData) => request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data)

// 获取微信扫码登录需要的参数
export const reqWxLoginParams = (wxRedirectUri: string) => request.get<any, WxLoginResponseData>(API.WXLOGINPARAMS_URL + `?wxRedirectUri=${wxRedirectUri}`)

// 获取订单GET /api/order/orderInfo/auth/
export const reqOrderList = (page: number, limit: number, orderStatus: string, patientId: string) => request.get<any, UserOrderInfoResponseData>(API.ORDERLIST_URL + `${page}/${limit}?orderStatus=${orderStatus}&patientId=${patientId}`)

// 获取所有就诊人信息列表
export const reqPaientList = () => request.get<any, AllUserResponseData>(API.FINDALLPATIENT_URL)

// 获取订单所有的状态
export const reqOrderStatusList = () => request.get<any, AllOrderStatusResponseData>(API.ORDERSTATUSLIST_URL)

// 获取订单详情
export const reqOrderDetails = (id: string) => request.get<any, OrderDetailsData>(API.OREDERDETAILS_URL + id)

// 订单取消
export const reqCancelOrder = (orderId: string) => request.get<any, any>(API.ORDERCANCEL_URL + orderId)

// 获取订单二维码申城
export const reqOrderCode = (orderId: string) => request.get<any, QrcodeResponseData>(API.CREATECODE_URL + orderId)

// 获取微信支付订单状态
export const reqWXPayStatus = (orderId: string) => request.get<any, QrcodeResponseData>(API.WXPAYSTATUS_URL + orderId)

// 生成订单号
export const reqExecuteOrder = (hoscode: string, scheduleId: string, patientId: number) => request.post<any, CodeInfo>(API.EXECUTEORDER_URL + `${hoscode}/${scheduleId}/${patientId}`)

// 删除就诊人
export const reqDelPatient = (id: number) => request.delete<any, any>(API.DELPATIENT_URL + id)
//获取证件类型的方法
export const reqCertationType = (CertificatesType = 'CertificatesType') => request.get<any, CertationTypeResponseData>(API.CERTIFICATIONTYPE_URL + CertificatesType);

//获取城市的数据
export const reqCity = (parentId: string) => request.get<any, any>(API.CITY_URL + parentId);

//新增与修改已有的就诊人接口方法
export const reqAddOrUpdateUser = (data: AddOrUpdateUser) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data);
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data);
    }
}

// 获取用户是否实名认证的信息 
export const reqCertifyUser = () => request.get<any, UseringoResponseData>(API.CERTIFYUSERS_URL)
