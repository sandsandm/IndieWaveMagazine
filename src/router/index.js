import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/Main.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MAIN',
      component: Main,
    },
    {
      path: '/articles/',
      name: 'ARTICLES',
      component: () => import('../views/Articles.vue'),
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/ArticlesDetail.vue')
    },
    {
      path: '/history',
      name: 'HISTORY',
      component: () => import('../views/History.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, left: 0, behavior: 'smooth' }
    }
  }
})

export default router
