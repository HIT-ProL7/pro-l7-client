<script setup>
import lessonIcon from '@assets/lesson.svg';
import videoIcon from '@assets/video.svg';
import exerciseIcon from '@assets/exercise.svg';

import { Icon } from '@iconify/vue';
import { ref, defineProps, inject } from 'vue';
const showOption = ref(true);

const videoIframe = inject('videoIframe');
const videoUrl = inject('videoUrl');

const contentLesson = inject('contentLesson');
</script>

<template>
  <div class="lesson-editor">
    <div class="lesson-editor-header">
      <div class="editor-option">
        <div :class="{ 'is-active': showOption }" @click="showOption = !showOption">Write</div>
        <div :class="{ 'is-active': !showOption }" @click="showOption = !showOption">Preview</div>
      </div>
      <div class="editor-infor">
        <slot name="editor-infor-icon"></slot>
      </div>
    </div>
    <div class="lessson-editor-content">
      <div class="editor" v-show="showOption">
        <slot name="video-editor"></slot>
        <slot name="content-editor"></slot>
      </div>
      <div class="preview" v-if="!showOption">
        <slot name="video-preview"></slot>
        <slot name="content-preview"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lesson-editor {
  width: 100%;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 32px;
  }
}
.lesson-editor-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid;
  border-bottom-right-radius: 10px;
  margin-bottom: 16px;

  .editor-option {
    display: flex;
    align-items: center;
    > div {
      padding: 8px 16px;
      background-color: #fff;
      cursor: pointer;
    }
    .is-active {
      border-top: 2px solid;
      border-left: 2px solid;
      border-right: 2px solid;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      bottom: -2px;
      height: 40px;
      position: relative;
    }
  }
  .editor-infor {
    padding: 8px;
    border-top: 2px solid;
    border-left: 2px solid;
    border-right: 2px solid;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 24px;
    }
  }
}
.lessson-editor-content {
  border: 1px solid #404040;
  border-radius: 16px;
  min-height: 500px;
  > div {
    height: 100%;
    min-height: 500px;
    border-radius: 16px;
    padding: 8px;
    overflow: hidden;
  }
}
</style>
