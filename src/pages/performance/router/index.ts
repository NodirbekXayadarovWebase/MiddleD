import type { RouteRecordRaw } from 'vue-router'

const performanceRoutes: RouteRecordRaw[] = [
  {
    path: '/performance',
    name: 'Performance',
    component: () => import('@/pages/performance/index.vue'),
    meta: { title: 'Performance profiling' },
  },
]

export default performanceRoutes
