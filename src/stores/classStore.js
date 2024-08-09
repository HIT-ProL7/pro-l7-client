import { defineStore } from 'pinia';
import { api } from '@api/axios.js';
import { formatDate } from '@/utils/formatDate';

export const useClassStore = defineStore('class', {
  state: () => ({
    id: '',
    name: '',
    description: '',
    roadmap: '',
    createAt: '',
    startedDate: '',
    logo: '',
    leaders: [],
    members: [],
    lessons: [],
    allClasses: []
  }),
  actions: {
    async getDetailClass(classId) {
      try {
        const response = await api.get(`/classrooms/${classId}`);

        this.id = response.data.data.id;
        this.name = response.data.data.name;
        this.description = response.data.data.description;
        this.roadmap = response.data.data.roadmap;
        this.createAt = formatDate(response.data.data.createAt);
        this.startedDate = formatDate(response.data.data.startedDate);
        this.leaders = response.data.data.leaders;
        this.members = response.data.data.members;
        this.logo = response.data.data.logo;

        return response;
      } catch (error) {
        return error;
      }
    },
    async updateRoadmap(roadmap, classId) {
      try {
        const response = await api.put(`classrooms/${classId}`, roadmap, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response);
        return response;
      } catch (error) {
        return error;
      }
    },
    async getAllLessons(classId) {
      try {
        const response = await api.get(`/lessons/classroom/${classId}`);
        this.lessons = response.data.data;
      } catch (error) {
        return error;
      }
    },
    async getAllClasses() {
      try {
        const response = await api.get(`/classrooms`);

        this.allClasses = response.data.data;
      } catch (error) {
        return error;
      }
    },
    async addClass(classInfor) {
      try {
        const response = await api.post('/classrooms/create', classInfor, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response;
      } catch (error) {
        return error;
      }
    },
    async updateClass(classId, classInfor) {
      try {
        const response = await api.put(`classrooms/${classId}`, classInfor, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response;
      } catch (error) {
        return error;
      }
    },
    async updateLogoClass(classId, classInfor) {
      try {
        const response = await api.put(`classrooms/${classId}`, classInfor, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response;
      } catch (error) {
        return error;
      }
    },
    async closeClass(classId) {
      try {
        const response = await api.put(`/classrooms/${classId}/close`);
        return response;
      } catch (error) {
        return error;
      }
    },
    async registerMember(memberInfor) {
      try {
        const response = await api.post(`/auth/register`, memberInfor);
        return response;
      } catch (error) {
        return error;
      }
    },
    async addMember(classId, memberInfor) {
      try {
        const response = await api.post(`/classrooms/${classId}/members`, memberInfor);
        return response;
      } catch (error) {
        return error;
      }
    },
    async removeMember(classId, memberId) {
      try {
        const response = await api.delete(`classrooms/${classId}/members/${memberId}`);
        return response;
      } catch (error) {
        return error;
      }
    }
  }
});
