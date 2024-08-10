<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NButtonGroup,
  useMessage,
  useDialog,
  NImage,
  NDatePicker
} from 'naive-ui';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';

import ClassMembers from '@components/Admin/ClassMembers.vue';
import backIcon from '@assets/icons/back.svg';

import { useClassStore } from '@/stores/classStore';

const classStore = useClassStore();
const message = useMessage();
const dialog = useDialog();
const emits = defineEmits(['closeModal']);
const router = useRouter();
const route = useRoute();

const formRef = ref(null);
const formValue = ref({
  name: null,
  description: null,
  startedDate: null
});

const rules = {
  name: {
    required: true,
    message: 'Hãy nhập tên lớp',
    trigger: ['blur', 'trigger']
  },
  startedDate: {
    required: true
  }
};

const foundedClass = ref({});
const foundedClassName = ref('');

const logoImg = ref();
const changeLogoImg = ref(false);
function getFile(event) {
  const file = event.target.files[0];
  formValue.value.logoImg = event.target.files[0];

  if (file) {
    changeLogoImg.value = true;
    const reader = new FileReader();
    reader.onload = function (e) {
      logoImg.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function updateLogoClass() {
  dialog.warning({
    title: 'Thay đổi logo',
    content: `Xác nhận thay đổi logo?`,
    positiveText: 'Xác nhận',
    negativeText: 'Hủy',
    onPositiveClick: async () => {
      const res = await classStore.updateLogoClass(route.params.id, {
        logoImg: formValue.value.logoImg
      });
      console.log(res);
      if (res.status == 200) {
        message.success('Thay đổi logo thành công');
        getDetailClass();
      } else if (res.response.status) message.error('Thay đổi logo thất bại');
    },
    onNegativeClick: () => {
      message.info('Hủy thay đổi logo');
    }
  });
}

const timestamp = ref(null);
const isoString = computed(() => new Date(timestamp.value).toISOString());

function saveClassHandler() {
  formValue.value.startedDate = isoString.value;
  dialog.warning({
    title: 'Lưu thay đổi',
    content: `Xác nhận thay đổi?`,
    positiveText: 'Xác nhận',
    negativeText: 'Hủy',
    onPositiveClick: async () => {
      console.log(formValue.value);
      const res = await classStore.updateClass(route.params.id, formValue.value);
      console.log(res);
      if (res.status == 200) {
        message.success('Thay đổi thành công');
        getDetailClass();
      } else if (res.response.status) message.error('Thay đổi thất bại');
    },
    onNegativeClick: () => {
      message.info('Hủy lưu thay đổi');
    }
  });
}

async function getDetailClass() {
  await classStore.getAllClasses();

  foundedClass.value = classStore.allClasses.find((item) => item.id == route.params.id);
  foundedClassName.value = foundedClass.value.name;
  formValue.value.name = foundedClass.value.name;
  formValue.value.description = foundedClass.value.description;
  formValue.value.startedDate = foundedClass.value.startedDate;
  logoImg.value = foundedClass.value.logo;
  timestamp.value = new Date(foundedClass.value.startedDate).getTime();
  document.title = `${foundedClassName.value} | ProL7`;

  console.log(foundedClass.value);
}

function refreshClassHandler() {
  getDetailClass();
}

onMounted(() => {
  getDetailClass();
});
</script>

<template>
  <div class="class">
    <div class="heading">
      <div @click="router.replace({ name: 'Classes' })"><img :src="backIcon" alt="" /></div>
      <h1>Thông tin lớp {{ foundedClassName }} / #{{ route.params.id }}</h1>
    </div>
    <div class="class-content">
      <div class="left">
        <n-form ref="formRef" :model="formValue" :rules="rules">
          <p class="leaders">
            <span>Leader: </span>
            <span class="name" v-for="(l, index) in foundedClass.leaders" :key="index">{{
              l.fullName
            }}</span>
          </p>
          <n-form-item path="name" label="Tên lớp">
            <n-input
              @keydown.enter.prevent
              v-model:value="formValue.name"
              placeholder="Nhập tên tại đây"
              value="Test"
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
              type="textarea"
              @keydown.enter.prevent
              v-model:value="formValue.description"
              placeholder="Nhập ngày mô tả tại đây"
            />
          </n-form-item>
          <n-button-group style="gap: 16px; width: 100%; justify-content: flex-end">
            <n-button strong secondary type="tertiary" @click="refreshClassHandler"> Hủy </n-button>
            <n-button type="primary" @click="saveClassHandler"> Lưu </n-button>
          </n-button-group>
        </n-form>
      </div>
      <div class="right">
        <div class="logo-img-wrap">
          <div class="header">
            <p class="title">Logo lớp học</p>
            <n-button-group style="gap: 16px">
              <n-button type="primary" v-if="changeLogoImg" @click="updateLogoClass"
                >Thay đổi</n-button
              >
              <n-button><label for="logoImg">Chọn</label></n-button>
            </n-button-group>
            <input
              id="logoImg"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              @change="getFile"
              style="display: none"
            />
          </div>
          <div class="logo-img">
            <n-image
              :src="logoImg"
              width="100%"
              height="100%"
              style="width: 450px; height: 250px; border-radius: 22px"
              v-if="logoImg"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="class-members">
      <h2>Danh sách thành viên</h2>
      <ClassMembers @refresh-class="refreshClassHandler()" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.class {
  padding: 32px;
}
.heading {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
  > div {
    cursor: pointer;
    display: flex;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
    }
  }
}
.class-content {
  display: flex;
  gap: 32px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 36px;
  > div {
    flex: 1;
  }
  .leaders {
    font-size: 16px;
    margin: 0 0 16px;
    > span:first-child {
      font-weight: bold;
      font-size: 18px;
    }
  }
  .leaders .name:not(:last-child)::after {
    content: ',';
  }
}
.class-members {
  > h2 {
    margin-bottom: 16px;
  }
}
.logo-img-wrap {
  margin-top: 16px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .logo-img {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
.n-button label {
  cursor: pointer;
}
.n-form-item {
  margin-bottom: 8px;
}
</style>
