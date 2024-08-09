<script setup>
import { Icon } from '@iconify/vue';
import { NModal, NCard, useMessage, useDialog } from 'naive-ui';
import { ref, reactive, onMounted, onBeforeUnmount, defineProps } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const props = defineProps({
  email: { type: String, require: true },
  githubUrl: { type: String, require: true },
  facebookUrl: { type: String, require: true },
  cohort: { type: Number, require: true },
  desc: { type: String, require: true }
});

const showModal = ref(false);
const bodyStyle = ref({
  width: '40%',
  'text-align': 'center',
  'border-radius': '20px',
  background: 'linear-gradient(135deg, rgba(255, 126, 87, 1) 0%, rgba(254, 180, 123, 1) 100%)'
});

const option = ref('');
const inputInfor = ref('');
function showModalHandler(name) {
  if (name === 'email') {
    inputInfor.value = 'Email';
    option.value = 'infor';
    showModal.value = true;
  } else if (name === 'github') {
    inputInfor.value = 'Github';
    option.value = 'infor';
    showModal.value = true;
  } else if (name === 'facebook') {
    inputInfor.value = 'Facebook';
    option.value = 'infor';
    showModal.value = true;
  } else if (name === 'cohort') {
    inputInfor.value = 'Cohort';
    option.value = 'infor';
    showModal.value = true;
  } else if (name === 'change-password') {
    inputInfor.value = 'mật khẩu';
    option.value = 'change-password';
    showModal.value = true;
  } else {
    inputInfor.value = 'Mô tả';
    option.value = 'desc';
    showModal.value = true;
  }
}

const setWidth = () => {
  if (window.innerWidth >= 480 && window.innerWidth <= 1280) {
    bodyStyle.value.width = '80%';
  } else if (window.innerWidth < 480) {
    bodyStyle.value.width = '100%';
  } else {
    bodyStyle.value.width = '40%';
  }
};

const changePasswordInfor = reactive({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: ''
});
const message = useMessage();
const dialog = useDialog();
const rgxPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+=<>?/{}~|-]).{8,16}$/;

function passwordValidate(password) {
  if (password == '') {
    message.warning('Mật khẩu không được để trống');
    return false;
  } else {
    if (!rgxPassword.test(password)) {
      message.warning('Mật khẩu phải bao gồm ký tự in hoa, thường, số và ký tự đặc biệt');
      return false;
    }
  }
  return true;
}

function checkPassword(newPass, reNewPass) {
  if (newPass === reNewPass) return true;
  else return false;
}

function changePasswordHandler() {
  if (
    passwordValidate(changePasswordInfor.oldPassword) &&
    passwordValidate(changePasswordInfor.newPassword) &&
    passwordValidate(changePasswordInfor.confirmNewPassword)
  ) {
    const result = checkPassword(
      changePasswordInfor.newPassword,
      changePasswordInfor.confirmNewPassword
    );
    if (result) {
      dialog.warning({
        title: 'Xác nhận',
        content: 'Bạn xác nhận muốn đổi mật khẩu?',
        positiveText: 'Xác nhận',
        negativeText: 'Hủy',
        onPositiveClick: async () => {
          try {
            await userStore.changePassword(changePasswordInfor);
            message.success('Đổi mật khẩu thành công');
          } catch (error) {
            message.error('Đổi mật khẩu thất bại');
          }
        },
        onNegativeClick: () => {
          message.error('Hủy đổi mật khẩu');
        }
      });
    } else message.error('Mật khẩu không đúng hoặc mật khẩu không trùng khớp nhau');
  }
}

const updateInfor = ref('');

function alertResult(status, msg) {
  if (status === 'success') {
    message.success(msg);
  } else {
    message.error(msg);
  }
}

const emailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
async function updateInforHandler() {
  if (inputInfor.value === 'Email') {
    try {
      if (emailRgx.test(updateInfor.value)) {
        await userStore.updateInfor({ email: updateInfor.value });
        alertResult('success', 'Cập nhật thông tin thành công');
        showModal.value = false;
        updateInfor.value = '';
      } else {
        alertResult('fail', 'Email không hợp lệ');
      }
    } catch (error) {
      alertResult('fail', 'Cập nhật không thành công');
    }
  } else if (inputInfor.value === 'Github') {
    try {
      await userStore.updateInfor({ githubUrl: updateInfor.value });
      alertResult('success', 'Cập nhật thông tin thành công');
      showModal.value = false;
      updateInfor.value = '';
    } catch (error) {
      alertResult('fail', 'Cập nhật không thành công');
    }
  } else if (inputInfor.value === 'Facebook') {
    try {
      await userStore.updateInfor({ facebookUrl: updateInfor.value });
      alertResult('success', 'Cập nhật thông tin thành công');
      showModal.value = false;
      updateInfor.value = '';
    } catch (error) {
      alertResult('fail', 'Cập nhật không thành công');
    }
  } else if (inputInfor.value === 'Cohort') {
    try {
      await userStore.updateInfor({ cohort: updateInfor.value });
      alertResult('success', 'Cập nhật thông tin thành công');
      showModal.value = false;
      updateInfor.value = '';
    } catch (error) {
      alertResult('fail', 'Cập nhật không thành công');
    }
  } else {
    try {
      await userStore.updateInfor({ description: updateInfor.value });
      alertResult('success', 'Cập nhật thông tin thành công');
      showModal.value = false;
      updateInfor.value = '';
    } catch (error) {
      alertResult('fail', 'Cập nhật không thành công');
    }
  }
}

