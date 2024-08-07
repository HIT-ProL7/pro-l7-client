<script setup>
import { inject, watch } from 'vue';
const videoIframe = inject('videoIframe');
</script>

<template>
  <div class="video-editor-wrap">
    <div class="textarea-wrap">
      <textarea
        placeholder="Đặt iframe video youtube của bạn vào đây. Bỏ width và height để có preview tốt nhất!"
        v-model="videoIframe"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.video-editor-wrap {
  width: 100%;
  height: 100%;
  min-height: 500px;
  .textarea-wrap {
    width: 100%;
    height: 100%;
    min-height: 500px;
  }
  textarea {
    font-size: 18px;
    resize: none;
    width: 100%;
    border: none;
    outline: none;
    min-height: 500px;
  }
}
</style>
