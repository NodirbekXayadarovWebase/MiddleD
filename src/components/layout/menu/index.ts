import type { MenuOption } from 'naive-ui'
import { ExtensionPuzzleOutline, LayersOutline, PeopleOutline, PulseOutline, ServerOutline, SpeedometerOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { h } from 'vue'

export function useMenuOptions(): MenuOption[] {
  return [
    {
      label: '1-task',
      key: 'task1',
      icon: () => h(NIcon, null, { default: () => h(ServerOutline) }),
      children: [
        {
          label: 'Foydalanuvchilar (GraphQL)',
          key: 'Users',
          icon: () => h(NIcon, { size: 16 }, { default: () => h(PeopleOutline) }),
        },
      ],
    },
    {
      label: '2-task',
      key: 'task2',
      icon: () => h(NIcon, null, { default: () => h(ExtensionPuzzleOutline) }),
      children: [
        {
          label: "Pinia pattern'lar",
          key: 'Pinia',
          icon: () => h(NIcon, { size: 16 }, { default: () => h(LayersOutline) }),
        },
      ],
    },
    {
      label: '3-task',
      key: 'task3',
      icon: () => h(NIcon, null, { default: () => h(SpeedometerOutline) }),
      children: [
        {
          label: 'Performance profiling',
          key: 'Performance',
          icon: () => h(NIcon, { size: 16 }, { default: () => h(PulseOutline) }),
        },
      ],
    },
  ]
}
