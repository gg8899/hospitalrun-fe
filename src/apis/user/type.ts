// 定义首页数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// 用户验证码
export interface CodeInfo extends ResponseData {
    data: string
}

// 用户信息
export interface UserInfo {
    name: string,
    token: string
}

//登录接口返回的数据的ts类型
export interface UserLoginResponseData extends ResponseData {
    data: UserInfo
}

//用户登录接口需要携带参数类型
export interface LoginData {
    phone: string,
    code: string
}
// 请求微信获取所需要获取的参数
export interface WxLoginInfo {
    appid: string,
    redirectUri: string,
    scope: string,
    state: string,
}
export interface WxLoginResponseData extends ResponseData {
    data: WxLoginInfo
}

export interface Order {
    id: number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "orderStatusString": string
    },
    "userId": number,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId": null,
    "title": string,
    "reserveDate": string,
    "reserveTime": number,
    "patientId": number,
    "patientName": string,
    "patientPhone": "",
    "hosRecordId": string,
    "number": number
    "fetchTime": string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": number,

}
export type Records = Order[];
//获取订单接口数据的ts类型
export interface UserOrderInfoResponseData extends ResponseData {
    data: {
        "records": Records
        "total": number,
        "size": number,
        "current": number,
        "orders": [],
        "hitCount": boolean,
        "searchCount": boolean,
        "pages": number
    }
}

// 获取订单详情
export interface OrderDetailsData extends ResponseData {
    data: Order,
}

//代表就诊人ts类型
export interface User {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "certificatesTypeString": string,
        "contactsCertificatesTypeString": string,
        "cityString": null,
        "fullAddress": string,
        "districtString": null,
        "provinceString": null
    },
    "userId": number,
    "name": string,
    "certificatesType": string,
    "certificatesNo": string,
    "sex": number,
    "birthdate": string,
    "phone": string,
    "isMarry": number,
    "provinceCode": null,
    "cityCode": null,
    "districtCode": null,
    "address": string,
    "contactsName": string,
    "contactsCertificatesType": string,
    "contactsCertificatesNo": string,
    "contactsPhone": string,
    "isInsure": number,
    "cardNo": null,
    "status": string
}
//全部就诊人的数据ts类型
export type AllUser = User[];

//获取全部就诊人的ts类型
export interface AllUserResponseData extends ResponseData {
    data: AllUser
}

export interface OrderStatus {
    "comment": string,
    "status": number,
}

export type AllOrderStatus = OrderStatus[];

export interface AllOrderStatusResponseData extends ResponseData {
    data: AllOrderStatus,
}

export interface QrcodeData {
    "codeUrl": string,
    "orderId": number,
    "totalFee": number,
    "resultCode": string,
}

export interface QrcodeResponseData extends ResponseData {
    data: QrcodeData,
}


//新增与修改已有的就诊人参数的数据ts类型
export interface AddOrUpdateUser {
    id?: string,
    name: string,
    certificatesType: string,
    certificatesNo:string,
    sex:number,
    birthdate:string,
    phone:string,
    isMarry:number,
    isInsure:number,
    addressSelected:string[],
    address:string,
    contactsName:string,
    contactsCertificatesType:string,
    contactsCertificatesNo:string,
    contactsPhone:string


}


//代表证件类型的数据ts
export interface CertationType {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {

    },
    "parentId": number,
    "name": string,
    "value": string,
    "dictCode": string,
    "hasChildren": boolean
}
export type CertationArr = CertationType[];
export interface CertationTypeResponseData extends ResponseData {
    data: CertationArr
}

//新增与修改已有的就诊人参数的数据ts类型
export interface AddOrUpdateUser {
    id?: string,
    name: string,
    certificatesType: string,
    certificatesNo:string,
    sex:number,
    birthdate:string,
    phone:string,
    isMarry:number,
    isInsure:number,
    addressSelected:string[],
    address:string,
    contactsName:string,
    contactsCertificatesType:string,
    contactsCertificatesNo:string,
    contactsPhone:string


}
//代表一个用户信息的数据类型
export interface AuthUserInfo {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
    },
    "openid": null,
    "nickName": null,
    "phone": string,
    "name": string,
    "certificatesType": string,
    "certificatesNo": string,
    "certificatesUrl": null,
    "authStatus": number,
    "status": number
}
//获取用户信息接口返回的数据的ts类型
export interface UseringoResponseData extends ResponseData {
    data: AuthUserInfo
}

//用户认证的携带的参数的ts类型
export interface UserParams {
    "certificatesNo": string,
    "certificatesType": string,
    "certificatesUrl": string,
    "name": string
}