import type { RouteRecordRaw } from 'vue-router'

const usersRoutes: RouteRecordRaw[] = [
  {
    path: 'users',
    name: 'Users',
    component: () => import('@/pages/query/users/index.vue'),
    meta: { title: 'Foydalanuvchilar', icon: 'users' },
  },
  {
    path: 'users/create',
    name: 'UsersCreate',
    component: () => import('@/pages/query/users/create.vue'),
    meta: { title: "Foydalanuvchi qo'shish", parent: 'Users' },
  },
  {
    path: 'users/edit/:id',
    name: 'UsersEdit',
    component: () => import('@/pages/query/users/edit.vue'),
    meta: { title: 'Foydalanuvchini tahrirlash', parent: 'Users' },
  },
]

export default usersRoutes
