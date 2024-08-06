import { defineStore } from 'pinia';
import { api } from '@/api/axios';

export const useSubmissionStore = defineStore('submission', {
  state: () => ({
    editable: null,
    subList: [],
    subLength: 0
  }),
  actions: {
    async addSubmission(infor) {
      try {
        const response = await api.post(`/submission`, infor);
        return response;
      } catch (error) {
        return error;
      }
    },
    async getSubmission(exerciseId) {
      try {
        const response = await api.get(`/submission/${exerciseId}`);
        this.editable = response.data.data.editable;
        this.subList = response.data.data;
        this.subLength = response.data.data.length;

        return response;
      } catch (error) {
        return error;
      }
    },
    async editSubmission(subId, content) {
      try {
        const response = await api.put(`submission/${subId}`, content);
        return response;
      } catch (error) {
        return error;
      }
    },
    async deleteSubmission(subId) {
      try {
        const response = await api.delete(`submission/${subId}`);
        return response;
      } catch (error) {
        return error;
      }
    }
  }
});
