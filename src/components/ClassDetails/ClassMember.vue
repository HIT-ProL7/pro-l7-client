<script setup>
import { Icon } from '@iconify/vue';
import { defineProps, ref } from 'vue';
import avatar from '@assets/avatar.png';

const props = defineProps({
  classMembers: { type: Array, require: true }
});

const memberIndex = ref(null);
const mouseX = ref(0);
const mouseY = ref(0);

function handleMouseEnter(index) {
  memberIndex.value = index;
}

function handleMouseLeave() {
  memberIndex.value = null;
}

function handleMouseMove(event) {
  if (window.innerWidth < 480) {
    mouseX.value = 3;
    mouseY.value = 70;
  } else {
    mouseX.value = event.clientX;
    mouseY.value = event.clientY;
  }
}
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
          <td>{{ member.msv }}</td>
          <td
            @mouseover="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave"
            @mousemove="handleMouseMove"
          >
            {{ member.name }}
          </td>
          <td><Icon icon="bi:person-plus-fill" /></td>
          <div
            class="member-infor"
            :style="{ top: mouseY + 'px', left: mouseX + 'px' }"
            v-if="memberIndex === index"
          >
            <div>
              <div class="avatar-wrap">
                <img :src="avatar" alt="" />
              </div>
              <p class="member-name">{{ member.name }}</p>
            </div>
            <p>
              <Icon icon="tabler:id" class="icon" />Mã SV: <span>{{ member.msv }}</span>
            </p>
            <p><Icon icon="ph:student-bold" class="icon" />Khóa: <span>16</span></p>
          </div>
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
    .member {
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
