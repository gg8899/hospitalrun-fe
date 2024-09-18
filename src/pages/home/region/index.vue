<template>
    <div class="region">
        <div class="content">
            <div class="left">地区：</div>
            <ul>
                <li @click="changeActive('')" :class="{ active: activeFlag === '' }">全部</li>
                <li @click="changeActive(item.value)" :class="{ active: activeFlag === item.value }"
                    v-for="item in regionArr" :key="item.id">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqHospitalLevelAndRegion } from '@/apis/home/index'
import { HospitalLevelAndRegionResponseData, HospitalLevelAndRegionArr } from '@/apis/home/type'

const regionArr = ref<HospitalLevelAndRegionArr>([]);
const activeFlag = ref<string>('');
onMounted(() => {
    getRegionArr()
})
const changeActive = (value: string) => {
    // console.log(value, 'value');

    activeFlag.value = value
    $emit('getRegion', value)
}
const getRegionArr = async () => {
    const result: HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion("Beijin")
    if (result.code === 200) {
        regionArr.value = result.data;
    }

}
const $emit = defineEmits(['getRegion'])
</script>
<script lang="ts">
export default {
    name: "Region",
};
</script>

<style lang="scss" scoped>
.region {
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