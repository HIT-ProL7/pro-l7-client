import { defineStore } from 'pinia';
import { api } from '@/api/axios';

export const useLessonStore = defineStore('lesson', {
  state: () => ({
    lesson: {},
    videos: [],
    video: {}
  }),
  actions: {
    async getDetailLesson(lessonId) {
      try {
        const response = await api.get(`/lessons/${lessonId}`);
        this.lesson = response.data.data;
        this.videos = response.data.data.videos;
      } catch (error) {
        return error;
      }
    },
    async findVideoLesson(videoId) {
      this.video = this.videos.find((v) => v.id == videoId);
    }
  }
});
