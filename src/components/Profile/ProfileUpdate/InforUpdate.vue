<script setup>
import { Icon } from '@iconify/vue';
import { NModal, NCard } from 'naive-ui';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showModal = ref(false);
const bodyStyle = ref({
  width: '40%',
  'text-align': 'center',
  'border-radius': '20px',
  background: 'linear-gradient(135deg, rgba(255, 126, 87, 1) 0%, rgba(254, 180, 123, 1) 100%)'
});

const showTextarea = ref(false);
const inputInfor = ref('');
function showModalHandler(name) {
  if (name === 'email') {
    inputInfor.value = 'Email';
    showModal.value = true;
    showTextarea.value = false;
  } else if (name === 'github') {
    inputInfor.value = 'Github';
    showModal.value = true;
    showTextarea.value = false;
  } else {
    inputInfor.value = 'Mô tả';
    showModal.value = true;
    showTextarea.value = true;
  }
}

const setWidth = () => {
  if (window.innerWidth >= 480 && window.innerWidth <= 1440) {
    bodyStyle.value.width = '80%';
  } else if (window.innerWidth < 480) {
    bodyStyle.value.width = '100%';
  } else {
    bodyStyle.value.width = '40%';
  }
};

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
        <p>Email: <span>VugiachieVugiachieVugiachieVugiachie</span></p>
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
        <p>Github: <span>https://gitVu</span></p>
      </div>
      <div class="content-right">
        <div class="icon-wrap icon-wrap--huge">
          <Icon icon="iconamoon:arrow-up-2-bold" />
        </div>
      </div>
    </div>
    <div class="option-v2" @click="showModalHandler('desc')">
      <p>Mô tả bản thân</p>
      <div class="content">
        <p>
          Là sinh viên của trường Đại học Công Nghiệp Hà Nội với chuyên ngành KHMT. Tưởng rằng ra
          trường là một coder chăm chỉ không ngờ cuộc sống đưa anh đến với ngành bán giày
        </p>
      </div>
      <div class="option-v2-footer">
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
        <form>
          <div v-if="!showTextarea">
            <p>
              <label :for="inputInfor">{{ inputInfor }}</label>
            </p>
            <input type="text" placeholder="Nhập tại đây" />
          </div>
          <div v-if="showTextarea">
            <p>
              <label :for="inputInfor">{{ inputInfor }}</label>
            </p>
            <textarea type="text" placeholder="Nhập tại đây" />
          </div>
        </form>
        <button>Lưu</button>
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
      margin-bottom: 32px;
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
