<script setup lang="ts">
import { onMounted } from 'vue'
import { useGql } from '../useGql'

const { data, error, run } = useGql()

const q = {
  users: `{ users(options: { paginate: { limit: 5 } }) { data { id name email } meta { totalCount } } }`,
  user: `{ user(id: 1) { id name email phone company { name } posts { data { id title } } } }`,
  createUser: `mutation { createUser(input: { name: "Timur", username: "timur", email: "timur@example.uz" }) { id name email } }`,
  updateUser: `mutation { upateUser(id: 1, input: { name: "Timur (yangi)" }) { id name } }`,
  deleteUser: `mutation { deledteUser(id: 1) }`,
}

onMounted(() => run(q.users))
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button v-for="(query, name) in q" :key="name" class="btn" @click="run(query)">{{ name }}</button>
  </div>
  <pre class="mt-3 max-h-96 overflow-auto bg-gray-100 p-2 text-xs">{{ error || data }}</pre>
</template>
