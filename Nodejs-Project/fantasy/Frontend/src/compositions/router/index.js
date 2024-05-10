import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
import PlayerView from '../views/PlayerPage.vue'
import CaptionView from '../views/CaptionPage.vue'
//import HomeView from '@compositions/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/player/:match',
      name: 'player',
      component: PlayerView
    },
    {
      path: '/caption/:match',
      name: 'caption',
      component: CaptionView
    },
 
  ]
})

export default router
