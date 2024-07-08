<script setup>
import { NModalProvider, NConfigProvider } from 'naive-ui';
const themeOverrides = {
  Card: {
    paddingHuge: '0'
  }
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-modal-provider>
      <router-view></router-view>
    </n-modal-provider>
  </n-config-provider>
</template>

<style scoped></style>
