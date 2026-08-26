import type { IUser, IUserFilter, IUserItem } from '../type'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import UsersService from '@/services/query/users.service'
import { message } from '@/utils/message'

export const useUsersStore = defineStore('usersStore', () => {
  const items = ref<IUserItem[]>([])
  const totalDataCount = ref(0)
  const loading = ref(false)
  const filter = ref<IUserFilter>(defaultFilter())

  function emptyItem(): IUser {
    return { name: '', username: '', email: '', phone: '', website: '' }
  }

  const item = ref<IUser>(emptyItem())

  function defaultFilter(): IUserFilter {
    return { search: '', page: 1, pageSize: DEFAULT_PAGE_SIZE }
  }


  function resetFilter() {
    filter.value = defaultFilter()
  }

  function patchFilter(partial: Partial<IUserFilter> = {}) {
    filter.value = { ...filter.value, ...partial, page: 1 }
  }

  async function refresh() {
    loading.value = true
    try {
      const { rows, total } = await UsersService.GetList(filter.value)
      items.value = rows
      totalDataCount.value = total
    } finally {
      loading.value = false
    }
  }

  function getItem() {
    item.value = emptyItem()
  }

  async function getItemById(id: string) {
    item.value = await UsersService.GetById(id)
  }

  async function createItem(data: IUser) {
    loading.value = true
    try {
      await UsersService.Create(data)
      message.success("Muvaffaqiyatli qo'shildi")
    } finally {
      loading.value = false
    }
  }

  async function updateItem(id: string, data: IUser) {
    loading.value = true
    try {
      await UsersService.Update(id, data)
      message.success('Muvaffaqiyatli yangilandi')
    } finally {
      loading.value = false
    }
  }

  async function deleteItem(row: IUserItem) {
    await UsersService.Delete({ id: row.id })
    message.success("Muvaffaqiyatli o'chirildi")
    await refresh()
  }

  return {
    items,
    totalDataCount,
    loading,
    item,
    filter,
    resetFilter,
    patchFilter,
    refresh,
    getItem,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
  }
})
