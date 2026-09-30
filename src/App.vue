<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, NMessageProvider } from 'naive-ui'
import { useThemeOverrides } from '@/composables/useThemeOverrides'

const { overrides } = useThemeOverrides()
</script>

<template>
  <NConfigProvider :theme-overrides="overrides">
    <NGlobalStyle />
    <NMessageProvider>
      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>
