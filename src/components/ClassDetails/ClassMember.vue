<script setup>
import { Icon } from '@iconify/vue';
import { defineProps } from 'vue';
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
        <tr v-for="(member, index) in classMembers" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ member.msv }}</td>
          <td>{{ member.name }}</td>
          <td><Icon icon="bi:person-plus-fill" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.class-member-wrap {
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
      text-align: center;
    }
    td:first-child {
      width: 100px;
    }
    td:nth-child(2) {
      width: 300px;
    }
    td:nth-child(3) {
      width: 300px;
    }
    td:last-child {
      text-align: right;
      padding-right: 12px;
    }
  }
}
</style>
