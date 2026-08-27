import type { PiniaPluginContext } from 'pinia'
import { ACTIVITY_STORE_ID, useActivityStore } from '@/stores/activity'

export function logger({ store }: PiniaPluginContext) {
  if (store.$id === ACTIVITY_STORE_ID) return

  store.$onAction(({ name, after, onError }) => {
    const activity = useActivityStore()
    const startedAt = performance.now()

    function record(status: 'ok' | 'error', label?: string) {
      const ms = Math.round(performance.now() - startedAt)

      activity.record({ store: store.$id, action: name, ms, status, label })
      console.debug(`[pinia] ${store.$id}.${name} ${ms}ms`, label ?? '')
    }

    after(() => record('ok'))
    onError((error) => record('error', String(error)))
  }, true)
}
