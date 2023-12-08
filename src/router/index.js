import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/filmes',
    name: 'Movies',
    component: () => import('../views/MoviesView.vue')
  },
  {
    path: '/tv',
    name: 'TV',
    component: () => import('../views/TvView.vue')
  },
  {
    path: '/movie/:movieId',
    name: 'MovieDetails',
    component: () => import('../views/movieDetailsView.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router