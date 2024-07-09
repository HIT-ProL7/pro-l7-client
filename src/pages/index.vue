<script setup lang="js">
import { useRouter } from 'vue-router';
import classrooms from '@/components/Classrooms/Classrooms.vue';

const router = useRouter();
const classes = [
  {
    id: 'CL1',
    name: 'Python',
    leader: 'Phạm Đình Tiến',
    startDate: '15/06/2024',
    endDate: '15/08/2024',
    logoType: 'python',
    
    bgImSrc: 'pythonLogo',
    description: '',
  },

  {
    id: 'CL2',
    name: 'Java',
    leader: 'Phạm Đình Tiến',
    startDate: '15/06/2024',
    endDate: '15/08/2024',
    logoType: 'java',
    
    bgImgSrc: 'javaLogo',
    description: '',
  },
  {
    id: 'CL3',
    name: 'Photoshop',
    leader: 'Phạm Đình Tiến',
    startDate: '15/06/2024',
    endDate: '15/08/2024',
    logoType: 'photoshop',
   
    bgImgSrc: 'photoshopLogo',
    description: '',
  },
  {
    id: 'CL4',
    name: 'Web',
    leader: 'Phạm Đình Tiến',
    startDate: '15/06/2024',
    endDate: '15/08/2024',
    logoType: 'web',
    bgImgSrc: 'webLogo',
    description: '',
  },
];

function goToClassDetail(classId) {
  router.push({ name: 'Class', params: { id: classId } });
}
</script>

<template>
  
  <div class="home">
    <classrooms :classInfor="classes" />
  </div>
</template>

<style lang="scss" scoped>
.home{
  width: 100%;
  overflow:  hidden;
  height: 100vh;
  background-color: $body-color ;
  padding: 100px 50px 100px 50px;
  @include tablet{
    min-height: 100vh;
  }
  @include small-tablet{
    min-height: 100vh;
  }
  @include mobile{
    height: auto;
    padding: 32px;
    overflow: scroll !important;
  }
  
}
p {
  font-size: 24px;
}
</style>
