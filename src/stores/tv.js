import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const usetvStore = defineStore('Tv', () => {
  const state = reactive({
    currenttv: {},
  });

  const currentMovie = computed(() => state.currenttv);

  const getMovieDetail = async (movieId) => {
    const response = await api.get(`movie/${movieId}`);
    state.currenttv = response.data;
  };

  return { currenttv, gettvDetail };
});