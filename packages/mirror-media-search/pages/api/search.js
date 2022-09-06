import CORS from 'cors'
import { number, object, string } from 'yup'
import axios from 'axios'
import { CORS_ORIGINS } from '../../config'
import globalAPICall from '../../utils/api/globalAPICall'
import { runMiddleware } from '../../utils/api/share'
import {
  URL_PROGRAMABLE_SEARCH,
  PROGRAMABLE_SEARCH_API_KEY,
  PROGRAMABLE_SEARCH_ENGINE_ID,
  API_TIMEOUT,
} from '../../config'

const cors = CORS({
  methods: ['HEAD', 'GET'],
  origin: CORS_ORIGINS,
})

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)

  async function GET() {
    const result = await getSearchResult(req)

    if (typeof result === 'string') {
      res.status(400).json({ message: result })
    } else {
      res.status(200).json(result.data)
    }
  }

  await globalAPICall(req, res, { GET })
}

const searchQuerySchema = object({
  query: string().required(),
  start: number().optional().integer().positive().max(91),
  take: number().optional().integer().default(10).max(10).min(1),
})

async function getSearchResult(req) {
  try {
    const params = await searchQuerySchema.validate(req.query, {
      stripUnknown: true,
    })

    const queryParams = {
      key: PROGRAMABLE_SEARCH_API_KEY,
      cx: PROGRAMABLE_SEARCH_ENGINE_ID,
      q: params.query,
      start: params.start,
      num: params.take,
    }

    console.log(`search ${URL_PROGRAMABLE_SEARCH}`, queryParams)
    const response = await axios({
      method: 'get',
      url: `${URL_PROGRAMABLE_SEARCH}`,
      params: queryParams,
      timeout: API_TIMEOUT,
    })

    return response
  } catch (error) {
    console.log(JSON.stringify({ severity: 'ERROR', message: error.stack }))
    return error.message
  }
}
