<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NSelect,
  NButtonGroup,
  useMessage,
  useDialog
} from 'naive-ui';
import { ref, defineEmits } from 'vue';
import { useClassStore } from '@/stores/classStore';
import { useRoute } from 'vue-router';

const route = useRoute();
const message = useMessage();
const dialog = useDialog();
const classStore = useClassStore();
const emits = defineEmits(['closeModal', 'refreshMemberList']);

const formRef = ref(null);
const formValue = ref({
  studentCode: null,
  seatRole: null,
  startedDate: null
});
const rules = {
  studentCode: {
    required: true,
    message: 'Hãy nhập tên thành viên',
    trigger: ['blur', 'trigger']
  },
  seatRole: {
    required: true,
    message: 'Hãy chọn vị trị',
    trigger: ['blur', 'trigger']
  }
};

const memberRoleOptions = [
  {
    label: 'Vị trí',
    value: ''
  },
  {
    label: 'Thành viên',
    value: 'MEMBER'
  },
  {
    label: 'Leader',
    value: 'LEADER'
  }
];

function addMemberHandler() {
  dialog.warning({
    title: 'Thêm thành viên',
    content: `Xác nhận thêm thành viên?`,
    positiveText: 'Xác nhận',
    negativeText: 'Hủy',
    onPositiveClick: async () => {
      if (formValue.value.studentCode && formValue.value.seatRole) {
        const res = await classStore.addMember(route.params.id, formValue.value);
        console.log(res);
        if (res.status == 200) {
          emits('refreshMemberList');
          message.success('Thêm thành viên thành công');
        } else if (res.response.status == 404) {
          message.error('Không tìm thấy thành viên này');
        } else if (res.response.status == 400) {
          message.error('Thành viên đã có trong lớp');
        }
      } else message.warning('Hãy điền đầy đủ thông tin');
    },
    onNegativeClick: () => {
      message.info('Hủy thêm thành viên');
    }
  });
}

function closeModal() {
  emits('closeModal');
}
</script>

<template>
  <n-form ref="formRef" :model="formValue" :rules="rules" style="margin-top: 16px">
    <n-form-item path="studentCode" label="Mã sinh viên">
      <n-input
        @keydown.enter.prevent
        v-model:value="formValue.studentCode"
        placeholder="Nhập mã sinh viên tại đây"
      />
    </n-form-item>
    <n-form-item path="seatRole" label="Vị trí">
      <n-select v-model:value="formValue.seatRole" :options="memberRoleOptions" />
    </n-form-item>
    <n-button-group style="gap: 16px; width: 100%; justify-content: flex-end">
      <n-button strong secondary type="tertiary" @click="closeModal"> Hủy </n-button>
      <n-button type="primary" @click="addMemberHandler"> Thêm </n-button>
    </n-button-group>
  </n-form>
</template>

<style lang="scss" scoped></style>
