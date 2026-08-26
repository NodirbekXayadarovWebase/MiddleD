<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center gap-4">
    <h1 class="text-2xl font-semibold">404 — sahifa topilmadi</h1>
    <NButton @click="router.push('/')">Bosh sahifa</NButton>
  </div>
</template>
