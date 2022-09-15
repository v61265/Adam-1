import CORS from 'cors'
import { CORS_ORIGINS } from '../../config'
import globalAPICall from '../../utils/api/global-api-call'
import { runMiddleware } from '../../utils/api/share'
import { getSearchResult } from '../../utils/api/programmable-search'

const cors = CORS({
  methods: ['HEAD', 'GET'],
  origin: CORS_ORIGINS,
})

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)

  async function GET() {
    const result = await getSearchResult(req.query)

    if (typeof result === 'string') {
      res.status(400).json({ message: result })
    } else {
      res.status(200).json(result.data)
    }
  }

  await globalAPICall(req, res, { GET })
}
