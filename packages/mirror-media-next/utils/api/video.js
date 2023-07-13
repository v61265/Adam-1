import axios from 'axios'
import { URL_RESTFUL_SERVER } from '../../config/index.mjs'

/**
 * @param {string} videoId - youtube video id
 */
export function fetchYoutubeVideoByVideoId(videoId) {
  return axios({
    method: 'get',
    url: `${URL_RESTFUL_SERVER}/youtube/videos`,
    // use URLSearchParams to add two values for key 'part'
    params: new URLSearchParams([
      ['id', videoId],
      ['part', 'snippet'],
      ['part', 'status'],
      ['maxResults', '1'],
    ]),
  })
}

/**
 * @param {string} channelId - youtube channel id
 */
export function fetchYoutubeLatestVideosByChannelId(channelId) {
  return axios({
    method: 'get',
    url: `${URL_RESTFUL_SERVER}/youtube/search`,
    // use URLSearchParams to add two values for key 'part'
    params: new URLSearchParams([
      ['channelId', channelId],
      ['part', 'snippet'],
      ['order', 'date'],
      ['maxResults', '6'],
    ]),
  })
}
