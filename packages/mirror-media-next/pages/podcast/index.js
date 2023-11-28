import errors from '@twreporter/errors'
import styled from 'styled-components'
import Layout from '../../components/shared/layout'
import { ENV, GCP_PROJECT_ID } from '../../config/index.mjs'
import {
  fetchHeaderDataInDefaultPageLayout,
  fetchPodcastList,
} from '../../utils/api'
import { setPageCache } from '../../utils/cache-setting'

/**
 * @typedef {import('../../components/shared/share-header').HeaderData} HeaderData
 */

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 46px;
`

const Title = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #054f77;
  padding: 28px 0 8px;

  ${({ theme }) => theme.breakpoint.xl} {
    font-weight: 700;
    font-size: 28px;
    padding: 41px 0 12px;
  }
`

/**
 * @typedef {Object} Enclosure
 * @property {string} url
 * @property {number} file_size
 * @property {string} mime_type
 */

/**
 * @typedef {Object} PodcastData
 * @property {string} published
 * @property {string} author
 * @property {string} description
 * @property {string} heroImage
 * @property {Enclosure[]} enclosures
 * @property {string} link
 * @property {string} guid
 * @property {string} title
 * @property {string} duration
 */

/**
 * @typedef {Object} Props
 * @property {Object} headerData
 * @property {PodcastData[]} podcastListData
 */

/**
 * @param {Props} props
 * @returns {React.ReactElement}
 */

export default function Podcast({ headerData, podcastListData }) {
  console.log(podcastListData)
  return (
    <Layout
      head={{ title: 'Podcasts' }}
      header={{ type: 'default', data: headerData }}
      footer={{ type: 'default' }}
    >
      <PageWrapper>
        <Title>Podcast</Title>
      </PageWrapper>
    </Layout>
  )
}

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps({ req, res }) {
  if (ENV === 'prod') {
    setPageCache(res, { cachePolicy: 'max-age', cacheTime: 600 }, req.url)
  } else {
    setPageCache(res, { cachePolicy: 'no-store' }, req.url)
  }

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
    fetchPodcastList(),
  ])

  const handledResponses = responses.map((response, index) => {
    if (response.status === 'fulfilled') {
      return response.value
    } else if (response.status === 'rejected') {
      const statusCode = response.reason.response?.status

      const annotatingError = errors.helpers.wrap(
        response.reason,
        'UnhandledError',
        'Error occurs while getting podcast list data'
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
          ...globalLogFields,
        })
      )
      if (index === 1) {
        if (statusCode === 404) {
          // leave undefined to be checked and redirect to 404
          return
        } else {
          // fetch key data (posts) failed, redirect to 500
          throw new Error('fetch podcast list failed')
        }
      }
      return
    }
  })

  // handle header data
  const headerData =
    handledResponses[0] && 'sectionsData' in handledResponses[0]
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

  // Extracting podcast list data
  const podcastListData =
    responses[1].status === 'fulfilled' ? responses[1].value.data || [] : []

  const props = {
    headerData: { sectionsData, topicsData },
    podcastListData: podcastListData,
  }

  return { props }
}
