import errors from '@twreporter/errors'
import styled from 'styled-components'

import client from '../../apollo/apollo-client'
import { fetchTopics } from '../../apollo/query/topics'
import SectionTopics from '../../components/section/topic/section-topics'
import { GCP_PROJECT_ID } from '../../config/index.mjs'
import { fetchHeaderDataInDefaultPageLayout } from '../../utils/api'
import ShareHeader from '../../components/shared/share-header'
import Footer from '../../components/footer'

/**
 * @typedef {import('../../type/theme').Theme} Theme
 */

const TopicsContainer = styled.main`
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
const TopicsTitle = styled.h1`
  margin: 20px 0 16px 16px;
  font-size: 16px;
  line-height: 1.15;
  font-weight: 500;
  color: ${
    /**
     * @param {Object} props
     * @param {Theme} [props.theme]
     */
    ({ theme }) => theme.color.brandColor.lightBlue
  };
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

const RENDER_PAGE_SIZE = 12

/**
 * @typedef {import('../../components/section/topic/section-topics').Topic} Topic
 */

/**
 * @param {Object} props
 * @param {Topic[]} props.topics
 * @param {number} props.topicsCount
 * @param {Object} props.headerData
 * @returns {React.ReactElement}
 */
export default function Topics({ topics, topicsCount, headerData }) {
  return (
    <>
      <ShareHeader pageLayoutType="default" headerData={headerData} />
      <TopicsContainer>
        <TopicsTitle>精選專區</TopicsTitle>
        <SectionTopics
          topicsCount={topicsCount}
          topics={topics}
          renderPageSize={RENDER_PAGE_SIZE}
        />
      </TopicsContainer>
      <Footer />
    </>
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
    client.query({
      query: fetchTopics,
      variables: {
        take: RENDER_PAGE_SIZE * 2,
        skip: 0,
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
        filter: { state: { equals: 'published' } },
      },
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
        'Error occurs while getting section/topic page data'
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
      : { sectionsData: [], topicsData: [] }
  const sectionsData = Array.isArray(headerData.sectionsData)
    ? headerData.sectionsData
    : []
  const topicsData = Array.isArray(headerData.topicsData)
    ? headerData.topicsData
    : []
  /** @type {number} */
  const topicsCount =
    'data' in handledResponses[1]
      ? handledResponses[1]?.data?.topicsCount || 0
      : 0
  /** @type {Topic[]} */
  const topics =
    'data' in handledResponses[1] ? handledResponses[1]?.data?.topics || [] : []

  const props = {
    topics,
    topicsCount,
    headerData: { sectionsData, topicsData },
  }

  return { props }
}
