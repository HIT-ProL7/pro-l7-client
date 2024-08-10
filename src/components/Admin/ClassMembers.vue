<script setup>
import formAddMember from '@components/Admin/formAddMember.vue';
import formAddMemberV2 from '@components/Admin/formAddMemberV2.vue';
import { useRouter, useRoute } from 'vue-router';
import { h, reactive, ref, computed, onMounted, defineEmits } from 'vue';
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

import { read, utils, writeFileXLSX } from 'xlsx';
import { useClassStore } from '@/stores/classStore';
import { downloadSheet } from '@/utils/downloadSheet';

// Dữ liệu bảng
const router = useRouter();
const route = useRoute();
const classStore = useClassStore();
const emits = defineEmits(['refreshClass']);

// Thông tin cột
const studentCodeColums = reactive({
  title: 'Mã sinh viên',
  key: 'studentCode',
  sorter: 'default',
  width: 150
});

const fullNameColumns = reactive({
  title: 'Họ và tên',
  key: 'fullName'
});

const seatRoleColumns = reactive({
  title: 'Vị trí',
  key: 'seatRole',
  filterOptions: [
    {
      label: 'Leader',
      value: 'Leader'
    },
    {
      label: 'Thành viên',
      value: 'Thành viên'
    }
  ],
  filter(value, row) {
    return ~row.seatRole.indexOf(value);
  }
});

const cohortColumns = reactive({
  title: 'Khóa',
  key: 'cohort',
  sorter: 'default'
});

const emailColumns = reactive({
  title: 'Email',
  key: 'email',
  width: '300px'
});

const githubColumns = reactive({
  title: 'Github',
  key: 'githubUrl',
  render(row) {
    return h('a', {
      href: row.githubUrl,
      target: '_blank',
      innerHTML: row.githubUrl
    });
  },
  width: '250px'
});

const facebookColumns = reactive({
  title: 'FaceBook',
  key: 'facebook',
  render(row) {
    return h('a', {
      href: row.facebookUrl,
      target: '_blank',
      innerHTML: row.facebookUrl
    });
  },
  width: '250px'
});

const actionColumns = reactive({
  title: 'Action',
  key: 'actions',
  render(row) {
    return h(
      NButton,
      {
        onClick: () => removeMemberHandler(row)
      },
      {
        icon: () => h('img', { title: 'Xóa thành viên', src: delIcon, alt: 'Edit', class: 'icon' })
      }
    );
  },
  width: 80
});

const dialog = useDialog();
const message = useMessage();
function removeMemberHandler(row) {
  dialog.warning({
    title: 'Xóa thành viên',
    content: `Xác nhận xóa "${row.fullName}" với MSV "${row.studentCode}"?`,
    positiveText: 'Xác nhận',
    negativeText: 'Hủy',
    onPositiveClick: async () => {
      const member = foundedClassMembers.value.find((m) => m.studentCode === row.studentCode);
      console.log(member);
      const res = await classStore.removeMember(route.params.id, member.id);
      console.log(res);
      foundedClassMembers.value = foundedClassMembers.value.filter(
        (m) => m.studentCode != row.studentCode
      );

      if (res.status == 200) {
        message.success('Xóa thành viên thành công');
      } else if (res.response.status == 404) {
        message.error('Không tìm thấy thành viên này');
      } else {
        message.error('Xóa không thành công');
      }
    },
    onNegativeClick: () => {
      message.info('Hủy xóa thành viên');
    }
  });
}

const columns = [
  {
    title: 'STT',
    render: (_, index) => {
      return index + 1;
    }
  },
  studentCodeColums,
  fullNameColumns,
  seatRoleColumns,
  cohortColumns,
  emailColumns,
  githubColumns,
  facebookColumns,
  actionColumns
];

// Lựa chọn tìm kiếm
const searchOptions = [
  {
    label: 'Mã sinh viên',
    value: 'studentCode'
  },
  {
    label: 'Tên đầy đủ',
    value: 'fullName'
  },
  {
    label: 'Khóa',
    value: 'cohort'
  },
  {
    label: 'Email',
    value: 'email'
  }
];

const foundedClass = ref({});
const foundedClassMembers = ref([]);
const searchOption = ref(null);
const inputSearch = ref('');

