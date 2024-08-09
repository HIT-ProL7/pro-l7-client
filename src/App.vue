<script setup>
import { NModalProvider, NConfigProvider, NMessageProvider, NDialogProvider } from 'naive-ui';
const themeOverrides = {
  common: {
    primaryColor: '#F06C25',
    primaryColorHover: '#F06C25',
    primaryColorPressed: '#F06C25'
  },
  Card: {
    paddingHuge: '0'
  }
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider :max="5">
      <n-dialog-provider>
        <n-modal-provider>
          <router-view></router-view>
        </n-modal-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
