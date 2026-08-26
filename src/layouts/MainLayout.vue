<script setup lang="ts">
import { NLayout, NLayoutContent, NSpin } from 'naive-ui'
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const collapsed = ref(false)
</script>

<template>
  <NLayout has-sider class="h-screen">
    <AppSidebar v-model:collapsed="collapsed" />

    <NLayout>
      <AppHeader @toggle-sidebar="collapsed = !collapsed" />

      <NLayoutContent
        content-style="padding: 24px; overflow: auto; height: calc(100vh - var(--header-height));"
        :native-scrollbar="false"
      >
        <RouterView v-slot="{ Component, route }">
          <Suspense :key="route.path">
            <component :is="Component" />
            <template #fallback>
              <div class="flex h-40 items-center justify-center">
                <NSpin />
              </div>
            </template>
          </Suspense>
        </RouterView>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
