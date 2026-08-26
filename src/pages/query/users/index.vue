<script setup lang="ts">
import { onUnmounted } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import UsersTable from './components/UsersTable.vue'
import { useUsersStore } from './store'

const router = useRouter()
const route = useRoute()
const usersStore = useUsersStore()
const { refresh, resetFilter } = usersStore

await refresh()

let shouldResetFilter = false

onBeforeRouteLeave((to) => {
  shouldResetFilter = to.meta?.parent !== route.name
})

onUnmounted(() => {
  if (shouldResetFilter) resetFilter()
})
</script>

<template>
  <div class="container-fluid">
    <PageHeader title="Foydalanuvchilar" @add="router.push({ name: 'UsersCreate' })" />
    <div class="mt-4">
      <UsersTable />
    </div>
  </div>
</template>
