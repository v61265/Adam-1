import errors from '@twreporter/errors'
import styled from 'styled-components'

import WarmLifeArticles from '../../components/externals/warmlife-articles'
import {
  GCP_PROJECT_ID,
  API_TIMEOUT,
  URL_STATIC_EXTERNALS_WARMLIFE,
} from '../../config/index.mjs'
import { fetchHeaderDataInDefaultPageLayout } from '../../utils/api'
import Layout from '../../components/shared/layout'
import axios from 'axios'

const RENDER_PAGE_SIZE = 12
const WARM_LIFE_DEFAULT_TITLE = `生活暖流`
const WARM_LIFE_DEFAULT_COLOR = 'lightBlue'

/**
 * @typedef {import('../../type/theme').Theme} Theme
 */

const WarmLifeContainer = styled.main`
  width: 320px;
  margin: 0 auto;

  ${({ theme }) => theme.breakpoint.md} {
    width: 672px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    width: 1024px;
    padding: 0;
  }
`
const WarmLifeTitle = styled.h1`
  margin: 20px 0 16px 16px;
  font-size: 16px;
  line-height: 1.15;
  font-weight: 500;

  color: ${({ theme }) => theme.color.brandColor[WARM_LIFE_DEFAULT_COLOR]};

  ${({ theme }) => theme.breakpoint.md} {
    margin: 20px 0 24px;
    font-size: 20.8px;
    font-weight: 600;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    margin: 24px 0 28px;
    font-size: 28px;
  }
`

/**
 * @typedef {import('../../apollo/fragments/external').ListingExternal} ListingExternal
 */

/**
 * @param {Object} props
 * @param {ListingExternal[]} props.warmLifeData
 * @param {Object} props.headerData
 * @returns {React.ReactElement}
 */
export default function WarmLife({ warmLifeData, headerData }) {
  return (
    <Layout
      head={{ title: `${WARM_LIFE_DEFAULT_TITLE}分類報導` }}
      header={{ type: 'default', data: headerData }}
      footer={{ type: 'default' }}
    >
      <WarmLifeContainer>
        <WarmLifeTitle>{WARM_LIFE_DEFAULT_TITLE}</WarmLifeTitle>
        <WarmLifeArticles
          warmLifeExternals={warmLifeData}
          renderPageSize={RENDER_PAGE_SIZE}
        />
      </WarmLifeContainer>
    </Layout>
  )
}

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps({ req }) {
  const traceHeader = req.headers?.['x-cloud-trace-context']
  let globalLogFields = {}
  if (traceHeader && !Array.isArray(traceHeader)) {
    const [trace] = traceHeader.split('/')
    globalLogFields[
      'logging.googleapis.com/trace'
    ] = `projects/${GCP_PROJECT_ID}/traces/${trace}`
  }

  const responses = await Promise.allSettled([
    fetchHeaderDataInDefaultPageLayout(),
    axios({
      method: 'get',
      url: URL_STATIC_EXTERNALS_WARMLIFE,
      timeout: API_TIMEOUT,
    }),
  ])

  const handledResponses = responses.map((response) => {
    if (response.status === 'fulfilled') {
      return response.value
    } else if (response.status === 'rejected') {
      const { graphQLErrors, clientErrors, networkError } = response.reason
      const annotatingError = errors.helpers.wrap(
        response.reason,
        'UnhandledError',
        'Error occurs while getting section page data'
      )

      console.log(
        JSON.stringify({
          severity: 'ERROR',
          message: errors.helpers.printAll(
            annotatingError,
            {
              withStack: true,
              withPayload: true,
            },
            0,
            0
          ),
          debugPayload: {
            graphQLErrors,
            clientErrors,
            networkError,
          },
          ...globalLogFields,
        })
      )
      return
    }
  })

  const headerData =
    'sectionsData' in handledResponses[0]
      ? handledResponses[0]
      : {
          sectionsData: [],
          topicsData: [],
        }

  const sectionsData = Array.isArray(headerData.sectionsData)
    ? headerData.sectionsData
    : []
  const topicsData = Array.isArray(headerData.topicsData)
    ? headerData.topicsData
    : []

  const warmLifeData =
    responses[1].status === 'fulfilled' && responses[1].value?.data
      ? responses[1].value?.data._items || []
      : []

  /** @type {ListingExternal[]} */
  const filterWarmLifeData = warmLifeData.map((item) => ({
    id: item._id || '',
    title: item.title || '',
    slug: item.name || '',
    thumb: item.thumb || '',
    brief: item.brief || '',
    partner:
      {
        id: item.partner._id,
        name: item.partner.display,
        slug: item.partner.name,
      } || null,
  }))

  const props = {
    warmLifeData: filterWarmLifeData,
    headerData: { sectionsData, topicsData },
  }

  return { props }
}
