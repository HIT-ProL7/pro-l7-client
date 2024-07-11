<script setup>
import { defineProps } from 'vue';
import pythonLogo from '../../assets/pythonLogo.png';
import javaLogo from '../../assets/javaLogo.png';
import photoshopLogo from '../../assets/photoshopLogo.png';
import webLogo from '../../assets/webLogo.png';

const props = defineProps({
  logoType: { type: String, require: true },
});
const getLogo = (logoType) => {
  switch (logoType) {
    case 'python':
      return pythonLogo;
      
    case 'java':
      return javaLogo;
    case 'photoshop':
      return photoshopLogo;
    case 'web':
      return webLogo;
    default:
      return webLogo;
  }
};
</script>

<template>
  <div class="logo-container">
    <img :src="getLogo(logoType)" class="logo-img" />
  
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
        @include tablet{
          width: 210px;
          height: 100%;
        }
        @include small-tablet{
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