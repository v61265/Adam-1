import errors from '@twreporter/errors'

import { GCP_PROJECT_ID } from '../../config/index.mjs'
import CategoryVideos from '../../components/video_category/category-videos.js'
import { VIDEOHUB_CATEGORIES_PLAYLIST_MAPPING } from '../../constants/index.js'
import styled from 'styled-components'
import { fetchHeaderDataInDefaultPageLayout } from '../../utils/api/index.js'
import { simplifyYoutubePlaylistVideo } from '../../utils/youtube.js'
import LeadingVideo from '../../components/shared/leading-video.js'
import Layout from '../../components/shared/layout.js'
import {
  fetchVideoCategory,
  fetchYoutubePlaylistByPlaylistId,
} from '../../utils/api/video-category.js'

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
  const hasMoreThanOneVideo = videos.length > 1
  const firstVideo = videos[0]
  const remainingVideos = videos.slice(1)
  const categoryName = category.name || ''
  return (
    <Layout
      head={{ title: `${categoryName}影音` }}
      header={{ type: 'default', data: headerData }}
      footer={{ type: 'default' }}
    >
      <Wrapper>
        <LeadingVideo
          video={firstVideo}
          title={categoryName}
          slug={category.slug}
        />
        {hasMoreThanOneVideo && (
          <CategoryVideos
            videoItems={remainingVideos}
            initialNextPageToken={ytNextPageToken}
            categorySlug={category.slug}
          />
        )}
      </Wrapper>
    </Layout>
  )
}

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps({ query, req }) {
  const videoCategorySlug = Array.isArray(query.slug)
    ? query.slug[0]
    : query.slug
  const mockError = query.error === '500'

  const traceHeader = req.headers?.['x-cloud-trace-context']
  let globalLogFields = {}
  if (traceHeader && !Array.isArray(traceHeader)) {
    const [trace] = traceHeader.split('/')
    globalLogFields[
      'logging.googleapis.com/trace'
    ] = `projects/${GCP_PROJECT_ID}/traces/${trace}`
  }

  const playlistId = VIDEOHUB_CATEGORIES_PLAYLIST_MAPPING[videoCategorySlug]

  if (!playlistId) {
    console.log(
      JSON.stringify({
        severity: 'WARNING',
        message: `video_category page got unknown slug ${videoCategorySlug}, redirect back to section/videohub`,
        globalLogFields,
      })
    )
    return {
      redirect: {
        destination: '/section/videohub',
        permanent: false,
      },
    }
  }

  const responses = await Promise.allSettled([
    fetchHeaderDataInDefaultPageLayout(),
    fetchYoutubePlaylistByPlaylistId(playlistId),
    fetchVideoCategory(videoCategorySlug),
  ])

  const handledResponses = responses.map((response) => {
    if (response.status === 'fulfilled') {
      if ('data' in response.value) {
        // handle simple axios and gql response
        return response.value.data
      }
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

  // handle header data
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

  // handle fetch videos and get nextPageToken for infinite scroll

  if (handledResponses[1]?.items?.length === 0) {
  }
  const videos = handledResponses[1]?.items
    ? simplifyYoutubePlaylistVideo(
        handledResponses[1]?.items.filter(
          /**
           * @param {import('../section/videohub.js').YoutubeRawPlaylistVideo} item
           * @returns
           */
          (item) => item.status.privacyStatus === 'public'
        )
      )
    : []
  const ytNextPageToken = handledResponses[1]?.nextPageToken || ''

  const category = handledResponses[2]?.category || { slug: videoCategorySlug }

  const props = mockError
    ? {
        videos: [],
        ytNextPageToken: '',
        headerData: { sectionsData, topicsData },
        category: { slug: videoCategorySlug },
      }
    : {
        videos,
        ytNextPageToken,
        headerData: { sectionsData, topicsData },
        category,
      }

  return { props }
}
