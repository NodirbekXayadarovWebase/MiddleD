import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DEFAULT_PAGE_SIZE } from '@/constants'

export const SETTINGS_PERSIST_KEY = 'pinia:settingsStore'

export const useSettingsStore = defineStore('settingsStore', () => {
  const pageSize = ref(DEFAULT_PAGE_SIZE)

  function setPageSize(value: number) {
    pageSize.value = value
  }

  return { pageSize, setPageSize }
}, {
  persist: true,
})
