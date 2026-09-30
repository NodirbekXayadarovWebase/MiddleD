import type { MessageApi } from 'naive-ui'

export let message: MessageApi

export function setMessage(api: MessageApi): void {
  message = api
}
