<script setup lang="js">
import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue';
const router = useRouter();
const toggleMenu = ref(false);
const toggleSidebar = ref(false);
import { useUserStore } from '@/stores/userStore';
import { useClassManageStore } from '@stores/classManageStore';
import { useClassStore } from '@/stores/classStore';

import avatarDefault from '@/assets/avatar-profile.png';

const userStore = useUserStore();
const classManageStore = useClassManageStore();
const classStore = useClassStore();

const res = ref(false);
const setRes = () => {
  if (window.innerWidth < 480) {
    toggleSidebar.value = true;
    res.value = true;
  } else {
    toggleSidebar.value = false;
    res.value = false;
  }
};

function toggleMenuHandler() {
  if (res.value) {
    router.replace({ name: 'Profile' });
    toggleSidebar.value = !toggleSidebar.value;
  } else toggleMenu.value = !toggleMenu.value;
}

function autoCloseSidebar(action) {
  if (res.value) {
    action;
    toggleSidebar.value = !toggleSidebar.value;
  } else action;
}

function logoutHandler() {
  userStore.logout();
  router.replace('/login');
}

async function getInfor() {
  await userStore.getInfor();
  if (userStore.userRole == 'ROLE_USER') {
    await userStore.getMyClass();
    classManageStore.classManage = userStore.myClass.filter((c) => {
      return c.leaders.some((l) => l.studentCode == userStore.studentCode);
    });
  } else {
    await classStore.getAllClasses();
    classManageStore.classManage = classStore.allClasses;
  }
}

function closeMenuHandler(act) {
  act;
  toggleMenu.value = false;
}

onMounted(() => {
  window.addEventListener('resize', setRes);
  getInfor();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setRes);
});

setRes();
</script>

