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
    <div class="avatar">
      <div class="avatar-img">
        <div class="img-wrap">
          <img :src="userImg.avatar" alt="" />
        </div>
        <div class="change-avatar center">
          <Icon icon="bi:camera-fill" font-size="28px" />
        </div>
      </div>
      <p class="profile-name">Vũ Gia Chiến</p>
    </div>
    <div class="change-banner center">
      <div class="change-banner--icon center">
        <Icon icon="bi:camera-fill" font-size="28px" />
      </div>
      <p>Chỉnh sửa ảnh</p>
    </div>
    <div class="setting-profile center">
      <div class="setting-profile--icon center">
        <Icon icon="icon-park-solid:setting-two" font-size="24px"></Icon>
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
      left: 25px;
      top: 65%;
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
        @include mobile {
          width: 60px;
          height: 60px;
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
        padding: 6px;
        border-radius: 50%;
        @include tablet {
          right: 0;
        }
        @include mobile {
          bottom: -5px;
          right: -5px;
        }
        cursor: pointer;
        svg {
          color: #535353;
          @include tablet {
            width: 20px;
            height: 20px;
          }
          @include small-tablet {
            width: 16px;
            height: 16px;
          }
          @include mobile {
            width: 12px;
            height: 12px;
          }
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
        font-size: 14px;
      }
    }
  }
  .change-banner {
    position: absolute;
    background-color: #fff;
    padding: 8px;
    border-radius: 10px;
    right: 10px;
    height: 40px;
    bottom: 14px;
    cursor: pointer;
    @include tablet {
      font-size: 12px;
    }
    @include small-tablet {
      height: 32px;
    }
    @include mobile {
      height: 24px;
      padding: 4px;
      border-radius: 50%;
      bottom: 4px;
      right: 5px;
    }
    .change-banner--icon {
      margin-right: 8px;
      @include mobile {
        margin-right: 0;
      }
      svg {
        color: #535353;
        @include tablet {
          width: 20px;
          height: 20px;
        }
        @include small-tablet {
          width: 16px;
          height: 16px;
        }
      }
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
    padding: 8px;
    border-radius: 10px;
    right: 10px;
    height: 40px;
    bottom: -42px;
    cursor: pointer;
    @include tablet {
      font-size: 12px;
    }
    @include small-tablet {
      height: 32px;
      bottom: -32px;
    }
    @include mobile {
      height: 24px;
      bottom: -28px;
      right: 5px;
      border-radius: 50%;
      padding: 4px;
    }
    .setting-profile--icon {
      margin-right: 8px;
      @include mobile {
        margin-right: 0;
      }
      svg {
        color: #535353;
        @include tablet {
          width: 20px;
          height: 20px;
        }
        @include small-tablet {
          width: 16px;
          height: 16px;
        }
      }
    }
    p {
      @include mobile {
        display: none;
      }
    }
  }
}
</style>
