<script setup lang="js">
import classrooms from '@/components/Classrooms/Classrooms.vue';
import { useUserStore } from '@/stores/userStore';
import { onMounted } from 'vue';

const userStore = useUserStore();
const classes = [
  {
    id: 'cl1',
    name: 'Python',
    leader: 'Phạm Đình Tiến',
    startDate: '15/06/2024',
    endDate: '15/08/2024',
    logoType: 'python'
  },
  {
    id: 'cl3',
    name: 'Java',
    leader: 'Phạm Đình Tiến',
    startDate: '15/06/2024',
    endDate: '15/08/2024',
    logoType: 'java'
  },
  {
    id: 'cl2',
    name: 'Photoshop',
    leader: 'Phạm Đình Tiến',
    startDate: '15/06/2024',
    endDate: '15/08/2024',
    logoType: 'photoshop'
  },
  {
    id: 'cl4',
    name: 'Web',
    leader: 'Phạm Đình Tiến',
    startDate: '15/06/2024',
    endDate: '15/08/2024',
    logoType: 'web'
  }
];

onMounted(() => {
  userStore.getInfor();
});
</script>

<template>
  <div class="home">
    <classrooms :classInfor="classes" />
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
