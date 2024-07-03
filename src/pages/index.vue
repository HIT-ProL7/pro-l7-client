<script setup lang="js">
import { useRouter } from 'vue-router';

const router = useRouter();
const classes = [
  { id: 'cl1', name: 'Python' },
  { id: 'cl2', name: 'Photoshop' }
];

function goToClassDetail(classId) {
  router.push({ name: 'Class', params: { id: classId } });
}
</script>

<template>
  <div>
    <div v-for="c in classes" :key="c.id" @click="goToClassDetail(c.id)">
      <p>{{ c.name }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
p {
  font-size: 24px;
}
</style>
