import { defineStore } from 'pinia';
import { api } from '@api/axios.js';
import { useRoute } from 'vue-router';
import { formatDate } from '@/utils/formatDate';

export const useClassStore = defineStore('class', {
  state: () => ({
    id: '',
    name: '',
    description: '',
    roadmap: '',
    createAt: '',
    leaders: [],
    members: [],
    lessons: []
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
        this.leaders = response.data.data.leaders;
        this.members = response.data.data.members;
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
    }
  }
});
