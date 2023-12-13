import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { useTemplateStore } from './template';
import api from '@/plugins/axios';

export const useTVStore = defineStore('tv', () => {
  const state = reactive({
    currentTV: {
        vote_average: 0
    },
  });

  const currentTV = computed(() => state.currentTV);

  const getTVDetail = async (programaId) => {
    const templateStore = useTemplateStore();
    templateStore.setIsLoading(true);
    const response = await api.get(`tv/${programaId}`);
    state.currentTV = response.data;
    templateStore.setIsLoading(false);
  };

  return { currentTV, getTVDetail };
});