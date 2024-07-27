<script setup>
import { Icon } from '@iconify/vue';
import { defineProps } from 'vue';
import avatar from '@assets/avatar.png';
import { NPopover } from 'naive-ui';

const props = defineProps({
  classMembers: { type: Array, require: true }
});
</script>

<template>
  <div class="class-member-wrap">
    <p class="heading">Thành viên lớp</p>
    <table class="member-list">
      <thead>
        <tr>
          <th>STT</th>
          <th>Mã sinh viên</th>
          <th>Họ tên</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member, index) in classMembers" :key="index" class="member">
          <td>{{ index + 1 }}</td>
          <td>{{ member.studentCode }}</td>
          <n-popover
            placement="top-end"
            :overlap="false"
            trigger="click"
            :theme-overrides="{ padding: '0px', color: 'rgba(254, 180, 123, 1)' }"
          >
            <template #trigger>
              <td>
                <p>{{ member.fullName }}</p>
              </td>
            </template>
            <div
              class="member-infor"
              style="
                padding: 16px 32px;
                background: linear-gradient(
                  135deg,
                  rgba(255, 126, 87, 1) 0%,
                  rgba(254, 180, 123, 1) 100%
                );
                color: #fff;
              "
            >
              <div style="display: flex; align-items: center">
                <div class="avatar-wrap" style="margin-right: 16px">
                  <img :src="avatar" alt="" />
                </div>
                <p class="member-name">{{ member.fullName }}</p>
              </div>
              <p style="display: flex; align-items: center">
                <Icon icon="tabler:id" class="icon" />Mã SV: <span>{{ member.studentCode }}</span>
              </p>
              <p style="display: flex; align-items: center">
                <Icon icon="ph:student-bold" class="icon" />Khóa: <span>16</span>
              </p>
            </div>
          </n-popover>
          <td><Icon icon="bi:person-plus-fill" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.class-member-wrap {
  position: relative;
  .heading {
    font-size: 36px;
    margin: 32px 0;
    font-weight: 500;
    margin-left: 32px;
    @include mobile {
      font-size: 28px;
      margin: 24px 0;
      margin-left: 24px;
    }
  }
  .member-list {
    width: 100%;
    border-collapse: collapse;
    thead {
      background-color: transparent;
      font-size: 24px;
      font-weight: bold;
      border-bottom: 2px solid #ddd;
      @include mobile {
        font-size: 20px;
      }
    }
    tbody {
      font-size: 20px;
      @include mobile {
        font-size: 18px;
      }
    }
    th,
    td {
      border-bottom: 1px solid #ddd;
      padding: 8px;
      text-align: left;
      cursor: pointer;
    }
    th:first-child,
    td:first-child {
      width: 100px;
      text-align: center;
    }
    td:nth-child(2) {
      width: 200px;
    }
    td:nth-child(3) {
      width: 300px;
    }
    td:nth-child(4) {
      text-align: right;
      padding-right: 12px;
    }
    .n-popover__content {
      .member-infor {
        position: fixed;
        z-index: 999;
        width: fit-content;
        background: linear-gradient(135deg, rgba(255, 126, 87, 1) 0%, rgba(254, 180, 123, 1) 100%);
        color: #fff;
        padding: 32px;
        border-radius: 32px;
        border: 1px solid #000;
        @include mobile {
          width: 100%;
        }
        > div {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
          .avatar-wrap {
            width: 72px;
            height: 72px;
            @include mobile {
              width: 54px;
              height: 54px;
            }
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center top;
            }
          }
          p {
            font-size: 32px;
            @include mobile {
              font-size: 24px;
            }
          }
        }
        p {
          font-size: 24px;
          display: flex;
          flex-direction: row;
          align-items: center;
          @include mobile {
            font-size: 20px;
          }
          .icon {
            margin-right: 8px;
          }
          span {
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
