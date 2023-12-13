<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import genreStore from '@/stores/genres'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoading = ref(false)
const programas = ref([])

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

function openMovie(programaId) { 
  router.push({ name: 'TVDetails', params: { programaId } });
}

const listTv = async (genreId) => {
  genreStore.setCurrentGenreId(genreId)
  isLoading.value = true
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  })
  programas.value = response.data.results
  isLoading.value = false
}

onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('tv')
  isLoading.value = false
})
</script>

<template>
  <h1>Programas de TV</h1>
  <ul class="genre-list">
    <li
      v-for="genre in genreStore.genres"
      :key="genre.id"
      @click="listTv(genre.id)"
      class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }"
    >
      {{ genre.name }}
    </li>
  </ul>
  <loading v-model:active="isLoading" is-full-page />
  <div class="tv-list">
    <div v-for="programa in programas" :key="programa.id" class="tv-card">
      <img :src="`https://image.tmdb.org/t/p/w500${programa.poster_path}`" :alt="programa.name" @click="openMovie(programa.id)" />
      <div class="tv-details">
        <p class="tv-title">{{ programa.name }}</p>
        <p class="tv-release-date">{{ formatDate(programa.first_air_date) }}</p>
        <p class="tv-genres">
          <span
            v-for="genre_id in programa.genre_ids"
            :key="genre_id"
            @click="listTv(genre_id)"
            :class="{ active: genre_id === genreStore.currentGenreId }"
          >
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
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
  margin-bottom: 10rem;
}

.genre-item {
  background-color: rgba(240, 240, 240, 0.363);
  border-radius: 0.25rem;
  font-size: 18px;
  cursor: pointer;
}


.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  margin-left: 3rem;
  border-radius: 5px;
  background-color: rgb(248, 248, 248);
}

.tv-card {
  width: 14rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  margin: 3px;
  background-color: #f0f0f0;
  padding: 6px;
  transition: transform 0.3s;
}
.tv-card:hover {
  width: 14rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  margin: 3px;
 
  box-shadow: 0 0 0.5rem #000;
  transform: scale(1.1);
}


.tv-card img {
  width: 100%;
  height: 20rem;
 
}

.tv-details {
  padding: 0 0.5rem;
}

.tv-title {
  font-size: 1.1rem;
  text-align: center;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.tv-genres {
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.3rem;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.tv-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

.active {
  background-color: #67b086;
  font-weight: bolder;
}

.tv-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>  