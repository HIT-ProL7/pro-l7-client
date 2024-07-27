import { defineStore } from 'pinia';
import { api } from '@api/axios.js';
import { formatDate } from '@/utils/formatDate';

export const useUserStore = defineStore('user', {
  state: () => ({
    userRoles: '',
    studentCode: '',
    fullName: '',
    email: '',
    createdAt: '',
    githubUrl: '',
    cohort: 0,
    desc: '',
    avatar: '',
    banner: '',
    myClass: []
  }),
  actions: {
    async login(loginInfor) {
      try {
        const response = await api.post('/auth/login', loginInfor);

        this.userRoles = response.data.data.roles;
        localStorage.setItem('prol7-vuejs:access-token', response.data.data.accessToken);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async getInfor() {
      try {
        const response = await api.get('/users/me');
        this.studentCode = response.data.data.studentCode;
        this.fullName = response.data.data.fullName;
        this.email = response.data.data.email;
        this.createdAt = formatDate(response.data.data.createdAt);
        this.githubUrl = response.data.data.githubUrl;
        this.cohort = response.data.data.cohort;
        this.desc = response.data.data.description;
      } catch (error) {
        throw error;
      }
    },
    async updateInfor(updateInfor) {
      try {
        const response = await api.put('/users/update-info', updateInfor);
        this.email = response.data.data.email;
        this.githubUrl = response.data.data.githubUrl;
        this.desc = response.data.data.description;
        this.avatar = response.data.data.avatarUrl;
      } catch (e) {
        throw e;
      }
    },
    async getMyClass() {
      try {
        const response = await api.get('/classrooms/me');

        this.myClass = response.data.data;
      } catch (error) {
        return error;
      }
    },
    async changePassword(changePasswordInfor) {
      try {
        const response = await api.patch(
          'http://103.195.236.98:8081/api/v1/users/change-password',
          changePasswordInfor
        );
      } catch (error) {
        return error;
      }
    },
    async logout() {
      this.user = null;
      this.userRole = null;
      localStorage.removeItem('prol7-vuejs:access-token');
    }
  }
});
