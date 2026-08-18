import { ref } from 'vue'

export function useGql() {
  const data = ref()
  const error = ref('')

  async function run(query: string) {
    error.value = ''
    try {
      const res = await fetch('https://graphqlzero.almansi.me/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      const json = await res.json()
      error.value = json.errors
      data.value = json.data
    } catch (e) {
      error.value = String(e)
    }
  }

  return { data, error, run }
}
