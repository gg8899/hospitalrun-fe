<template>
    <div class="certification">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>实名信息</span>
                </div>
            </template>
            <div class="content">
                <h3><el-icon>
                        <Warning />
                    </el-icon>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。
                </h3>
                <el-descriptions v-if="userInfo.authStatus !== 0" class="margin-top" :column="1" border>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                用户姓名
                            </div>
                        </template>
                        {{ userInfo.name }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                证件类型
                            </div>
                        </template>
                        {{ userInfo.certificatesType === '10' ? '身份证' : '户口本' }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                证件号码
                            </div>
                        </template>
                        {{ userInfo.certificatesNo }}
                    </el-descriptions-item>
                </el-descriptions>
                <el-form v-else ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                    style="width: 600px; margin: 0 auto;" class="demo-ruleForm">
                    <el-form-item label="用户姓名" prop="name">
                        <el-input placeholder="请输入" v-model="ruleForm.name" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="证件类型" prop="certificatesType">
                        <el-select style="width: 100%;" v-model="ruleForm.certificatesType">
                            <el-option v-for="item in certifyType" :label="item.name" :value="item.value" :key="item.id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号码" prop="certificatesNo">
                        <el-input placeholder="请输入" v-model.number="ruleForm.certificatesNo" />
                    </el-form-item>
                    <el-form-item label="上传证件" prop="certificatesUrl">
                        <el-upload class="avatar-uploader" action="/api/oss/file/fileUpload?fileHost=userAuah" :limit="1"
                            list-type="picture-card" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                            :on-remove="handleRemove" :on-preview="handlePictureCardPreview">
                            <img style="width: 100%;height: 100%;" src="../../../assets/auth_example.png" class="avatar"
                                alt="">
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button @click="resetForm(ruleFormRef)">重写</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-dialog v-model="dialogVisible">
            <img style="width: 100%;height: 100%;" w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { reqCertationType, reqCertifyUser, reqUserCertation } from '@/apis/user/index'
import { CertationTypeResponseData, CertationArr, UseringoResponseData, AuthUserInfo, UserParams } from '@/apis/user/type'
import { Warning } from '@element-plus/icons-vue'
import { onMounted, ref, reactive } from 'vue';
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<UserParams>({
    name: '',
    certificatesNo: '',
    certificatesType: '',
    certificatesUrl: '',
})

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

//自定义校验规则姓名方法
const validatorName = (rule: any, value: any, callBack: any) => {
    //rule:即为当前校验字段的校验规则对象
    const reg = /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;
    if (reg.test(value)) {
        callBack();
    } else {
        callBack(new Error("请输入正确中国人的名字"));
    }
};

//证件类型校验的方法
const validatorType = (rule: any, value: any, callBack: any) => {
    if (value == "10" || value == "20") {
        callBack();
    } else {
        callBack(new Error("请选择证件的类型"));
    }
};
//证件照图片的
const validatorUrl = (rule: any, value: any, callBack: any) => {
    if (value.length) {
        callBack();
    } else {
        callBack(new Error("请上传证件照图片"));
    }
};
//证件号码的校验方法
const validatorNo = (rule: any, value: any, callBack) => {
    let sfz = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
    let hkb = /^\d{9}$/;
    if (sfz.test(value) || hkb.test(value)) {
        callBack();
    } else {
        callBack(new Error("请输入正确的身份证或者户口本的号码"));
    }
};
const rules = {
    //用户姓名的校验规则
    //required:true,代表当前字段务必进行校验
    name: [
        {
            required: true,
            validator: validatorName,
        },
    ],
    certificatesType: [
        {
            required: true,
            validator: validatorType,
        },
    ],
    certificatesNo: [
        {
            required: true,
            validator: validatorNo,
        },
    ],
    certificatesUrl: [
        {
            required: true,
            validator: validatorUrl,
        },
    ],
};
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate()

    // 提交认证信息
    try {
        //认证成功
        await reqUserCertation(ruleForm);
        //提示消息
        ElMessage({
            type: "success",
            message: "认证成功",
        });
        //认证成功以后再次获取用户信息
        getUserInfo();
    } catch (error) {
        ElMessage({
            type: "error",
            message: "认证失败",
        });
    }
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any) => {
    // console.log(response, uploadFile);
    ruleForm.certificatesUrl = response.data
}
const handleRemove: UploadProps['onRemove'] = () => {
    ruleForm.certificatesUrl = ''
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}

// 1.查询用户信息
// 2、查询证件类型的所有的值
const userInfo = ref<AuthUserInfo>({} as AuthUserInfo)
const certifyType = ref<CertationArr>()
onMounted(() => {
    getCertifyType()
    getUserInfo()
})
const getUserInfo = async () => {
    const res: UseringoResponseData = await reqCertifyUser()
    if (res.code === 200) {
        userInfo.value = res.data
    }
}
const getCertifyType = async () => {
    const res: CertationTypeResponseData = await reqCertationType()
    if (res.code === 200) {
        certifyType.value = res.data
    }
}
</script>

<style scoped lang="scss">
.certification {
    .content {
        >h3 {
            text-align: center;
            font-size: 16px;
            color: #7f7f7f;
            margin: 20px 0;
        }
    }
}
</style>