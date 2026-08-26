export interface GetListResponse<T> {
  rows: T[]
  total: number
}

export interface BaseFilter {
  search: string
  page: number
  pageSize: number
}
