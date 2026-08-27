<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import type { IActivityEntry } from '@/stores/activity'
import { NButton, NCard, NDataTable, NTag } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { h } from 'vue'
import { DEFAULT_TABLE_MAX_HEIGHT } from '@/constants'
import { useActivityStore } from '@/stores/activity'

const activityStore = useActivityStore()
const { entries } = storeToRefs(activityStore)

const columns: DataTableColumns<IActivityEntry> = [
  { title: 'Vaqt', key: 'at', width: 100 },
  { title: 'Store', key: 'store', width: 140 },
  { title: 'Action', key: 'action', width: 160 },
  {
    title: 'Davomiyligi',
    key: 'ms',
    width: 110,
    render: (row) => (row.ms ? `${row.ms} ms` : '—'),
  },
  {
    title: 'Status',
    key: 'status',
    width: 100,
    render: (row) =>
      h(NTag, { size: 'small', type: row.status === 'ok' ? 'success' : 'error', bordered: false }, {
        default: () => (row.status === 'ok' ? 'ok' : 'xato'),
      }),
  },
  {
    title: 'Izoh',
    key: 'label',
    minWidth: 220,
    ellipsis: { tooltip: true },
    render: (row) => row.label ?? '—',
  },
]
</script>

<template>
  <NCard title="activityStore — action loglari">
    <template #header-extra>
      <div class="flex items-center gap-3">
        <span class="text-xs text-gray-500">logger plugin → $onAction</span>
        <NButton size="small" quaternary :disabled="!entries.length" @click="activityStore.clear()">
          Tozalash
        </NButton>
      </div>
    </template>

    <NDataTable
      :max-height="DEFAULT_TABLE_MAX_HEIGHT"
      :columns="columns"
      :data="entries"
      :row-key="(row: IActivityEntry) => row.id"
      :pagination="{ pageSize: 10 }"
    />
  </NCard>
</template>
