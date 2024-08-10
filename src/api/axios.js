import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

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
    // if (error.response.status == 401) {
    //   // const router = useRouter();
    //   localStorage.removeItem('prol7-vuejs:access-token');
    //   // router.push({ name: 'Login' });
    // }
    const originalRequest = error.config;
    console.log(originalRequest);

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('prol7-vuejs:refresh-token');
      const userStore = useUserStore();
      const newAccessToken = await userStore.refreshToken(refreshToken);

      console.log(refreshToken);
      console.log(newAccessToken);
      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiInst(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export const api = apiInst;