//Lọc và tìm kiếm
const filteredData = computed(() => {
  const query = inputSearch.value.toLowerCase();
  if (!query || !searchOption.value) {
    return foundedClassMembers.value;
  } else {
    console.log(inputSearch.value);
    if (searchOption.value == 'studentCode')
      return foundedClassMembers.value.filter((row) => row.studentCode.includes(query));
    else if (searchOption.value == 'fullName')
      return foundedClassMembers.value.filter((row) => row.fullName.toLowerCase().includes(query));
    else if (searchOption.value == 'cohort')
      return foundedClassMembers.value.filter((row) => row.cohort == query);
    else return foundedClassMembers.value.filter((row) => row.email.toLowerCase().includes(query));
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

const membersRef = ref(null);
const sheetHeader = ['Mã sinh viên', 'Họ và tên', 'Vị trí', 'Khóa', 'Email', 'Github', 'Facebook'];
const sheetName = ref('');

function downloadSheetHandler() {
  downloadSheet(foundedClassMembers.value, sheetHeader, sheetName.value);
}

const options = ref('');
const showModal = ref(false);

function showModalHandler(option) {
  showModal.value = true;
  if (option == 'single') options.value = 'single';
  else options.value = 'multi';
}
function handleCloseModal() {
  showModal.value = false;
  message.info('Hủy thêm thành viên');
}

async function getDetailClass() {
  if (foundedClassMembers.value.length > 0) {
    foundedClassMembers.value = [];
  }
  await classStore.getAllClasses();

  foundedClass.value = classStore.allClasses.find((item) => item.id == route.params.id);
  sheetName.value = `Danh sách thành viên lớp-${foundedClass.value.name}`;

  for (let i = 0; i < foundedClass.value.leaders.length; i++) {
    foundedClassMembers.value.push({
      studentCode: foundedClass.value.leaders[i].studentCode,
      fullName: foundedClass.value.leaders[i].fullName,
      seatRole: 'Leader',
      cohort: foundedClass.value.leaders[i].cohort,
      email: foundedClass.value.leaders[i].email,
      githubUrl: foundedClass.value.leaders[i].githubUrl,
      facebookUrl: foundedClass.value.leaders[i].facebookUrl
    });
  }

  for (let i = 0; i < foundedClass.value.members.length; i++) {
    foundedClassMembers.value.push({
      studentCode: foundedClass.value.members[i].studentCode,
      fullName: foundedClass.value.members[i].fullName,
      seatRole: 'Thành viên',
      cohort: foundedClass.value.members[i].cohort,
      email: foundedClass.value.members[i].email,
      githubUrl: foundedClass.value.members[i].githubUrl,
      facebookUrl: foundedClass.value.members[i].facebookUrl
    });
  }
}

function refreshMemberListHandler() {
  showModal.value = false;
  getDetailClass();
  emits('refreshClass');
}

onMounted(() => {
  getDetailClass();
});
</script>

<template>
  <div class="class-member">
    <div class="class-member-header">
      <n-input-group style="gap: 8px">
        <n-input
          :style="{ width: '30%' }"
          v-model:value="inputSearch"
          placeholder="Nhập tìm kiếm tại đây"
        />
        <n-button type="primary" @click="console.log(searchOption.value)"> Search </n-button>
        <n-select
          v-model:value="searchOption"
          placeholder="Tìm kiếm theo..."
          :options="searchOptions"
          :style="{ width: '20%' }"
        />
      </n-input-group>
      <n-input-group style="gap: 8px; justify-content: flex-end">
        <n-button @click="showModalHandler('multi')">
          <img :src="exportIcon" alt="Add" style="margin-right: 8px; transform: rotate(180deg)" />
          Nhập Sheet
        </n-button>
        <n-button @click="downloadSheetHandler">
          <img :src="exportIcon" alt="Add" style="margin-right: 8px" /> Xuất Sheet
        </n-button>
        <n-button @click="showModalHandler('single')">
          <img :src="addIcon" alt="Add" style="margin-right: 8px" /> Thêm thành viên
        </n-button>
      </n-input-group>
    </div>
    <n-data-table
      ref="membersRef"
      :bordered="true"
      :single-line="false"
      :columns="columns"
      :data="paginatedData"
    />
    <div class="class-member-pagination">
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
        <formAddMember
          v-if="options == 'single'"
          @close-modal="handleCloseModal"
          @refresh-member-list="refreshMemberListHandler"
        />
        <formAddMemberV2
          v-if="options == 'multi'"
          @close-modal="handleCloseModal"
          @refresh-member-list="refreshMemberListHandler"
        />
      </n-card>
    </n-modal>
  </div>
</template>

<style lang="scss" scoped>
.class-member {
  .class-member-header {
    margin-bottom: 16px;
    display: flex;
  }
  .class-member-pagination {
    width: 100%;
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
