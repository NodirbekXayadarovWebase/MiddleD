<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import type { IEmployee } from '../data'
import { NDataTable, NInput } from 'naive-ui'
import { ref } from 'vue'
import { createRows } from '../data'

const { rowCount } = defineProps<{ rowCount: number }>()

const rows = ref<IEmployee[]>(createRows(rowCount))
const search = ref('')

const columns: DataTableColumns<IEmployee> = [
  { title: 'ID', key: 'id', width: 80 },
  { title: 'Ism', key: 'name', minWidth: 140 },
  { title: 'Email', key: 'email', minWidth: 200 },
  { title: "Bo'lim", key: 'department', minWidth: 140 },
  { title: 'Maosh', key: 'salary', minWidth: 120 },
  { title: 'Sana', key: 'createdAt', width: 120 },
]

function filterRows(): IEmployee[] {
  const query = search.value.toLowerCase()

  return rows.value.filter((row) => row.name.toLowerCase().includes(query) || row.email.toLowerCase().includes(query))
}
</script>

<template>
  <div>
    <NInput v-model:value="search" class="mb-4" placeholder="Qidirish" clearable />

    <NDataTable :columns="columns" :data="filterRows()" :row-key="(row: IEmployee) => row.id" />
  </div>
</template>
