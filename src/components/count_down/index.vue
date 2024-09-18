<template>
    <div>
        <span>获取验证码（{{ count }}s）</span>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const count = ref<number>(10)
const props = defineProps(['flag'])
const $emit = defineEmits(['getFlag'])
watch(
    () => props.flag,
    () => {
        //开启定时器
        let timer = setInterval(() => {
            count.value--;
            if (count.value == 0) {
                //通知父组件倒计时模式结束
                $emit('getFlag', false);
                //清除定时器
                clearInterval(timer);
            }
        }, 1000);
    },
    {
        immediate: true,
    })
</script>

<style scoped></style>