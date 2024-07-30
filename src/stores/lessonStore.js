import { defineStore } from 'pinia';
import { api } from '@/api/axios';

export const useLessonStore = defineStore('lesson', {
  state: () => ({
    lesson: {},
    videos: [],
    video: {},
    exercise: {}
  }),
  actions: {
    async createLesson(contentInfor) {
      try {
        const resContent = await api.post(`/lessons`, contentInfor);
        this.lesson = resContent.data.data;
      } catch (error) {
        return error;
      }
    },
    async createVideo(videoInfor) {
      try {
        const resVideo = await api.post(`/videos`, videoInfor);
      } catch (error) {
        return error;
      }
    },
    async createExercise(lessonId, exerciseInfor) {
      try {
        const resExercise = await api.post(`/lessons/${lessonId}/exercises`, exerciseInfor);
      } catch (error) {
        return error;
      }
    },
    async updateLesson(lessonId, exerciseId, videoId, contentInfor, exerciseInfor, videoInfor) {
      try {
        const resContent = await api.put(`/lessons/${lessonId}`, contentInfor);
        const resVideo = await api.put(`/videos/${videoId}`, videoInfor);
        const resExercise = await api.put(
          `lessons/${lessonId}/exercises/${exerciseId}`,
          exerciseInfor
        );
      } catch (error) {
        return error;
      }
    },
    async deleteExercise(lessonId, exId) {
      try {
        const response = await api.delete(`/lessons/${lessonId}/exercises/${exId}`);
      } catch (error) {
        return error;
      }
    },
    async deleteLesson(lessonId) {
      try {
        const response = await api.delete(`/lessons/${lessonId}`);
        console.log(response);
      } catch (error) {
        return error;
      }
    },
    async getDetailLesson(lessonId) {
      try {
        const response = await api.get(`/lessons/${lessonId}`);
        this.lesson = response.data.data;
        this.videos = response.data.data.videos;
        this.exercise = response.data.data.exercises[0];
      } catch (error) {
        return error;
      }
    },
    async findVideoLesson(videoId) {
      this.video = this.videos.find((v) => v.id == videoId);
    }
  }
});
