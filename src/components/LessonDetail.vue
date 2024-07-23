<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLessonStore } from '@/stores/lessonStore';

const lessonStore = useLessonStore();
const route = useRoute();

const content = ref(false);
const video = ref(false);
async function getDetailLesson(lessonId) {
  try {
    await lessonStore.getDetailLesson(lessonId);
    if (route.query.video) {
      lessonStore.findVideoLesson(route.query.video);
      document.title = `${lessonStore.video.title} | ProL7`;
      video.value = true;
      content.value = false;
    } else if (!route.query.content) {
      document.title = `Nội dung bài học | ProL7`;
      content.value = true;
      video.value = false;
    }
  } catch (error) {
    return error;
  }
}

watch(
  () => route.query,
  () => {
    getDetailLesson(route.params.lsdId);
  }
);

onMounted(() => {
  getDetailLesson(route.params.lsdId);
});
</script>

<template>
  <div class="lesson-detail">
    <div class="video" v-if="video">
      <iframe
        src="https://www.youtube.com/embed/SeWt7IpZ0CA?si=Aub4aRVvb3T3o46a"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <p>{{ lessonStore.video.description }}</p>
    </div>
    <div class="content" v-if="content">
      <p>{{ lessonStore.lesson.content }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 10px;
  @include mobile {
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
.lesson-detail {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .video {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    max-width: 100%;
    background: #000;
    @include tablet {
      padding-bottom: 55%;
    }
    @include mobile {
      padding-bottom: 70%;
    }
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .content {
    height: 1000px;
    padding: 16px;
    p {
      font-size: 36px;
      font-weight: 500;
    }
  }
}
</style>