const typeInput = ref(['password', 'password', 'password']);
function showPassword(typeEye, index) {
  if (typeEye == 'open') {
    typeInput.value[index] = 'text';
    console.log(typeInput.value[index]);
  } else {
    typeInput.value[index] = 'password';
    console.log(typeInput.value[index]);
  }
}

onMounted(() => {
  window.addEventListener('resize', setWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setWidth);
});
</script>

<template>
  <div class="setting-wrap">
    <div class="option" @click="showModalHandler('email')">
      <div class="content-left">
        <div class="icon-wrap">
          <Icon icon="ic:baseline-email" />
        </div>
        <p>
          Email: <span>{{ props.email }}</span>
        </p>
      </div>
      <div class="content-right">
        <div class="icon-wrap icon-wrap--huge">
          <Icon icon="iconamoon:arrow-up-2-bold" />
        </div>
      </div>
    </div>
    <div class="option" @click="showModalHandler('github')">
      <div class="content-left">
        <div class="icon-wrap">
          <Icon icon="mdi:github" />
        </div>
        <p>
          Github: <span>{{ props.githubUrl }}</span>
        </p>
      </div>
      <div class="content-right">
        <div class="icon-wrap icon-wrap--huge">
          <Icon icon="iconamoon:arrow-up-2-bold" />
        </div>
      </div>
    </div>
    <div class="option" @click="showModalHandler('facebook')">
      <div class="content-left">
        <div class="icon-wrap">
          <Icon icon="ic:baseline-facebook" />
        </div>
        <p>
          Facebook: <span>{{ props.facebookUrl }}</span>
        </p>
      </div>
      <div class="content-right">
        <div class="icon-wrap icon-wrap--huge">
          <Icon icon="iconamoon:arrow-up-2-bold" />
        </div>
      </div>
    </div>
    <!-- <div class="option" @click="showModalHandler('cohort')">
      <div class="content-left">
        <div class="icon-wrap">
          <Icon icon="ph:student-bold" />
        </div>
        <p>
          Khóa: <span>{{ props.cohort }}</span>
        </p>
      </div>
      <div class="content-right">
        <div class="icon-wrap icon-wrap--huge">
          <Icon icon="iconamoon:arrow-up-2-bold" />
        </div>
      </div>
    </div> -->
    <div class="option-v2" @click="showModalHandler('desc')">
      <p>Mô tả bản thân</p>
      <div class="content">
        <p>
          {{ props.desc }}
        </p>
      </div>
      <div class="option-v2-footer">
        <div class="icon-wrap icon-wrap--huge">
          <Icon icon="iconamoon:arrow-up-2-bold" />
        </div>
      </div>
    </div>
    <div class="option" @click="showModalHandler('change-password')">
      <div class="content-left">
        <div class="icon-wrap">
          <Icon icon="mdi:password" />
        </div>
        <p>Thay đổi mật khẩu</p>
      </div>
      <div class="content-right">
        <div class="icon-wrap icon-wrap--huge">
          <Icon icon="iconamoon:arrow-up-2-bold" />
        </div>
      </div>
    </div>
  </div>
  <n-modal v-model:show="showModal" class="custom-modal">
    <n-card :style="bodyStyle" :bordered="false" size="huge" class="custom">
      <template #header>
        <div class="custom-header">
          <p>Cập nhật {{ inputInfor }} của bạn</p>
          <div class="close-modal" @click="showModal = false">x</div>
        </div>
      </template>
      <div class="content">
        <form @submit.prevent="">
          <div v-if="option == 'infor'">
            <p>
              <label :for="inputInfor">{{ inputInfor }}</label>
            </p>
            <input type="text" placeholder="Nhập tại đây" v-model="updateInfor" />
          </div>
          <div v-if="option == 'desc'">
            <p>
              <label :for="inputInfor">{{ inputInfor }}</label>
            </p>
            <textarea type="text" placeholder="Nhập tại đây" v-model="updateInfor" />
          </div>
          <div class="change-password" v-if="option == 'change-password'">
            <div>
              <p>
                <label for="">Mật khẩu cũ</label>
              </p>
              <input
                :type="typeInput[0]"
                placeholder="Nhập mật khẩu cũ"
                v-model="changePasswordInfor.oldPassword"
              />
              <div
                class="eye-password eye-open"
                v-if="typeInput[0] == 'text'"
                @click="showPassword('close', 0)"
              >
                <Icon icon="ph:eye-fill" font-size="20px" />
              </div>
              <div
                class="eye-password eye-close"
                v-if="typeInput[0] == 'password'"
                @click="showPassword('open', 0)"
              >
                <Icon icon="ph:eye-slash-fill" font-size="20px" />
              </div>
            </div>
            <div>
              <p>
                <label for="">Mật khẩu mới</label>
              </p>
              <input
                :type="typeInput[1]"
                placeholder="Nhập mật khẩu mới"
                v-model="changePasswordInfor.newPassword"
              />
              <div
                class="eye-password eye-open"
                v-if="typeInput[1] == 'text'"
                @click="showPassword('close', 1)"
              >
                <Icon icon="ph:eye-fill" font-size="20px" />
              </div>
              <div
                class="eye-password eye-close"
                v-if="typeInput[1] == 'password'"
                @click="showPassword('open', 1)"
              >
                <Icon icon="ph:eye-slash-fill" font-size="20px" />
              </div>
            </div>
            <div>
              <p>
                <label for="">Nhập lại mật khẩu mới</label>
              </p>
              <input
                :type="typeInput[2]"
                placeholder="Nhập lại mật khẩu mới"
                v-model="changePasswordInfor.confirmNewPassword"
              />
              <div
                class="eye-password eye-open"
                v-if="typeInput[2] == 'text'"
                @click="showPassword('close', 2)"
              >
                <Icon icon="ph:eye-fill" font-size="20px" />
              </div>
              <div
                class="eye-password eye-close"
                v-if="typeInput[2] == 'password'"
                @click="showPassword('open', 2)"
              >
                <Icon icon="ph:eye-slash-fill" font-size="20px" />
              </div>
            </div>
          </div>
        </form>
        <button @click="updateInforHandler" v-if="option == 'infor' || option == 'desc'">
          Lưu
        </button>
        <button @click="changePasswordHandler" v-if="option == 'change-password'">
          Lưu mật khẩu
        </button>
      </div>
    </n-card>
  </n-modal>
