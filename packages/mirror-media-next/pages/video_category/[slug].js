import errors from '@twreporter/errors'
import axios from 'axios'

import { GCP_PROJECT_ID, URL_RESTFUL_SERVER } from '../../config/index.mjs'
import CategoryVideos from '../../components/video_category/category-videos.js'
import { VIDEOHUB_CATEGORIES_PLAYLIST_MAPPING } from '../../constants/index.js'
import styled from 'styled-components'
import { fetchHeaderDataInDefaultPageLayout } from '../../utils/api/index.js'
import client from '../../apollo/apollo-client.js'
import { fetchCategory } from '../../apollo/query/categroies.js'
import { simplifyYoutubePlaylistVideo } from '../../utils/youtube.js'
import LeadingVideo from '../../components/shared/leading-video.js'
import Layout from '../../components/shared/layout.js'

const Wrapper = styled.div`
  width: 320px;
  margin: 0 auto;

  ${({ theme }) => theme.breakpoint.md} {
    width: 596px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    width: 1024px;
    padding: 0;
  }
`

/**
 *
 * @param {Object} props
 * @param {import('../../type/youtube.js').YoutubeVideo[]} props.videos
 * @param {string} props.ytNextPageToken
 * @param {Object} props.headerData
 * @param {Object} props.category
 * @returns
 */
export default function VideoCategory({
  videos,
  ytNextPageToken,
  headerData,
  category,
}) {
  const firstVideo = videos[0]
  const remainingVideos = videos.slice(1)
  return (
    <Layout
      head={{ title: `${category.name}影音` }}
      header={{ type: 'default', data: headerData }}
    >
      <Wrapper>
        <LeadingVideo
          video={firstVideo}
          title={category.name}
          slug={category.slug}
        />
        <CategoryVideos
          videoItems={remainingVideos}
          initialNextPageToken={ytNextPageToken}
        />
      </Wrapper>
    </Layout>
  )
}

export async function getServerSideProps({ query, req }) {
  const videoCategorySlug = query.slug
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
      url: `${URL_RESTFUL_SERVER}/youtube/playlistItems`,
      // use URLSearchParams to add two values for key 'part'
      params: new URLSearchParams([
        ['playlistId', VIDEOHUB_CATEGORIES_PLAYLIST_MAPPING[videoCategorySlug]],
        ['part', 'snippet'],
        ['part', 'status'],
        ['maxResults', '15'],
        ['pageToken', ''],
      ]),
    }),
    client.query({
      query: fetchCategory,
      variables: {
        categorySlug: videoCategorySlug,
      },
    }),
  ])

  const handledResponses = responses.map((response) => {
    if (response.status === 'fulfilled') {
      return response.value
    } else if (response.status === 'rejected') {
      const annotatingError = errors.helpers.wrap(
        response.reason,
        'UnhandledError',
        'Error occurs white getting video category page data'
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
      return
    }
  })

  const headerData =
    handledResponses[0] && 'sectionsData' in handledResponses[0]
      ? handledResponses[0]
      : { sectionsData: [], topicsData: [] }
  const sectionsData = Array.isArray(headerData.sectionsData)
    ? headerData.sectionsData
    : []
  const topicsData = Array.isArray(headerData.topicsData)
    ? headerData.topicsData
    : []

  const videos =
    handledResponses[1] && 'data' in handledResponses[1]
      ? simplifyYoutubePlaylistVideo(
          handledResponses[1]?.data?.items.filter(
            /**
             * @param {import('../section/videohub.js').YoutubeRawPlaylistVideo} item
             * @returns
             */
            (item) => item.status.privacyStatus === 'public'
          )
        )
      : []
  const ytNextPageToken =
    handledResponses[1] && 'data' in handledResponses[1]
      ? handledResponses[1]?.data?.nextPageToken
      : ''

  const category =
    handledResponses[2] && 'data' in handledResponses[2]
      ? handledResponses[2]?.data?.category
      : {}

  const props = {
    videos,
    ytNextPageToken,
    headerData: { sectionsData, topicsData },
    category,
  }

  return { props }
}
