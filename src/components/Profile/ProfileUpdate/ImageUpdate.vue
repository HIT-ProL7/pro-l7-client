<script setup>
import { Icon } from '@iconify/vue';
import { ref, defineProps } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const props = defineProps({
  avatar: Boolean
});

const fileUrl = ref('');

function getFile(event) {
  const file = event.target.files[0];
  showFile(file);
}

function showFile(file) {
  const fileType = file.type;
  const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
  if (validExtensions.includes(fileType)) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      fileUrl.value = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  } else {
    alert('Đây không phải là file ảnh');
  }
}

function updateImageHandler() {
  console.log(typeof fileUrl.value);
  userStore.updateInfor({ description: fileUrl.value });
}
</script>

<template>
  <div class="setting-wrap">
    <div class="content">
      <label for="file">
        <div class="icon-wrap">
          <Icon icon="twemoji:plus" />
        </div>
        Chọn ảnh từ máy
      </label>
      <div class="img-wrap avatar" v-if="avatar">
        <img :src="fileUrl" alt="" />
      </div>
      <input id="file" type="file" accept="image/png, image/jpg, image/jpeg" @change="getFile" />
      <div class="img-wrap banner" v-if="!avatar">
        <img :src="fileUrl" alt="" />
      </div>
      <input id="file" type="file" accept="image/png, image/jpg, image/jpeg" @change="getFile" />
      <button @click="updateImageHandler">Lưu</button>
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
    label {
      align-self: flex-start;
      width: fit-content;
      display: flex;
      font-size: 20px;
      align-items: center;
      padding: 16px;
      background: #fff;
      border-radius: 32px;
      cursor: pointer;
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
        object-position: center top;
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
