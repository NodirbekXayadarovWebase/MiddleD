import type { RouteRecordRaw } from 'vue-router'
import usersRoutes from '@/pages/query/users/router'

const queryRoutes: RouteRecordRaw[] = [...usersRoutes].map((route) => ({
  ...route,
  path: `/query/${route.path}`,
}))

export default queryRoutes
