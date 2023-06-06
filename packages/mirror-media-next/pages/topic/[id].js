import errors from '@twreporter/errors'

import client from '../../apollo/apollo-client'
import axios from 'axios'

import { fetchTopic } from '../../apollo/query/topics'
import { GCP_PROJECT_ID } from '../../config/index.mjs'
import TopicList from '../../components/topic/list/topic-list'
import TopicGroup from '../../components/topic/group/topic-group'
import { fetchHeaderDataInDefaultPageLayout } from '../../utils/api'
import Layout from '../../components/shared/layout'
import { parseUrl } from '../../utils/topic'
import { convertDraftToText, getResizedUrl } from '../../utils/index'

const RENDER_PAGE_SIZE = 12

/**
 * @typedef {import('../../components/topic/list/topic-list').SlideshowItem} SlideshowItem
 * @typedef {import('../../components/topic/list/topic-list').Topic} Topic
 */

/**
 * @param {Object} props
 * @param {Topic} props.topic
 * @param {SlideshowItem[]} props.slideshowData
 * @param {Object} props.headerData
 * @returns
 */
export default function Topic({ topic, slideshowData, headerData }) {
  let topicJSX
  switch (topic.type) {
    case 'list':
      topicJSX = (
        <TopicList
          topic={topic}
          renderPageSize={RENDER_PAGE_SIZE}
          slideshowData={slideshowData}
        />
      )
    case 'group':
      topicJSX = <TopicGroup topic={topic} />
    default:
      topicJSX = (
        <TopicList
          topic={topic}
          renderPageSize={RENDER_PAGE_SIZE}
          slideshowData={[]}
        />
      )
  }

  return (
    <Layout
      head={{
        title: `${topic?.name}`,
        // fallback to undefined if text is empty string or falsy value
        description:
          topic?.og_description ||
          convertDraftToText(topic?.brief) ||
          undefined,
        imageUrl:
          getResizedUrl(topic?.og_image?.resized) || parseUrl(topic?.style),
      }}
      header={{ type: 'default', data: headerData }}
      footer={{ type: 'default' }}
    >
      {topicJSX}
    </Layout>
  )
}

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps({ query, req }) {
  const topicId = query.id
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
      query: fetchTopic,
      variables: {
        topicFilter: { id: topicId },
        postsFilter: { state: { equals: 'published' } },
        postsOrderBy: [{ isFeatured: 'desc' }, { publishedDate: 'desc' }],
        postsTake: RENDER_PAGE_SIZE,
        postsSkip: 0,
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
        'Error occurs while getting topic page data'
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
  /** @type {Topic} */
  const topic =
    'data' in handledResponses[1] ? handledResponses[1]?.data?.topic || {} : {}
  /** @type {SlideshowItem[]} */
  let slideshowData = []
  if (topic && topic.leading === 'slideshow') {
    // mm 2.0 fetch way, need to be changed to query mm k6 directly
    const { data } = await axios({
      method: 'get',
      url: 'http://104.199.190.189:8080/images?where=%7B%22topics%22%3A%7B%22%24in%22%3A%5B%225a30e6ae4be59110005c5e6b%22%5D%7D%7D&max_results=25',
      timeout: 1500,
    })
    slideshowData = data?._items
  }

  /**
   * load all group articles at once
   * (potential performance [issue](https://nextjs.org/docs/messages/large-page-data))
   * might need to optimize to load more on client side in next phase
   */
  if (topic && topic.type === 'group' && topic.postsCount > RENDER_PAGE_SIZE) {
    let posts = topic.posts
    while (posts.length < topic.postsCount) {
      const topicData = await client.query({
        query: fetchTopic,
        variables: {
          topicFilter: { id: topicId },
          postsFilter: { state: { equals: 'published' } },
          postsOrderBy: [{ isFeatured: 'desc' }, { publishedDate: 'desc' }],
          postsTake: RENDER_PAGE_SIZE,
          postsSkip: posts.length,
        },
      })
      /** @type {Topic} */
      const newTopic = topicData.data.topic
      posts = [...posts, ...newTopic.posts]
    }
    topic.posts = posts
  }

  const props = {
    topic,
    slideshowData,
    headerData: { sectionsData, topicsData },
  }

  return { props }
}
