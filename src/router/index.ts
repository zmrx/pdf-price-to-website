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
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
