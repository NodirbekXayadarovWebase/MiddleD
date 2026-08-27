import type { RouteRecordRaw } from 'vue-router'

const piniaRoutes: RouteRecordRaw[] = [
  {
    path: '/pinia',
    name: 'Pinia',
    component: () => import('@/pages/pinia/index.vue'),
    meta: { title: "Pinia pattern'lar" },
  },
]

export default piniaRoutes
