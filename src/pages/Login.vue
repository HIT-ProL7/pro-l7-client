<script setup lang="js">
import { reactive } from 'vue';

const user = reactive({
  username: '',
  password: ''
});

const error = reactive({
  username: {
    error: false,
    errorMsg: ''
  },
  password: {
    error: false,
    errorMsg: ''
  }
});

const rgxUsername = /^\d{10}$/;
const usernameValidate = () => {
  if (user.username.trim() == '') {
    error.username.error = true;
    error.username.errorMsg = 'Tài khoản không được để trống';
    return false;
  } else {
    if (!rgxUsername.test(user.username)) {
      error.username.error = true;
      error.username.errorMsg = 'Tài khoản phải gồm 10 ký tự số';
      return false;
    } else {
      error.username.error = false;
    }
  }
  return true;
};

const rgxPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const passwordValidate = () => {
  if (user.password == '') {
    error.password.error = true;
    error.password.errorMsg = 'Mật khẩu không được để trống';
    return false;
  } else {
    if (!rgxPassword.test(user.password)) {
      error.password.error = true;
      error.password.errorMsg = 'Mật khẩu phải bao gồm ký tự in hoa, thường, số và ký tự đặc biệt';
      return false;
    } else {
      error.password.error = false;
    }
  }
  return true;
};

function loginHandler() {
  passwordValidate();
  usernameValidate();
  
  if(!usernameValidate() || !passwordValidate()){
    return 0;
  }
  
}
</script>

<template>
  <div class="login-cha">
    <form class="login-con">
      <img class="logo" style="width: 88px; height: 88px" src="../assets/logo.png" alt="logo" />
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
            v-model="user.username"
            required
            autofocus
          />
        </div>
        <p class="errorMsg" v-if="error.username.error">{{ error.username.errorMsg }}</p>
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
          <input id="pw" type="password" placeholder="Nhập mật khẩu" v-model="user.password" />
        </div>
        <p class="errorMsg" v-if="error.password.error">{{ error.password.errorMsg }}</p>
      </div>
      <a href="#">Quên mật khẩu? </a>
      <button @click.prevent="loginHandler()">Đăng nhập</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
template {
  height: 100vh;
  margin: 0;
}

.login-cha {
  width: 100%;
  height: 100%;
  background-image: url(../assets/anhsinhnhat.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
}
.login-con {
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
  p.errorMsg {
    color: rgb(238, 59, 59);
    padding-bottom: 0px;
    margin-top: 4px;
  }
  .logo {
    margin-bottom: 50px;
  }
  .login {
    position: relative;
    font-size: 20px;
    color: #d9d9d9;
    input {
      padding-left: 30px;
      width: 400px;
      height: 35px;
      border-radius: 20px;
      border: none;
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
      padding-bottom: 15px;
    }
  }
  .password {
    p {
      padding-bottom: 15px;
    }
  }
  a {
    padding-top: 20px;
    margin-right: -39%;
    color: #2a2a2a;
  }
  button {
    width: 440px;
    height: 35px;
    border-radius: 20px;
    background-color: #ff7e57;
    color: white;
    margin-top: 70px;
  }
}
</style>
