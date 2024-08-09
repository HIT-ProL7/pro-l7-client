<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NButtonGroup,
  useMessage,
  useDialog,
  NDatePicker,
  NImage
} from 'naive-ui';
import { ref, defineEmits, computed } from 'vue';
import { useClassStore } from '@/stores/classStore';

const classStore = useClassStore();
const message = useMessage();
const dialog = useDialog();
const emits = defineEmits(['closeModal', 'refreshClasses']);

const formRef = ref(null);
const formValue = ref({
  name: null,
  description: null,
  startedDate: null,
  logoImg: null
});
const rules = {
  name: {
    required: true,
    message: 'Hãy nhập tên lớp',
    trigger: ['blur', 'input']
  },
  startedDate: {
    required: true
  }
};

const logoImg = ref(null);
function getFile(event) {
  const file = event.target.files[0];
  formValue.value.logoImg = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      logoImg.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

const timestamp = ref(null);
const isoString = computed(() => new Date(timestamp.value).toISOString());

function addClassHandler() {
  formValue.value.startedDate = isoString.value;
  dialog.warning({
    title: 'Thêm lớp học',
    content: `Xác nhận thêm lớp?`,
    positiveText: 'Xác nhận',
    negativeText: 'Hủy',
    onPositiveClick: async () => {
      if (formValue.value.name && formValue.value.startedDate) {
        console.log(formValue.value);
        const res = await classStore.addClass(formValue.value);
        if (res.status == 201) {
          message.success('Thêm lớp thành công');
          emits('refreshClasses');
        } else if (res.response.status == 400) {
          message.error('Thêm lớp thất bại. Lớp học này đã tổn tại');
        }
        console.log(res);
      } else message.warning('Hãy điền đầy đủ thôn tin');
    },
    onNegativeClick: () => {
      message.info('Hủy thêm lớp');
    }
  });
}

function closeModal() {
  emits('closeModal');
}
</script>

<template>
  <n-form ref="formRef" :model="formValue" :rules="rules" style="margin-top: 16px">
    <n-form-item path="name" label="Tên lớp">
      <n-input
        @keydown.enter.prevent
        v-model:value="formValue.name"
        placeholder="Nhập tên tại đây"
      />
    </n-form-item>
    <n-form-item path="startedDate" label="Ngày bắt đầu">
      <n-date-picker
        v-model:value="timestamp"
        type="datetime"
        clearable
        style="width: 100%"
        placeholder="Chọn ngày bắt đầu"
      />
    </n-form-item>
    <n-form-item path="description" label="Mô tả">
      <n-input
        @keydown.enter.prevent
        v-model:value="formValue.description"
        placeholder="Nhập mô tả tại đây"
        type="textarea"
        style="resize: none; height: 120px"
      />
    </n-form-item>
    <div class="logo-img-wrap">
      <div class="header">
        <p class="title">Logo lớp học</p>
        <n-button><label for="logoImg">Chọn</label></n-button>
        <input
          id="logoImg"
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          @change="getFile"
          style="display: none"
        />
      </div>
      <div class="logo-img">
        <n-image :src="logoImg" width="100%" height="100%" style="width: 100%" v-if="logoImg" />
      </div>
    </div>
    <n-button-group style="gap: 16px; width: 100%; justify-content: flex-end">
      <n-button strong secondary type="tertiary" @click="closeModal"> Hủy </n-button>
      <n-button type="primary" @click="addClassHandler"> Thêm </n-button>
    </n-button-group>
  </n-form>
</template>

<style lang="scss" scoped>
.logo-img-wrap {
  margin-bottom: 16px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .logo-img {
    width: 100%;
  }
}
.n-button label {
  cursor: pointer;
}
.n-form-item {
  margin-bottom: 8px;
}
</style>
