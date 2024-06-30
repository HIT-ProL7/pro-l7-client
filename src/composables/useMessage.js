import { ref, inject } from 'vue';
import { setupTimeout } from '@/utils/setupTimeout';

export function useMessage() {
  const id = ref(0);
  const messList = inject('messList');
  const messMax = inject('messMax');

  function create({ type, content, duration, hoverKeepAlive }) {
    const newId = id.value++;
    messList.value.push({
      id: newId,
      type,
      content,
      duration
    });

    if (messList.value.length > messMax.value) {
      messList.value = messList.value.splice(1);
    }

    messList.value[messList.value.length - 1].close = removeById;

    if (duration) {
      const { pauseTimeout, resumeTimeout } = setupTimeout(() => removeById(newId), duration);

      if (hoverKeepAlive) {
        messList.value[messList.value.length - 1].pauseTimeout = pauseTimeout;
        messList.value[messList.value.length - 1].resumeTimeout = resumeTimeout;
      }
    }
  }

  function infor({ content, duration, hoverKeepAlive }) {
    create({ type: 'infor', content, duration, hoverKeepAlive });
  }

  function success({ content, duration, hoverKeepAlive }) {
    create({ type: 'success', content, duration, hoverKeepAlive });
  }

  function warning({ content, duration, hoverKeepAlive }) {
    create({ type: 'warning', content, duration, hoverKeepAlive });
  }

  function error({ content, duration, hoverKeepAlive }) {
    create({ type: 'error', content, duration, hoverKeepAlive });
  }

  function removeById(id) {
    messList.value = messList.value.filter((n) => n.id != id);
  }

  return { infor, success, warning, error };
}
