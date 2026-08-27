import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { ACTIVITY_LOG_LIMIT } from '@/constants'

export const ACTIVITY_STORE_ID = 'activityStore'

export interface IActivityEntry {
  id: number
  at: string
  store: string
  action: string
  ms: number
  status: 'ok' | 'error'
  label?: string
}

export const useActivityStore = defineStore(ACTIVITY_STORE_ID, () => {
  const entries = ref<IActivityEntry[]>([])

  let nextId = 1

  const errorCount = computed(() => entries.value.filter((entry) => entry.status === 'error').length)

  function record(entry: Omit<IActivityEntry, 'id' | 'at'>) {
    entries.value.unshift({ ...entry, id: nextId++, at: new Date().toLocaleTimeString('ru-RU') })

    if (entries.value.length > ACTIVITY_LOG_LIMIT) entries.value.pop()
  }

  function clear() {
    entries.value = []
  }

  return { entries, errorCount, record, clear }
})
