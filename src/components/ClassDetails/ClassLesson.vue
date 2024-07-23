<script setup>
import { Icon } from '@iconify/vue';
import { ref, defineProps } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const props = defineProps({
  classLesson: { type: Array, require: true }
});

const show = ref([0]);
function toggleLesson(index) {
  show.value[index] = !show.value[index];
}

function goToLessonDetail(classId, lsdId, option) {
  if (option == 'content')
    router.replace({
      name: 'Lesson-detail',
      params: { classId: classId, lsdId: lsdId },
      query: { content: null }
    });
  else
    router.replace({
      name: 'Lesson-detail',
      params: { classId: classId, lsdId: lsdId },
      query: { video: option }
    });
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
            <div>
              <div class="content" @click="goToLessonDetail(route.params.id, ls.id, 'content')">
                <div class="icon-wrap"><Icon icon="fluent:document-one-page-24-filled" /></div>
                <p>Nội dung</p>
              </div>
              <div class="videos">
                <div
                  class="video"
                  v-for="(v, index) in ls.videos"
                  :key="index"
                  @click="goToLessonDetail(route.params.id, ls.id, v.id)"
                >
                  <div class="icon-wrap"><Icon icon="lets-icons:video-fill" /></div>
                  <p>{{ v.title }}</p>
                </div>
              </div>
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
      cursor: pointer;
      @include mobile {
        font-size: 18px;
        padding: 16px 0 16px 16px;
      }
      > div {
        display: flex;
        flex-direction: column;
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
        p {
          &:hover {
            color: $color-primary;
          }
          @include mobile {
            font-size: 20px;
          }
        }
        > div {
          display: flex;
          align-items: center;
          .video {
            display: flex;
            align-items: center;
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
