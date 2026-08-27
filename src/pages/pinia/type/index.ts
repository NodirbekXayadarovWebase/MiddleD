export interface IPost {
  id: number
  userId: number
  title: string
  body: string
}

export interface IPostFilter {
  q: string
  _page: number
  _limit: number
}
