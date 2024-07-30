<script setup>
import ClassInfor from '@components/ClassDetails/ClassInfor.vue';
import ClassLesson from '@components/ClassDetails/ClassLesson.vue';
import ClassRoadmap from '@components/ClassDetails/ClassRoadmap.vue';
import ClassMember from '@/components/ClassDetails/ClassMember.vue';
import { NTabs, NTabPane } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

const allClasses = [
  {
    id: 'cl1',
    name: 'Python',
    leader: 'Phạm Đình Tiến',
    createdDate: '15/06/2024',
    closeDate: '15/08/2024',
    description:
      'Khóa học lập trình Python cơ bản với các bài tập và lý thuyết dễ hiểu, học xong bạn có thể tự tin để tới với các chủ đề nâng cao hơn của Python.',
    lessons: [
      {
        id: 'ls1',
        name: 'Giới thiệu',
        lessonDetails: [
          { id: 'ls1D1', name: 'Giới thiệu lớp học' },
          { id: 'ls1D2', name: 'Video bài học' },
          { id: 'ls1D3', name: 'BTVN' }
        ]
      },
      {
        id: 'ls2',
        name: 'Giới thiệu 2',
        lessonDetails: [
          { id: 'ls2D1', name: 'Giới thiệu lớp học 2' },
          { id: 'ls2D2', name: 'Video bài học 2' },
          { id: 'ls2D3', name: 'BTVN 2' }
        ]
      }
    ],
    members: [
      { msv: '2022602243', name: 'Vũ Gia Chiến' },
      { msv: '2022601223', name: 'Nguyễn Quỳnh Anh' },
      { msv: '2022322456', name: 'Đỗ Trạng Nguyên' }
    ]
  },
  {
    id: 'cl2',
    name: 'Photoshop',
    leader: 'Vũ Gia Chiến',
    createdDate: '20/06/2024',
    closeDate: '20/08/2024',
    description:
      'Khóa học lập trình PTS cơ bản với các bài tập và lý thuyết dễ hiểu, học xong bạn có thể tự tin để tới với các chủ đề nâng cao hơn của PTS.'
  }
];

const route = useRoute();
const router = useRouter();
const classId = route.params.id;

const classDetails = ref({});
function getClassDetails(classId) {
  classDetails.value = allClasses.find((cls) => cls.id === classId);
}

onMounted(() => {
  getClassDetails(classId);
  document.title = `${classDetails.value.name} | ProL7`;
});

const tabsThemeOverrides = ref({
  barColor: '#F06C25FF',
  tabTextColorActiveLine: '#F06C25FF',
  tabTextColorHoverLine: '#F06C25FF',
  tabTextColorHoverBar: '#F06C25FF',
  tabTextColorActiveBar: '#F06C25FF',
  tabTextColorActiveCard: '#F06C25FF',
  tabFontSizeSmall: '24px',
  tabFontSizeMedium: '36px'
});

const setResponsiveTheme = () => {
  if (window.innerWidth > 768 && window.innerWidth <= 1025)
    tabsThemeOverrides.value.tabFontSizeMedium = '36px';
  else if (window.innerWidth >= 480 && window.innerWidth <= 768)
    tabsThemeOverrides.value.tabFontSizeMedium = '24px';
  else if (window.innerWidth < 480) tabsThemeOverrides.value.tabFontSizeMedium = '18px';
  else tabsThemeOverrides.value.tabFontSizeMedium = '36px';
};

const justify = ref('');
const justifyCenter = () => {
  if (window.innerWidth >= 480) justify.value = '';
  else justify.value = 'center';
};

window.addEventListener('resize', () => {
  setResponsiveTheme();
  justifyCenter();
});
setResponsiveTheme();
justifyCenter();
</script>

<template>
  <div class="class-wrap">
    <div class="back" @click="router.go(-1)">
      <Icon icon="ep:arrow-left-bold" color="#fff" />
    </div>
    <ClassInfor :class-infor="classDetails" />
    <div class="class-nav">
      <n-tabs
        type="line"
        animated
        class="custom-nav"
        tab-class="custom-tab"
        :justify-content="justify"
        :theme-overrides="tabsThemeOverrides"
      >
        <n-tab-pane name="Bài học" tab="Bài học">
          <ClassLesson :class-lesson="classDetails.lessons" />
        </n-tab-pane>
        <n-tab-pane name="Lộ trình" tab="Lộ trình">
          <ClassRoadmap />
        </n-tab-pane>
        <n-tab-pane name="Thành viên" tab="Thành viên">
          <ClassMember :class-members="classDetails.members" />
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.class-wrap {
  background-color: #fff;
  width: 100%;
  margin-bottom: 32px;
  position: relative;
  min-height: 1000px;
  .back {
    width: 28px;
    height: 28px;
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  .custom-nav {
    background-color: #fff;
    padding-top: 8px;
    padding: 0 64px;
    @include mobile {
      padding: 0 8px;
    }
  }
}
</style>
