<script setup lang="js">
import { useMessage } from '@/composables/useMessage';
import { useNotification } from '@/composables/useNotification';

const notification = useNotification();
const message = useMessage();
</script>

<template>
  <div>
    <h1>Messages</h1>
    <button
      @click="
        message.infor({
          content: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
          duration: 4000,
          hoverKeepAlive: true
        })
      "
    >
      Infor!
    </button>
    <button @click="message.success({ content: 'This is content!', duration: 4000 })">
      Sucess
    </button>
    <button @click="message.error({ content: 'This is content!', duration: 2000 })">Error</button>
    <button @click="message.warning({ content: 'This is content!', duration: 2000 })">
      Warning
    </button>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  color: $color-primary;
}
button {
  margin-right: 20px;
}
</style>
