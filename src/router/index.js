import { createRouter, createWebHistory } from 'vue-router'
import GameView from '../views/GameView.vue'

const routes = [
  {
    path: '/',
    name: 'Game',
    component: GameView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
