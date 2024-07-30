<script setup>
import LessonEditor from '@components/ClassManager/LessonEditor.vue';
import ContentEditor from '@/components/LessonEditor/ContentEditor.vue';
import ContentPreview from '@/components/LessonEditor/ContentPreview.vue';
import videoEditor from '@components/LessonEditor/VideoEditor.vue';
import videoPreview from '@components/LessonEditor/VideoPreview.vue';

import lessonIcon from '@assets/lesson.svg';
import videoIcon from '@assets/video.svg';
import exerciseIcon from '@assets/exercise.svg';

import { Icon } from '@iconify/vue';
import { defineProps, onMounted, provide, reactive, ref, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLessonStore } from '@/stores/lessonStore';
import { useMessage, useDialog } from 'naive-ui';

const lessonStore = useLessonStore();
const route = useRoute();
const router = useRouter();
const message = useMessage();
const dialog = useDialog();

const lessonName = ref('');
const videoName = ref('');
const videoUrl = ref('');
const videoIframe = ref('');
const contentLesson = ref('');
const exerciseLesson = ref('');

provide('contentLesson', contentLesson);
provide('videoIframe', videoIframe);
provide('videoUrl', videoUrl);
provide('exerciseLesson', exerciseLesson);

async function getDetailLesson() {
  await lessonStore.getDetailLesson(route.query.lessonId);
  videoIframe.value = lessonStore.lesson.videos[0].url;
  videoName.value = lessonStore.lesson.videos[0].title;
  contentLesson.value = lessonStore.lesson.content;
  lessonName.value = lessonStore.lesson.name;
  exerciseLesson.value = lessonStore.exercise.content;
}

