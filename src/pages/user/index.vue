<script setup lang="js">
import classrooms from '@/components/Classrooms/Classrooms.vue';
import { useUserStore } from '@/stores/userStore';
import { useClassStore } from '@/stores/classStore';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const classStore = useClassStore();
const myClass = ref([]);

async function getMyClass(id, role) {
  if (role == 'ROLE_USER') {
    await userStore.getMyClass();
    userStore.myClass.forEach((c) => {
      const result = c.members.find((m) => m.studentCode == id);

      if (result) myClass.value.push(c);
    });
  } else {
    await classStore.getAllClasses();
    myClass.value = classStore.allClasses;
  }
}
onMounted(async () => {
  await userStore.getInfor();
  getMyClass(userStore.studentCode, userStore.userRole);
});
</script>

<template>
  <div class="home">
    <classrooms :classInfor="myClass" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: max-content;
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

p {
  font-size: 24px;
}
</style>
