import { defineStore } from 'pinia';
import { api } from '@/api/axios';

export const useClassManageStore = defineStore('classManage', {
  state: () => ({
    classManage: []
  }),
  actions: {
    async getClassManage(studentCode) {
      try {
        const response = await api.get('/classrooms');
        this.classManage = response.data.data.filter((item) =>
          item.leaders.some((leader) => leader.studentCode === studentCode)
        );
        console.log(this.classManage);
      } catch (error) {
        return error;
      }
    },
    async removeMember(memberId, classId) {
      try {
        const response = await api.delete(`classrooms/${classId}/members/${memberId}`);

        console.log(response);
      } catch (error) {
        return error;
      }
    },
    async addMember(memberInfor, classId) {
      try {
        const response = await api.post(`classrooms/${classId}/members`, memberInfor);
        return response;
      } catch (error) {
        return error;
      }
    }
  }
});
