const BASE_URL = 'https://gateway.marvel.com/v1/public'
const PUBLIC_KEY = '7be5920a96dd7af2151ae226015971b9'

export interface RequestConfig {
  path: string
  queryParams?: any
}

export async function request<T>(config: RequestConfig): Promise<T> {
  const queryParams = config.queryParams ? `?${new URLSearchParams(config.queryParams)}` : ''

  
  const response = await fetch(`${BASE_URL}${config.path}${queryParams}&apikey=${PUBLIC_KEY}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  
  if (response.status === 401 || response.status === 403) throw new Error('Error')

  const data = await response.json()

  if (response.ok) return data.data.results
  else throw new Error('Error')
}