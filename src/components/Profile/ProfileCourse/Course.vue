<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  course: { type: Object, require: true }
});
</script>

<template>
  <div class="course">
    <div class="course-img-wrap center">
      <div class="course--img center">
        <img :src="course.logo" alt="" />
      </div>
    </div>
    <div class="course--infor">
      <p class="heading">{{ course.name }}</p>
      <p class="desc">
        {{ course.description }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.course {
  width: 100%;
  height: 150px;
  display: flex;
  gap: 32px;
  @include mobile {
    flex-direction: column;
    height: fit-content;
    align-items: center;
    gap: 0px;
    text-align: center;
  }
  &:not(:last-child) {
    margin-bottom: 16px;
  }
  .course-img-wrap {
    flex: 2;
    height: 150px;
    border-radius: 10px;
    -webkit-box-shadow: 2px 4px 3px 0px rgba(0, 0, 0, 0.35);
    -moz-box-shadow: 2px 4px 3px 0px rgba(0, 0, 0, 0.35);
    box-shadow: 2px 4px 3px 0px rgba(0, 0, 0, 0.35);
    background-color: $body-color;
    @include tablet {
      height: 130px;
    }
    @include mobile {
      flex: 1;
      height: 100px;
    }
    .course--img {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
    }
  }
  .course--infor {
    flex: 3;
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
      @include tablet {
        font-size: 32px;
      }
      @include mobile {
        flex: 1;
        font-size: 24px;
      }
    }
    .desc {
      font-size: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      @include tablet {
        font-size: 20px;
      }
      @include mobile {
        font-size: 18px;
      }
    }
  }
}
</style>
