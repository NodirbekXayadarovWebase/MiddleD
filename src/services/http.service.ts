import type { GetListResponse } from '@/types/common'
import { message } from '@/utils/message'

const BASE_URL = import.meta.env.VITE_REST_BASE_URL

function toQuery(params?: object): string {
  if (!params) return ''

  const search = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') search.set(key, String(value))
  })

  return search.size ? `?${search}` : ''
}

async function request(resource: string, config?: RequestInit): Promise<Response> {
  try {
    const response = await fetch(`${BASE_URL}${resource}`, {
      headers: { 'Content-Type': 'application/json' },
      ...config,
    })

    if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`)

    return response
  } catch (error) {
    message.error(error instanceof Error ? error.message : String(error))
    throw error
  }
}

const httpService = {
  async get<T>(resource: string, params?: object): Promise<T> {
    const response = await request(`${resource}${toQuery(params)}`)

    return (await response.json()) as T
  },

  async getList<T>(resource: string, params?: object): Promise<GetListResponse<T>> {
    const response = await request(`${resource}${toQuery(params)}`)

    return {
      rows: (await response.json()) as T[],
      total: Number(response.headers.get('x-total-count') ?? 0),
    }
  },

  async delete<T>(resource: string): Promise<T> {
    const response = await request(resource, { method: 'DELETE' })

    return (await response.json()) as T
  },
}

export default httpService
