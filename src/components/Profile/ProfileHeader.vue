<script setup>
import { Icon } from '@iconify/vue';
import { defineProps, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { NModal, NCard } from 'naive-ui';
import InforUpdate from '@/components/Profile/ProfileUpdate/InforUpdate.vue';
import ImageUpdate from '@/components/Profile/ProfileUpdate/ImageUpdate.vue';

const props = defineProps({
  userImg: { type: Object, require: true }
});

const showModal = ref(false);
const bodyStyle = ref({
  width: '40%',
  'text-align': 'center',
  'border-radius': '20px',
  background: 'linear-gradient(135deg, rgba(255, 126, 87, 1) 0%, rgba(254, 180, 123, 1) 100%)'
});

const inforUpdate = ref(false);
const avatar = ref(false);
const title = ref('');
function toggleSetting(name) {
  showModal.value = true;
  if (name === 'setting') {
    inforUpdate.value = true;
  } else {
    inforUpdate.value = false;
    if (name === 'avatar') {
      avatar.value = true;
      title.value = 'avatar';
    } else if (name === 'banner') {
      avatar.value = false;
      title.value = 'banner';
    }
  }
}

const setWidth = () => {
  if (!inforUpdate.value) {
    if (window.innerWidth < 480) {
      bodyStyle.value.width = '100%';
    } else bodyStyle.value.width = 'fit-content';
  } else {
    if (window.innerWidth >= 480 && window.innerWidth <= 1440) {
      bodyStyle.value.width = '80%';
    } else if (window.innerWidth < 480) {
      bodyStyle.value.width = '100%';
    } else {
      bodyStyle.value.width = '40%';
    }
  }
};

onMounted(() => {
  window.addEventListener('resize', setWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setWidth);
});

watch([showModal, inforUpdate, avatar], () => {
  setWidth();
});
</script>

<template>
  <div class="profile--header-wrap">
    <div class="banner">
      <img :src="userImg.banner" alt="" />
    </div>
    <div class="avatar center">
      <div class="avatar-img">
        <div class="img-wrap">
          <img :src="userImg.avatar" alt="" />
        </div>
        <div class="change-avatar icon-setting center" @click="toggleSetting('avatar')">
          <div class="icon-wrap center">
            <Icon icon="bi:camera-fill" font-size="28px" />
          </div>
        </div>
      </div>
      <p class="profile-name">Vũ Gia Chiến</p>
    </div>
    <div class="change-banner center" @click="toggleSetting('banner')">
      <div class="change-banner--icon icon-setting center">
        <div class="icon-wrap center">
          <Icon icon="bi:camera-fill" font-size="28px" />
        </div>
      </div>
      <p>Chỉnh sửa ảnh</p>
    </div>
    <div class="setting-profile center" @click="toggleSetting('setting')">
      <div class="setting-profile--icon icon-setting center">
        <div class="icon-wrap center">
          <Icon icon="icon-park-solid:setting-two" font-size="24px" />
        </div>
      </div>
      <p>Cài đặt</p>
    </div>
  </div>
  <n-modal v-model:show="showModal" class="custom-card" size="huge" title="Cài đặt">
    <n-card :style="bodyStyle" :bordered="false" size="huge">
      <template #header>
        <div class="custom-header" v-if="inforUpdate">
          <p>Cài đặt</p>
          <div class="close-modal" @click="showModal = false">x</div>
        </div>
        <div class="custom-header-setting" v-if="!inforUpdate">
          <p>Cập nhật {{ title }} của bạn</p>
          <div class="close-modal" @click="showModal = false">x</div>
        </div>
      </template>
      <InforUpdate v-if="inforUpdate" />
      <ImageUpdate :avatar="avatar" v-if="!inforUpdate" />
    </n-card>
  </n-modal>
</template>

<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-setting {
  padding: 6px;
  width: 40px;
  height: 40px;
  @include small-tablet {
    width: 30px;
    height: 30px;
  }
  .icon-wrap {
    width: 100%;
    height: 100%;
    svg {
      color: #535353;
      width: 100%;
      height: 100%;
    }
  }
}
.close-modal {
  color: #5e5e5e;
  font-size: 28px;
  cursor: pointer;
  @include mobile {
    font-size: 24px;
  }
}
.custom-header {
  width: 100%;
  padding: 16px;
  font-size: 36px;
  text-align: center;
  font-weight: bold;
  color: #fff;
  border-bottom: 1px solid #fff;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include mobile {
    font-size: 28px;
  }
  p {
    flex: 1;
  }
}
.custom-header-setting {
  width: 100%;
  padding: 16px;
  background: #fff;
  border-radius: 20px;
  font-size: 36px;
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include mobile {
    font-size: 28px;
  }
  p {
    background-image: linear-gradient(to right, #fd5c63, #ff9966);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    flex: 1;
    @include mobile {
      font-size: 24px;
    }
  }
}
.profile--header-wrap {
  width: 100%;
  height: fit-content;
  position: relative;
  border-radius: 20px;
  @include mobile {
    height: 100px;
  }
  .banner {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      @include mobile {
        object-fit: fill;
      }
    }
  }
  .avatar {
    position: absolute;
    bottom: 0;
    left: 85px;
    top: 60%;
    @include tablet {
      left: 40px;
      top: 55%;
    }
    @include small-tablet {
      top: 50%;
    }
    @include mobile {
      left: 50%;
      transform: translate(-50%, 40%);
    }
    .avatar-img {
      position: absolute;
      .img-wrap {
        width: 200px;
        height: 200px;
        @include tablet {
          width: 120px;
          height: 120px;
        }
        @include small-tablet {
          width: 90px;
          height: 90px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .change-avatar {
        position: absolute;
        right: 20px;
        bottom: 0;
        background-color: #b0b0b0;
        border-radius: 50%;
        cursor: pointer;
        @include tablet {
          right: 0;
        }
        @include mobile {
          bottom: -5px;
          right: -5px;
        }
      }
    }
    .profile-name {
      font-size: 42px;
      position: relative;
      left: 90%;
      top: 100%;
      @include tablet {
        font-size: 28px;
      }
      @include small-tablet {
        font-size: 20px;
      }
      @include mobile {
        font-size: 18px;
        bottom: 0;
        top: 140%;
        left: 0;
      }
    }
  }
  .change-banner {
    position: absolute;
    background-color: #fff;
    border-radius: 10px;
    right: 7px;
    bottom: 14px;
    cursor: pointer;
    padding-right: 6px;
    @include tablet {
      right: 4px;
      font-size: 12px;
      bottom: 11px;
    }
    @include mobile {
      padding-right: 0;
      border-radius: 50%;
      bottom: 2px;
      right: 5px;
    }
    p {
      @include mobile {
        display: none;
      }
    }
  }
  .setting-profile {
    position: absolute;
    background-color: #bfbfbf;
    border-radius: 10px;
    right: 7px;
    bottom: -42px;
    padding-right: 6px;
    cursor: pointer;
    @include tablet {
      right: 4px;
      bottom: -38px;
      font-size: 12px;
    }
    @include small-tablet {
      bottom: -20px;
    }
    @include mobile {
      padding-right: 0;
      bottom: -32px;
      right: 5px;
      border-radius: 50%;
    }
    p {
      @include mobile {
        display: none;
      }
    }
  }
}
</style>
