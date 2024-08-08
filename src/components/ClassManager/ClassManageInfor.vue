<script setup>
import { Icon } from '@iconify/vue';
import { defineProps } from 'vue';
const props = defineProps({
  name: { type: String, require: true },
  desc: { type: String, require: true },
  startedDate: { type: String, require: true },
  startedAt: { type: String, require: true },
  logo: { type: String, require: true },
  leaders: { type: Array, require: true }
});
</script>

<template>
  <div class="class-infor-wrap">
    <div class="class-infor">
      <p class="heading">{{ props.name }}</p>
      <p class="sub-heading">
        <span class="icon-wrap"><Icon icon="f7:person-fill" color="#fff" /></span>
        <span>Leader:</span>
        <span class="leader" v-for="(l, index) in props.leaders" :key="index">{{
          l.fullName
        }}</span>
      </p>
      <p class="sub-heading">
        <span class="icon-wrap"><Icon icon="mdi:clipboard-text-date" color="#fff" /></span>
        <span>Ngày bắt đầu: </span>
        <span>{{ props.startedDate }}</span>
      </p>
      <p class="desc">
        {{ props.desc }}
      </p>
    </div>
    <div class="class-img">
      <img :src="props.logo" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.class-infor-wrap {
  display: flex;
  background: rgb(255, 126, 87);
  background: linear-gradient(135deg, rgba(255, 126, 87, 1) 0%, rgba(254, 180, 123, 1) 100%);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 60px 50px;
  gap: 100px;
  justify-content: space-between;
  align-items: center;
  @include tablet {
    flex-direction: column;
    gap: 16px;
    justify-content: flex-start;
  }
  @include mobile {
    padding: 50px 20px 15px;
  }
  .class-infor {
    color: #fff;
    @include mobile {
      order: 2;
    }
    p:not(:last-child) {
      margin-bottom: 8px;
    }
    .heading {
      font-size: 48px;
      font-weight: 500;
      @include mobile {
        font-size: 32px;
        display: none;
      }
    }
    .sub-heading {
      font-size: 28px;
      .icon-wrap {
        margin-right: 4px;
        svg {
          transform: translateY(12%);
        }
      }
      @include mobile {
        font-size: 20px;
      }
      > .leader:not(:last-child)::after {
        content: ',';
      }
    }
    .desc {
      max-width: 940px;
      font-size: 24px;
      padding: 8px 24px;
      border: 1px solid #fff;
      border-radius: 10px;
      @include mobile {
        font-size: 18px;
      }
    }
  }
  .class-img,
  .class-img > img {
    width: 100%;
    max-width: 450px;

    @media screen and (max-width: 1025px) {
      max-width: 350px;
    }

    @include tablet {
      max-width: 100%;
    }

    @include mobile {
      max-width: 100%;
    }
  }
}
</style>
