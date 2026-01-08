import { createRouter, createWebHistory } from 'vue-router'
import index from '@/views/index.vue'
import CityView from '@/views/cityView.vue'
import CityHome from '@/views/CityHome.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/city-aqi',
      name: 'CityHome',
      component: CityHome,
    },
    {
      path: '/city/:cityName',  // 獨立的路由
      name: 'CityView',
      component: CityView
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
