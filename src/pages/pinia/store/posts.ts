import type { IPost, IPostFilter } from '../type'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import PostsService from '@/services/rest/posts.service'
import { useActivityStore } from '@/stores/activity'
import { message } from '@/utils/message'
import { useSettingsStore } from './settings'

export const POSTS_PERSIST_KEY = 'pinia:postsStore'

export const usePostsStore = defineStore('postsStore', () => {
  const items = ref<IPost[]>([])
  const totalDataCount = ref(0)
  const loading = ref(false)
  const filter = ref<IPostFilter>(defaultFilter())

  function defaultFilter(): IPostFilter {
    return { q: '', _page: 1, _limit: useSettingsStore().pageSize }
  }

  function patchFilter(partial: Partial<IPostFilter> = {}) {
    filter.value = { ...filter.value, ...partial, _page: 1 }
  }

  function setPage(page: number) {
    filter.value = { ...filter.value, _page: page }
  }

  function setPageSize(pageSize: number) {
    useSettingsStore().setPageSize(pageSize)
    patchFilter({ _limit: pageSize })
  }

  async function refresh() {
    loading.value = true
    try {
      const { rows, total } = await PostsService.GetList(filter.value)
      items.value = rows
      totalDataCount.value = total
    } finally {
      loading.value = false
    }
  }

  async function deleteItem(row: IPost) {
    await PostsService.Delete({ id: row.id })

    useActivityStore().record({ store: 'postsStore', action: 'post:deleted', ms: 0, status: 'ok', label: row.title })

    message.success("Muvaffaqiyatli o'chirildi")
    await refresh()
  }

  async function failingRequest() {
    await PostsService.GetById(999999)
  }

  return {
    items,
    totalDataCount,
    loading,
    filter,
    patchFilter,
    setPage,
    setPageSize,
    refresh,
    deleteItem,
    failingRequest,
  }
}, {
  persist: { paths: ['filter'] },
})
