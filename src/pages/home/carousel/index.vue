<template>
    <div class="banner">
        <el-carousel height="350px">
            <el-carousel-item v-for="item in 4" :key="item">
                <img src="../../../assets/web-banner-1.png" alt="轮播图">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.banner {
    height: 350px;
    width: 100%;
    img {
        height: 350px;
        width: 100%;   
    }

}
</style>