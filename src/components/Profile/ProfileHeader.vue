<script setup>
import { Icon } from '@iconify/vue';
import { defineProps } from 'vue';

const props = defineProps({
  userImg: { type: Object, require: true }
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
        <div class="change-avatar icon-setting center">
          <div class="icon-wrap center">
            <Icon icon="bi:camera-fill" font-size="28px" />
          </div>
        </div>
      </div>
      <p class="profile-name">Vũ Gia Chiến</p>
    </div>
    <div class="change-banner center">
      <div class="change-banner--icon icon-setting center">
        <div class="icon-wrap center">
          <Icon icon="bi:camera-fill" font-size="28px" />
        </div>
      </div>
      <p>Chỉnh sửa ảnh</p>
    </div>
    <div class="setting-profile center">
      <div class="setting-profile--icon icon-setting center">
        <div class="icon-wrap center">
          <Icon icon="icon-park-solid:setting-two" font-size="24px" />
        </div>
      </div>
      <p>Cài đặt</p>
    </div>
  </div>
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
      left: 80%;
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
