<script setup lang="js">
import classrooms from '@/components/Classrooms/Classrooms.vue';
import { useUserStore } from '@/stores/userStore';
import { onMounted } from 'vue';

const userStore = useUserStore();

onMounted(async () => {
  await userStore.getInfor();
  await userStore.getMyClass();
});
</script>

<template>
  <div class="home">
    <classrooms :classInfor="userStore.myClass" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  overflow: hidden;
  height: 100vh;
  background-color: $body-color;
  padding: 100px 50px 100px 50px;
  @include tablet {
    min-height: 100vh;
  }
  @include small-tablet {
    min-height: 100vh;
  }
  @include mobile {
    height: auto;
    padding: 32px;
  }
}

p {
  font-size: 24px;
}
</style>
