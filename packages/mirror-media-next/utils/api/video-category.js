import axios from 'axios'
import { URL_RESTFUL_SERVER } from '../../config/index.mjs'
import client from '../../apollo/apollo-client'
import { fetchCategory } from '../../apollo/query/categroies'

/**
 * @param {string} playlistId - youtube playlist id
 * @param {string} nextToken - youtube next page token to fetch more playlist item
 * @returns
 */
export function fetchYoutubePlaylistByPlaylistId(playlistId, nextToken = '') {
  return axios({
    method: 'get',
    url: `${URL_RESTFUL_SERVER}/youtube/playlistItems`,
    // use URLSearchParams to add two values for key 'part'
    params: new URLSearchParams([
      ['playlistId', playlistId],
      ['part', 'snippet'],
      ['part', 'status'],
      ['maxResults', '15'],
      ['pageToken', nextToken],
    ]),
  })
}

export function fetchVideoCategory(videoCategorySlug) {
  return client.query({
    query: fetchCategory,
    variables: {
      categorySlug: videoCategorySlug,
    },
  })
}
