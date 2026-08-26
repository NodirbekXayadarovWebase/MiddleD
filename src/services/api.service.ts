import { message } from '@/utils/message'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://graphqlzero.almansi.me/api'

interface GqlResponse<T> {
  data?: T
  errors?: { message: string }[]
}

const apiService = {
  async request<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    })

    const json: GqlResponse<T> = await res.json()

    if (json.errors) {
      const text = json.errors.map((e) => e.message).join(', ')
      message.error(text)
      throw new Error(text)
    }

    return json.data as T
  },
}

export default apiService
