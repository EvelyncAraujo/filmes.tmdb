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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router