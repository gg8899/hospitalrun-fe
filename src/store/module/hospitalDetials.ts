import { defineStore } from "pinia";
import { reqHospitalDetail, reqHospitalDeparment } from '@/apis/details';
//引入详情数据的ts类型
import type { HospitalDetail, DeparmentResponseData, HosPitalDetail } from '@/apis/details/type'
import type { DetailState } from './interface'


const useDetailsStore = defineStore('Details', {
    state: (): DetailState => {
        return {
            //医院详情的数据
            hospitalInfo: ({} as HosPitalDetail),
            //存储医院科室的数据
            deparmentArr: [],
        }
    },
    actions: {
        //获取医院详情的方法
        async getHospital(hoscode: string) {
            let result: HospitalDetail = await reqHospitalDetail(hoscode);
            if (result.code == 200) {
                this.hospitalInfo = result.data;
            }
        },
        // 获取医院科室数据
        async getDeparment(hoscode: string) {
            let result: DeparmentResponseData = await reqHospitalDeparment(hoscode);
            if (result.code == 200) {
                this.deparmentArr = result.data;
            }
        }
    },
    getters: {},
})
export default useDetailsStore
