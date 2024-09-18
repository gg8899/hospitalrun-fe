<template>
    <div class="people" @click="change(index)">
        <div class="pp_top">
            <div class="left">
                <span class="pay_style">{{ item.isInsure == 1 ? "医保" : "自费" }}</span>
                <span class="pp_name">{{ item.name }}</span>
            </div>
            <div class="edit">
                <el-button type="primary" :icon="Edit" circle @click="handler" />
                <el-popconfirm @confirm="removeUser(item.id)" :title="`你确定要删除${item.name}`" width="200px">
                    <template #reference>
                        <el-button v-if="$route.path == '/user/manage'" circle type="danger" size="default"
                            :icon="Delete"></el-button>
                    </template>
                </el-popconfirm>
            </div>
        </div>
        <div class="pp_content">
            <el-descriptions :column="1">
                <el-descriptions-item label="证件类型：">{{ item.param?.certificatesTypeString
                }}</el-descriptions-item>
                <el-descriptions-item label="证件号码：">{{ item.certificatesNo }}</el-descriptions-item>
                <el-descriptions-item label="用户性别：">{{ item.sex === 0 ? "女生" : "男士"
                }}</el-descriptions-item>
                <el-descriptions-item label="出生日期：">{{ item.birthdate }}</el-descriptions-item>
                <el-descriptions-item label="手机号码：">{{ item.phone }}</el-descriptions-item>
                <el-descriptions-item label="婚姻状况：">{{ item.isMarry === 0 ? "未婚" :
                    "已婚" }}</el-descriptions-item>
                <el-descriptions-item label="当前住址：">{{ item.param?.cityString }}</el-descriptions-item>
                <el-descriptions-item label="详细地址：">{{ item.param?.fullAddress }}</el-descriptions-item>

            </el-descriptions>
            <!-- 红色的已经选择的盒子 -->
            <!-- vue3提供的标签。 -->
            <transition name="confirm">
                <div class="confirm" v-if="index === currentIndex">已选择</div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqDelPatient } from '@/apis/user/index'
import { useRoute, useRouter } from "vue-router";
import { Edit, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'
let $route = useRoute();
let $router = useRouter();
const change = (i: number) => {
    $emit('changeVisitor', i)
}
//相应就诊人组件修改按钮的回调
const handler = () => {
  //要么是就诊人管理模块点击修改按钮
  //要么预约挂号点击修改按钮
  if ($route.path == "/user/manage") {
    $emit("editUser", props.item);
  } else {
    //路由跳转携带参数
    $router.push({ path: "/user/manage", query: { type: "edit", id: props.item.id } });
  }
};
// 删除一个用户
const removeUser = async (id: number) => {
    const res = await reqDelPatient(id)
    if (res.code === 200) {
        ElMessage({
            type: "success",
            message: '操作成功',
        });
        $emit('getAllPaient')
    } else {
        ElMessage({
            type: "error",
            message: '操作失败',
        });
    }
}
const $emit = defineEmits(['changeVisitor', 'getAllPaient', 'editUser'])
const props = defineProps(['item', 'currentIndex', 'index'])
</script>

<style scoped lang="scss">
.people {
    .pp_top {
        width: 100%;
        height: 60px;
        background-color: #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        font-size: 16px;

        .pay_style {
            background-color: #fff;
            padding: 5px;
            border-radius: 16px;
            margin-right: 15px;
        }
    }

    .pp_content {
        position: relative;
        padding: 20px 0 0 20px;

        .confirm {
            position: absolute;
            width: 200px;
            height: 200px;
            color: red;
            border-radius: 50%;
            border: 2px dashed red;
            text-align: center;
            line-height: 200px;
            left: 20%;
            top: 20%;
            opacity: 0.5;
            transform: rotate(35deg);
            font-weight: 900;
            font-size: 26px;
        }

        .confirm-enter-from {
            transform: scale(1);
        }

        .confirm-enter-active {
            transition: all 0.3s;
        }

        .confirm-enter-to {
            transform: scale(1.2);
        }
    }
}
</style>