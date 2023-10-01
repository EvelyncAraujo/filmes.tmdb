<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const genres = ref([])
const movies = ref([]);

const listMovies = async (genreId) => {
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  movies.value = response.data.results
};
onMounted(async () => {
  const response = await api.get('genre/movie/list?language=pt-BR')
  genres.value = response.data.genres
})
</script>


<template>
  <h1>Filmes</h1>
  <ul class="genre-list">
    <li v-for="genre in genres" :key="genre.id" @click="listMovies(genre.id)" class="genre-item">
      {{ genre.name }}
    </li>

  </ul>
  <div class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-card">

      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">{{ movie.release_date }}</p>
        <p class="movie-genres">{{ movie.genre_ids }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  margin-left: 3rem;
  border-radius: 5px;
  background-color: rgb(248, 248, 248);
}

.movie-card {
  width: 14rem;
  height: 30rem;
  border-radius: 0.5rem;
  border: none;
  overflow: hidden;
  box-shadow: 0 0 0.2rem #000;
  transition: transform 0.3s;
}

.movie-card:hover {
  width: 14rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  transform: scale(1.1);
}

.movie-card img {
  width: 100%;
  height: 20rem;
}

.movie-details {
  padding: 0 0.5rem;
}

.movie-title {
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.movie-release-date,
.movie-genres {
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.3rem;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
  background-color: rgba(243, 243, 243, 0.151);
}

.genre-item {
  background-color: rgba(240, 240, 240, 0.363);
  border-radius: 0.25rem;
  font-size: 18px;
  cursor: pointer;
}</style>