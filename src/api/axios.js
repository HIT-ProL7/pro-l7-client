import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from '../../node_modules/vue-router/dist/vue-router';

const apiInst = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiInst.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('prol7-vuejs:access-token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiInst.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log(originalRequest);
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('prol7-vuejs:refresh-token');
      // console.log('Refresh Token:', refreshToken);

      const userStore = useUserStore();
      const newAccessToken = await userStore.refreshToken(refreshToken);
      // console.log('New Access Token:', newAccessToken);

      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiInst(originalRequest);
      }
    }

    if (error.response.status === 401 && originalRequest._retry) {
      localStorage.removeItem('prol7-vuejs:access-token');
      localStorage.removeItem('prol7-vuejs:refresh-token');

      console.log('Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.');

      const router = useRouter();
      router.push({ name: 'Login' });
    }

    return Promise.reject(error);
  }
);

export const api = apiInst;
