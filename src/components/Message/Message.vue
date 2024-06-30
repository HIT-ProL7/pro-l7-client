<script setup>
import { computed, onMounted, ref } from 'vue';

import inforIcon from '../../assets/icons/infor.svg';
import successIcon from '../../assets/icons/success.svg';
import errorIcon from '../../assets/icons/error.svg';
import warningIcon from '../../assets/icons/warning.svg';

const props = defineProps({
  message: { type: Object, require: true }
});

const icon = computed(() => {
  if (props.message.type === 'infor') return inforIcon;
  else if (props.message.type === 'success') return successIcon;
  else if (props.message.type === 'error') return errorIcon;
  else return warningIcon;
});

const messRef = ref(null);

onMounted(() => {
  messRef.value.addEventListener('mouseover', props.message.pauseTimeout);
  messRef.value.addEventListener('mouseout', props.message.resumeTimeout);
});
</script>

<template>
  <div class="message-wrapper" ref="messRef">
    <div class="message-icon">
      <img :src="icon" alt="" />
    </div>
    <p class="message-content">{{ message.content }}</p>
  </div>
</template>

<style lang="scss" scoped>
.message-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  width: max-content;
  overflow-wrap: break-word;
  background-color: #fff;
  cursor: pointer;
  -webkit-box-shadow: 0px 2px 5px 0px rgba(163, 163, 163, 1);
  -moz-box-shadow: 0px 2px 5px 0px rgba(163, 163, 163, 1);
  box-shadow: 0px 2px 5px 0px rgba(163, 163, 163, 1);
  @include mobile {
    width: fit-content;
  }
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  .message-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    img {
      width: 24px;
      height: 24px;
      object-fit: cover;
    }
  }
  .message-content {
    text-align: justify;
  }
}
</style>
