<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import type { IPost } from '../type'
import { useDebounceFn } from '@vueuse/core'
import { NCard, NDataTable, NInput } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed, h, onMounted } from 'vue'
import GetListActions from '@/components/ui/GetListActions.vue'
import { DEFAULT_DEBOUNCE_MS, DEFAULT_PAGE_SIZES, DEFAULT_TABLE_MAX_HEIGHT } from '@/constants'
import { usePostsStore } from '../store/posts'

const postsStore = usePostsStore()
const { items, loading, filter, totalDataCount } = storeToRefs(postsStore)
const { refresh, patchFilter, setPage, setPageSize, deleteItem } = postsStore

let lastFilter = JSON.stringify(filter.value)

const columns: DataTableColumns<IPost> = [
  { title: 'ID', key: 'id', width: 70 },
  { title: 'Sarlavha', key: 'title', minWidth: 200, ellipsis: { tooltip: true } },
  { title: 'Matn', key: 'body', minWidth: 240, ellipsis: { tooltip: true } },
  {
    title: '',
    key: 'actions',
    width: 60,
    align: 'center',
    render: (row) => h(GetListActions, { canDelete: true, onDelete: () => deleteItem(row) }),
  },
]

const pagination = computed(() => ({
  page: filter.value._page,
  pageSize: filter.value._limit,
  itemCount: totalDataCount.value,
  showSizePicker: true,
  pageSizes: DEFAULT_PAGE_SIZES,
}))

onMounted(refresh)

postsStore.$subscribe(
  useDebounceFn(() => {
    const nextFilter = JSON.stringify(filter.value)
    if (nextFilter === lastFilter) return

    lastFilter = nextFilter
    refresh()
  }, DEFAULT_DEBOUNCE_MS),
)
</script>

<template>
  <NCard title="postsStore — REST ro'yxat">
    <template #header-extra>
      <span class="text-xs text-gray-500">filter o'zgardi → $subscribe → refresh</span>
    </template>

    <div class="mb-4">
      <NInput
        :value="filter.q"
        placeholder="Qidirish"
        clearable
        @update:value="(value: string) => patchFilter({ q: value })"
      />
    </div>

    <NDataTable
      remote
      :max-height="DEFAULT_TABLE_MAX_HEIGHT"
      :columns="columns"
      :data="items"
      :loading="loading"
      :pagination="pagination"
      :row-key="(row: IPost) => row.id"
      @update:page="setPage"
      @update:page-size="setPageSize"
    />
  </NCard>
</template>
