import axios from 'axios';
import router from '@/router/index';

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

    if (error.response.status === 401) {
      if (!originalRequest?.url?.includes('auth')) {
        const refreshToken = localStorage.getItem('prol7-vuejs:refresh-token');
        if (refreshToken) {
          try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/refresh`, {
              token: refreshToken
            });

            const newAccessToken = res.data.data.accessToken;
            localStorage.setItem('prol7-vuejs:access-token', newAccessToken);

            return new Promise((resolve, reject) => {
              axios
                .request({
                  ...originalRequest,
                  headers: {
                    ...originalRequest?.headers,
                    Authorization: `Bearer ${newAccessToken}`
                  }
                })
                .then(async (response) => resolve(response))
                .catch((error) => reject(error));
            });
          } catch (error) {
            router.push({ name: 'Login' });
            return Promise.reject(error);
          }
        }
      }
    }
  }
);

export const api = apiInst;
