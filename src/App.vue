<script setup>
import { NModalProvider, NConfigProvider, NMessageProvider } from 'naive-ui';
const themeOverrides = {
  Card: {
    paddingHuge: '0'
  }
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-modal-provider>
        <router-view></router-view>
      </n-modal-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
