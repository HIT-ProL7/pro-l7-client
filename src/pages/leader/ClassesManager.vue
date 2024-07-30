<script setup>
import classrooms from '@/components/ClassManager/ClassroomsManage.vue';
import { useUserStore } from '@/stores/userStore';
import { useClassManageStore } from '@/stores/classManageStore';
import { onMounted } from 'vue';

const userStore = useUserStore();
const classManageStore = useClassManageStore();

async function getClass() {
  await userStore.getInfor();
  classManageStore.getClassManage(userStore.studentCode);
}
onMounted(() => {
  getClass();
});
</script>

<template>
  <div class="class-manager-wrap">
    <classrooms :classInfor="classManageStore.classManage" />
  </div>
</template>

<style lang="scss" scoped>
.class-manager-wrap {
  width: 100%;
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
</style>
