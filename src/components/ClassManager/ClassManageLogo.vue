<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  logoName: { type: String, require: true }
});
</script>

<template>
  <div class="logo-container">
    <img :src="props.logoName" class="logo-img" />
  </div>
</template>

<style lang="scss" scoped>
.logo-container {
  width: 100%;
  .logo-img {
    width: 100%;
    height: 100%;
    border-radius: 20px 20px 0 20px;
    object-fit: cover;
  }
  .logo-title {
    font-size: 24px;
    font-weight: 500;
  }
}
</style>
