import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { useTemplateStore } from './template';
import api from '@/plugins/axios';

export const useMovieStore = defineStore('movie', () => {
  const state = reactive({
    currentMovie: {},
  });

  const currentMovie = computed(() => state.currentMovie);

  const getMovieDetail = async (movieId) => {
    const templateStore = useTemplateStore();
    templateStore.setIsLoading(true);
    const response = await api.get(`movie/${movieId}`);
    state.currentMovie = response.data;
    templateStore.setIsLoading(false);
  };

  return { currentMovie, getMovieDetail };
});