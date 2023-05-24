import errors from '@twreporter/errors'
import axios from 'axios'

import { GCP_PROJECT_ID, URL_RESTFUL_SERVER } from '../../config/index.mjs'
import { VIDEOHUB_CATEGORIES_PLAYLIST_MAPPING } from '../../constants'
import client from '../../apollo/apollo-client.js'
import { fetchSectionWithCategory } from '../../apollo/query/sections.js'
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
  return (
    <Layout
      head={{ title: `影音` }}
      header={{ type: 'default', data: headerData }}
    >
      <Wrapper>
        <LeadingVideo video={highestViewCountVideo} title="熱門影片" />
        <VideoList videos={latestVideos} name="最新影片" />
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

export async function getServerSideProps({ req }) {
  const traceHeader = req.headers?.['x-cloud-trace-context']
  let globalLogFields = {}
  if (traceHeader && !Array.isArray(traceHeader)) {
    const [trace] = traceHeader.split('/')
    globalLogFields[
      'logging.googleapis.com/trace'
    ] = `projects/${GCP_PROJECT_ID}/traces/${trace}`
  }

  const date = new Date()
  // 1 week ago
  date.setDate(date.getDate() - 7)
  const oneWeekAgoTS = date.toISOString()

  let responses = await Promise.allSettled([
    fetchHeaderDataInDefaultPageLayout(),
    axios({
      method: 'get',
      url: `${URL_RESTFUL_SERVER}/youtube/search`,
      params: new URLSearchParams([
        ['channelId', 'UCYkldEK001GxR884OZMFnRw'],
        ['part', 'snippet'],
        ['order', 'viewCount'],
        ['maxResults', '1'],
        ['publishedAfter', oneWeekAgoTS],
        ['type', 'video'],
      ]),
    }),
    axios({
      method: 'get',
      url: `${URL_RESTFUL_SERVER}/youtube/search`,
      params: new URLSearchParams([
        ['channelId', 'UCYkldEK001GxR884OZMFnRw'],
        ['part', 'snippet'],
        ['order', 'date'],
        ['maxResults', '4'],
        ['type', 'video'],
      ]),
    }),
    client.query({
      query: fetchSectionWithCategory,
      variables: {
        where: {
          slug: 'videohub',
        },
      },
    }),
  ])

  let handledResponses = responses.map((response) => {
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

  let highestViewCountVideo =
    handledResponses[1] && 'data' in handledResponses[1]
      ? simplifyYoutubeSearchedVideo(handledResponses[1]?.data?.items)[0]
      : {}

  const latestVideos =
    handledResponses[2] && 'data' in handledResponses[2]
      ? simplifyYoutubeSearchedVideo(handledResponses[2]?.data?.items)
      : []

  const categories =
    handledResponses[3] && 'data' in handledResponses[3]
      ? handledResponses[3]?.data?.section.categories
      : []

  const channelIds = categories.map(
    (category) => VIDEOHUB_CATEGORIES_PLAYLIST_MAPPING[category.slug]
  )

  const playlistResponses = await Promise.allSettled([
    // fetch highest view count with youtube/videos to get full snippet.description
    // cause in youtube/search we only receieve truncated one
    highestViewCountVideo.id
      ? axios({
          method: 'get',
          url: `${URL_RESTFUL_SERVER}/youtube/videos`,
          // use URLSearchParams to add two values for key 'part'
          params: new URLSearchParams([
            ['id', highestViewCountVideo.id],
            ['part', 'snippet'],
            ['part', 'status'],
            ['maxResults', '1'],
          ]),
        })
      : Promise.resolve({}),
    ...channelIds.map((channelId) =>
      axios({
        method: 'get',
        url: `${URL_RESTFUL_SERVER}/youtube/playlistItems`,
        // use URLSearchParams to add two values for key 'part'
        params: new URLSearchParams([
          ['playlistId', channelId],
          ['part', 'snippet'],
          ['part', 'status'],
          ['maxResults', '10'],
          ['pageToken', ''],
        ]),
      })
    ),
  ])
  const handledPlaylistResponses = playlistResponses.map((response) => {
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

  highestViewCountVideo =
    handledPlaylistResponses[0] && 'data' in handledPlaylistResponses[0]
      ? simplifyYoutubeVideo(handledPlaylistResponses[0]?.data?.items)[0]
      : highestViewCountVideo

  const playlistsVideos = categories.map((category, index) => ({
    ...category,
    items: simplifyYoutubePlaylistVideo(
      handledPlaylistResponses[index + 1]
        ? handledPlaylistResponses[index + 1].data?.items
            ?.filter((item) => item.status.privacyStatus === 'public')
            .slice(0, 4)
        : []
    ),
  }))

  const props = {
    highestViewCountVideo,
    latestVideos,
    playlistsVideos,
    headerData: { sectionsData, topicsData },
  }
  return { props }
}
