import axios from 'axios'
import Redis from 'ioredis'
import { number, object, string } from 'yup'
import {
  URL_PROGRAMABLE_SEARCH,
  PROGRAMABLE_SEARCH_API_KEY,
  PROGRAMABLE_SEARCH_ENGINE_ID,
  API_TIMEOUT,
  REDIS_EX,
  REDIS_AUTH,
  READ_REDIS_HOST,
  WRITE_REDIS_HOST,
} from '../../config'
import {
  PROGRAMABLE_SEARCH_LIMIT_START,
  PROGRAMABLE_SEARCH_NUM,
} from '../programmable-search/const'

const readRedis = new Redis({ host: READ_REDIS_HOST, password: REDIS_AUTH })
const writeRedis = new Redis({ host: WRITE_REDIS_HOST, password: REDIS_AUTH })

const searchQuerySchema = object({
  exactTerms: string().required(),
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

    const takeAmount = params.takeAmount || query.takeAmount || 10
    const exactTerms = params.exactTerms || query.exactTerms || 10
    let startIndex = params.start || query.start || 1

    let combinedResponse

    const allItems = []

    while (allItems.length < takeAmount) {
      const queryParams = {
        key: PROGRAMABLE_SEARCH_API_KEY,
        cx: PROGRAMABLE_SEARCH_ENGINE_ID,
        exactTerms: exactTerms,
        start: startIndex,
        num: Math.min(takeAmount - allItems.length, 10), // 每次最多取 10 個
        sort: ' ,date:s',
      }

      const prefix = 'PROGRAMABLE_SEARCH'
      const redisKey = `${prefix}_${exactTerms}_${startIndex}_${Math.min(
        takeAmount - allItems.length,
        10
      )}`
      const searchResultCache = await readRedis.get(redisKey)

      if (searchResultCache) {
        console.log(
          JSON.stringify({
            severity: 'DEBUG',
            message: `Get search result from redis cache with key ${redisKey}`,
          })
        )
        if (!combinedResponse) {
          combinedResponse = JSON.parse(searchResultCache)
        } else if (JSON.parse(searchResultCache).items) {
          allItems.push(...JSON.parse(searchResultCache).items)
        }
      } else {
        const { data } = await axios({
          method: 'get',
          url: `${URL_PROGRAMABLE_SEARCH}`,
          params: queryParams,
          timeout: API_TIMEOUT,
        })
        writeRedis.set(redisKey, JSON.stringify(data), 'EX', REDIS_EX)
        if (!combinedResponse) {
          combinedResponse = data
        } else if (data.items) {
          allItems.push(...data.items)
        }
        if (
          allItems.length >= takeAmount ||
          data.queries.nextPage === undefined
        ) {
          break
        }
      }

      // 更新開始索引，搜尋下一批結果
      startIndex += 10
    }

    if (combinedResponse) {
      combinedResponse.items = allItems
    }

    return { data: combinedResponse }
  } catch (error) {
    console.log(JSON.stringify({ severity: 'ERROR', message: error.stack }))
    return error.message
  }
}
