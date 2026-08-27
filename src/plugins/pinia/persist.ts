import type { PiniaPluginContext, StateTree } from 'pinia'

export interface PersistOptions {
  paths?: string[]
}

declare module 'pinia' {
  interface DefineStoreOptionsBase<S extends StateTree, Store> {
    persist?: boolean | PersistOptions
  }
}

export function persist({ store, options }: PiniaPluginContext) {
  if (!options.persist) return

  const paths = options.persist === true ? undefined : options.persist.paths
  const key = `pinia:${store.$id}`

  try {
    const saved = localStorage.getItem(key)
    if (saved) store.$patch(JSON.parse(saved))
  } catch {
    localStorage.removeItem(key)
  }

  store.$subscribe(
    (_mutation, state) => {
      const data = paths ? Object.fromEntries(paths.map((path) => [path, state[path]])) : state

      try {
        localStorage.setItem(key, JSON.stringify(data))
      } catch (error) {
        console.warn(`[persist] "${key}" saqlanmadi`, error)
      }
    },
    { detached: true },
  )
}
