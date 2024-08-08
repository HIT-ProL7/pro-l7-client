<script setup>
import formAddClass from '@components/Admin/formAddClass.vue';
import { useRouter } from 'vue-router';
import { h, reactive, ref, computed, onMounted } from 'vue';
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
import { formatDate } from '@/utils/formatDate';

import editIcon from '@assets/icons/edit.svg';
import delIcon from '@assets/icons/del.svg';
import addIcon from '@assets/icons/add.svg';
import listIcon from '@assets/icons/list.svg';
import exportIcon from '@assets/icons/export.svg';
import signoutIcon from '@assets/icons/signout.svg';

import { read, utils, writeFileXLSX } from 'xlsx';
import { useClassStore } from '@/stores/classStore';
import { useUserStore } from '@/stores/userStore';

// Dữ liệu bảng
const classesInfor = ref([]);
const router = useRouter();
const classStore = useClassStore();
const userStore = useUserStore();

// Thông tin cột
const idColums = reactive({
  title: 'Mã lớp',
  key: 'id',
  sorter: 'default',
  width: 150
});

const nameColumns = reactive({
  title: 'Tên lớp',
  key: 'name',
  sorter: (row1, row2) => row1.id - row2.id
});

const leaderColumns = reactive({
  title: 'Leader',
  key: 'leader'
});

const createColumns = reactive({
  title: 'Ngày bắt đầu',
  key: 'startedDate',
  sorter: 'default'
});

const totalMemberColumns = reactive({
  title: 'Số lượng thành viên',
  key: 'totalMember'
});

const statusColums = reactive({
  title: 'Tình trạng',
  key: 'status',
  filterOptions: [
    {
      label: 'Mở',
      value: 'Mở'
    },
    {
      label: 'Đóng',
      value: 'Đóng'
    }
  ],
  filter(value, row) {
    return ~row.status.indexOf(value);
  },
  width: 150
});

const actionColumns = reactive({
  title: 'Action',
  key: 'actions',
  render(row) {
    return h('div', [
      h(
        NButton,
        {
          onClick: () => editClass(row)
        },
        { icon: () => h('img', { src: editIcon, alt: 'Edit', class: 'icon' }) }
      ),
      h(
        NButton,
        {
          onClick: () => closeClassHandler(row),
          style: { marginLeft: '8px' }
        },
        { default: () => h('img', { src: delIcon, alt: 'Close', class: 'icon' }) }
      )
    ]);
  },
  width: 150
});

const dialog = useDialog();
const message = useMessage();
function closeClassHandler(row) {
  dialog.warning({
    title: 'Đóng lớp học',
    content: `Xác nhận đóng lớp "${row.name}" do "${row.leader}" làm leader?`,
    positiveText: 'Xác nhận',
    negativeText: 'Hủy',
    onPositiveClick: async () => {
      const res = await classStore.closeClass(row.id);
      console.log(res);
      if (res.status == 200) {
        message.success('Đóng lớp thành công');
        getAllClasses();
      } else message.error('Đóng lớp thất bại');
    },
    onNegativeClick: () => {
      message.info('Hủy đóng lớp');
    }
  });
}

function editClass(row) {
  console.log(row.id);
  router.push({ name: 'ClassAdmin', params: { id: row.id } });
}

const columns = [
  idColums,
  nameColumns,
  leaderColumns,
  createColumns,
  totalMemberColumns,
  actionColumns
];

// Lựa chọn tìm kiếm
const searchOptions = [
  {
    label: 'Tìm kiếm',
    value: ''
  },
  {
    label: 'Mã lớp',
    value: 'classId'
  },
  {
    label: 'Tên lớp',
    value: 'className'
  },
  {
    label: 'Leader',
    value: 'leader'
  }
];

const searchOption = ref('');
const inputSearch = ref('');

// Lọc và tìm kiếm
const filteredData = computed(() => {
  const query = inputSearch.value.toLowerCase();
  if (!query || !searchOption.value) {
    return classesInfor.value;
  } else {
    if (searchOption.value == 'classId') return classesInfor.value.filter((row) => row.id == query);
    else if (searchOption.value == 'className')
      return classesInfor.value.filter((row) => row.name.toLowerCase().includes(query));
    else return classesInfor.value.filter((row) => row.leader.toLowerCase().includes(query));
  }
});