</template>

<style lang="scss" scoped>
.custom-modal {
  .custom-header {
    padding: 16px;
    background: #fff;
    border-radius: 20px;
    font-size: 36px;
    text-align: center;
    font-weight: bold;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include mobile {
      font-size: 24px;
    }
    p {
      background-image: linear-gradient(to right, #fd5c63, #ff9966);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      flex: 1;
    }
    .close-modal {
      color: #5e5e5e;
      font-size: 24px;
      cursor: pointer;
    }
  }
  .content {
    padding: 16px 64px 32px;
    @include mobile {
      padding: 32px 16px;
    }
  }
  .change-password {
    > div {
      position: relative;
      .eye-password {
        position: absolute;
        right: 3%;
        bottom: 10%;
        color: #000;
        z-index: 10;
        cursor: pointer;
      }
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }
  form {
    margin-bottom: 32px;
    p {
      text-align: left;
      font-size: 20px;
      margin-bottom: 8px;
    }
    input {
      width: 100%;
      padding: 16px;
      border-radius: 32px;
      border: 1px solid $color-primary;
    }
    textarea {
      width: 100%;
      height: 150px;
      resize: none;
      padding: 16px;
      border-radius: 32px;
      border: 1px solid $color-primary;
      font-size: 16px;
    }
  }
  button {
    font-size: 20px;
    font-weight: bold;
    padding: 8px 32px;
    border-radius: 32px;
    color: #fff;
    background-color: $color-primary;
  }
}
.icon-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-wrap--huge {
  width: 40px;
  height: 40px;
  transform: rotate(90deg);
}
.setting-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 32px;
  .option {
    width: 80%;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $body-color;
    padding: 16px;
    border-radius: 16px;
    cursor: pointer;
    @include mobile {
      font-size: 20px;
      width: 90%;
    }
    &:not(:last-child) {
      margin-bottom: 16px;
    }
    .content-left {
      display: flex;
      align-items: center;
      overflow: hidden;
      flex: 1;
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span {
        font-weight: 500;
      }
      .icon-wrap {
        margin-right: 4px;
      }
    }
  }
  .option-v2 {
    width: 80%;
    text-align: left;
    background: $body-color;
    padding: 16px;
    border-radius: 16px;
    cursor: pointer;
    margin-bottom: 16px;
    @include mobile {
      width: 90%;
    }
    > p {
      font-size: 24px;
      font-weight: 500;
    }
    .content {
      font-size: 20px;
      p {
        text-align: justify;
      }
    }
    .option-v2-footer {
      display: flex;
      justify-content: center;
      .icon-wrap--huge {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
