import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../pages/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/table/:id',
    name: 'table',
    component: () => import('../pages/TableView.vue'),
  },
  // Неизвестные пути — на главную
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  // BASE_URL учитывает префикс GitHub Pages (/pdf-price-to-website/),
  // иначе корень сайта не совпадёт с роутом "/" и сработает редирект на 404.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
