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
}
</script>

<template>
  <div class="class-lesson-wrap">
    <div class="heading-wrap">
      <p class="heading">Nội dung lớp học</p>
      <div
        class="add-lesson"
        @click="
          router.replace({
            name: 'LessonManagement',
            query: { option: 'add', classId: route.params.id }
          })
        "
      >
        <Icon icon="ic:round-plus" font-size="28px" />
      </div>
    </div>
    <div class="lesson-wrap">
      <div class="lesson" v-for="(ls, index) in classLesson" :key="index">
        <div class="lesson-title">
          <div @click="toggleLesson(index)">
            <div class="icon-title-wrap" :class="{ 'is-active': show[index] }">
              <Icon icon="ic:round-play-arrow" color="#F06C25" />
            </div>
            <p>{{ index + 1 }}. {{ ls.name }}</p>
          </div>
          <div
            @click="
              router.replace({
                name: 'LessonManagement',
                query: {
                  option: 'edit',
                  classId: route.params.id,
                  lessonId: ls.id,
                  vId: ls.videos[0].id,
                  exId: ls.exercises[0].id
                }
              })
            "
          >
            <Icon icon="solar:pen-2-bold" />
          </div>
        </div>
        <transition name="slide">
          <div class="lesson-detail" v-if="show[index]">
            <div>
              <div
                class="content"
                v-if="ls.content != null && ls.content != ''"
                @click="goToLessonDetail(route.params.id, ls.id, 'content', null)"
              >
                <div class="icon-wrap">
                  <Icon icon="fluent:document-one-page-24-filled" />
                </div>
                <p>Nội dung</p>
              </div>
              <div class="videos" v-if="ls.videos[0].url != '' || ls.videos[0].url">
                <div
                  class="video"
                  v-for="(v, index) in ls.videos"
                  :key="index"
                  @click="goToLessonDetail(route.params.id, ls.id, 'video', v.id)"
                >
                  <div class="icon-wrap"><Icon icon="lets-icons:video-fill" /></div>
                  <p>{{ v.title }}</p>
                </div>
              </div>
              <div
                class="exercises"
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
</template>

<style lang="scss" scoped>
.icon-title-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  svg {
    font-size: 36px;
  }
}
.class-lesson-wrap {
  font-size: 24px;
  .heading-wrap {
    display: flex;
    align-items: center;
    gap: 16px;
    .add-lesson {
      background-color: #ccc;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
  .heading {
    font-size: 36px;
    margin: 32px 0;
    font-weight: 500;
    margin-left: 32px;
    @include mobile {
      font-size: 24px;
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
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px;
      border: 1px solid $color-primary;
      border-radius: 8px;
      cursor: pointer;
      @include mobile {
        font-size: 24px;
      }
      .icon-title-wrap {
        transition: all 0.8s ease;
      }
      .is-active {
        transform: rotate(90deg);
      }
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @include mobile {
          max-width: 260px;
        }
      }
      > div:first-child {
        display: flex;
        align-items: center;
      }
      > div:last-child {
        background-color: #ccc;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        svg {
          padding: 4px;
        }
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
