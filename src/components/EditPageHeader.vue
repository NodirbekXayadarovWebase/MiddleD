<script setup lang="ts">
import { ArrowBackOutline, SaveOutline } from '@vicons/ionicons5'
import { NBreadcrumb, NBreadcrumbItem, NButton, NIcon } from 'naive-ui'
import { useRouter } from 'vue-router'

interface IBreadcrumbItem {
  text: string
  to?: string
}

interface Props {
  title?: string
  breadcrumbs?: IBreadcrumbItem[]
  loading?: boolean
  backLink?: string | null
}

const { title = 'Add/Edit Page', breadcrumbs = [], loading = false, backLink = null } = defineProps<Props>()

const emit = defineEmits(['save'])

const router = useRouter()

function handleBack() {
  if (backLink) {
    router.push(backLink)
  } else {
    router.back()
  }
}
</script>

<template>
  <div
    class="page-header sticky top-0 z-20 mb-4 flex flex-row items-end justify-between gap-4 border-b border-[var(--w-border)] bg-[var(--shell-content-bg)] pb-3 md:flex-col md:items-stretch"
  >
    <div class="page-header__info">
      <h2 class="mb-2 text-xl font-semibold">{{ title }}</h2>
      <NBreadcrumb separator="/">
        <NBreadcrumbItem v-for="item in breadcrumbs" :key="item.text" @click="item.to ? router.push(item.to) : null">
          {{ item.text }}
        </NBreadcrumbItem>
      </NBreadcrumb>
    </div>

    <div class="page-header__actions flex items-center gap-4">
      <slot name="actions">
        <NButton secondary strong size="large" class="rounded-md" @click="handleBack">
          <template #icon>
            <NIcon :component="ArrowBackOutline" />
          </template>
          Orqaga
        </NButton>
        <NButton
          strong
          secondary
          size="large"
          type="success"
          class="rounded-md"
          :loading="loading"
          :disabled="loading"
          @click="emit('save')"
        >
          <template #icon>
            <NIcon :component="SaveOutline" />
          </template>
          Saqlash
        </NButton>
      </slot>
    </div>
  </div>
</template>
