import type { MenuOption } from 'naive-ui'
import { PeopleOutline, ServerOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { h } from 'vue'

export function useMenuOptions(): MenuOption[] {
  return [
    {
      label: 'Query',
      key: 'query',
      icon: () => h(NIcon, null, { default: () => h(ServerOutline) }),
      children: [
        {
          label: 'Foydalanuvchilar',
          key: 'Users',
          icon: () => h(NIcon, { size: 16 }, { default: () => h(PeopleOutline) }),
        },
      ],
    },
  ]
}
