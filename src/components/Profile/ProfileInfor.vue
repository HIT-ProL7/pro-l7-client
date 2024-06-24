<script setup>
import { Icon } from '@iconify/vue';
import { defineProps } from 'vue';
const props = defineProps({
  userInfor: { type: Object, require: true }
});
</script>

<template>
  <div class="profile-infor">
    <div class="infor">
      <p class="heading">Giới thiệu</p>
      <div class="content">
        <div>
          <Icon font-size="24px" icon="mdi:clipboard-text-date" />
          <p>Ngày tham gia:</p>
          <span>{{ userInfor.joinDate }}</span>
        </div>
        <div>
          <Icon font-size="24px" icon="ic:baseline-email" />
          <p>Email:</p>
          <span>{{ userInfor.email }}</span>
        </div>
        <div>
          <Icon font-size="24px" icon="mdi:github" />
          <p>Github:</p>
          <span
            ><a :href="userInfor.github" target="_blank">{{ userInfor.github }}</a></span
          >
        </div>
        <div>
          <Icon font-size="24px" icon="tabler:id" />
          <p>Mã SV:</p>
          <span>{{ userInfor.id }}</span>
        </div>
        <div>
          <Icon font-size="24px" icon="ph:student-bold" />
          <p>Khóa:</p>
          <span>{{ userInfor.term }}</span>
        </div>
      </div>
    </div>
    <div class="desc">
      <div class="icon icon--left"><span>“</span></div>
      <div class="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas odit dolor possimus amet
        reprehenderit cum sint velit, blanditiis earum tenetur delectus sapiente labore. Quaerat
        assumenda recusandae obcaecati, illum modi vel.
      </div>
      <div class="icon icon--right"><span>”</span></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-infor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  .infor,
  .desc {
    padding: 24px;
    border: 1px solid #000;
    border-radius: 10px;
    -webkit-box-shadow: 2px 4px 3px 0px rgba(0, 0, 0, 0.35);
    -moz-box-shadow: 2px 4px 3px 0px rgba(0, 0, 0, 0.35);
    box-shadow: 2px 4px 3px 0px rgba(0, 0, 0, 0.35);
    background-color: $body-color;
    font-size: 24px;
  }
  .infor {
    .heading {
      font-size: 36px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .content > div {
      display: flex;
      align-items: center;
      svg {
        margin-right: 8px;
      }
      span {
        font-weight: 500;
        margin-left: 8px;
      }
    }
  }
  .desc {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    .icon span {
      font-size: 96px;
      position: relative;
      top: -24px;
    }
    .content {
      text-align: justify;
    }
  }
}
</style>
