<script setup>
import { provide, ref } from 'vue';
import Message from './Message.vue';

const messList = ref([]);
const messMax = ref(3);
provide('messList', messList);
provide('messMax', messMax);
</script>

<template>
  <div class="message-provider">
    <div class="message-list">
      <transition-group name="list">
        <Message v-for="mess in messList" :key="mess.id" :message="mess" />
      </transition-group>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.message-provider {
  height: 100vh;
  .message-list {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 999;
    @include mobile {
      width: 100%;
    }
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
