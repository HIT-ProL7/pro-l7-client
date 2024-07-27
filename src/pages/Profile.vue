<script setup lang="js">
import ProfileHeader from '@/components/Profile/ProfileHeader.vue';
import ProfileInfor from '@/components/Profile/ProfileInfor.vue';
import ProfileCourses from '@/components/Profile/ProfileCourse/ProfileCourses.vue';

import banner from '../assets/banner-profile.png';
import avatar from '../assets/avatar-profile.png';
import logoCourse from '../assets/pts-course.png';

const user = {
  userImg: {
    banner: banner,
    avatar: avatar
  },
  userInfor: {
    joinDate: '11/11/2024',
    email: 'Vugiachien2004@gmail.com',
    github: 'https://github.com/vugiachien',
    id: '2022602243',
    term: '16',
    desc: 'Tôi là một người đam mê công nghệ'
  },
  userCourses: [
    {
      name: 'Photoshop',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quasi quis ea tempore repellendus quas. Nam, voluptatem? Dolore, iste ullam?',
      logo: logoCourse
    },
    {
      name: 'Photoshop',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quasi quis ea tempore repellendus quas. Nam, voluptatem? Dolore, iste ullam?',
      logo: logoCourse
    },
    {
      name: 'Photoshop',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quasi quis ea tempore repellendus quas. Nam, voluptatem? Dolore, iste ullam?',
      logo: logoCourse
    },
    {
      name: 'Photoshop',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quasi quis ea tempore repellendus quas. Nam, voluptatem? Dolore, iste ullam?',
      logo: logoCourse
    }
  ]
};
</script>

<template>
  <div class="profile-wrap">
    <ProfileHeader :userImg="user.userImg" />
    <div class="profile-content">
      <div class="profile-infor-wrap">
        <ProfileInfor :userInfor="user.userInfor" />
      </div>
      <div class="profile-courses-wrap">
        <ProfileCourses :userCourses="user.userCourses" />
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
