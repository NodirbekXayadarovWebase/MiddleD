import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import piniaRoutes from '@/pages/pinia/router'
import queryRoutes from './query'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/query/users',
    children: [
      // Module routes
      ...queryRoutes,
      ...piniaRoutes,
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
