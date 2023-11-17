import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useTemplateStore = defineStore('template', () => {
  const state = reactive({
    isLoading : false,
  });

  const isLoading = computed(() => state.isLoading)
  const setIsLoading = (status) => {state.isLoading = status}

  return {isLoading, setIsLoading}
})

export default useTemplateStore