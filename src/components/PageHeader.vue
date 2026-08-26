<script setup lang="ts">
import { AddOutline } from '@vicons/ionicons5'
import { NButton, NIcon } from 'naive-ui'

interface Props {
  title?: string
  hideAdd?: boolean
}

const { title = 'Page Title', hideAdd = false } = defineProps<Props>()

const emit = defineEmits(['add'])
</script>

<template>
  <div class="page-header flex items-center justify-between">
    <div class="page-header__info">
      <slot name="info">
        <h1 class="text-xl font-semibold">{{ title }}</h1>
      </slot>
    </div>

    <div class="page-header__actions flex items-center gap-4">
      <slot name="actions">
        <NButton v-if="!hideAdd" type="primary" @click="emit('add')">
          <template #icon>
            <NIcon :component="AddOutline" />
          </template>
          Qo'shish
        </NButton>
      </slot>
    </div>
  </div>
</template>
