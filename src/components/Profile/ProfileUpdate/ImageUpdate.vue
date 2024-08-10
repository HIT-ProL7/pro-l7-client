<script setup>
import { Icon } from '@iconify/vue';
import { useMessage, useDialog } from 'naive-ui';
import { ref, defineProps } from 'vue';
import { PinturaEditorModal } from '@pqina/vue-pintura';
import { getEditorDefaults } from '@pqina/pintura';
import '@pqina/pintura/pintura.css'; // Import Pintura styles
import { useUserStore } from '@/stores/userStore';

const message = useMessage();
const dialog = useDialog();
// Define reactive state
const propsEditor = ref(getEditorDefaults());
const visible = ref(false);
const src = ref('');
const result = ref(undefined);
const resultImg = ref(null);

// Handle process event
const handleProcess = (event) => {
  result.value = URL.createObjectURL(event.detail.dest);
  resultImg.value = event.detail.dest;
};

const userStore = useUserStore();
const props = defineProps({
  avatar: Boolean
});

const fileUrl = ref('');

function getFile(event) {
  // const file = event.target.files[0];
  // showFile(file);
  src.value = event.target.files[0];
  visible.value = true;
}

function continueEdit() {
  visible.value = true;
  src.value = result.value;
}

async function updateImageHandler() {
  if (props.avatar) {
    if (!src.value) message.info('Hãy chọn ảnh đại diện');
    else {
      dialog.warning({
        title: 'Xác nhận đổi ảnh đại diện',
        content: 'Bạn chắc chắn muốn đổi ảnh đại diện?',
        positiveText: 'Đổi',
        negativeText: 'Hủy',
        onPositiveClick: async () => {
          const res = await userStore.updateInfor({ avatar: resultImg.value });

          if (res.status == 200) {
            message.success('Đổi ảnh đại diện thành công');
          } else if (res.response.status) message.error('Lỗi đổi ảnh đại diện');
        },
        onNegativeClick: () => {
          message.error('Hủy đổi ảnh đại diện');
        }
      });
    }
  } else {
    if (!src.value) message.info('Hãy chọn ảnh bìa');
    else {
      dialog.warning({
        title: 'Xác nhận đổi ảnh bìa',
        content: 'Bạn chắc chắn muốn đổi ảnh bìa?',
        positiveText: 'Đổi',
        negativeText: 'Hủy',
        onPositiveClick: async () => {
          const res = await userStore.updateInfor({ banner: resultImg.value });

          if (res.status == 200) {
            message.success('Đổi ảnh bìa thành công');
          } else if (res.response.status) message.error('Lỗi đổi ảnh bìa');
        },
        onNegativeClick: () => {
          message.error('Hủy đổi ảnh bìa');
        }
      });
    }
  }
}
</script>

<template>
  <div class="setting-wrap">
    <PinturaEditorModal
      v-bind="propsEditor"
      v-if="visible"
      :src="src"
      @pintura:hide="visible = false"
      @pintura:process="handleProcess"
    />
    <div class="content">
      <div class="content-header">
        <label for="file">
          <div class="icon-wrap">
            <Icon icon="twemoji:plus" />
          </div>
          Chọn ảnh từ máy
        </label>
        <div class="icon-wrap center" v-if="result" @click="continueEdit">
          <Icon icon="solar:pen-bold" font-size="28px" />
        </div>
      </div>
      <div class="img-wrap avatar" v-if="avatar">
        <img :src="result" alt="" />
      </div>
      <input id="file" type="file" accept="image/png, image/jpg, image/jpeg" @change="getFile" />
      <div class="img-wrap banner" v-if="!avatar">
        <img :src="result" alt="" />
      </div>
      <input id="file" type="file" accept="image/png, image/jpg, image/jpeg" @change="getFile" />
      <button @click="updateImageHandler()">Lưu</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-wrap {
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  svg {
    width: 100%;
    height: 100%;
  }
}
.setting-wrap {
  min-width: 578px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include mobile {
    width: 100%;
    min-width: 0;
  }
  .content {
    padding: 32px;
    min-width: 578px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include mobile {
      width: 100%;
      min-width: 0;
    }
    .content-header {
      display: flex;
      align-items: center;
      align-self: flex-start;
      .icon-wrap {
        cursor: pointer;
      }
    }
    label {
      align-self: flex-start;
      width: fit-content;
      display: flex;
      font-size: 18px;
      align-items: center;
      padding: 16px;
      background: #fff;
      border-radius: 32px;
      cursor: pointer;
      margin-right: 16px;
      @include mobile {
        align-self: center;
      }
    }
    .img-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 300px;
      overflow: hidden;
      border-radius: 50%;
      background-color: #fff;
      position: relative;
      margin: 64px 0;
      @include mobile {
        width: 150px;
        height: 150px;
        margin: 32px 0;
      }
      &.banner {
        width: 1200px;
        height: 270px;
        border-radius: 16px;
        img {
          border-radius: 16px;
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 50%;
      }
    }
    .img-wrap.banner {
      @media (max-width: 1440px) {
        width: 900px;
        height: 200px;
      }
      @include tablet {
        width: 600px;
        height: 150px;
      }
      @include small-tablet {
        width: 400px;
        height: 100px;
      }
      @include mobile {
        width: 100%;
        height: 100px;
      }
    }
    input {
      display: none;
    }
    button {
      font-size: 20px;
      font-weight: bold;
      padding: 8px 32px;
      border-radius: 32px;
      color: #fff;
      background-color: $color-primary;
    }
  }
}
</style>
