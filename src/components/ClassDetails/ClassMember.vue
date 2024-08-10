<script setup>
import { Icon } from '@iconify/vue';
import { defineProps, ref, computed, onMounted } from 'vue';
import avatar from '@assets/avatar.png';
import { NPopover, NInput, NButton, NSelect } from 'naive-ui';

const props = defineProps({
  classMembers: { type: Array, require: true }
});

const memberList = ref([]);
memberList.value = props.classMembers;

// Lựa chọn tìm kiếm
const searchOptions = [
  {
    label: 'Tìm kiếm',
    value: ''
  },
  {
    label: 'Mã sinh viên',
    value: 'studentCode'
  },
  {
    label: 'Họ tên',
    value: 'fullName'
  }
];

const searchOption = ref('');
const searchInput = ref('');

const filterMemberList = computed(() => {
  if (searchInput.value == '') return memberList.value;
  else {
    if (searchOption.value == '') return memberList.value;
    else if (searchOption.value == 'studentCode') {
      return memberList.value.filter((m) =>
        m.studentCode.toLowerCase().includes(searchInput.value.toLowerCase())
      );
    } else if (searchOption.value == 'fullName') {
      return memberList.value.filter((m) =>
        m.fullName.toLowerCase().includes(searchInput.value.toLowerCase())
      );
    }
  }
});

const memberSize = ref(10);
const memberCnt = ref(10);
const memberListLength = ref(0);
const limitedMemberList = computed(() => filterMemberList.value.slice(0, memberSize.value));

onMounted(() => {
  memberListLength.value = memberList.value.length;
  console.log(props.classMembers);
});
</script>

<template>
  <div class="class-member-wrap">
    <div class="heading">
      <p>Thành viên lớp</p>
      <p>Số lượng: {{ memberListLength }}</p>
    </div>
    <div class="search">
      <n-input placeholder="Nhập tìm kiếm" class="n-input-custom" v-model:value="searchInput" />
      <n-button type="primary" @click="console.log(search)">Tìm kiếm</n-button>
      <n-select v-model:value="searchOption" :options="searchOptions" class="n-input-select" />
    </div>
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
        <tr v-for="(member, index) in limitedMemberList" :key="index" class="member">
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
              <div style="display: flex; align-items: center; margin-bottom: 8px">
                <div class="avatar-wrap" style="margin-right: 16px; width: 72px; height: 72px">
                  <img
                    :src="member.avatarUrl || avatar"
                    alt=""
                    style="
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                      object-position: center;
                      border-radius: 50%;
                    "
                  />
                </div>
                <p class="member-name" style="font-size: 18px">{{ member.fullName }}</p>
              </div>
              <p style="display: flex; align-items: center; font-size: 18px">
                <Icon icon="ic:baseline-facebook" class="icon" /><span> Facebook: </span>
                <span
                  style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-word;
                    max-width: 150px;
                  "
                  ><a
                    :href="member.facebookUrl"
                    target="_blank"
                    style="color: #fff; text-decoration: underline"
                    >{{ member.facebookUrl || 'Không có' }}</a
                  ></span
                >
              </p>
              <p style="display: flex; align-items: center; font-size: 18px">
                <Icon icon="mdi:github" class="icon" /><span> Github: </span>
                <span
                  style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-word;
                    max-width: 150px;
                  "
                  ><a
                    :href="member.githubUrl"
                    target="_blank"
                    style="color: #fff; text-decoration: underline"
                    >{{ member.githubUrl || 'Không có' }}</a
                  ></span
                >
              </p>
              <p style="display: flex; align-items: center; font-size: 18px">
                <Icon icon="ph:student-bold" class="icon" />Khóa:
                <span>{{ member.cohort || 17 }}</span>
              </p>
            </div>
          </n-popover>
          <td><Icon icon="bi:person-plus-fill" /></td>
        </tr>
      </tbody>
    </table>
    <div class="class-member-footer" v-if="memberSize < filterMemberList.length">
      <n-button @click="memberSize += memberCnt">Xem thêm</n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.class-member-wrap {
  position: relative;
  .heading {
    font-size: 36px;
    margin: 32px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include mobile {
      font-size: 24px;
      margin: 24px 8px;
      // flex-direction: column;
    }
  }
  .search {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    @include mobile {
      flex-direction: column;
    }
    .n-input-custom {
      width: 400px;
      @include tablet {
        width: 300px;
      }
      @include small-tablet {
        width: 250px;
      }
      @include mobile {
        width: 100%;
      }
    }
    .n-input-select {
      width: 10%;
      @include tablet {
        width: 20%;
      }
      @include small-tablet {
        width: 30%;
      }
      @include mobile {
        width: 100%;
      }
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
.class-member-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
