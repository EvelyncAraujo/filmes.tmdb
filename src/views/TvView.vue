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
      :class="{ active: genre.  id === genreStore.currentGenreId }"
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
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #115c17;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  align-self: center;
  color: #fff;
  display: flex;
  justify-content: center;
}

.genre-item:hover {
  cursor: pointer;
  background-color:#115c17;
  box-shadow: 0 0 0.5rem#115c17;
}

.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  margin: 3px;
  background-color: #f0f0f0;
  padding: 6px;
}

.tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
}

.tv-details {
  padding: 0 0.5rem;
}

.tv-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.tv-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.tv-genres span {
  background-color: #115c17;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color:#115c17;
  box-shadow: 0 0 0.5rem#115c17;
}

.active {
  background-color: #115c17;
  font-weight: bolder;
}

.tv-genres span.active {
  background-color:#115c17;
  color: #fff;
  font-weight: bolder;
}
</style>