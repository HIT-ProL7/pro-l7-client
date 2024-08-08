<script setup>
import { NButton, NButtonGroup, useMessage, useDialog } from 'naive-ui';
import { ref, defineEmits } from 'vue';
import { useClassStore } from '@/stores/classStore';
import { read, utils, writeFileXLSX } from 'xlsx';
import { useRoute } from 'vue-router';

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

async function downloadSheet() {
  /* generate worksheet and workbook */
  console.log(memberList.value);
  const worksheet = utils.json_to_sheet(memberList.value);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Thành viên');

  /* fix headers */
  utils.sheet_add_aoa(worksheet, [['Mã sinh viên', 'Vị trí', 'Trạng thái']], {
    origin: 'A1'
  });

  /* calculate column width */
  const header = Object.keys(memberList.value[0]);
  var wscols = [];
  console.log(memberList.value[0]);
  for (var i = 0; i < header.length; i++) {
    // columns length added
    wscols.push({ wch: 20 });
  }
  worksheet['!cols'] = wscols;

  /* create an XLSX file and try to save to Presidents.xlsx */
  writeFileXLSX(workbook, 'Danh sách thành viên mới.xlsx', { compression: true });
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
        await downloadSheet();
      }
    },
    onNegativeClick: () => {
      message.info('Hủy thêm thành viên');
    }
  });
}
</script>

<template>
  <div style="margin-top: 16px">
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

<style lang="scss" scoped></style>
