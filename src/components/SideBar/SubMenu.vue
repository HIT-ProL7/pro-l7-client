<script setup>
import { defineModel } from 'vue';
import { useRouter } from 'vue-router';

const toggleMenu = defineModel()

const router = useRouter();
const profileOnClickHandler = () => {
    router.replace({ name: 'Profile' })
    toggleMenu.value = false;
}
</script>

<template>
  <ul class="menu" v-if="toggleMenu">
    <li class="fist">
      <img src="../../assets/avatar.png" alt="avartar" />
      <span
        >Vũ Gia Chiến
        <p>User name</p>
      </span>
    </li>
    <li @click="profileOnClickHandler">Trang cá nhân</li>
    <li>Chế độ sáng/ tối</li>
    <li>Đăng xuất</li>
  </ul>
</template>

<style lang="scss" scoped>
    .menu {
        width: 250px;
        height: 230px;
        border: 1px solid #f06c25;
        position: absolute;
        left: 100px;
        top: 90px;
        font-size: 15px;
        padding: 0 30px;
        border-radius: 4px;
        background-color: #fff;
        text-align: start;
        z-index: 999;

        span {
            margin-left: 10px;
            p {
            font-size: 12px;
            }
        }
        .fist {
            display: flex;
            align-items: center;
        }
        li {
            padding: 13px 0;
            cursor: pointer;
        }
        li:not(:last-child) {
            border-bottom: 1px solid #949494;
        }
        img {
            width: 40px;
            height: 40px;
        }
    }
</style>
