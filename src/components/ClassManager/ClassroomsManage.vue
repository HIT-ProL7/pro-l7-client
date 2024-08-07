<script setup lang="js">
import { useRouter } from 'vue-router';
import ClassLogo from '@/components/ClassManager/ClassManageLogo.vue';
import { defineProps, onMounted } from 'vue';
import { formatDate } from '@/utils/formatDate';

const router = useRouter();
const props = defineProps({
  classInfor: { type: Array, required: true }
});

function goToClassDetail(classId) {
  router.push({ name: 'ClassManagement', params: { id: classId } });
}
</script>

<template>
  <div class="class-list-wrap">
    <div class="class-title">
      <p class="my-class">Quản lý lớp học</p>
    </div>
    <div class="class-list">
      <p v-if="classInfor.length == 0">Không có lớp học nào</p>
      <div class="class" v-for="c in classInfor" :key="c.id">
        <ClassLogo :logo-name="c.logo" />
        <div class="class-infor">
          <p class="heading">{{ c.name }}</p>
          <p class="sub-heading">
            <span class="icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 56 56">
                <path
                  fill="currentColor"
                  d="M28.012 27.367c5.039 0 9.375-4.5 9.375-10.36c0-5.788-4.36-10.077-9.375-10.077c-5.016 0-9.375 4.383-9.375 10.125c0 5.812 4.36 10.312 9.375 10.312M13.293 49.07h29.438c3.68 0 4.992-1.054 4.992-3.117c0-6.047-7.57-14.39-19.711-14.39c-12.164 0-19.735 8.343-19.735 14.39c0 2.063 1.313 3.117 5.016 3.117"
                />
              </svg>
            </span>
            Leader:
            <span class="leader" v-for="(l, index) in c.leaders" :key="index"
              >{{ l.fullName }}
            </span>
          </p>
          <p class="sub-heading">
            <span class="icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21 11.11V5a2 2 0 0 0-2-2h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h6.11c1.26 1.24 2.98 2 4.89 2c3.87 0 7-3.13 7-7c0-1.91-.76-3.63-2-4.89M12 3c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1M6 7h12v2H6zm3.08 10H6v-2h3.08c-.05.33-.08.66-.08 1s.03.67.08 1M6 13v-2h5.11c-.61.57-1.07 1.25-1.43 2zm10 8c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5m.5-4.75l2.86 1.69l-.75 1.22L15 17v-5h1.5z"
                />
              </svg>
            </span>
            {{ formatDate(c.startedDate) }}
          </p>
          <div class="class-action">
            <button class="class-join-btn" @click="goToClassDetail(c.id)">Kiểm tra</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.class-list-wrap {
  .my-class {
    font-size: 36px;
    margin-bottom: 32px;
    @include mobile {
      font-size: 25px;
      text-align: center;
    }
  }

  .class-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    flex-direction: row;
    gap: 32px;
    @include tablet {
      gap: 15px;
    }
    @include small-tablet {
    }
    @include mobile {
      justify-content: center;
    }

    > p:first-child {
      font-size: 24px;
    }

    .class {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 254px;
      .class-infor {
        width: 100%;
        padding: 16px;
        max-width: 280px;
        color: #2a2a2a;
        background-color: #fff;
        position: relative;
        bottom: 20px;
        border-radius: 0 25px 20px 20px;
        height: 210px;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        font-size: 16px;
        .icon-wrap {
          font-size: 20px;
        }
        p:not(:last-child) {
          margin-bottom: 8px;
        }
        .heading {
          font-size: 24px;
          font-weight: 500;
          width: 94%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sub-heading {
          width: 94%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .icon-wrap {
            margin-right: 4px;
            svg {
              transform: translateY(12%);
            }
          }
          @include mobile {
            font-size: 20px;
          }
          > .leader:not(:last-child)::after {
            content: ',';
          }
        }
      }
      .class-action {
        display: flex;
        align-items: center;
        justify-content: center;

        .class-join-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 25px;
          background-color: #2a2a2a;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
