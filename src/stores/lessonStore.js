import { defineStore } from 'pinia';
import { api } from '@/api/axios';

export const useLessonStore = defineStore('lesson', {
  state: () => ({
    lesson: {},
    video: {},
    exercise: {}
  }),
  actions: {
    async getDetailLesson(lessonId) {
      try {
        const response = await api.get(`/lessons/${lessonId}`);
        this.lesson = response.data.data;
        this.videos = response.data.data.videos;
        this.exercise = response.data.data.exercises[0];
      } catch (error) {
        return error;
      }
    }
  }
});
