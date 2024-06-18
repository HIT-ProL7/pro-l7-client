<script setup lang="js">
import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
  <div class="container">
    <Sidebar></Sidebar>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
}
</style>
