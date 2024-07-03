<script setup>
import { Icon } from '@iconify/vue';
import { ref, defineProps } from 'vue';

const props = defineProps({
  classLesson: { type: Array, require: true }
});

const show = ref([0]);
function toggleLesson(index) {
  show.value[index] = !show.value[index];
}
</script>

<template>
  <div class="class-lesson-wrap">
    <p class="heading">Nội dung lớp học</p>
    <div class="lesson-wrap">
      <div class="lesson" v-for="(ls, index) in classLesson" :key="index">
        <div class="lesson-title" @click="toggleLesson(index)">
          <div class="icon-title-wrap"><Icon icon="ic:round-play-arrow" color="#F06C25" /></div>
          <p>{{ index + 1 }}. {{ ls.name }}</p>
        </div>
        <transition name="slide">
          <div class="lesson-detail" v-if="show[index]">
            <div v-for="(lsd, i) in ls.lessonDetails" :key="i">
              <div class="icon-wrap"><Icon icon="fluent:document-one-page-24-filled" /></div>
              <p>{{ i + 1 }}. {{ lsd.name }}</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-title-wrap {
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  svg {
    width: 100%;
    height: 100%;
  }
}
.class-lesson-wrap {
  font-size: 24px;
  .heading {
    font-size: 36px;
    margin: 32px 0;
    font-weight: 500;
    margin-left: 32px;
    @include mobile {
      font-size: 28px;
      margin: 24px 0;
      margin-left: 24px;
    }
  }
  .lesson {
    background-color: #fff;
    overflow: hidden;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
    .lesson-title {
      font-size: 32px;
      display: flex;
      align-items: center;
      padding: 8px;
      border: 1px solid $color-primary;
      border-radius: 8px;
      cursor: pointer;
      @include mobile {
        font-size: 24px;
      }
    }
    .lesson-detail {
      transition: all 0.5s;
      padding: 32px 0 32px 32px;
      @include mobile {
        font-size: 18px;
        padding: 16px 0 16px 16px;
      }
      > div {
        display: flex;
        align-items: center;
        &:not(:last-child) {
          margin-bottom: 8px;
        }
        .icon-wrap {
          margin-right: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 24px;
          height: 24px;
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-30px);
  opacity: 0;
  padding: 0;
}
</style>
