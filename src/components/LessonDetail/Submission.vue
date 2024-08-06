<script setup>
import { NThing, NImage, NButton, useMessage, useDialog } from 'naive-ui';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSubmissionStore } from '@/stores/submissionStore';
import delIcon from '@assets/icons/delIcon.svg';
import editIcon from '@assets/icons/editIcon.svg';

const submissionStore = useSubmissionStore();
const route = useRoute();
const message = useMessage();
const dialog = useDialog();

const subInput = ref('');
async function postSub() {
  const res = await submissionStore.addSubmission({
    exerciseId: route.query.exercise,
    content: subInput.value
  });

  if (res.status == 201) {
    message.success('Bình luận thành công');
    await submissionStore.getSubmission(route.query.exercise);
    pageMax.value = submissionStore.subLength;
    subList.value = submissionStore.subList.reverse();
  } else if (res.response.status == 500) message.error('Lỗi bình luận');
}

const editable = ref([0]);
function toggleEdit(index) {
  editable.value[index] = !editable.value[index];
}

const subList = ref([]);
async function editSub(index, subId) {
  const res = await submissionStore.editSubmission(subId, {
    content: subList.value[index].content
  });

  if (res.status == 200) {
    message.success('Chỉnh sửa thành công');
    await submissionStore.getSubmission(route.query.exercise);
    subList.value = submissionStore.subList.reverse();
    toggleEdit(index);
  } else if (res.response.status) message.error('Lỗi chỉnh sửa');
}

async function delSub(subId) {
  dialog.warning({
    title: 'Xác nhận xóa bình luận',
    content: 'Bạn chắc chắn muốn xóa?',
    positiveText: 'Xóa',
    negativeText: 'Hủy',
    onPositiveClick: async () => {
      const res = await submissionStore.deleteSubmission(subId);

      if (res.status == 200) {
        message.success('Chỉnh sửa thành công');
        await submissionStore.getSubmission(route.query.exercise);
        pageMax.value = submissionStore.subLength;
        subList.value = submissionStore.subList.reverse();
      } else if (res.response.status) message.error('Lỗi xóa');
    },
    onNegativeClick: () => {
      message.error('Hủy xóa');
    }
  });
}

const pageMore = 4;
const pageCnt = ref(4);
const pageMax = ref(0);
const limitedSubList = computed(() => subList.value.slice(0, pageCnt.value));
onMounted(async () => {
  await submissionStore.getSubmission(route.query.exercise);
  pageMax.value = submissionStore.subLength;
  subList.value = submissionStore.subList.reverse();
  console.log(pageMax.value);
});
</script>

<template>
  <div class="submission-wrap">
    <h2>Bình luận</h2>
    <div class="submission-input">
      <textarea type="text" placeholder="Nhập tại đây" v-model="subInput" />
      <n-button type="primary" @click="postSub">Gửi</n-button>
    </div>
    <div class="submission-content">
      <div class="submission" v-for="(s, i) in limitedSubList" :key="i">
        <n-thing>
          <template #avatar>
            <n-image width="50px" height="50px" src="/src/assets/avatar.png" />
          </template>
          <template #header
            ><p style="font-size: 20px">
              {{ s.createdBy.fullName }}
            </p></template
          >
          <template #header-extra v-if="s.editable">
            <n-button circle size="small" style="margin-right: 8px" @click="toggleEdit(i)">
              <template #icon>
                <img :src="editIcon" alt="edit icon" />
              </template>
            </n-button>
            <n-button circle size="small" @click="delSub(s.id)">
              <template #icon>
                <img :src="delIcon" alt="delete icon" />
              </template>
            </n-button>
          </template>
          <template #description>
            <p>{{ s.createdBy.studentCode }}</p>
          </template>

          <div class="submission-input" v-if="editable[i]">
            <textarea
              style="width: 100%; resize: none; min-height: 100px; padding: 8px; font-size: 18px"
              ref="text"
              v-model="s.content"
            />
            <n-button type="primary" @click="editSub(i, s.id)">Lưu</n-button>
          </div>
          <div class="content" style="font-size: 18px" v-if="!editable[i]">
            {{ s.content }}
          </div>
          <template #footer>
            <p style="color: #888">{{ s.updatedAt }}</p>
          </template>
        </n-thing>
      </div>
    </div>
    <div class="submission-more" v-if="pageCnt < pageMax">
      <n-button @click="pageCnt += pageMore">Xem thêm</n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.submission {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
}
.submission-input {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 32px;
  textarea {
    width: 100%;
    height: 100px;
    padding: 8px;
    resize: none;
    margin-bottom: 16px;
  }
}
.submission-more {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
}
</style>
