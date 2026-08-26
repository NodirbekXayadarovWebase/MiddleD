<script setup lang="ts">
import UserForm from './components/UserForm.vue'
import { useUsersStore } from './store'

const usersStore = useUsersStore()
const { getItem } = usersStore

getItem()
</script>

<template>
  <UserForm />
</template>
