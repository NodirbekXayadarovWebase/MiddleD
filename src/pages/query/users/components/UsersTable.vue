<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import type { IUserItem } from '../type'
import { watchDebounced } from '@vueuse/core'
import { NCard, NDataTable, NInput } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed, h } from 'vue'
import { useRouter } from 'vue-router'
import GetListActions from '@/components/ui/GetListActions.vue'
import { DEFAULT_DEBOUNCE_MS, DEFAULT_PAGE_SIZES, DEFAULT_TABLE_MAX_HEIGHT } from '@/constants'
import { useUsersStore } from '../store'

const router = useRouter()
const usersStore = useUsersStore()
const { items, loading, filter, totalDataCount } = storeToRefs(usersStore)
const { refresh, patchFilter, deleteItem } = usersStore

const columns: DataTableColumns<IUserItem> = [
  { title: 'ID', key: 'id', width: 80, fixed: 'left' },
  { title: 'Ism', key: 'name', minWidth: 180 },
  { title: 'Login', key: 'username', minWidth: 140 },
  { title: 'Telefon', key: 'phone', minWidth: 160 },
  {
    title: '',
    key: 'actions',
    width: 100,
    fixed: 'right',
    align: 'center',
    render: (row) =>
      h(GetListActions, {
        canEdit: true,
        canDelete: true,
        onEdit: () => editItem(row),
        onDelete: () => deleteItem(row),
      }),
  },
]

const pagination = computed(() => ({
  page: filter.value.page,
  pageSize: filter.value.pageSize,
  itemCount: totalDataCount.value,
  showSizePicker: true,
  pageSizes: DEFAULT_PAGE_SIZES,
}))

function editItem(row: IUserItem) {
  router.push({ name: 'UsersEdit', params: { id: row.id } })
}

function handlePage(page: number) {
  filter.value.page = page
  refresh()
}

function handlePageSize(pageSize: number) {
  patchFilter({ pageSize })
  refresh()
}

watchDebounced(
  () => filter.value.search,
  () => {
    patchFilter()
    refresh()
  },
  { debounce: DEFAULT_DEBOUNCE_MS },
)
</script>

<template>
  <NCard>
    <div class="mb-4 w-80 md:w-full">
      <NInput v-model:value="filter.search" placeholder="Qidirish" clearable />
    </div>

    <NDataTable
      remote
      :max-height="DEFAULT_TABLE_MAX_HEIGHT"
      :columns="columns"
      :data="items"
      :loading="loading"
      :pagination="pagination"
      :row-key="(row: IUserItem) => row.id"
      :row-props="(row: IUserItem) => ({ onDblclick: () => editItem(row) })"
      @update:page="handlePage"
      @update:page-size="handlePageSize"
    />
  </NCard>
</template>
