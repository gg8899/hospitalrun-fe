<template>
    <div class="level">
        <h1>医院</h1>
        <div class="content">
            <div class="left">等级：</div>
            <ul>
                <li :class="{ active: activeFlag == '' }" @click="changeActive('')">全部</li>
                <li v-for="item in levelArr" :key="item.id" :class="{ active: activeFlag === item.value }"
                    @click="changeActive(item.value)">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqHospitalLevelAndRegion } from '@/apis/home/index'
import { HospitalLevelAndRegionResponseData, HospitalLevelAndRegionArr } from '@/apis/home/type'

const levelArr = ref<HospitalLevelAndRegionArr>([]);
const activeFlag = ref<string>('');
onMounted(() => {
    getLevelArr()
})
const changeActive = (value: string) => {
    activeFlag.value = value
    // 将值传给父组件
    $emit('getLevel', value)
}
const getLevelArr = async () => {
    const result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion("HosType")
    if (result.code === 200) {
        levelArr.value = result.data;
    }

}
const $emit = defineEmits(['getLevel'])
</script>
<script lang="ts">
export default {
    name: "Level",
};
</script>

<style lang="scss" scoped>
.level {
    width: 100%;
    color: #7f7f7f;

    .content {
        display: flex;
        min-height: 50px;
        margin-top: 15px;

        .left {
            width: 50px;
        }

        ul {
            flex: 1;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            cursor: pointer;

            >li {
                margin: 0 15px 15px 0;

                &.active {
                    color: rgb(23, 185, 249);
                }

                &:hover {
                    color: rgb(23, 185, 249);
                }
            }
        }
    }
}
</style>