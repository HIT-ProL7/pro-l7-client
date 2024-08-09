<script setup>
import { NButton, NButtonGroup, useMessage, useDialog } from 'naive-ui';
import { ref, defineEmits } from 'vue';
import { useClassStore } from '@/stores/classStore';
import { read, utils, writeFileXLSX } from 'xlsx';
import { useRoute } from 'vue-router';
import { downloadSheet } from '@/utils/downloadSheet';
import exportIcon from '@assets/icons/export.svg';

const classStore = useClassStore();
const message = useMessage();
const dialog = useDialog();
const emits = defineEmits(['closeModal', 'refreshMemberList']);
const route = useRoute();

function closeModal() {
  emits('closeModal');
}

const file = ref(null);
function getFile(event) {
  file.value = event.target.files[0];
  showFile(file.value);
}

const memberList = ref([]);
async function showFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = read(arrayBuffer);

  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const raw_data = utils.sheet_to_json(worksheet, { header: 1 });

  const objects = raw_data.map((r) => ({
    studentCode: r[0],
    seatRole: r[1],
    status: r[2]
  }));

  memberList.value = objects.slice(1);
  console.log(memberList.value);
}

const templateSheetHeader = ['Mã sinh viên', 'Vị trí'];
const templateObject = [
  {
    studentCode: '1234567890',
    seatRole: 'Không có'
  }
];

function downloadSheetTemplateHandler() {
  downloadSheet(templateObject, templateSheetHeader, 'DS thêm thành viên lớp xxx');
}

const sheetHeader = ['Mã sinh viên', 'Vị trí', 'Trạng thái'];
const sheetName = ref('Danh sách thành viên mới.xlsx');

function downloadSheetHandler() {
  downloadSheet(memberList.value, sheetHeader, sheetName.value);
}

function addMemberHandler() {
  dialog.warning({
    title: 'Thêm thành viên',
    content: `Xác nhận thêm thành viên?`,
    positiveText: 'Xác nhận',
    negativeText: 'Hủy',
    onPositiveClick: async () => {
      if (memberList.value.length == 0) {
        message.warning('Hãy chọn file danh sách thành viên');
      } else {
        for (let i = 0; i < memberList.value.length; i++) {
          const res = await classStore.addMember(route.params.id, memberList.value[i]);
          if (res.status == 200) {
            message.success('Thêm thành viên thành công');
            memberList.value[i].status = 'Thành công';
          } else if (res.response.status == 404) {
            message.error('Không tìm thấy thành viên này');
            memberList.value[i].status = 'Không tìm thấy';
          } else if (res.response.status == 400) {
            message.error('Thành viên đã có trong lớp');
            memberList.value[i].status = 'Đã có';
          }
        }
        emits('refreshMemberList');
        await downloadSheetHandler();
      }
    },
    onNegativeClick: () => {
      message.info('Hủy thêm thành viên');
    }
  });
}
</script>

<template>
  <div class="add-member-container">
    <n-button @click="downloadSheetTemplateHandler" type="primary" class="download-sheet-btn">
      <img :src="exportIcon" alt="Add" style="margin-right: 8px; transform: rotate(180deg)" /> Tải
      mẫu sheet
    </n-button>
    <input
      id="file"
      type="file"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      @change="getFile"
    />
    <n-button-group style="gap: 16px; width: 100%; justify-content: flex-end">
      <n-button strong secondary type="tertiary" @click="closeModal"> Hủy </n-button>
      <n-button type="primary" @click="addMemberHandler"> Thêm </n-button>
    </n-button-group>
  </div>
</template>

<style lang="scss" scoped>
.add-member-container {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .download-sheet-btn {
    width: 200px;
  }
}
</style>
