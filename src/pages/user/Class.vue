<script setup>
import ClassInfor from '@components/ClassDetails/ClassInfor.vue';
import ClassLesson from '@components/ClassDetails/ClassLesson.vue';
import ClassRoadmap from '@components/ClassDetails/ClassRoadmap.vue';
import ClassMember from '@/components/ClassDetails/ClassMember.vue';

import { NTabs, NTabPane } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useClassStore } from '@/stores/classStore';

const classStore = useClassStore();

const route = useRoute();
const router = useRouter();

async function getDetailClass(classId) {
  try {
    await classStore.getDetailClass(classId);
    document.title = `${classStore.name} | ProL7`;
  } catch (error) {
    return error;
  }
}

onMounted(() => {
  getDetailClass(route.params.id);
  classStore.getAllLessons(route.params.id);
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
    <ClassInfor
      :name="classStore.name"
      :desc="classStore.description"
      :create-at="classStore.createAt"
      :started-date="classStore.startedDate"
      :leaders="classStore.leaders"
      :logo="classStore.logo"
    />
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
          <ClassLesson :class-lesson="classStore.lessons" />
        </n-tab-pane>
        <n-tab-pane name="Lộ trình" tab="Lộ trình">
          <ClassRoadmap />
        </n-tab-pane>
        <n-tab-pane name="Thành viên" tab="Thành viên">
          <ClassMember :class-members="classStore.members" />
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
