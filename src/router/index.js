import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: () => import('../views/ForgotPass.vue')
  },
  {
    path: '/play',
    name: 'play',
    component: () => import('../views/Play.vue')
  },
  {
    path: '/tournament',
    name: 'tournament',
    component: () => import('../views/Tournament.vue')
  },
  {
    path: '/createtournament',
    name: 'createtournament',
    component: () => import('../views/CreateTournament.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
