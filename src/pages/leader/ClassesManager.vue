<script setup>
import classrooms from '@/components/ClassManager/ClassroomsManage.vue';
import { useUserStore } from '@/stores/userStore';
import { useClassManageStore } from '@/stores/classManageStore';
import { useClassStore } from '@/stores/classStore';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const classManageStore = useClassManageStore();
const classStore = useClassStore();

const classManage = ref([]);

async function getClass() {
  await userStore.getInfor();
  if (userStore.userRole == 'ROLE_USER') {
    await userStore.getMyClass();
    classManage.value = userStore.myClass.filter((c) => {
      return c.leaders.some((l) => l.studentCode == userStore.studentCode);
    });
  } else {
    await classStore.getAllClasses();
    classManage.value = classStore.allClasses;
  }
}
onMounted(() => {
  getClass();
});
</script>

<template>
  <div class="class-manager-wrap">
    <classrooms :classInfor="classManage" />
  </div>
</template>

<style lang="scss" scoped>
.class-manager-wrap {
  width: 100%;
  height: 100%;
  min-height: 100vh;
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
