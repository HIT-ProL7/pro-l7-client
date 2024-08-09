<script setup>
import { useRouter } from 'vue-router';
import { h, reactive, ref, computed, onMounted, defineComponent, nextTick } from 'vue';
import {
  NDataTable,
  NButton,
  NInput,
  NInputGroup,
  NSelect,
  NPagination,
  useDialog,
  useMessage,
  NModal,
  NCard
} from 'naive-ui';

import delIcon from '@assets/icons/del.svg';
import addIcon from '@assets/icons/add.svg';
import exportIcon from '@assets/icons/export.svg';
import backIcon from '@assets/icons/back.svg';

import { read, utils, writeFileXLSX } from 'xlsx';
import formRegisterMember from '@/components/Admin/formAddRegisterMember.vue';
import { useClassStore } from '@/stores/classStore';
import { downloadSheet } from '@/utils/downloadSheet';

const classStore = useClassStore();
const message = useMessage();
const dialog = useDialog();
const router = useRouter();
// Thông tin cột
const studentCodeColums = reactive({
  title: 'Mã sinh viên',
  key: 'studentCode',
  sorter: 'default',
  width: '200px',
  render(row) {
    const index = getDataIndex(row.key);
    return h(ShowOrEdit, {
      value: row.studentCode,
      onUpdateValue(v) {
        registerMemberList.value[index].studentCode = v;
      }
    });
  }
});

const passWordColumns = reactive({
  title: 'Mật khẩu',
  key: 'password',
  width: '200px',
  render(row) {
    const index = getDataIndex(row.key);
    return h(ShowOrEdit, {
      value: row.password,
      onUpdateValue(v) {
        registerMemberList.value[index].password = v;
      }
    });
  }
});

const fullNameColumns = reactive({
  title: 'Tên đầy đủ',
  key: 'fullName',
  width: '300px',
  render(row) {
    const index = getDataIndex(row.key);
    return h(ShowOrEdit, {
      value: row.fullName,
      onUpdateValue(v) {
        registerMemberList.value[index].fullName = v;
      }
    });
  }
});

const emailColumns = reactive({
  title: 'Email',
  key: 'email',
  width: '400px',
  render(row) {
    const index = getDataIndex(row.key);
    return h(ShowOrEdit, {
      value: row.email,
      onUpdateValue(v) {
        registerMemberList.value[index].email = v;
      }
    });
  }
});

const statusColumns = reactive({
  title: 'Trạng thái',
  key: 'status',
  filterOptions: [
    {
      label: 'Thành công',
      value: 'Thành công'
    },
    {
      label: 'Thất bại',
      value: 'Thất bại'
    }
  ],
  filter(value, row) {
    return ~row.status.indexOf(value);
  }
});

const actionColumns = reactive({
  title: 'Action',
  key: 'actions',
  render(row) {
    return h(
      NButton,
      {
        onClick: () => delRegisterMemberHandler(row),
        style: { marginLeft: '8px' }
      },
      { default: () => h('img', { src: delIcon, alt: 'Close', class: 'icon' }) }
    );
  },
  width: 150
});

function delRegisterMemberHandler(row) {
  dialog.warning({
    title: 'Xóa thành viên đăng ký',
    content: `Xác nhận xóa?`,
    positiveText: 'Xác nhận',
    negativeText: 'Hủy',
    onPositiveClick: () => {
      registerMemberList.value = registerMemberList.value.filter(
        (m) => m.studentCode != row.studentCode
      );
    },
    onNegativeClick: () => {
      message.info('Hủy xóa');
    }
  });
}

const ShowOrEdit = defineComponent({
  props: {
    value: [String, Number],
    onUpdateValue: [Function, Array]
  },
  setup(props) {
    const isEdit = ref(false);
    const inputRef = ref(null);
    const inputValue = ref(props.value);
    function handleOnClick() {
      isEdit.value = true;
      nextTick(() => {
        inputRef.value.focus();
      });
    }
    function handleChange() {
      props.onUpdateValue(inputValue.value);
      isEdit.value = false;
    }
    return () =>
      h(
        'div',
        {
          style: 'min-height: 24px',
          onClick: handleOnClick
        },
        isEdit.value
          ? h(NInput, {
              ref: inputRef,
              value: inputValue.value,
              onUpdateValue: (v) => {
                inputValue.value = v;
              },
              onChange: handleChange,
              onBlur: handleChange
            })
          : props.value
      );
  }
});

const getDataIndex = (key) => {
  return registerMemberList.value.findIndex((item) => item.key === key);
};

const columns = [
  {
    title: 'STT',
    width: '80px',
    render: (_, index) => {
      return index + 1;
    }
  },
  studentCodeColums,
  passWordColumns,
  fullNameColumns,
  emailColumns,
  statusColumns,
  actionColumns
];

const searchOptions = [
  {
    label: 'Tìm kiếm',
    value: ''
  },
  {
    label: 'Mã sinh viên',
    value: 'studentCode'
  },
  {
    label: 'Tên đầy đủ',
    value: 'fullName'
  }
];

const registerMemberList = ref([]);
const searchOption = ref('');
const inputSearch = ref('');

// Lọc và tìm kiếm
const filteredData = computed(() => {
  const query = inputSearch.value.toLowerCase();
  if (!query || !searchOption.value) {
    return registerMemberList.value;
  } else {
    console.log(searchOption.value);
    console.log(inputSearch.value);
    if (searchOption.value == 'studentCode')
      return registerMemberList.value.filter((row) => row.studentCode.includes(query));
    else
      return registerMemberList.value.filter((row) => row.fullName.toLowerCase().includes(query));
  }
});

