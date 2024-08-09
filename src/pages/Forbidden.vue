<script setup>
import logoHit from '@assets/logo2.png';
import backIcon from '@assets/icons/back.svg';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="access-forbidden">
    <div class="back-icon" @click="router.replace({ name: 'Home' })">
      <div class="back-icon-img">
        <img :src="backIcon" alt="" />
      </div>
      <p>Quay lại</p>
    </div>
    <div class="wrap">
      <div class="logo">
        <img :src="logoHit" alt="" />
      </div>
      <div class="infor">
        <p class="error">403</p>
        <p class="mess">Access Forbidden</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.access-forbidden {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .wrap {
    display: flex;
    gap: 32px;
    text-align: center;
    @include mobile {
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
  }
  .logo {
    width: fit-content;
    height: fit-content;
    @include tablet {
      width: 250px;
      height: 250px;
    }
    @include small-tablet {
      width: 200px;
      height: 200px;
    }
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .infor {
    font-size: 48px;
    @include tablet {
      font-size: 32px;
    }
    @include mobile {
      font-size: 28px;
    }
    .error {
      font-size: 156px;
      font-weight: bold;
      @include tablet {
        font-size: 128px;
      }
      @include mobile {
        font-size: 116px;
      }
    }
  }
  .back-icon {
    display: flex;
    align-items: center;
    position: absolute;
    top: 20px;
    left: 20px;
    gap: 12px;
    font-size: 24px;
    .back-icon-img {
      width: 48px;
      height: 48px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        &:hover {
          color: red;
        }
      }
    }
  }
}
</style>
