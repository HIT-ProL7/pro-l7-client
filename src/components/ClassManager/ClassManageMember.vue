<script setup>
import { Icon } from '@iconify/vue';
import { defineProps, ref, computed, onMounted } from 'vue';
import avatar from '@assets/avatar.png';
import { NPopover, NPopconfirm } from 'naive-ui';
import { useClassManageStore } from '@/stores/classManageStore';
import { useClassStore } from '@/stores/classStore';
import { useDialog, useMessage, NButton } from 'naive-ui';
import { useRoute } from 'vue-router';

const route = useRoute();
const message = useMessage();
const dialog = useDialog();
const classManageStore = useClassManageStore();
const classStore = useClassStore();
const props = defineProps({
  classMembers: { type: Array, require: true }
});

function removeMember(memberId, memberName, classId) {
  try {
    dialog.warning({
      title: 'Xác nhận',
      content: `Bạn chắc chắn muốn xóa ${memberName} ra khỏi lớp học?`,
      positiveText: 'Xác nhận',
      negativeText: 'Hủy',
      onPositiveClick: async () => {
        await classManageStore.removeMember(memberId, classId);
        await classStore.getDetailClass(route.params.id);

        memberList.value = classStore.members;
        memberListLength.value = memberList.value.length;
        message.success(`Xóa thành công ${memberName}`);
      },
      onNegativeClick: () => {
        message.error('Hủy xóa');
      }
    });
  } catch (error) {
    return error;
  }
}

const newStudentCode = ref('');
function addMember() {
  dialog.warning({
    title: 'Xác nhận',
    content: `Bạn muốn thêm thành viên vào lớp học?`,
    positiveText: 'Xác nhận',
    negativeText: 'Hủy',
    onPositiveClick: async () => {
      const response = await classManageStore.addMember(
        { studentCode: newStudentCode.value },
        route.params.id
      );
      console.log(response.status);
      if (response.status == 200) {
        message.success(`Thêm thành công thành công`);

        await classStore.getDetailClass(route.params.id);
        memberList.value = classStore.members;
        memberListLength.value = memberList.value.length;
      } else if (response.response.status == 400) {
        message.error('Thành viên này đã có trong lớp');
      } else if (response.response.status == 404) {
        message.error('Không tìm thấy thành viên');
      }
    },
    onNegativeClick: () => {
      message.error('Hủy thêm');
    }
  });
}

const memberList = ref([]);
// memberList.value = props.classMembers;

const memberSize = ref(10);
const memberCnt = ref(10);
const memberListLength = ref(0);
const limitedMemberList = computed(() => memberList.value.slice(0, memberSize.value));

onMounted(async () => {
  await classStore.getDetailClass(route.params.id);

  memberList.value = classStore.members;
  memberListLength.value = memberList.value.length;
});
</script>

<template>
  <div class="class-member-wrap">
    <div class="heading-wrap">
      <p class="heading">Thành viên lớp</p>
      <n-popconfirm
        :show-icon="false"
        negative-text="Hủy"
        positive-text="Thêm"
        @positive-click="addMember()"
      >
        <template #trigger>
          <div class="add-member">
            <Icon icon="ic:round-plus" font-size="28px" />
          </div>
        </template>
        <div class="input-student-code" style="width: 240px">
          <label for="studentCode" style="font-size: 20px">Nhập mã sinh viên: </label>
          <input
            type="text"
            v-model="newStudentCode"
            id="studentCode"
            style="width: 100%; padding: 8px 16px; font-size: 18px"
          />
        </div>
      </n-popconfirm>
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
                <Icon icon="tabler:id" class="icon" />Mã SV: <span>{{ member.studentCode }}</span>
              </p>
              <p style="display: flex; align-items: center; font-size: 18px">
                <Icon icon="ph:student-bold" class="icon" />Khóa: <span>16</span>
              </p>
            </div>
          </n-popover>
          <td>
            <Icon
              icon="ic:round-plus"
              @click="removeMember(member.id, member.fullName, route.params.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="class-member-footer" v-if="memberSize < memberListLength">
      <n-button @click="memberSize += memberCnt">Xem thêm</n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.class-member-wrap {
  position: relative;
  .heading-wrap {
    display: flex;
    align-items: center;
    gap: 16px;
    .add-member {
      background-color: #ccc;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .input-student-code {
      width: 250px;
    }
  }
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
      cursor: pointer;
    }
    td:nth-child(4) {
      text-align: right;
      padding-right: 12px;
      cursor: pointer;
      &:hover {
        color: $color-primary;
      }
      svg {
        transform: rotate(45deg);
      }
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
.class-member-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
