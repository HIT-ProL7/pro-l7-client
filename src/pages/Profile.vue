<script setup lang="js">
import ProfileHeader from '@/components/Profile/ProfileHeader.vue';
import ProfileInfor from '@/components/Profile/ProfileInfor.vue';
import ProfileCourses from '@/components/Profile/ProfileCourse/ProfileCourses.vue';

import banner from '../assets/banner-profile.png';
import avatar from '../assets/avatar-profile.png';

import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

onMounted(() => {
  userStore.getInfor();
  userStore.getMyClass();
});
</script>

<template>
  <div class="profile-wrap">
    <ProfileHeader
      :full-name="userStore.fullName"
      :avatar="userStore.avatar"
      :banner="userStore.banner"
    />
    <div class="profile-content">
      <div class="profile-infor-wrap">
        <ProfileInfor
          :created-at="userStore.createdAt"
          :email="userStore.email"
          :github-url="userStore.githubUrl"
          :facebook-url="userStore.facebookUrl"
          :student-code="userStore.studentCode"
          :cohort="userStore.cohort"
          :desc="userStore.desc"
        />
      </div>
      <div class="profile-courses-wrap">
        <ProfileCourses :userCourses="userStore.myClass" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-wrap {
  height: fit-content;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 150px;
  overflow: hidden;
  @include tablet {
    padding: 24px;
    gap: 100px;
  }
  @include small-tablet {
    padding: 16px;
  }
  .profile-content {
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 85px;
    @include tablet {
      flex-direction: column;
      gap: 32px;
    }
    @include mobile {
      gap: 28px;
    }
    .profile-infor-wrap {
      width: 50%;
      @include tablet {
        width: 100%;
      }
    }
    .profile-courses-wrap {
      width: 50%;
      height: fit-content;
      @include tablet {
        width: 100%;
      }
    }
  }
}
</style>
