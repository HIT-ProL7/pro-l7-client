<script setup>
import { useClassStore } from '@/stores/classStore';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const classStore = useClassStore();
const route = useRoute();

onMounted(async () => {
  await classStore.getDetailClass(route.params.id);
});
</script>

<template>
  <div class="class-roadmap-wrap">
    <p class="heading">Lộ trình lớp học</p>
    <div class="roadmap">
      <iframe :src="classStore.roadmap" frameborder="0" />
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
}
</style>
