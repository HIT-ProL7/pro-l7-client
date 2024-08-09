<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLessonStore } from '@/stores/lessonStore';
import Submission from '@components/LessonDetail/Submission.vue';

const lessonStore = useLessonStore();
const route = useRoute();

const option = ref('');
async function getDetailLesson(lessonId) {
  try {
    await lessonStore.getDetailLesson(lessonId);

    console.log();
    if (route.query.video) {
      document.title = `${lessonStore.videos[0].title} | ProL7`;
      option.value = 'video';
    } else if (route.query.content) {
      document.title = `Nội dung bài học | ProL7`;
      option.value = 'content';
    } else {
      document.title = `BTVN | ProL7`;
      option.value = 'exercise';
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
  <div class="lesson-detail-container">
    <h1 v-if="option == 'video'" style="margin: 8px 0">{{ lessonStore.videos[0].title }}</h1>
    <div class="video" v-if="option == 'video'">
      <iframe
        v-if="lessonStore.videos[0].url.includes('https://www.youtube.com/embed')"
        :src="lessonStore.videos[0].url"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
    <div
      class="lesson-detail-content lesson-content"
      v-if="option == 'content'"
      v-html="lessonStore.lesson.content"
    ></div>
    <div class="exercise-content-wrap">
      <div
        class="lesson-detail-content exercise-content"
        v-if="option == 'exercise'"
        v-html="lessonStore.exercise.content"
      ></div>
      <div class="submission-wrap" v-if="option == 'exercise'">
        <Submission />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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
.lesson-detail-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
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
  .lesson-detail-content {
    padding: 16px;
    :first-child {
      margin-top: 0;
    }

    a {
      color: blue;
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }
    }

    img {
      display: block;
      height: auto;
      margin: 1.5rem 0;
      max-width: 100%;

      &.ProseMirror-selectednode {
        outline: 3px solid var(--purple);
      }
    }
    /* List styles */
    ul,
    ol {
      padding: 0 1rem;
      margin: 1.25rem 1rem 1.25rem 0.4rem;

      li p {
        margin-top: 0.25em;
        margin-bottom: 0.25em;
      }
    }

    /* Heading styles */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
      margin-top: 2.5rem;
      text-wrap: pretty;
    }

    h1,
    h2 {
      margin-top: 3.5rem;
      margin-bottom: 1.5rem;
    }

    h1 {
      font-size: 1.4rem;
    }

    h2 {
      font-size: 1.2rem;
    }

    h3 {
      font-size: 1.1rem;
    }

    h4,
    h5,
    h6 {
      font-size: 1rem;
    }

    /* Code and preformatted text styles */
    code {
      background-color: red;
      border-radius: 0.4rem;
      color: #000;
      font-size: 0.85rem;
      padding: 0.25em 0.3em;
    }

    pre {
      background: #000;
      border-radius: 0.5rem;
      color: #fff;
      font-family: 'JetBrainsMono', monospace;
      margin: 1.5rem 0;
      padding: 0.75rem 1rem;

      code {
        background: none;
        color: inherit;
        font-size: 0.8rem;
        padding: 0;
      }
    }

    blockquote {
      border-left: 3px solid #ccc;
      margin: 1.5rem 0;
      padding-left: 1rem;
    }

    hr {
      border: none;
      border-top: 1px solid #ccc;
      margin: 2rem 0;
    }
  }
}
.submission-wrap {
  padding: 16px;
  margin-top: 32px;
}
</style>
