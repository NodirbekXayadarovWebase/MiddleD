<script setup lang="ts">
import { AlertCircleOutline, RefreshOutline } from '@vicons/ionicons5'
import { NButton, NCard, NIcon } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import { useActivityStore } from '@/stores/activity'
import ActivityLog from './components/ActivityLog.vue'
import PostsTable from './components/PostsTable.vue'
import { POSTS_PERSIST_KEY, usePostsStore } from './store/posts'
import { SETTINGS_PERSIST_KEY, useSettingsStore } from './store/settings'

const postsStore = usePostsStore()
const settingsStore = useSettingsStore()
const activityStore = useActivityStore()
const { entries, errorCount } = storeToRefs(activityStore)
const { pageSize } = storeToRefs(settingsStore)

const saved = ref({ posts: '', settings: '' })

function readSaved() {
  saved.value = {
    posts: localStorage.getItem(POSTS_PERSIST_KEY) ?? '—',
    settings: localStorage.getItem(SETTINGS_PERSIST_KEY) ?? '—',
  }
}

function clearSaved() {
  localStorage.removeItem(POSTS_PERSIST_KEY)
  localStorage.removeItem(SETTINGS_PERSIST_KEY)
  readSaved()
}

function simulateError() {
  postsStore.failingRequest().catch(() => {})
}

onMounted(readSaved)

postsStore.$subscribe(readSaved)
settingsStore.$subscribe(readSaved)
</script>

<template>
  <div class="container-fluid">
    <PageHeader title="Pinia pattern'lar" hide-add>
      <template #actions>
        <NButton @click="simulateError">
          <template #icon>
            <NIcon :component="AlertCircleOutline" />
          </template>
          Xatoni sinash
        </NButton>

        <NButton type="primary" :loading="postsStore.loading" @click="postsStore.refresh()">
          <template #icon>
            <NIcon :component="RefreshOutline" />
          </template>
          Yangilash
        </NButton>
      </template>
    </PageHeader>

    <div class="mt-4 grid grid-cols-3 gap-4 md:grid-cols-1">
      <NCard>
        <p class="text-sm text-gray-500">Jami action</p>
        <p class="text-2xl font-semibold">{{ entries.length }}</p>
      </NCard>

      <NCard>
        <p class="text-sm text-gray-500">Xatolar</p>
        <p class="text-2xl font-semibold">{{ errorCount }}</p>
      </NCard>

      <NCard>
        <p class="text-sm text-gray-500">Saqlangan pageSize (settingsStore)</p>
        <p class="text-2xl font-semibold">{{ pageSize }}</p>
      </NCard>
    </div>

    <div class="mt-4 grid grid-cols-3 gap-4 lg:grid-cols-1">
      <div class="col-span-2 lg:col-span-1">
        <PostsTable />
      </div>

      <NCard title="persist plugin — localStorage">
        <template #header-extra>
          <NButton size="small" quaternary @click="clearSaved">Tozalash</NButton>
        </template>

        <div class="space-y-4 text-xs">
          <div>
            <p class="mb-1 font-medium">{{ POSTS_PERSIST_KEY }}</p>
            <pre class="overflow-x-auto rounded bg-black/5 p-2">{{ saved.posts }}</pre>
            <p class="mt-1 text-gray-500">paths: ['filter'] — faqat filter saqlanadi</p>
          </div>

          <div>
            <p class="mb-1 font-medium">{{ SETTINGS_PERSIST_KEY }}</p>
            <pre class="overflow-x-auto rounded bg-black/5 p-2">{{ saved.settings }}</pre>
            <p class="mt-1 text-gray-500">persist: true — butun state saqlanadi</p>
          </div>
        </div>
      </NCard>
    </div>

    <div class="mt-4">
      <ActivityLog />
    </div>
  </div>
</template>
