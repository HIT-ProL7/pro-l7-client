<script setup>
import { defineProps } from 'vue';

import python from '@assets/course-logo/python.png';
import java from '@assets/course-logo/java.png';
import web from '@assets/course-logo/web.png';
import pts from '@assets/course-logo/pts.png';

const props = defineProps({
  logoName: { type: String, require: true }
});
const getLogo = (logoName) => {
  const newName = logoName.toLowerCase();
  switch (newName) {
    case 'python':
      return python;
      break;
    case 'java':
      return java;
      break;
    case 'web':
      return web;
      break;
    case 'pts':
      return pts;
      break;
  }
};
</script>

<template>
  <div class="logo-container">
    <img :src="getLogo(logoName)" class="logo-img" />
  </div>
</template>

<style lang="scss" scoped>
.logo-container {
  gap: 16px;
  .logo-img {
    width: 280px;
    height: 100%;
    border-radius: 20px 20px 0 20px;
    position: relative;
    @include tablet {
      width: 210px;
      height: 100%;
    }
    @include small-tablet {
      width: 230px;
      height: 100%;
    }
  }
  .logo-title {
    font-size: 24px;
    font-weight: 500;
  }
}
</style>
