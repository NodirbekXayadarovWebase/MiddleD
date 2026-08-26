import type { IUser, IUserFilter, IUserItem } from '@/pages/query/users/type'
import type { GetListResponse } from '@/types/common'
import { gql } from '@apollo/client'
import apiService from '@/services/api.service'

const LIST = gql`
  query ($options: PageQueryOptions) {
    users(options: $options) {
      data { id name username phone }
      meta { totalCount }
    }
  }
`

const GET_BY_ID = gql`
  query ($id: ID!) {
    user(id: $id) { name username email phone website }
  }
`

const CREATE = gql`
  mutation ($input: CreateUserInput!) {
    user: createUser(input: $input) { name username email phone website }
  }
`

const UPDATE = gql`
  mutation ($id: ID!, $input: UpdateUserInput!) {
    user: updateUser(id: $id, input: $input) { name username email phone website }
  }
`

const DELETE = gql`
  mutation ($id: ID!) {
    deleteUser(id: $id)
  }
`

const UsersService = {
  async GetList(filter: IUserFilter): Promise<GetListResponse<IUserItem>> {
    const options = {
      search: filter.search ? { q: filter.search } : undefined,
      paginate: { page: filter.page, limit: filter.pageSize },
    }

    const data = await apiService.query<{
      users: { data: IUserItem[]; meta: { totalCount: number } }
    }>(LIST, { options })

    return { rows: data.users.data, total: data.users.meta.totalCount }
  },

  async GetById(id: string): Promise<IUser> {
    const data = await apiService.query<{ user: IUser }>(GET_BY_ID, { id })

    return data.user
  },

  async Create(input: IUser): Promise<IUser> {
    const res = await apiService.mutate<{ user: IUser }>(CREATE, { input })

    return res.user
  },

  async Update(id: string, input: IUser): Promise<IUser> {
    const res = await apiService.mutate<{ user: IUser }>(UPDATE, { id, input })

    return res.user
  },

  Delete(data: { id: string }): Promise<{ deleteUser: boolean }> {
    return apiService.mutate<{ deleteUser: boolean }>(DELETE, { id: data.id })
  },
}

export default UsersService
