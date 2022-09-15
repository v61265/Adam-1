import axios from 'axios'
import Redis from 'ioredis'
import { number, object, string } from 'yup'
import {
  URL_PROGRAMABLE_SEARCH,
  PROGRAMABLE_SEARCH_API_KEY,
  PROGRAMABLE_SEARCH_ENGINE_ID,
  API_TIMEOUT,
  REDIS_EX,
  REDIS_HOST,
  REDIS_AUTH,
} from '../../config'
import {
  PROGRAMABLE_SEARCH_LIMIT_START,
  PROGRAMABLE_SEARCH_NUM,
} from '../programmable-search/const'

const redis = new Redis({ host: REDIS_HOST, password: REDIS_AUTH })

const searchQuerySchema = object({
  query: string().required(),
  start: number()
    .optional()
    .integer()
    .positive()
    .max(PROGRAMABLE_SEARCH_LIMIT_START),
  take: number()
    .optional()
    .integer()
    .default(PROGRAMABLE_SEARCH_NUM)
    .max(PROGRAMABLE_SEARCH_NUM)
    .min(1),
})

export async function getSearchResult(query) {
  try {
    const params = await searchQuerySchema.validate(query, {
      stripUnknown: true,
    })

    const queryParams = {
      key: PROGRAMABLE_SEARCH_API_KEY,
      cx: PROGRAMABLE_SEARCH_ENGINE_ID,
      q: params.query,
      start: params.start,
      num: params.take,
    }

    const prefix = 'PROGRAMABLE_SEARCH'
    const redisKey = `${prefix}_${queryParams.q}_${queryParams.start}_${queryParams.num}`
    const searchResultCache = await redis.get(redisKey)

    if (searchResultCache) {
      console.log(
        JSON.stringify({
          severity: 'DEBUG',
          message: `Get search result from redis cache with key ${redisKey}`,
        })
      )
      return { data: JSON.parse(searchResultCache) }
    } else {
      const response = await axios({
        method: 'get',
        url: `${URL_PROGRAMABLE_SEARCH}`,
        params: queryParams,
        timeout: API_TIMEOUT,
      })
      redis.set(redisKey, JSON.stringify(response.data), 'EX', REDIS_EX)
      return response
    }
  } catch (error) {
    console.log(JSON.stringify({ severity: 'ERROR', message: error.stack }))
    return error.message
  }
}
