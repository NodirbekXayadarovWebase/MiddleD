import type { DocumentNode } from '@apollo/client'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { RemoveTypenameFromVariablesLink } from '@apollo/client/link/remove-typename'
import { message } from '@/utils/message'

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    new RemoveTypenameFromVariablesLink(),
    new HttpLink({ uri: import.meta.env.VITE_API_BASE_URL}),
  ]),
  cache: new InMemoryCache(),
})

function notify(error: unknown): never {
  message.error(error instanceof Error ? error.message : String(error))
  throw error
}

const apiService = {
  async query<T>(query: DocumentNode, variables?: Record<string, unknown>): Promise<T> {
    try {
      const { data } = await apolloClient.query<T>({ query, variables, fetchPolicy: 'network-only' })

      return data as T
    } catch (error) {
      notify(error)
    }
  },

  async mutate<T>(mutation: DocumentNode, variables?: Record<string, unknown>): Promise<T> {
    try {
      const { data } = await apolloClient.mutate<T>({ mutation, variables })

      return data as T
    } catch (error) {
      notify(error)
    }
  },
}

export default apiService
