import axios from 'axios';
import { useRouter } from 'vue-router';

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
  function (error) {
    if (error.response.status == 401) {
      // const router = useRouter();
      localStorage.removeItem('prol7-vuejs:access-token');
      // router.push({ name: 'Login' });
    }
    return Promise.reject(error);
  }
);

export const api = apiInst;
