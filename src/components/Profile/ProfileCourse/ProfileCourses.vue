<script setup>
import Course from './Course.vue';
import { defineProps } from 'vue';
const props = defineProps({
  userCourses: { type: Array, require: true }
});
</script>

<template>
  <div class="profile-courses">
    <p class="heading">Các khóa học đã tham gia</p>
    <div class="content">
      <Course v-for="course in userCourses" :key="course" :course="course" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-courses {
  width: 100%;
  height: fit-content;
  background-color: $body-color;
  border-radius: 10px;
  padding: 24px;
  border: 1px solid #000;
  border-radius: 10px;
  -webkit-box-shadow: 2px 4px 3px 0px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 2px 4px 3px 0px rgba(0, 0, 0, 0.35);
  box-shadow: 2px 4px 3px 0px rgba(0, 0, 0, 0.35);
  background-color: $body-color;
  .heading {
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 22px;
    @include tablet {
      font-size: 32px;
    }
    @include mobile {
      font-size: 22px;
    }
  }
  .content {
    width: 100%;
  }
}
</style>
