<script setup lang="ts">
import { PencilOutline, TrashOutline } from '@vicons/ionicons5'
import { NButton, NIcon, NPopconfirm } from 'naive-ui'

defineProps<{ canEdit?: boolean; canDelete?: boolean }>()

const emit = defineEmits<{ edit: []; delete: [] }>()
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <NButton v-if="canEdit" quaternary circle size="small" @click="emit('edit')">
      <template #icon>
        <NIcon :component="PencilOutline" />
      </template>
    </NButton>

    <NPopconfirm v-if="canDelete" @positive-click="emit('delete')">
      <template #trigger>
        <NButton quaternary circle size="small" type="error">
          <template #icon>
            <NIcon :component="TrashOutline" />
          </template>
        </NButton>
      </template>
      O'chirilsinmi?
    </NPopconfirm>
  </div>
</template>