const filteredDataLength = computed(() => filteredData.value.length);
// Phân trang
const currentPage = ref(1);
const pageSize = ref(10);
const pageSlot = ref(7);
const pageCount = computed(() => Math.ceil(filteredDataLength.value / pageSize.value));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;

  return filteredData.value.slice(start, end);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const file = ref(null);
function getFile(event) {
  file.value = event.target.files[0];
  console.log(file.value);
  showFile(file.value);
}

async function showFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = read(arrayBuffer);
  console.log(workbook);

  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const raw_data = utils.sheet_to_json(worksheet, { header: 1 });

  const objects = raw_data.map((r) => ({
    studentCode: r[0],
    password: r[1],
    fullName: r[2],
    email: r[3]
  }));

  if (registerMemberList.value.length == 0) registerMemberList.value = objects.slice(1);
  else {
    registerMemberList.value.some((item) => {
      for (let i = 1; i <= objects.length; i++) {
        if (objects[i].studentCode === item.studentCode) return 0;
        else registerMemberList.value.push(objects[i]);
      }
    });
  }
  console.log(objects.slice(1));
}

const registerMemberListRef = ref(null);
const sheetHeader = ['Mã sinh viên', 'Mật khẩu', 'Họ và tên', 'Email', 'Trạng thái'];
const sheetName = 'Danh sách tài khoản đã đăng ký';
function downloadSheetHandler() {
  downloadSheet(registerMemberList.value, sheetHeader, sheetName);
}

const showModal = ref(false);
function handleCloseModal() {
  showModal.value = false;
  message.info('Hủy đăng ký thành viên');
}

function addRegisterMemberHandler(memberInfor) {
  if (registerMemberList.value.length == 0) {
    registerMemberList.value.push(memberInfor);
    message.success('Thêm tài khoản thành công');
    showModal.value = false;
  } else {
    const result = registerMemberList.value.some((m) => m.studentCode === memberInfor.studentCode);

    if (!result) {
      registerMemberList.value.push(memberInfor);
      message.success('Thêm tài khoản thành công');
      showModal.value = false;
    } else return message.error('Đã có tài khoản này');
  }
}

function registerMemberHandler() {
  if (registerMemberList.value.length == 0) message.info('Danh sách trống. Không thể đăng ký');
  else {
    dialog.warning({
      title: 'Đăng ký thành viên',
      content: `Xác nhận đăng ký?`,
      positiveText: 'Xác nhận',
      negativeText: 'Hủy',
      onPositiveClick: () => {
        registerMemberList.value.forEach(async (m) => {
          console.log(m);
          const res = await classStore.registerMember(m);
          if (res.status == 201) {
            message.success('Tạo tài khoản thành công');
            m.status = 'Thành công';
          }

          if (res.response.status == 400) {
            message.error('Tài khoản đã tồn tại');
            m.status = 'Thất bại';
          } else if (res.response.status == 500) {
            message.error('Tạo tài khoản thất bại');
            m.status = 'Thất bại';
          }
        });
      },
      onNegativeClick: () => {
        message.info('Hủy đăng ký');
      }
    });
  }
}
</script>

<template>
  <div class="register-member">
    <div class="heading">
      <div @click="router.replace({ name: 'Classes' })"><img :src="backIcon" alt="" /></div>
      <h1>Danh sách đăng ký thành viên</h1>
    </div>
    <div class="register-member-header">
      <n-input-group style="gap: 8px">
        <n-input
          :style="{ width: '30%' }"
          v-model:value="inputSearch"
          placeholder="Nhập tìm kiếm tại đây"
        />
        <n-button type="primary"> Search </n-button>
        <n-select v-model:value="searchOption" :options="searchOptions" :style="{ width: '25%' }" />
      </n-input-group>
      <n-input-group style="gap: 8px; justify-content: flex-end">
        <n-button type="primary" @click="registerMemberHandler">
          <img :src="addIcon" alt="Add" style="margin-right: 8px" /> Đăng ký
        </n-button>
        <n-button>
          <img :src="exportIcon" alt="Add" style="margin-right: 8px; transform: rotate(180deg)" />
          <label for="file" style="cursor: pointer"> Nhập sheet </label>
        </n-button>
        <input
          id="file"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          @change="getFile"
          style="display: none"
        />
        <n-button @click="downloadSheetHandler">
          <img :src="exportIcon" alt="Add" style="margin-right: 8px" /> Xuất Sheet
        </n-button>
        <n-button @click="showModal = true">
          <img :src="addIcon" alt="Add" style="margin-right: 8px" /> Thêm thành viên
        </n-button>
      </n-input-group>
    </div>
    <n-data-table
      ref="registerMemberListRef"
      :bordered="true"
      :single-line="false"
      :columns="columns"
      :data="paginatedData"
    />
    <div class="register-member-pagination">
      <n-pagination
        v-model:page="currentPage"
        :page-count="pageCount"
        :page-slot="pageSlot"
        show-quick-jumper
        @update:page="handlePageChange"
      />
    </div>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px; padding: 32px"
        title="Thêm thành viên"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <formRegisterMember
          @close-modal="handleCloseModal"
          @register-member="addRegisterMemberHandler"
        />
      </n-card>
    </n-modal>
  </div>
</template>

<style lang="scss" scoped>
.register-member {
  padding: 32px;
  > h1 {
    margin-bottom: 8px;
  }
  .register-member-header {
    margin-bottom: 16px;
    display: flex;
  }
  .register-member-pagination {
    width: 100%;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
</style>
