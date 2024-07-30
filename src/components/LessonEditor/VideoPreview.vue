<script setup>
import { inject, onMounted, ref } from 'vue';

const html = ref('');
const videoIframe = inject('videoIframe');

onMounted(() => {
  if (videoIframe.value.includes('iframe')) html.value = videoIframe.value;
  else
    html.value = `<iframe width="960" height="480" src="${videoIframe.value}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  console.log('object');
});
</script>

<template>
  <div class="video-preview-wrap">
    <div class="video-preview" v-html="html"></div>
  </div>
</template>

<style lang="scss" scoped>
.video-preview-wrap {
  width: 100%;
  height: 100%;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
