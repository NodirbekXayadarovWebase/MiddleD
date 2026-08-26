<script setup lang="ts">
import { NConfigProvider, NDialogProvider, NGlobalStyle, NMessageProvider } from 'naive-ui'
import { useThemeOverrides } from '@/composables/useThemeOverrides'

const { overrides } = useThemeOverrides()
</script>

<template>
  <NConfigProvider :theme-overrides="overrides">
    <NGlobalStyle />
    <NMessageProvider>
      <NDialogProvider>
        <RouterView />
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
