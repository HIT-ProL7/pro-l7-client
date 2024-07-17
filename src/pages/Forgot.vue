<template>
  <div class="forgot">
    <div class="forgot-password">
      <img class="logo" style="width: 88px; height: 88px" src="../assets/logo.png" alt="logo" />
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="masv"><p>Mã sinh viên:</p></label>
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
              v-model="formData.masv"
              placeholder="Nhập mã sinh viên"
              required
            />
          </div>
        </div>
        <p class="errorMsg" v-if="error.masv.error">{{ error.masv.errorMessage }}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="js">
import { reactive } from 'vue';

const formData = reactive({
  masv: ''
});

const error = reactive({
  masv: {
    error: false,
    errorMessage: ''
  }
});

const rgxMasv = /^\d{10}$/;

const masvValidate = () => {
  if (formData.masv.trim() === '') {
    error.masv.error = true;
    error.masv.errorMessage = 'Vui lòng điền vào trường này';
    return false;
  } else if (!rgxMasv.test(formData.masv)) {
    error.masv.error = true;
    error.masv.errorMessage = 'Mã sinh viên phải gồm 10 ký tự số';
    return false;
  } else {
    error.masv.error = false;
    error.masv.errorMessage = '';
  }
  return true;
};

const handleSubmit = () => {
  if (masvValidate()) {
    alert('Mật khẩu mới đã được gửi vào email của bạn');
  }
};
</script>

<style lang="scss" scoped>
.forgot {
  background-image: url(../assets/anhsinhnhat.png);
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
}

.forgot-password {
  width: 700px;
  height: 580px;
  margin: auto;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 25px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.4);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  @include tablet {
    width: 470px;
    height: 490px;
  }
  @include mobile {
    width: 360px;
    height: 480px;
  }
  .logo {
    margin-top: -100px;
    margin-bottom: 70px;
  }

  p {
    padding-bottom: 15px;
  }

  .errorMsg {
    color: rgb(238, 59, 59);
    padding-bottom: 0;
    margin-top: 4px;
  }
  .login {
    position: relative;
    font-size: 20px;
    color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    input {
      padding-left: 40px;
      width: 100%;
      max-width: 400px;
      height: 35px;
      border-radius: 20px;
      border: none;
      @include tablet {
        max-width: 380px;
      }
      @include mobile {
        max-width: 250px;
        height: 32px;
      }
    }
    .ic {
      position: absolute;
      left: 18px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  button {
    width: 420px;
    height: 35px;
    border-radius: 20px;
    background-color: #ff7e57;
    color: white;
    margin-top: 70px;
    @include tablet {
      margin-top: 40px;
      width: 400px;
    }
    @include mobile {
      margin-top: 32px;
      width: 280px;
    }
  }
}
</style>