function saveContent() {
  if (route.query.option == 'edit') {
    dialog.warning({
      title: 'Xác nhận lưu mới',
      content: `Bạn muốn lưu bài học mới?`,
      positiveText: 'Xác nhận',
      negativeText: 'Hủy',
      onPositiveClick: async () => {
        try {
          await lessonStore.updateLesson(
            route.query.lessonId,
            route.query.exId,
            route.query.vId,
            {
              name: lessonName.value,
              content: contentLesson.value.replace(/"/g, "'").replace(/({|})/g, '\\$1')
            },
            {
              content: exerciseLesson.value.replace(/"/g, "'").replace(/({|})/g, '\\$1')
            },
            {
              title: videoName.value,
              url: videoIframe.value.replace(/"/g, "'").replace(/({|})/g, '\\$1'),
              lessonId: route.query.lessonId
            }
          );
          console.log(lessonStore.lesson.content);
          console.log(contentLesson.value.replace(/"/g, "'").replace(/({|})/g, '\\$1'));
          message.success('Cập nhật bài học thành công');
        } catch (error) {
          console.log(error);
          message.error('Cập nhật bài học thất bại');
        }
      },
      onNegativeClick: () => {
        message.error('Hủy thêm');
      }
    });
  }
  if (route.query.option == 'add') {
    if (
      !lessonName.value &&
      !contentLesson.value &&
      !videoName.value &&
      !videoIframe.value &&
      !exerciseLesson.value
    ) {
      message.warning('Bạn cần nhập đầy đủ thông tin bài học');
      return false;
    } else {
      dialog.warning({
        title: 'Xác nhận thêm mới',
        content: `Bạn muốn thêm bài học mới?`,
        positiveText: 'Xác nhận',
        negativeText: 'Hủy',
        onPositiveClick: async () => {
          try {
            try {
              await lessonStore.createLesson({
                name: lessonName.value,
                content: contentLesson.value.replace(/"/g, "'").replace(/({|})/g, '\\$1'),
                classroomId: route.query.classId
              });
            } catch (error) {
              return error;
            }
            try {
              await lessonStore.createVideo({
                title: videoName.value,
                url: videoIframe.value.replace(/"/g, "'").replace(/({|})/g, '\\$1'),
                lessonId: lessonStore.lesson.id
              });
            } catch (error) {
              return error;
            }
            try {
              await lessonStore.createExercise(lessonStore.lesson.id, {
                title: videoName.value,
                url: videoIframe.value.replace(/"/g, "'").replace(/({|})/g, '\\$1'),
                lessonId: lessonStore.lesson.id
              });
            } catch (error) {
              return error;
            }
            message.success('Thêm bài học thành công');
          } catch (error) {
            console.log(error);
            message.error('Thêm bài học thất bại');
          }
        },
        onNegativeClick: () => {
          message.error('Hủy thêm');
        }
      });
    }
  }
}

function deleteLesson() {
  dialog.warning({
    title: 'Xác nhận xóa bài học',
    content: `Bạn muốn xóa bài học này?`,
    positiveText: 'Xác nhận',
    negativeText: 'Hủy',
    onPositiveClick: async () => {
      try {
        try {
          await lessonStore.deleteExercise(route.query.lessonId, route.query.exId);
        } catch (error) {
          console.log(error);
          return error;
        }
        try {
          await lessonStore.deleteLesson(route.query.lessonId);
        } catch (error) {
          console.log(error);
          return error;
        }
        message.success('Xóa bài học thành công');
        router.replace({ name: 'ClassManagement', params: { id: route.query.classId } });
      } catch (error) {
        console.log(error);
        message.error('Xóa bài học thất bại');
      }
    },
    onNegativeClick: () => {
      message.error('Hủy xóa');
    }
  });
}

onMounted(() => {
  if (route.query.option == 'add') document.title = 'Thêm bài học | ProL7';
  else document.title = 'Chỉnh sửa bài học | ProL7';

  if (route.query.option == 'edit') {
    getDetailLesson();
  } else {
    return 0;
  }
});
</script>

<template>
  <div class="lesson-manager-wrap">
    <div class="heading">
      <Icon
        icon="ep:arrow-left-bold"
        color="#F06C25"
        @click="router.replace({ name: 'ClassManagement', params: { id: route.query.classId } })"
      />
      <p v-if="route.query.option == 'add'">Thêm bài học</p>
      <p v-if="route.query.option == 'edit'">Chỉnh sửa nội dung bài học</p>
    </div>
    <div class="lesson-manager-content">
      <div class="lesson-name">
        <input type="text" v-model="lessonName" placeholder="Nhập tên bài học" />
      </div>
      <LessonEditor>
        <template #editor-infor-icon>
          <img :src="lessonIcon" alt="" class="editor-infor-icon" />
        </template>
        <template #content-editor>
          <ContentEditor option="content" />
        </template>
        <template #content-preview>
          <ContentPreview :html="contentLesson" />
        </template>
      </LessonEditor>
      <div class="lesson-name">
        <input type="text" v-model="videoName" placeholder="Nhập tên video" />
      </div>
      <LessonEditor>
        <template #editor-infor-icon>
          <img :src="videoIcon" alt="" class="editor-infor-icon" />
        </template>
        <template #video-editor>
          <videoEditor />
        </template>
        <template #video-preview>
          <videoPreview />
        </template>
      </LessonEditor>
      <LessonEditor>
        <template #editor-infor-icon>
          <img :src="exerciseIcon" alt="" class="editor-infor-icon" />
        </template>
        <template #content-editor>
          <ContentEditor option="exercise" />
        </template>
        <template #content-preview>
          <ContentPreview :html="exerciseLesson" />
        </template>
      </LessonEditor>
    </div>
    <div class="lesson-manager-footer">
      <button
        class="btn btn-exist"
        @click="router.replace({ name: 'ClassManagement', params: { id: route.query.classId } })"
      >
        Hủy
      </button>
      <button class="btn btn-del" v-if="route.query.option == 'edit'" @click="deleteLesson">
        Xóa
      </button>
      <button class="btn btn-save" @click="saveContent">Lưu</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lesson-manager-wrap {
  width: 100%;
  padding: 16px;
  .heading {
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 32px;
    display: flex;
    gap: 8px;
    align-items: center;
    svg {
      cursor: pointer;
    }
  }
}
.lesson-manager-content {
  padding: 0 48px;
  overflow: hidden;

  .lesson-name {
    width: 100%;
    margin-bottom: 32px;
    height: 48px;
    border: 1px solid $color-primary;
    border-radius: 8px;
    input {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 24px;
    }
  }
  .editor-infor-icon {
    width: 20px;
  }
}
.lesson-manager-footer {
  margin-top: 32px;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  .btn {
    padding: 8px 32px;
    border-radius: 32px;
    font-size: 18px;
    &:hover {
      opacity: 0.7;
      transition: all 0.2s ease-in-out;
    }
    &.btn-del {
      border: 3px solid $color-primary;
      background-color: #fff;
      color: $color-primary;
      &:hover {
        background-color: $color-primary;
        color: #fff;
      }
    }
    &.btn-save {
      border: 3px solid $color-primary;
      background-color: $color-primary;
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>
