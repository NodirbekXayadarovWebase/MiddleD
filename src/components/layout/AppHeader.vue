<script setup lang="ts">
import { MenuOutline } from '@vicons/ionicons5'
import { NButton, NIcon, NLayoutHeader } from 'naive-ui'

const emit = defineEmits<{ toggleSidebar: [] }>()
</script>

<template>
  <NLayoutHeader bordered class="flex h-[var(--header-height)] items-center justify-between px-6">
    <NButton quaternary @click="emit('toggleSidebar')">
      <template #icon>
        <NIcon :component="MenuOutline" />
      </template>
    </NButton>

    <slot name="actions" />
  </NLayoutHeader>
</template>
