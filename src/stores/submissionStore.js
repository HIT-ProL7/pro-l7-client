import { defineStore } from 'pinia';
import { api } from '@/api/axios';

export const useSubmissionStore = defineStore('submission', {
  state: () => ({
    id: 0,
    content: '',
    updateAt: '',
    createdBy: {},
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

        this.id = response.data.data.id;
        this.content = response.data.data.content;
        this.updateAt = response.data.data.updateAt;
        this.createdBy = response.data.data.createdBy;
        this.editable = response.data.data.editable;
        this.subLength = response.data.data.length;
        this.subList = response.data.data;

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
