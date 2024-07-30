<script setup>
import { Icon } from '@iconify/vue';
import { defineProps } from 'vue';
const props = defineProps({
  studentCode: { type: String, require: true },
  email: { type: String, require: true },
  githubUrl: { type: String, require: true },
  createdAt: { type: String, require: true },
  cohort: { type: Number, require: true },
  desc: { type: String, require: true }
});
</script>

<template>
  <div class="profile-infor">
    <div class="infor">
      <p class="heading">Giới thiệu</p>
      <div class="content">
        <div>
          <div class="icon-wrap center">
            <Icon font-size="24px" icon="mdi:clipboard-text-date" />
          </div>
          <p>Ngày tham gia:</p>
          <span>{{ props.createdAt }}</span>
        </div>
        <div class="wrap">
          <div class="left">
            <div class="icon-wrap center">
              <Icon font-size="24px" icon="ic:baseline-email" />
            </div>
            <p>Email:</p>
          </div>
          <span class="word-wrap">{{ props.email }}</span>
        </div>
        <div class="wrap">
          <div class="left">
            <div class="icon-wrap center">
              <Icon font-size="24px" icon="mdi:github" />
            </div>
            <p>Github:</p>
          </div>
          <span class="word-wrap"
            ><a :href="props.githubUrl" target="_blank">{{ props.githubUrl }}</a></span
          >
        </div>
        <div>
          <div class="icon-wrap center">
            <Icon font-size="24px" icon="tabler:id" />
          </div>
          <p>Mã SV:</p>
          <span>{{ props.studentCode }}</span>
        </div>
        <div>
          <div class="icon-wrap center">
            <Icon font-size="24px" icon="ph:student-bold" />
          </div>
          <p>Khóa:</p>
          <span>{{ props.cohort }}</span>
        </div>
      </div>
    </div>
    <div class="desc">
      <span class="icon icon--left">“</span>
      <div class="content">{{ props.desc }}</div>
      <span class="icon icon--left">”</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-wrap {
  width: 40px;
  height: 40px;
  margin-right: 8px;
  @include small-tablet {
    width: 30px;
    height: 30px;
  }
  svg {
    width: 100%;
    height: 100%;
  }
}
.profile-infor {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @include tablet {
    gap: 32px;
  }
  @include small-tablet {
    gap: 28px;
  }
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
    @include mobile {
      padding: 18px;
    }
  }
  .infor {
    .heading {
      font-size: 36px;
      font-weight: 500;
      margin-bottom: 8px;
      @include tablet {
        font-size: 32px;
      }
      @include mobile {
        font-size: 22px;
      }
    }
    .content {
      @include mobile {
        > div.wrap {
          align-items: flex-start;
        }
      }
    }
    .content > div {
      display: flex;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
      }
      @include tablet {
        font-size: 22px;
      }
      @include mobile {
        font-size: 18px;
        span.word-wrap {
          margin-top: 4px;
        }
      }
      span {
        overflow-wrap: break-word;
        font-weight: 500;
        margin-left: 8px;
      }
      span.word-wrap {
        word-break: break-word;
      }
    }
  }
  .desc {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    span.icon {
      line-height: 24px;
      font-size: 96px;
      position: relative;
      top: 16px;
      @include small-tablet {
        font-size: 72px;
      }
      @include mobile {
        font-size: 56px;
      }
    }
    .content {
      text-align: justify;
      @include tablet {
        font-size: 22px;
      }
      @include mobile {
        font-size: 18px;
      }
    }
  }
}
</style>
