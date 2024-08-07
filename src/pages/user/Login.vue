<script setup lang="js">
import { reactive, ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { Icon } from '@iconify/vue';

const message = useMessage();
const router = useRouter();
const userStore = useUserStore();
const forget = ref(false);
const user = reactive({
  studentCode: '',
  password: ''
});

const rgxUsername = /^\d{10}$/;
const usernameValidate = () => {
  if (user.studentCode.trim() == '') {
    message.warning(
      'Tài khoản không được để trống',
      {
        keepAliveOnHover: true
      },
      4000
    );
    return false;
  } else {
    if (!rgxUsername.test(user.studentCode)) {
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
  if (user.password == '') {
    message.warning(
      'Mật khẩu không được để trống',
      {
        keepAliveOnHover: true
      },
      4000
    );
    return false;
  } else if (user.password.length > 16) {
    message.warning(
      'Mật khẩu quá dài',
      {
        keepAliveOnHover: true
      },
      4000
    );
    return false;
  } else if (user.password.length < 8) {
    message.warning(
      'Mật khẩu quá ngắn',
      {
        keepAliveOnHover: true
      },
      4000
    );
    return false;
  } else {
    if (!rgxPassword.test(user.password)) {
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

async function loginHandler() {
  if (!usernameValidate() || !passwordValidate()) {
    return;
  } else {
    const res = await userStore.login(user);
    console.log(res);
    if (res.status === 200) {
      message.success(
        'Đăng nhập thành công',
        {
          keepAliveOnHover: true
        },
        4000
      );

      if (userStore.userRoles == 'ROLE_ADMIN' || userStore.userRoles == 'ROLE_USER') {
        router.push({ path: '', name: 'Home' });
        await userStore.getInfor();
      }
    }
    // if (res.response.status === 401) {
    //   message.error(
    //     'Mật khẩu hoặc tài khoản không đúng',
    //     {
    //       keepAliveOnHover: true
    //     },
    //     4000
    //   );
    // }
  }
}

const typeInput = ref('password');
function showPassword(typeEye) {
  if (typeEye == 'open') typeInput.value = 'text';
  else typeInput.value = 'password';
}

const formData = ref('');

const formDataValidate = () => {
  if (formData.value.trim() === '') {
    message.warning(
      'Tài khoản không được để trống',
      {
        keepAliveOnHover: true
      },
      4000
    );
    return false;
  } else {
    if (!rgxUsername.test(formData.value)) {
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

const handleSubmit = () => {
  if (formDataValidate()) {
    alert('Mật khẩu mới đã được gửi vào email của bạn');
  }
};
</script>

<template>
  <div class="login-cha">
    <form class="login-con" v-if="!forget" @submit.prevent="loginHandler">
      <img class="logo" style="width: 88px; height: 88px" src="@assets/logo.png" alt="logo" />
      <div class="user-name">
        <p>Tài khoản</p>
        <div class="login">
          <svg
            class="ic"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 56 56"
          >
            <path
              fill="currentColor"
              d="M28.012 27.367c5.039 0 9.375-4.5 9.375-10.36c0-5.788-4.36-10.077-9.375-10.077c-5.016 0-9.375 4.383-9.375 10.125c0 5.812 4.36 10.312 9.375 10.312M13.293 49.07h29.438c3.68 0 4.992-1.054 4.992-3.117c0-6.047-7.57-14.39-19.711-14.39c-12.164 0-19.735 8.343-19.735 14.39c0 2.063 1.313 3.117 5.016 3.117"
            />
          </svg>
          <input
            id="u-name"
            type="text"
            placeholder="Nhập tài khoản"
            v-model="user.studentCode"
            required
            autofocus
          />
        </div>
      </div>
      <div class="password">
        <p>Mật khẩu</p>
        <div class="login">
          <svg
            class="ic"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1c1.71 0 3.1 1.39 3.1 3.1z"
            />
          </svg>
          <input id="pw" :type="typeInput" placeholder="Nhập mật khẩu" v-model="user.password" />
          <div
            class="eye-password eye-open"
            v-if="typeInput == 'text'"
            @click="showPassword('close')"
          >
            <Icon icon="ph:eye-fill" font-size="20px" />
          </div>
          <div
            class="eye-password eye-close"
            v-if="typeInput == 'password'"
            @click="showPassword('open')"
          >
            <Icon icon="ph:eye-slash-fill" font-size="20px" />
          </div>
        </div>
      </div>
      <p class="a" @click="forget = !forget">Quên mật khẩu?</p>
      <button type="submit">Đăng nhập</button>
    </form>
    <form @submit.prevent="handleSubmit" v-else class="forgot-form">
      <img class="logo" style="width: 88px; height: 88px" src="../assets/logo.png" alt="logo" />

      <div>
        <label for="masv"><p class="Masv">Mã sinh viên:</p></label>
        <div class="login">
          <svg
            class="ic"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 56 56"
          >
            <path
              fill="currentColor"
              d="M28.012 27.367c5.039 0 9.375-4.5 9.375-10.36c0-5.788-4.36-10.077-9.375-10.077c-5.016 0-9.375 4.383-9.375 10.125c0 5.812 4.36 10.312 9.375 10.312M13.293 49.07h29.438c3.68 0 4.992-1.054 4.992-3.117c0-6.047-7.57-14.39-19.711-14.39c-12.164 0-19.735 8.343-19.735 14.39c0 2.063 1.313 3.117 5.016 3.117"
            />
          </svg>
          <input
            type="text"
            id="masv"
            v-model="formData"
            placeholder="Nhập mã sinh viên"
            required
          />
        </div>
      </div>
      <button type="submit">Gửi</button>
      <p class="a" @click="forget = !forget">Quay lại</p>
    </form>
  </div>
</template>
<style lang="scss" scoped>
template {
  height: 100vh;
  margin: 0;
}

.login-cha {
  background-image: url('@assets/anhsinhnhat.png');
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
}

.login-con,
.forgot-form {
  background-color: rgba(255, 255, 255, 0.4);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  margin-top: 6%;
  margin-bottom: 4%;
  width: 700px;
  height: 580px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 25px;
  overflow: hidden;
  @include tablet {
    max-width: 470px;
  }
  @include mobile {
    max-width: 350px;
  }
  .logo {
    margin-bottom: 50px;
  }
  .a {
    padding-top: 20px;
    margin-right: -39%;
    color: #2a2a2a;
    cursor: pointer;
  }
  .login {
    position: relative;
    color: #d9d9d9;
    > svg {
      font-size: 20px;
    }
    input {
      padding-left: 30px;
      width: 400px;
      height: 35px;
      border-radius: 20px;
      border: none;
      @include tablet {
        height: 32px;
      }
      @include mobile {
        height: 30px;
        width: 280px;
      }
    }

    .ic {
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-52%);
    }
  }
  .user-name {
    padding-bottom: 30px;
    p {
      padding-bottom: 10px;
    }
  }
  .password {
    position: relative;
    p {
      padding-bottom: 10px;
    }
    .eye-password {
      position: absolute;
      right: 2%;
      top: 16%;
      color: #000;
      z-index: 10;
      cursor: pointer;
    }
  }

  .a {
    margin-top: 10px;
    color: #2a2a2a;
    cursor: pointer;
  }

  button {
    width: 100%;
    max-width: 400px;
    height: 35px;
    border-radius: 20px;
    background-color: #ff7e57;
    color: white;
    margin-top: 20px;
    @include tablet {
      max-width: 400px;
    }
    @include mobile {
      max-width: 280px;
    }
  }

  p.errorMsg {
    color: rgb(238, 59, 59);
    margin-top: 4px;
  }
  .Masv {
    padding-bottom: 10px;
  }
}
</style>
