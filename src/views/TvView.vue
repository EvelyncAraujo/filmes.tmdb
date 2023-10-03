<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import Loading from "vue-loading-overlay";

const isLoading = ref(false);
const genres = ref([]);
const movies = ref([]);
const getGenreName = (id) => genres.value.find((genre) => genre.id === id).name;
const formatDate = (date) => new Date(date).toLocaleDateString("pt-BR");

const listTv = async (genreId) => {
  isLoading.value = true;
  const response = await api.get("discover/movie", {
    params: {
      with_genres: genreId,
      language: "pt-BR",
    },
  });
  movies.value = response.data.results;
  isLoading.value = false;
};

onMounted(async () => {
  try {
    const response = await api.get("genre/movie/list?language=pt-BR");
    genres.value = response.data.genres;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div>
    <h1>Programas de TV</h1>
    <ul class="genre-list">
      <Loading v-model:active="isLoading" is-full-page />
      <li
        class="genre-item"
        v-for="genre in genres"
        @click="listTv(genre.id)"
        :key="genre.id"
      >
        {{ genre.name }}
      </li>
    </ul>
  </div>

  <div class="movie-list">
    <div v-for="tv in movies" :key="tv.id" class="movie-card">
      <img
        :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
        :alt="tv.title"
      />
      <div class="tv-details">
        <p class="tv-name">{{ tv.name }}</p>
        <p class="movie-release-date">{{ formatDate(tv.release_date) }}</p>
        <p class="movie-genres">
          <span
            v-for="genre_id in tv.genre_ids"
            :key="genre_id"
            @click="listTv(genre_id)"
          >
            {{ getGenreName(genre_id) }}
          </span>
        </p>
        <p class="tv-genres">{{ tv.genre_ids }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 0;
}

.genre-item {
  background-color: rgba(240, 240, 240, 0.363);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  align-self: center;
  color: #030303;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  margin-left: 5rem;
  margin-top: 2rem;
  border-radius: 5px;
}
.movie-card {
  width: 15rem;
  height: 25rem;
  border-radius: 0.5rem;
  border: none;
  overflow: hidden;
  box-shadow: 0 0 0.2rem #000;
  transition: transform 0.3s;
}
.movie-card:hover {
  width: 15rem;
  height: 25rem;
  border-radius: 0.5rem;
  border: none;
  overflow: hidden;
  box-shadow: 0 0 0.2rem #000;
  transform: scale(1.1);
}
.movie-card img {
  width: 100%;
  height: 20rem;
}
.tv-details {
  padding: 0 0.5rem;
}
.tv-name {
  font-size: 1.1rem;
  text-align: center;
  font-weight: bold;
  line-height: 1.1rem;
  height: 1rem;
}
</style>
