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
        path: 'personal-infor',
        name: 'PersonalInfor',
        meta: {
          title: 'Trang cá nhân'
        },
        component: () => import('@pages/Personal.vue')
      }
    ]
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
