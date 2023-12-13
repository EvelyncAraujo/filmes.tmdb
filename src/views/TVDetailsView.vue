<script setup>
  import { defineProps, onMounted } from 'vue';
  import { useTVStore } from '@/stores/tv';
  
  const TVStore = useTVStore();

  const props = defineProps({
    programaId: {
      type: Number,
      required: true,
    },
  });

  onMounted(async () => {
    await TVStore.getTVDetail(props.programaId);
  });
</script>

<template>
  
  <div class="main">
    <div class="content">
      <img class="img"
        :src="`https://image.tmdb.org/t/p/w185${TVStore.currentTV.poster_path}`"
        :alt="TVStore.currentTV.title"
      />

      <div class="details">
        <h1>Programa - {{ TVStore.currentTV.name }}</h1>
        <p>{{ TVStore.currentTV.tagline }} {{ TVStore.currentTV.overview }}</p>        
        <p>Avaliação: {{ TVStore.currentTV.vote_average.toFixed(0) }}</p> 
      </div>
    </div>
  </div>

  <h3>Produtoras:</h3>
  <div class="companies">
    <template
      v-for="company in TVStore.currentTV.production_companies"
      :key="company.id"
    >
      <img
        v-if="company.logo_path"
        :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
        :alt="company.name"
      />
      <p v-else>{{ company.name }}</p>
    </template>
  </div>
  
</template>

<style scoped>
  .companies {
    display: flex;
    flex-direction: row;
    column-gap: 3rem;
    align-items: center;
    margin-bottom: 2rem;
  }
  .img{
    margin-top: 15px;
    margin-left: 40%;
    height: 350px;
    width: 250px;
  }
</style>