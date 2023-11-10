import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/plugins/axios";

const useGenreStore = defineStore("genre", () => {
  const state = reactive({
    genres: [],
    currentGenreId: null,
  });
  const currentGenreId = computed(() => state.currentGenreId);
  const genres = computed(() => state.genres);
  const getGenreName = (id) =>
    state.genres.find((genre) => genre.id === id).name;

  const setCurrentGenreId = (genreId) => {
    state.currentGenreId = genreId;
  };
  const getAllGenres = async (type) => {
    const response = await api.get(`genre/${type}/list?language=pt-BR`);
    state.genres = response.data.genres;
  };

  return {
    genres,
    getAllGenres,
    getGenreName,
    setCurrentGenreId,
    currentGenreId,
  };
});

const genreStore = useGenreStore();
export default genreStore;
