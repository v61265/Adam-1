/**
 * @param {import("../type/youtube").YoutubeRawSearchedVideo[]} videos
 * @returns {import("../type/youtube").YoutubeVideo[]}
 */
function simplifyYoutubeSearchedVideo(videos) {
  return videos.map((video) => ({
    id: video.id.videoId,
    title: video.snippet.title,
    description: video.snippet.description,
    thumbnail: video.snippet.thumbnails.high.url,
  }))
}

/**
 * @param {import("../type/youtube").YoutubeRawPlaylistVideo[]} videos
 * @returns {import("../type/youtube").YoutubeVideo[]}
 */
function simplifyYoutubePlaylistVideo(videos) {
  return videos.map((video) => ({
    id: video.snippet.resourceId.videoId,
    title: video.snippet.title,
    description: video.snippet.description,
    thumbnail: video.snippet.thumbnails.high.url,
  }))
}

export { simplifyYoutubeSearchedVideo, simplifyYoutubePlaylistVideo }
