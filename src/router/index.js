import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import GameView from '../views/GameView.vue'
import RankingView from '../views/RankingView.vue'

const routes = [
  { path: '/', component: LandingView },
  { path: '/jugar', component: GameView },
  { path: '/ranking', component: RankingView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
