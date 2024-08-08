<script setup>
import { NForm, NFormItem, NInput, NButton, NButtonGroup, useMessage, useDialog } from 'naive-ui';
import { ref, defineEmits } from 'vue';

const message = useMessage();
const dialog = useDialog();
const emits = defineEmits(['closeModal', 'registerMember']);

const formRef = ref(null);
const formValue = ref({
  studentCode: null,
  password: null,
  fullName: null,
  email: null
});
const rules = {
  studentCode: {
    required: true,
    message: 'Hãy nhập mã sinh viên',
    trigger: ['blur', 'input']
  },
  password: {
    required: true,
    message: 'Hãy nhập mật khẩu',
    trigger: ['blur', 'input']
  },
  fullName: {
    required: true,
    message: 'Hãy nhập tên đầy đủ',
    trigger: ['blur', 'input']
  },
  email: {
    required: true,
    message: 'Hãy nhập email',
    trigger: ['blur', 'input']
  }
};

const rgxStudentCode = /^\d{10}$/;
const studentCodeValidate = () => {
  if (formValue.value.studentCode.trim() == '') {
    message.warning(
      'Tài khoản không được để trống',
      {
        keepAliveOnHover: true
      },
      4000
    );
    return false;
  } else {
    if (!rgxStudentCode.test(formValue.value.studentCode)) {
      message.error(
        'Tài khoản phải gồm 10 ký tự số',
        {
          keepAliveOnHover: true
        },
        4000
      );
      return false;
    }
  }
  return true;
};

const rgxPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+=<>?/{}~|-]).{8,16}$/;

const passwordValidate = () => {
  if (formValue.value.password == '') {
    message.warning(
      'Mật khẩu không được để trống',
      {
        keepAliveOnHover: true
      },
      4000
    );
    return false;
  } else if (formValue.value.password.length > 16) {
    message.warning(
      'Mật khẩu quá dài',
      {
        keepAliveOnHover: true
      },
      4000
    );
    return false;
  } else if (formValue.value.password.length < 8) {
    message.warning(
      'Mật khẩu quá ngắn',
      {
        keepAliveOnHover: true
      },
      4000
    );
    return false;
  } else {
    if (!rgxPassword.test(formValue.value.password)) {
      message.error(
        'Mật khẩu phải bao gồm ký tự in hoa, thường, số và ký tự đặc biệt',
        {
          keepAliveOnHover: true
        },
        4000
      );
      return false;
    }
  }
  return true;
};

const rgxEmail = /([a-zA-Z0-9\.]{5,15})\@gmail[\.]com/;
const emailValidate = () => {
  if (formValue.value.email.trim() == '') {
    message.warning(
      'Email không được để trống',
      {
        keepAliveOnHover: true
      },
      4000
    );
    return false;
  } else {
    if (!rgxEmail.test(formValue.value.email)) {
      message.error(
        'Email chưa đúng định dạng',
        {
          keepAliveOnHover: true
        },
        4000
      );
      return false;
    }
  }
  return true;
};

function addRegisterMemberHandler() {
  dialog.warning({
    title: 'Đăng ký thành viên',
    content: `Xác nhận đăng ký?`,
    positiveText: 'Xác nhận',
    negativeText: 'Hủy',
    onPositiveClick: () => {
      if (
        formValue.value.studentCode &&
        formValue.value.password &&
        formValue.value.fullName &&
        formValue.value.email
      ) {
        if (!studentCodeValidate() || !passwordValidate() || !emailValidate()) return;
        else emits('registerMember', formValue.value);
      } else message.warning('Hãy điền đầy đủ thôn tin');
    },
    onNegativeClick: () => {
      message.info('Hủy đăng ký');
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
    <n-form-item path="password" label="Mật khẩu">
      <n-input
        type="password"
        @keydown.enter.prevent
        v-model:value="formValue.password"
        placeholder="Nhập mật khẩu tại đây"
      />
    </n-form-item>
    <n-form-item path="fullName" label="Tên đầy đủ">
      <n-input
        @keydown.enter.prevent
        v-model:value="formValue.fullName"
        placeholder="Nhập tên tại đây"
      />
    </n-form-item>
    <n-form-item path="email" label="Email">
      <n-input
        @keydown.enter.prevent
        v-model:value="formValue.email"
        placeholder="Nhập email tại đây"
      />
    </n-form-item>
    <n-button-group style="gap: 16px; width: 100%; justify-content: flex-end">
      <n-button strong secondary type="tertiary" @click="closeModal"> Hủy </n-button>
      <n-button type="primary" @click="addRegisterMemberHandler"> Thêm </n-button>
    </n-button-group>
  </n-form>
</template>

<style lang="scss" scoped></style>
