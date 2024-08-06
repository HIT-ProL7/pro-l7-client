import { createRouter, createWebHistory } from 'vue-router';

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
          title: 'Trang cá nhân'
        },
        component: () => import('@/pages/user/Profile.vue')
      },
      {
        path: 'class/:id',
        name: 'Class',
        component: () => import('@/pages/user/Class.vue')
      },
      {
        path: '/:classId/lesson',
        name: 'Lesson',
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
          title: 'Quản lý lớp'
        },
        component: () => import('@/pages/leader/ClassesManager.vue')
      },
      {
        path: 'ClassManagement/:id',
        name: 'ClassManagement',
        component: () => import('@/pages/leader/ClassManager.vue')
      },
      {
        path: 'lessonManagement',
        name: 'LessonManagement',
        component: () => import('@/pages/leader/LessonManager.vue')
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

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});
