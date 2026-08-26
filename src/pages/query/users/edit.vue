<script setup lang="ts">
import { useRoute } from 'vue-router'
import UserForm from './components/UserForm.vue'
import { useUsersStore } from './store'

const route = useRoute()
const usersStore = useUsersStore()
const { getItemById } = usersStore

await getItemById(String(route.params.id))
</script>

<template>
  <UserForm />
</template>
