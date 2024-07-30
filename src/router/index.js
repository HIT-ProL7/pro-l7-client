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
        component: () => import('@pages/index.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        meta: {
          title: 'Trang cá nhân'
        },
        component: () => import('@/pages/Profile.vue')
      },
      {
        path: 'class/:id',
        name: 'Class',
        component: () => import('@/pages/Class.vue')
      },
      {
        path: '/:classId/lesson',
        name: 'Lesson',
        component: () => import('@pages/Lesson.vue'),
        children: [
          {
            path: ':lsdId',
            name: 'Lesson-detail',
            component: () => import('@components/LessonDetail.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Trang đăng nhập'
    },
    component: () => import('@pages/Login.vue')
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
