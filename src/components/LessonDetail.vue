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

const html = `<h2>Hi there,</h2><p>this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p><img src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg"><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.<br></p><div data-youtube-video=""><iframe width="640" height="480" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" src="https://www.youtube.com/embed/vphOHH5j5LQ" start="0"></iframe></div></li></ul><p>Isn’t that great? And all of that is editable. But wait, there’s more. <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.youtube.com/watch?v=vphOHH5j5LQ" class="my-link">Let’s try a code block:</a></p><pre><code class="language-css">body {display: none;}</code></pre><p>I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.</p><blockquote><p>Wow, that’s amazing. Good work, boy! 👏 <br>— Mom</p></blockquote>"
`;
onMounted(() => {
  getDetailLesson(route.params.lsdId);
  console.log(html.replace(/"/g, "'"));
});
</script>

<template>
  <div class="lesson-detail-container">
    <div class="video" v-if="video">
      <iframe
        :src="lessonStore.video.url"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
    <p v-if="video">{{ lessonStore.video.description }}</p>
    <div class="content-lesson" v-if="content" v-html="html || lessonStore.lesson.content"></div>
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
  .content-lesson {
    height: 1000px;
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
</style>
