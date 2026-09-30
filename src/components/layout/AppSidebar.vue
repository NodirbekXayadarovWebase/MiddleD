<script setup lang="ts">
import { NLayoutSider, NMenu } from 'naive-ui'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuOptions } from './menu'

const { collapsed } = defineProps<{ collapsed: boolean }>()

const emit = defineEmits<{ 'update:collapsed': [value: boolean] }>()

const route = useRoute()
const router = useRouter()

const menuOptions = useMenuOptions()

const activeMenu = computed(() => (route.meta.parent as string) || (route.name as string))

function handleUpdate(key: string) {
  router.push({ name: key })
}
</script>

<template>
  <NLayoutSider
    bordered
    show-trigger
    collapse-mode="width"
    :width="240"
    :collapsed="collapsed"
    :collapsed-width="64"
    @collapse="emit('update:collapsed', true)"
    @expand="emit('update:collapsed', false)"
  >
    <RouterLink class="logo" to="/">
      <img v-if="!collapsed" src="/logo.svg" alt="Webase" class="h-6" />
      <img v-else src="/logo.svg" alt="Webase" class="h-5 w-6 object-cover object-right" />
    </RouterLink>

    <NMenu
      class="app-sidebar-menu"
      :collapsed="collapsed"
      :collapsed-width="64"
      :icon-size="20"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :value="activeMenu"
      :default-expanded-keys="['task1', 'task2', 'task3']"
      @update:value="handleUpdate"
    />
  </NLayoutSider>
</template>

<style scoped>
.app-sidebar-menu :deep(.n-menu-item-content) {
  padding: 0 24px !important;
  gap: 12px;
}

.app-sidebar-menu :deep(.n-menu-item-content__icon) {
  margin-right: 0 !important;
}

.app-sidebar-menu :deep(.n-menu-item) {
  margin-bottom: 4px;
}
</style>
