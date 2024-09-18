<template>
     <div v-if="$route.query.orderId">
      <OrderDetail />
    </div>
    <div v-else>
      <OrderList />
    </div>
</template>

<script setup lang="ts">
import OrderList from './list/index.vue'
import OrderDetail from './detail/index.vue'
import { useRoute } from 'vue-router'

const $route = useRoute()


</script>

<style scoped lang="scss"></style>