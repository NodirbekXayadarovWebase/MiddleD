<script setup lang="ts">
import { FlashOutline, HourglassOutline, RefreshOutline } from '@vicons/ionicons5'
import { NButton, NCard, NIcon, NTag } from 'naive-ui'
import { nextTick, onMounted, ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import FastTable from './components/FastTable.vue'
import SlowTable from './components/SlowTable.vue'

type Mode = 'slow' | 'fast'

const ROW_COUNT = 2000

const mode = ref<Mode>('slow')
const drawKey = ref(0)
const renderMs = ref(0)

async function draw(next: Mode) {
  mode.value = next
  drawKey.value++

  const start = performance.now()
  await nextTick()
  renderMs.value = Math.round(performance.now() - start)
}

onMounted(() => draw('slow'))
</script>

<template>
  <div class="container-fluid">
    <PageHeader title="Performance profiling" hide-add>
      <template #actions>
        <NButton :type="mode === 'slow' ? 'error' : 'default'" @click="draw('slow')">
          <template #icon>
            <NIcon :component="HourglassOutline" />
          </template>
          Sekin
        </NButton>

        <NButton :type="mode === 'fast' ? 'success' : 'default'" @click="draw('fast')">
          <template #icon>
            <NIcon :component="FlashOutline" />
          </template>
          Tez
        </NButton>

        <NButton secondary @click="draw(mode)">
          <template #icon>
            <NIcon :component="RefreshOutline" />
          </template>
          Qayta chizish
        </NButton>
      </template>
    </PageHeader>

    <div class="mt-4 grid grid-cols-3 gap-4 md:grid-cols-1">
      <NCard>
        <p class="text-sm text-gray-500">Render vaqti</p>
        <p class="text-2xl font-semibold">{{ renderMs }} ms</p>
      </NCard>

      <NCard>
        <p class="text-sm text-gray-500">Rejim</p>
        <p class="text-2xl font-semibold">
          <NTag :type="mode === 'slow' ? 'error' : 'success'" :bordered="false">
            {{ mode === 'slow' ? 'Optimallashtirilmagan' : 'Optimallashtirilgan' }}
          </NTag>
        </p>
      </NCard>

      <NCard>
        <p class="text-sm text-gray-500">Qatorlar soni</p>
        <p class="text-2xl font-semibold">{{ ROW_COUNT }}</p>
      </NCard>
    </div>

    <NCard class="mt-4" title="Uchta bottleneck">
      <table class="w-full text-sm">
        <thead class="text-left text-gray-500">
          <tr>
            <th class="pb-2">Muammo</th>
            <th class="pb-2">Sekin variant</th>
            <th class="pb-2">Tuzatish</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-t border-black/5">
            <td class="py-2">Barcha qatorlar DOM'da</td>
            <td class="py-2">virtual scroll yo'q</td>
            <td class="py-2">virtual-scroll + max-height</td>
          </tr>
          <tr class="border-t border-black/5">
            <td class="py-2">Har renderda filtrlash</td>
            <td class="py-2">template'da filterRows() funksiyasi</td>
            <td class="py-2">computed</td>
          </tr>
          <tr class="border-t border-black/5">
            <td class="py-2">Chuqur reaktivlik</td>
            <td class="py-2">ref(2000 obyekt)</td>
            <td class="py-2">shallowRef</td>
          </tr>
        </tbody>
      </table>
    </NCard>

    <NCard class="mt-4">
      <component :is="mode === 'slow' ? SlowTable : FastTable" :key="drawKey" :row-count="ROW_COUNT" />
    </NCard>
  </div>
</template>
