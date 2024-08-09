<script setup>
import { NButton, useMessage, useDialog } from 'naive-ui';
import { ref, onMounted } from 'vue';
import { useClassStore } from '@/stores/classStore';
import { useRoute } from 'vue-router';

const roadmapDefault = ref(
  'https://drive.google.com/file/d/1CvHy14HSRKc07h7riIl50y0z3GjGhq6C/preview'
);
const roadmapUrl = ref('');
const message = useMessage();
const dialog = useDialog();
const classStore = useClassStore();
const route = useRoute();

const roadmapUrlFinal = ref('');

function postRoadmap() {
  if (roadmapUrl.value) {
    dialog.warning({
      title: 'Xác nhận',
      content: `Bạn muốn gửi lộ trình này?`,
      positiveText: 'Xác nhận',
      negativeText: 'Hủy',
      onPositiveClick: async () => {
        const length = roadmapUrl.value.length;
        for (let i = length; i >= 0; i--) {
          if (roadmapUrl.value[i] === '/') {
            roadmapUrlFinal.value = roadmapUrl.value.slice(0, i + 1) + 'preview';
            break;
          }
        }
        const res = await classStore.updateRoadmap(
          { roadmap: roadmapUrlFinal.value },
          route.params.id
        );
        if (res.status == 200) {
          message.success('Gửi lộ trình thành công');
          await classStore.getDetailClass(route.params.id);
          roadmapUrl.value = '';
        } else if (res.response.status) message.error('Gửi lộ trình thất bại');
      },
      onNegativeClick: () => {
        message.error('Hủy');
      }
    });
  } else {
    message.info('Hãy gán link pdf');
  }
}

onMounted(async () => {
  await classStore.getDetailClass(route.params.id);
});
</script>

<template>
  <div class="class-roadmap-wrap">
    <p class="heading">
      Lộ trình lớp học
      <a
        href="https://drive.google.com/file/d/18We9Lpk-Uiu4b98CzdoVSJbPFYzPTz4J/view?usp=sharing"
        target="_blank"
        >Hướng dẫn</a
      >
    </p>
    <div class="roadmap-input">
      <input type="text" placeholder="Đặt link tại đây" v-model="roadmapUrl" />
      <n-button type="primary" style="width: 64px" @click="postRoadmap">Gửi</n-button>
    </div>
    <div class="roadmap">
      <h1 v-if="!classStore.roadmap" style="text-align: center">Chưa có lộ trình</h1>
      <iframe :src="classStore.roadmap" frameborder="0" v-if="classStore.roadmap"></iframe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.class-roadmap-wrap {
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
    > a {
      margin-left: 4px;
      font-size: 20px;
      text-decoration: underline;
      color: blue;
    }
  }
  .roadmap {
    display: flex;
    justify-content: center;
    iframe {
      width: 100%;
      height: 900px;
      @include mobile {
        height: 550px;
      }
    }
  }
  .roadmap-input {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
    @include mobile {
      justify-content: center;
    }
    > input {
      width: 30%;
      padding: 6px 8px;
      @include mobile {
        width: 70%;
      }
    }
  }
}
</style>
