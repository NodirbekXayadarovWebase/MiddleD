import type { IUser, IUserFilter, IUserItem } from '@/pages/query/users/type'
import type { GetListResponse } from '@/types/common'
import apiService from '@/services/api.service'

const LIST = `query ($options: PageQueryOptions) {
  users(options: $options) {
    data { id name username phone }
    meta { totalCount }
  }
}`

const GET_BY_ID = `query ($id: ID!) {
  user(id: $id) { id name username phone website }
}`

const CREATE = `mutation ($input: CreateUserInput!) {
  user: createUser(input: $input) { id name username phone website }
}`

const UPDATE = `mutation ($id: ID!, $input: UpdateUserInput!) {
  user: updateUser(id: $id, input: $input) { id name username phone website }
}`

const DELETE = `mutation ($id: ID!) {
  deleteUser(id: $id)
}`

function toOptions(filter: IUserFilter) {
  return {
    search: filter.search ? { q: filter.search } : undefined,
    paginate: { page: filter.page, limit: filter.pageSize },
  }
}

function toInput(data: IUser) {
  // graphqlzero CreateUserInput.email majburiy — formada yo'q, shuning uchun login'dan yasaladi
  return {
    name: data.name,
    username: data.username,
    email: `${data.username}@example.com`,
    phone: data.phone,
    website: data.website,
  }
}

const UsersService = {
  async GetList(filter: IUserFilter): Promise<GetListResponse<IUserItem>> {
    const data = await apiService.request<{
      users: { data: IUserItem[]; meta: { totalCount: number } }
    }>(LIST, { options: toOptions(filter) })

    return { rows: data.users.data, total: data.users.meta.totalCount }
  },

  async GetById(id: string): Promise<IUser> {
    const data = await apiService.request<{ user: IUser }>(GET_BY_ID, { id })

    return data.user
  },

  async Create(data: IUser): Promise<IUser> {
    const res = await apiService.request<{ user: IUser }>(CREATE, { input: toInput(data) })

    return res.user
  },

  async Update(data: IUser): Promise<IUser> {
    const res = await apiService.request<{ user: IUser }>(UPDATE, { id: data.id, input: toInput(data) })

    return res.user
  },

  Delete(data: { id: string }): Promise<{ deleteUser: boolean }> {
    return apiService.request<{ deleteUser: boolean }>(DELETE, { id: data.id })
  },
}

export default UsersService
