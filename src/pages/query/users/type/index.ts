import type { BaseFilter } from '@/types/common'

export interface IUserItem {
  id: string
  name: string
  username: string
  phone: string
}

export interface IUser {
  id: string
  name: string
  username: string
  phone: string
  website: string
}

export interface IUserFilter extends BaseFilter {}
