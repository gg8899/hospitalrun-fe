<template>
    <div class="manage">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>就诊人管理</span>
                    <el-button class="button" type="primary" :icon="User"
                        @click="reset(); addFlag = true;">添加就诊人</el-button>
                </div>
            </template>
            <div class="pp_list" v-if="!addFlag">
                <Vistor @editUser="editUser" @getAllPaient="getUser" class="pp_item" v-for="(item, index) in users"
                    :item="item" :index="index" />
            </div>
            <div class="form" v-else>
                <el-divider content-position="left">就诊人信息</el-divider>
                <el-form style="width: 60%; margin: 10px auto" class="demo-ruleForm" status-icon>
                    <el-form-item label="用户姓名">
                        <el-input placeholder="请你输入用户姓名" v-model="userParams.name" />
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-select placeholder="请你选择证件的类型" style="width: 100%" v-model="userParams.certificatesType">
                            <el-option v-for="item in certationArr" :key="item.id" :label="item.name"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号码">
                        <el-input placeholder="请输入证件号码" v-model="userParams.certificatesNo" />
                    </el-form-item>
                    <el-form-item label="用户性别">
                        <el-radio-group v-model="userParams.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="出生日期">
                        <el-date-picker placeholder="请选择日期" v-model="userParams.birthdate" value-format="YYYY-MM-DD"
                            type="date" />
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input placeholder="请你输入用户手机号码" v-model="userParams.phone" />
                    </el-form-item>

                </el-form>
                <el-divider content-position="left">建档信息（完善后部分医院首次就诊不排队建档）</el-divider>
                <el-form style="width: 60%; margin: 10px auto" ref="ruleFormRef" class="demo-ruleForm" status-icon>

                    <el-form-item label="婚姻状况">
                        <el-radio-group v-model="userParams.isMarry">
                            <el-radio :label="1">已婚</el-radio>
                            <el-radio :label="0">未婚</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="自费/医保">
                        <el-radio-group v-model="userParams.isInsure">
                            <el-radio :label="1">自费</el-radio>
                            <el-radio :label="0">医保</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="当前的住址" prop="region">
                        <el-cascader style="width: 100%" :props="props" v-model="userParams.addressSelected" />
                    </el-form-item>
                    <el-form-item label="详细地址">
                        <el-input placeholder="请你输入用户详细地址" v-model="userParams.address" />
                    </el-form-item>
                </el-form>
                <el-divider content-position="left">联系人信息（选填）</el-divider>
                <el-form style="width: 60%; margin: 10px auto" ref="ruleFormRef" class="demo-ruleForm" status-icon
                    label-width="80">
                    <el-form-item label="用户姓名">
                        <el-input placeholder="请你输入用户姓名" v-model="userParams.contactsName" />
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-select placeholder="请你选择证件的类型" style="width: 100%"
                            v-model="userParams.contactsCertificatesType">
                            <el-option v-for="item in certationArr" :key="item.id" :label="item.name"
                                :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号码">
                        <el-input placeholder="请你输入证件号码" v-model="userParams.contactsCertificatesNo" />
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input placeholder="请你输入用户手机号码" v-model="userParams.contactsPhone" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">
                            提交
                        </el-button>
                        <el-button @click="reset">重写</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
//@ts-ignore
import type { CascaderProps } from "element-plus";
import { ElMessage } from 'element-plus'
import Vistor from '@/components/register_vistor/index.vue'
import { reqGetUser } from '@/apis/details/index'
import { reqCertationType, reqCity, reqAddOrUpdateUser } from '@/apis/user/index'
import { User } from '@element-plus/icons-vue';
import { UserResponseData, UserArr } from '@/apis/details/type'
import { AddOrUpdateUser, CertationArr, CertationTypeResponseData } from '@/apis/user/type'
import { onMounted, ref, reactive, watch } from 'vue';
import { useRouter, useRoute } from "vue-router";
const $router = useRouter()
const $route = useRoute()
const addFlag = ref<boolean>(false)
const users = ref<UserArr>([])
const certationArr = ref<CertationArr>([]) // 身份证件类型
//收集新增就诊人的数据
let userParams = reactive<AddOrUpdateUser>({
    name: "",
    certificatesType: "",
    certificatesNo: "",
    sex: 0,
    birthdate: "",
    phone: "",
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: "",
    contactsName: "",
    contactsCertificatesType: "",
    contactsCertificatesNo: "",
    contactsPhone: "",
});
onMounted(() => {
    getUser()
    //获取证件的类型的数据
    getCertationType();
    //判断:当前这个路由组件是不是从挂号组件而来[挂号组件而来,路径上是携带query参数type=add
    if (["add", "edit"].includes($route.query.type as string)) {
        addFlag.value = true;
    }
})
const getUser = async () => {
    const result: UserResponseData = await reqGetUser()
    if (result.code === 200) {
        users.value = result.data
    }
}
//获取证件类型的接口
const getCertationType = async () => {
    let result: CertationTypeResponseData = await reqCertationType();
    if (result.code == 200) {
        certationArr.value = result.data;
    }
};
// 新增就诊人
const submit = async () => {
    //要么新增就诊人|更新一个已有的就诊人
    try {
        //要么新增用户成功|更新已有的用户成功
        await reqAddOrUpdateUser(userParams);
        //提交按钮的时候判断是不是从预约挂号而来
        if ($route.query.type) {
            $router.back();
        } else {
            addFlag.value = false
        }
        //在获取全部的就诊人的信息
        getUser();
        //提示文字
        ElMessage({
            type: "success",
            message: userParams.id ? "更新成功" : "新增成功",
        });
    } catch (error) {
        ElMessage({
            type: "success",
            message: userParams.id ? "更新失败" : "新增失败",
        });
    }
}
//就诊人子组件自定义事件的回调
const editUser = (user: AddOrUpdateUser) => {
    addFlag.value = true;
    //收集已有的就诊人信息

    Object.assign(userParams, user);
};
//级联选择器数据
const props: CascaderProps = {
    lazy: true, //懒加载数据
    //加载级联选择器数据方法
    async lazyLoad(node: any, resolve: any) {
        let result: any = await reqCity(node.data.id || "86");
        //整理数据
        let showData = result.data.map((item: any) => {
            return {
                id: item.id,
                label: item.name,
                value: item.value,
                leaf: !item.hasChildren,
            };
        });
        //注入组件需要展示的数据
        resolve(showData);
    },
};

//监听全部就诊人的数据
watch(
    () => users.value,
    () => {
        if ($route.query.type == "edit") {
            let user = users.value.find((item: any) => {
                return item.id == $route.query.id;
            });
            Object.assign(userParams, user)
        }
    }
);
// 重写
const reset = () => {
    Object.assign(userParams, {
        id: null,
        name: "",
        certificatesType: "",
        certificatesNo: "",
        sex: 0,
        birthdate: "",
        phone: "",
        isMarry: 0,
        isInsure: 0,
        addressSelected: [],
        address: "",
        contactsName: "",
        contactsCertificatesType: "",
        contactsCertificatesNo: "",
        contactsPhone: "",
    });
};
</script>

<style scoped lang="scss">
.manage {
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .pp_list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        .pp_item {
            cursor: pointer;
            margin: 10px 3px;
            width: 32%;
            border: 1px solid #c4c4c4;


        }
    }
}
</style>