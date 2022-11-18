import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('../views/Sign.vue'),
      beforeEnter: (to, from, next) => {
        if (window.pdfImage) {
          next()
        } else {
          next('/')
        }
      },
    },
    {
      path: '/download',
      name: 'download',
      component: () => import('../views/Download.vue'),
      beforeEnter: (to, from, next) => {
        if (window.pdfImage) {
          next()
        } else {
          next('/')
        }
      },
    },
  ],
})

export default router
