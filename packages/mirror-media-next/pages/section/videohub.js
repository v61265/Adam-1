import errors from '@twreporter/errors'

import { GCP_PROJECT_ID } from '../../config/index.mjs'
import { VIDEOHUB_CATEGORIES_PLAYLIST_MAPPING } from '../../constants'
import { fetchHeaderDataInDefaultPageLayout } from '../../utils/api/index.js'
import styled from 'styled-components'
import VideoList from '../../components/section/videohub/video-list.js'
import SubscribeChannels from '../../components/section/videohub/subscribe-channels.js'
import {
  simplifyYoutubePlaylistVideo,
  simplifyYoutubeSearchedVideo,
  simplifyYoutubeVideo,
} from '../../utils/youtube.js'
import LeadingVideo from '../../components/shared/leading-video.js'
import Layout from '../../components/shared/layout.js'
import {
  fetchVideohubSection,
  fetchYoutubeHighestViewCountInOneWeek,
  fetchYoutubeLatestVideos,
  fetchYoutubePlaylistByChannelId,
  fetcYoutubeVideoForFullDescription,
} from '../../utils/api/section-videohub'

/**
 * @typedef {import('../../type/youtube.js').YoutubeRawPlaylistVideo} YoutubeRawPlaylistVideo
 * @typedef {import('../../type/youtube.js').YoutubeRawSearchedVideo} YoutubeRawSearchedVideo
 * @typedef {import('../../type/youtube.js').YoutubeVideo} YoutubeVideo
 *
 * @typedef {Object} PlaylistVideo
 * @property {YoutubeVideo[]} items
 * @property {string} name
 * @property {string} slug
 */

const Wrapper = styled.main`
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
 * @param {Object} props
 * @param {YoutubeVideo} props.highestViewCountVideo
 * @param {YoutubeVideo[]} props.latestVideos
 * @param {PlaylistVideo[]} props.playlistsVideos
 * @param {Object} props.headerData
 * @returns {React.ReactElement}
 */
export default function SectionVideohub({
  highestViewCountVideo,
  latestVideos,
  playlistsVideos,
  headerData,
}) {
  const hasHVCVideo = Object.keys(highestViewCountVideo).length > 0
  const hasLatestVideo = latestVideos.length > 0
  return (
    <Layout
      head={{ title: `影音` }}
      header={{ type: 'default', data: headerData }}
      footer={{ type: 'default' }}
    >
      <Wrapper>
        {hasHVCVideo && (
          <LeadingVideo video={highestViewCountVideo} title="熱門影片" />
        )}
        {hasLatestVideo && <VideoList videos={latestVideos} name="最新影片" />}
        <SubscribeChannels />
        {playlistsVideos.map((playlistsVideo) => (
          <VideoList
            key={playlistsVideo.slug}
            videos={playlistsVideo.items}
            name={playlistsVideo.name}
            slug={playlistsVideo.slug}
          />
        ))}
      </Wrapper>
    </Layout>
  )
}

export async function getServerSideProps({ query, req }) {
  const mockError = query.error === '500'

  const traceHeader = req.headers?.['x-cloud-trace-context']
  let globalLogFields = {}
  if (traceHeader && !Array.isArray(traceHeader)) {
    const [trace] = traceHeader.split('/')
    globalLogFields[
      'logging.googleapis.com/trace'
    ] = `projects/${GCP_PROJECT_ID}/traces/${trace}`
  }

  let responses = await Promise.allSettled([
    fetchHeaderDataInDefaultPageLayout(),
    fetchYoutubeHighestViewCountInOneWeek(),
    fetchYoutubeLatestVideos(),
    fetchVideohubSection(),
  ])

  let handledResponses = responses.map((response) => {
    if (response.status === 'fulfilled') {
      if ('data' in response.value) {
        // retrieve data for simple axios and gql request
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

  let highestViewCountVideo = handledResponses[1]?.items
    ? simplifyYoutubeSearchedVideo(handledResponses[1]?.items)[0]
    : {}

  const latestVideos = handledResponses[2]?.items
    ? simplifyYoutubeSearchedVideo(handledResponses[2]?.items)
    : []

  const categories = handledResponses[3]?.section?.categories
    ? handledResponses[3]?.section?.categories
    : []

  const channelIds = categories.map(
    (category) => VIDEOHUB_CATEGORIES_PLAYLIST_MAPPING[category.slug]
  )

  const playlistResponses = await Promise.allSettled([
    // fetch highest view count with youtube/videos to get full snippet.description
    // cause in youtube/search we only receieve truncated one
    highestViewCountVideo.id
      ? fetcYoutubeVideoForFullDescription(highestViewCountVideo.id)
      : Promise.resolve({}),
    ...channelIds.map((channelId) =>
      fetchYoutubePlaylistByChannelId(channelId)
    ),
  ])
  const handledPlaylistResponses = playlistResponses.map((response) => {
    if (response.status === 'fulfilled') {
      return response.value.data
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

  highestViewCountVideo = handledPlaylistResponses[0]?.items
    ? simplifyYoutubeVideo(handledPlaylistResponses[0]?.items)[0]
    : highestViewCountVideo

  const playlistsVideos = categories.map((category, index) => ({
    ...category,
    items: simplifyYoutubePlaylistVideo(
      handledPlaylistResponses[index + 1]?.items
        ? handledPlaylistResponses[index + 1].items
            ?.filter((item) => item.status.privacyStatus === 'public')
            .slice(0, 4)
        : []
    ),
  }))

  const props = mockError
    ? {
        highestViewCountVideo: {},
        latestVideos: [],
        playlistsVideos: [],
        headerData: { sectionsData, topicsData },
      }
    : {
        highestViewCountVideo,
        latestVideos,
        playlistsVideos,
        headerData: { sectionsData, topicsData },
      }

  return { props }
}