<template>
  <div class="bar" v-if="res" @click="toggleSidebar = !toggleSidebar">
    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1em" viewBox="0 0 1536 1280">
      <path
        fill="currentColor"
        d="M1536 1088v128q0 26-19 45t-45 19H64q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45m0-512v128q0 26-19 45t-45 19H64q-26 0-45-19T0 704V576q0-26 19-45t45-19h1408q26 0 45 19t19 45m0-512v128q0 26-19 45t-45 19H64q-26 0-45-19T0 192V64q0-26 19-45T64 0h1408q26 0 45 19t19 45"
      />
    </svg>
  </div>
  <transition name="slide">
    <div class="side-bar" v-if="!toggleSidebar">
      <div class="side-bar-wrap">
        <div class="exit-side-bar" v-if="res" @click="toggleSidebar = !toggleSidebar">x</div>
        <div class="logo" @click="autoCloseSidebar(router.push('/'))">
          <img src="../assets/logo.png" alt="logo" />
        </div>
        <br />
        <div class="drop-down">
          <div class="avatar" @click="toggleMenuHandler">
            <img :src="userStore.avatar || avatarDefault" alt="avartar" />
          </div>

          <div class="menu-wrap" v-if="toggleMenu" @click.self="toggleMenu = false">
            <ul class="menu">
              <li class="fist">
                <img :src="userStore.avatar || avatarDefault" alt="avartar" />
                <span
                  >{{ userStore.fullName }}
                  <p>{{ userStore.studentCode }}</p></span
                >
              </li>
              <li @click="closeMenuHandler(router.replace({ name: 'Profile' }))">Trang cá nhân</li>
              <li @click="closeMenuHandler(null)">Chế độ sáng/ tối</li>
              <li @click="logoutHandler">Đăng xuất</li>
            </ul>
          </div>
        </div>

        <div class="icon-cha">
          <div class="icon" @click="autoCloseSidebar(router.push('/'))">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"
              />
            </svg>
            <p>Trang chủ</p>
          </div>
          <div
            class="icon"
            @click="autoCloseSidebar(router.replace({ name: 'ClassesManagement' }))"
            v-if="classManageStore.classManage.length != 0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 14 14">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M12.402 8.976H7.259a2.278 2.278 0 0 0-.193-4.547h-1.68A3.095 3.095 0 0 0 4.609 0h7.793a1.35 1.35 0 0 1 1.348 1.35v6.279c0 .744-.604 1.348-1.348 1.348ZM2.898 4.431a1.848 1.848 0 1 0 0-3.695a1.848 1.848 0 0 0 0 3.695m5.195 2.276c0-.568-.46-1.028-1.027-1.028H2.899a2.649 2.649 0 0 0-2.65 2.65v1.205c0 .532.432.963.964.963h.172l.282 2.61A1 1 0 0 0 2.66 14h.502a1 1 0 0 0 .99-.862l.753-5.404h2.16c.567 0 1.027-.46 1.027-1.027Z"
                clip-rule="evenodd"
              />
            </svg>
            <p>Quản lý lớp</p>
          </div>
          <div
            class="icon"
            @click="autoCloseSidebar(router.replace({ name: 'Classes' }))"
            v-if="userStore.userRole == 'ROLE_ADMIN'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 14v8H4a8 8 0 0 1 8-8m0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6m9 4h1v5h-8v-5h1v-1a3 3 0 1 1 6 0zm-2 0v-1a1 1 0 1 0-2 0v1z"
              />
            </svg>
            <p>Admin</p>
          </div>
          <!-- <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21M6 14h12v-2H6zm0 3h12v-1.5H6z"
            />
          </svg>
          <p>Diễn đàn</p>
        </div>
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
            <g fill="none">
              <path
                d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
              />
              <path
                fill="currentColor"
                d="M13 13a4 4 0 0 1 4 4v1.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 2 18.5V17a4 4 0 0 1 4-4zm6 0a3 3 0 0 1 3 3v1.5a1.5 1.5 0 0 1-1.5 1.5H19v-2a5 5 0 0 0-2-4zM9.5 3a4.5 4.5 0 1 1 0 9a4.5 4.5 0 0 1 0-9M18 6a3 3 0 1 1 0 6a3 3 0 0 1 0-6"
              />
            </g>
          </svg>
          <p>Bạn bè</p>
        </div> -->
          <div class="icon" v-if="res">
            <p>Chế độ sáng tối</p>
          </div>
          <div class="icon" v-if="res" @click="logoutHandler">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 14 14">
              <path
                fill="black"
                fill-rule="evenodd"
                d="M0 1.5A1.5 1.5 0 0 1 1.5 0h7A1.5 1.5 0 0 1 10 1.5v1.939a2 2 0 0 0-.734 1.311H5.75a2.25 2.25 0 1 0 0 4.5h3.516A2 2 0 0 0 10 10.561V12.5A1.5 1.5 0 0 1 8.5 14h-7A1.5 1.5 0 0 1 0 12.5zm10.963 2.807A.75.75 0 0 0 10.5 5v1H5.75a1 1 0 0 0 0 2h4.75v1a.75.75 0 0 0 1.28.53l2-2a.75.75 0 0 0 0-1.06l-2-2a.75.75 0 0 0-.817-.163"
                clip-rule="evenodd"
              />
            </svg>
            <p>Đăng xuất</p>
          </div>
        </div>
      </div>
      <div class="chuong">
        <svg
          style="color: #ffb218"
          xmlns="http://www.w3.org/2000/svg"
          width="32px"
          height="32px"
          viewBox="0 0 36 36"
        >
          <path
            fill="currentColor"
            d="m32.85 28.13l-.34-.3A14.4 14.4 0 0 1 30 24.9a12.6 12.6 0 0 1-1.35-4.81v-4.94A10.81 10.81 0 0 0 19.21 4.4V3.11a1.33 1.33 0 1 0-2.67 0v1.31a10.81 10.81 0 0 0-9.33 10.73v4.94a12.6 12.6 0 0 1-1.35 4.81a14.4 14.4 0 0 1-2.47 2.93l-.34.3v2.82h29.8Z"
            class="clr-i-solid clr-i-solid-path-1"
          />
          <path
            fill="currentColor"
            d="M15.32 32a2.65 2.65 0 0 0 5.25 0Z"
            class="clr-i-solid clr-i-solid-path-2"
          />
          <path fill="none" d="M0 0h36v36H0z" />
        </svg>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.bar {
  width: 50px;
  height: 50px;
  color: $color-primary;
  padding: 8px;
  border-radius: 50%;
  border: 3px solid $color-primary;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1001;
}
.side-bar {
  width: 120px;
  padding: 0 8px;
  background-color: white;
  font-size: 13px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  @include mobile {
    width: 100%;
    position: fixed;
    z-index: 1002;
  }
  .side-bar-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;

    @include mobile {
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
  .exit-side-bar {
    font-size: 24px;
    @include mobile {
      position: absolute;
      top: 10px;
      right: 25px;
    }
  }
  .logo {
    border-bottom: 1px solid #777575;
    width: 90px;
    height: 90px;
    padding: 15px;
    cursor: pointer;
    @include mobile {
      width: 100%;
      height: fit-content;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      @include mobile {
        height: 50px;
        width: 50px;
      }
    }
  }
  .avatar {
    width: 72px;
    height: 72px;
    margin-bottom: 16px;
    cursor: pointer;

    img {
      border-radius: 50%;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .icon-cha {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include mobile {
      width: 100%;
    }
  }
  .icon:hover {
    background-color: #f06c25;
    color: white;
    cursor: pointer;
    transition: 0.5s;
  }
  .icon {
    width: 100px;
    padding: 16px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    @include mobile {
      flex-direction: row;
      width: max-content;
    }
    svg {
      @include mobile {
        margin-right: 8px;
      }
    }
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
  .chuong {
    border-radius: 100%;
    background-color: #e3e3e3;
    width: 56px;
    height: 56px;
    padding: 10px;
    bottom: 25px;
    position: fixed;
  }
  .menu-wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1010;
    background-color: rgba(255, 255, 255, 0.7);
  }
  .menu {
    width: max-content;
    height: 230px;
    border: 1px solid #f06c25;
    position: absolute;
    left: 132px;
    top: 90px;
    font-size: 15px;
    padding: 0 30px;
    border-radius: 4px;
    background-color: #fff;
    text-align: start;
    z-index: 999;
    list-style-type: none;
    span {
      margin-left: 10px;
      p {
        font-size: 12px;
      }
    }
    .fist {
      display: flex;
      align-items: center;
    }
    li {
      padding: 13px 0;
      cursor: pointer;
    }
    li:not(:last-child) {
      border-bottom: 1px solid #949494;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-30px);
  opacity: 0;
  padding: 0;
}
</style>
