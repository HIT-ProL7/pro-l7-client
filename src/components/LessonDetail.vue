<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const lessons = [
  {
    id: 'ls1',
    name: 'Giới thiệu',
    lessonDetails: [
      { id: 'ls1D1', name: 'Giới thiệu lớp học', content: 'Content1' },
      { id: 'ls1D2', name: 'Video bài học', content: 'Content2' },
      { id: 'ls1D3', name: 'BTVN', content: 'Content3' }
    ]
  },
  {
    id: 'ls2',
    name: 'Giới thiệu 2',
    lessonDetails: [
      { id: 'ls2D1', name: 'Giới thiệu lớp học', content: 'Content4' },
      { id: 'ls2D2', name: 'Video bài học 2', content: 'Content5' },
      { id: 'ls2D3', name: 'BTVN 2', content: 'Content6' }
    ]
  }
];

const route = useRoute();

const lesson = ref({});
function getLesson(lsId) {
  lesson.value = lessons.find((ls) => ls.id === lsId);
}

const lessonDetail = ref({});
function getLessonDetail(lsdId) {
  lessonDetail.value = lesson.value.lessonDetails.find((lsd) => lsd.id === lsdId);
}

watch(
  () => route.params,
  () => {
    getLesson(route.params.lsId);
    getLessonDetail(route.params.lsdId);
    document.title = `${lessonDetail.value.name} | ProL7`;
  }
);

onMounted(() => {
  getLesson(route.params.lsId);
  getLessonDetail(route.params.lsdId);

  document.title = `${lessonDetail.value.name} | ProL7`;
});
</script>

<template>
  <div class="lesson-detail">
    <div class="video">
      <iframe
        src="https://www.youtube.com/embed/SeWt7IpZ0CA?si=Aub4aRVvb3T3o46a"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
    <div class="content">
      <p>This is content!</p>
      <p>{{ lessonDetail.name }}</p>
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
