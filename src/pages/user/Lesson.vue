<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useClassStore } from '@/stores/classStore';

const route = useRoute();
const router = useRouter();
const classStore = useClassStore();

const show = ref([0]);
function toggleLesson(index) {
  show.value[index] = !show.value[index];
}

function goToLessonDetail(classId, lsdId, option, optionId) {
  if (option == 'content') {
    router.replace({
      name: 'Lesson-detail',
      params: { classId: classId, lsdId: lsdId },
      query: { content: true }
    });
  } else if (option == 'exercise') {
    router.replace({
      name: 'Lesson-detail',
      params: { classId: classId, lsdId: lsdId },
      query: { exercise: optionId }
    });
  } else
    router.replace({
      name: 'Lesson-detail',
      params: { classId: classId, lsdId: lsdId },
      query: { video: optionId }
    });
  if (!responsive.value) showLessonList.value = false;
}

const showLessonList = ref(true);
const responsive = ref(true);
function toggleLessonList() {
  showLessonList.value = !showLessonList.value;
}

const setResponsive = () => {
  if (window.innerWidth >= 1440) {
    showLessonList.value = true;
    responsive.value = true;
  } else {
    showLessonList.value = false;
    responsive.value = false;
  }
};

onMounted(() => {
  window.addEventListener('resize', setResponsive);

  classStore.getAllLessons(route.params.classId);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setResponsive);
});

setResponsive();
</script>

<template>
  <div class="lesson-wrap">
    <div class="lesson-content-wrap">
      <router-view></router-view>
    </div>
    <transition name="slide-right">
      <div class="lesson-list-wrap" v-if="showLessonList">
        <div class="lesson-list">
          <div class="heading">
            <div class="close-list" @click="toggleLessonList" v-if="!responsive">x</div>
            <p>Nội dung khóa học</p>
          </div>
          <div class="lesson" v-for="(ls, index) in classStore.lessons" :key="index">
            <div class="lesson-title" @click="toggleLesson(index)">
              <div class="icon-title-wrap" :class="{ 'is-active': show[index] }">
                <Icon icon="ic:round-play-arrow" color="#F06C25" />
              </div>
              <p>{{ index + 1 }}. {{ ls.name }}</p>
            </div>
            <transition name="slide">
              <div class="lesson-detail" v-if="show[index]">
                <div>
                  <div
                    class="content"
                    v-if="ls.content != null && ls.content != ''"
                    @click="goToLessonDetail(route.params.classId, ls.id, 'content', true)"
                  >
                    <div class="icon-wrap"><Icon icon="fluent:document-one-page-24-filled" /></div>
                    <p>Nội dung</p>
                  </div>
                  <div class="videos" v-if="ls.videos[0].url != '' || ls.videos[0].url">
                    <div
                      class="video"
                      v-for="(v, index) in ls.videos"
                      :key="index"
                      @click="goToLessonDetail(route.params.classId, ls.id, 'video', v.id)"
                    >
                      <div class="icon-wrap"><Icon icon="lets-icons:video-fill" /></div>
                      <p>{{ v.title }}</p>
                    </div>
                  </div>
                  <div
                    class="exercise"
                    v-if="
                      (ls.exercises[0].content != null && ls.exercises[0].content != '') ||
                      ls.exercises[0].content
                    "
                  >
                    <div
                      class="exercise"
                      v-for="(ex, index) in ls.exercises"
                      :key="index"
                      @click="goToLessonDetail(route.params.id, ls.id, 'exercise', ex.id)"
                    >
                      <div class="icon-wrap">
                        <Icon icon="mingcute:question-fill" />
                      </div>
                      <p>BTVN</p>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </transition>
    <div class="toggle-lesson-list" @click="toggleLessonList" v-if="!responsive">
      <div class="icon-wrap">
        <Icon icon="material-symbols:play-lesson" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 10px;
  @include tablet {
    width: 0px;
  }
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.lesson-wrap {
  display: flex;
  width: 100%;
  position: relative;
  overflow: hidden;
  .lesson-content-wrap {
    width: 100%;
  }
  .toggle-lesson-list {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 3px solid $color-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    cursor: pointer;
    @include mobile {
      width: 50px;
      height: 50px;
    }
    .icon-wrap {
      width: 32px;
      height: 32px;
      color: $color-primary;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
  .lesson-list-wrap {
    width: 30%;
    height: 100vh;
    background-color: #fff;
    overflow: hidden;
    @media (max-width: 1440px) {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9999;
      width: 100%;
    }
  }
  .lesson-list {
    display: flex;
    flex-direction: column;
    padding: 24px 6px;
    overflow-y: auto;
    background-color: #fff;
    z-index: 9999;
    .heading {
      font-size: 36px;
      font-weight: 500;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      @include mobile {
        font-size: 28px;
        justify-content: center;
      }
      .close-list {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        border-radius: 50%;
        border: 1px solid;
        width: 50px;
        height: 50px;
        margin-right: 8px;
      }
    }
    .lesson {
      background-color: #fff;
      overflow: hidden;
      padding: 0 12px;
      &:not(:last-child) {
        margin-bottom: 8px;
      }
      .lesson-title {
        font-size: 24px;
        display: flex;
        align-items: center;
        padding: 8px;
        border: 1px solid $color-primary;
        border-radius: 8px;
        cursor: pointer;
        @include mobile {
          font-size: 24px;
        }
        .icon-title-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.8s ease;
        }
        .is-active {
          transform: rotate(90deg);
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
          font-size: 20px;
          &:not(:last-child) {
            margin-bottom: 8px;
          }
          .icon-wrap {
            margin-right: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            svg {
              width: 24px;
              height: 24px;
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
          > div.videos {
            display: block;
          }
          > div {
            display: flex;
            align-items: center;
            > div {
              display: flex;
              align-items: center;
            }
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
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(60px);
  opacity: 0;
  padding: 0;
}
</style>
