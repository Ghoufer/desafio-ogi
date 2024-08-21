import { request, RequestConfig } from 'src/utils/fetcher'
import { Character } from './MarvelApi.types'

export const getCharacters = async ({ path, queryParams }: RequestConfig): Promise<Character[]> => {
  return await request({ path, queryParams })
}
