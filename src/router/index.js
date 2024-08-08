import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const routes = [
  {
    path: '/',
    component: () => import('@layout/default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        meta: {
          title: 'Trang chủ',
          requiresAuth: true
        },
        component: () => import('@/pages/user/index.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        meta: {
          title: 'Trang cá nhân',
          requiresAuth: true
        },
        component: () => import('@/pages/user/Profile.vue')
      },
      {
        path: 'class/:id',
        name: 'Class',
        meta: {
          requiresAuth: true
        },
        component: () => import('@/pages/user/Class.vue')
      },
      {
        path: '/:classId/lesson',
        name: 'Lesson',
        meta: {
          requiresAuth: true
        },
        component: () => import('@/pages/user/Lesson.vue'),
        children: [
          {
            path: ':lsdId',
            name: 'Lesson-detail',
            component: () => import('@/components/LessonDetail/LessonDetail.vue')
          }
        ]
      },
      {
        path: 'classesManagement',
        name: 'ClassesManagement',
        meta: {
          title: 'Quản lý lớp',
          requiresAuth: true
        },
        component: () => import('@/pages/leader/ClassesManager.vue')
      },
      {
        path: 'ClassManagement/:id',
        name: 'ClassManagement',
        meta: {
          requiresAuth: true
        },
        component: () => import('@/pages/leader/ClassManager.vue')
      },
      {
        path: 'lessonManagement',
        name: 'LessonManagement',
        meta: {
          requiresAuth: true
        },
        component: () => import('@/pages/leader/LessonManager.vue')
      }
    ]
  },
  {
    path: '/Admin',
    component: () => import('@layout/admin.vue'),
    children: [
      {
        path: '',
        name: 'Classes',
        meta: {
          title: 'Các lớp học',
          requiresAuth: true
        },
        component: () => import('@pages/admin/Classes.vue')
      },
      {
        path: '/Class/:id',
        name: 'ClassAdmin',
        component: () => import('@pages/admin/Class.vue')
      },
      {
        path: '/registerMember',
        name: 'registerMember',
        meta: {
          title: 'Đăng ký thành viên'
        },
        component: () => import('@pages/admin/registerMember.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Trang đăng nhập'
    },
    component: () => import('@/pages/user/Login.vue')
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;

router.afterEach((to, from) => {
  const appName = 'ProL7';
  if (to.name) {
    document.title = `${to.meta.title} | ${appName}`;
  } else {
    document.title = appName;
  }
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('prol7-vuejs:access-token');

  if (to.path == '/login' && token) {
    next({ name: 'Home' });
  } else if (to.path === '/Login' && !token) {
    localStorage.removeItem('prol7-vuejs:access-token');
    next({ name: 'Login' });
  } else if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});
