<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  course: { type: Object, require: true }
});
</script>

<template>
  <div class="course">
    <div class="course--img">
      <img :src="course.logo" alt="" />
    </div>
    <div class="course--infor">
      <p class="heading">{{ course.name }}</p>
      <p class="desc">
        {{ course.desc }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.course {
  width: 100%;
  height: 150px;
  display: flex;
  gap: 32px;
  padding-right: 16px;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
  .course--img {
    img {
      height: 100%;
      object-fit: cover;
    }
  }
  .course--infor {
    height: 100%;
    padding: 8px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    .heading {
      font-size: 36px;
      font-weight: 500;
    }
    .desc {
      font-size: 24px;
      overflow: hidden;
      height: 70px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}
</style>
