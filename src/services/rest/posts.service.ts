import type { IPost, IPostFilter } from '@/pages/pinia/type'
import type { GetListResponse } from '@/types/common'
import httpService from '@/services/http.service'

const BASE_URL = '/posts'

const PostsService = {
  GetList(data: IPostFilter): Promise<GetListResponse<IPost>> {
    return httpService.getList<IPost>(BASE_URL, data)
  },

  GetById(id: number): Promise<IPost> {
    return httpService.get(`${BASE_URL}/${id}`)
  },

  Delete(data: { id: number }): Promise<unknown> {
    return httpService.delete(`${BASE_URL}/${data.id}`)
  },
}

export default PostsService
