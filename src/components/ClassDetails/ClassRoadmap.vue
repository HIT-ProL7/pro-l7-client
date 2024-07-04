<script setup></script>

<template>
  <div class="class-roadmap-wrap">
    <p class="heading">Lộ trình lớp học</p>
    <div class="roadmap"></div>
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
}
</style>