const filteredDataLength = computed(() => filteredData.value.length);
// Phân trang
const currentPage = ref(1);
const pageSize = ref(8);
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

const showModal = ref(false);
function handleCloseModal() {
  showModal.value = false;
  message.info('Hủy thêm lớp');
}

const classesRef = ref(null);

function downloadSheet() {
  /* generate worksheet and workbook */
  const worksheet = utils.json_to_sheet(classesInfor.value);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Các lớp học');

  /* fix headers */
  utils.sheet_add_aoa(
    worksheet,
    [['Mã lớp', 'Tên lớp', 'Leader', 'Ngày bắt đầu', 'Số lượng thành viên', 'Tình trạng']],
    {
      origin: 'A1'
    }
  );

  /* calculate column width */
  const header = Object.keys(classesInfor.value[0]);
  var wscols = [];
  for (var i = 0; i < header.length; i++) {
    // columns length added
    wscols.push({ wch: 20 });
  }
  worksheet['!cols'] = wscols;

  writeFileXLSX(workbook, 'Classes.xlsx', { compression: true });
}

async function getAllClasses() {
  if (classesInfor.value.length > 0) {
    classesInfor.value = [];
  }
  await classStore.getAllClasses();
  for (let i = 0; i < classStore.allClasses.length; i++) {
    const leaders = [];
    classStore.allClasses[i].leaders.forEach((l) => {
      leaders.push(l.fullName);
    });
    let status = '';
    if (i % 2 == 0) status = 'Đóng';
    else status = 'Mở';
    classesInfor.value.push({
      id: classStore.allClasses[i].id,
      name: classStore.allClasses[i].name,
      leader: leaders.join(),
      startedDate: formatDate(classStore.allClasses[i].startedDate),
      totalMember: classStore.allClasses[i].members.length,
      status: status
    });
  }
}

function signOutHandler() {
  userStore.logout();
  router.push('/Login');
}

function refreshClassesHandler() {
  getAllClasses();
}

onMounted(() => {
  getAllClasses();
});
</script>

<template>
  <div class="classes">
    <h1>Danh sách lớp học</h1>
    <div class="classes-header">
      <n-input-group style="gap: 8px">
        <n-input
          :style="{ width: '30%' }"
          v-model:value="inputSearch"
          placeholder="Nhập tìm kiếm tại đây"
        />
        <n-button type="primary"> Search </n-button>
        <n-select v-model:value="searchOption" :options="searchOptions" :style="{ width: '15%' }" />
      </n-input-group>
      <n-input-group style="gap: 8px; justify-content: flex-end">
        <n-button @click="downloadSheet">
          <img :src="exportIcon" alt="Add" style="margin-right: 8px" /> Xuất Sheet
        </n-button>
        <n-button @click="router.replace({ path: 'registerMember' })">
          <img :src="listIcon" alt="Add" style="margin-right: 8px" /> Đăng ký thành viên
        </n-button>
        <n-button @click="showModal = true">
          <img :src="addIcon" alt="Add" style="margin-right: 8px" /> Thêm lớp học
        </n-button>
      </n-input-group>
    </div>
    <n-data-table
      ref="classesRef"
      :bordered="true"
      :single-line="false"
      :columns="columns"
      :data="paginatedData"
    />
    <div class="classes-pagination">
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
        title="Thêm lớp học"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <formAddClass @close-modal="handleCloseModal" @refresh-classes="refreshClassesHandler" />
      </n-card>
    </n-modal>
    <div class="icon-signout" @click="signOutHandler">
      <img :src="signoutIcon" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.classes {
  padding: 32px;
  > h1 {
    margin-bottom: 8px;
  }
  .classes-header {
    margin-bottom: 16px;
    display: flex;
  }
  .classes-pagination {
    width: 100%;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.icon-signout {
  position: fixed;
  bottom: 20px;
  left: 20px;
  border: 3px solid #000;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    margin: 8px;
    width: 32px;
    height: 32px;
    object-fit: cover;
  }
}
</style>
