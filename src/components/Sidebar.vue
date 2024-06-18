<script setup lang="js"></script>

<template>
  <div class="side-bar-wrapper">
    <h1>Sidebar</h1>
    <p><router-link to="/">Home</router-link></p>
    <p><router-link to="personal-infor">Trang cá nhân</router-link></p>
  </div>
</template>

<style lang="scss" scoped>
div.side-bar-wrapper {
  width: 200px;
  height: 100vh;
  background-color: $body-color;
}
</style>
