export default {}

/**
 * @typedef {Object} YoutubeRawSearchedVideo
 * @property {string} kind - The type of the search result.
 * @property {string} etag - The ETag of the search result.
 * @property {Object} id - The ID of the video.
 * @property {string} id.kind - The type of the video ID.
 * @property {string} id.videoId - The ID of the video.
 * @property {Object} snippet - The snippet of the video.
 * @property {string} snippet.publishedAt - The publish date and time of the video.
 * @property {string} snippet.channelId - The channel ID of the video.
 * @property {string} snippet.title - The title of the video.
 * @property {string} snippet.description - The description of the video.
 * @property {Object} snippet.thumbnails - The thumbnails of the video.
 * @property {Object} snippet.thumbnails.default - The default thumbnail of the video.
 * @property {string} snippet.thumbnails.default.url - The URL of the default thumbnail of the video.
 * @property {number} snippet.thumbnails.default.width - The width of the default thumbnail of the video.
 * @property {number} snippet.thumbnails.default.height - The height of the default thumbnail of the video.
 * @property {Object} snippet.thumbnails.medium - The medium thumbnail of the video.
 * @property {string} snippet.thumbnails.medium.url - The URL of the medium thumbnail of the video.
 * @property {number} snippet.thumbnails.medium.width - The width of the medium thumbnail of the video.
 * @property {number} snippet.thumbnails.medium.height - The height of the medium thumbnail of the video.
 * @property {Object} snippet.thumbnails.high - The high thumbnail of the video.
 * @property {string} snippet.thumbnails.high.url - The URL of the high thumbnail of the video.
 * @property {number} snippet.thumbnails.high.width - The width of the high thumbnail of the video.
 * @property {number} snippet.thumbnails.high.height - The height of the high thumbnail of the video.
 * @property {string} snippet.channelTitle - The title of the channel that uploaded the video.
 * @property {string} snippet.liveBroadcastContent - The live broadcast content of the video.
 * @property {string} snippet.publishTime - The publish date and time of the video.
 */

/**
 * @typedef {Object} YoutubeRawPlaylistVideo
 * @property {string} kind - The type of the API resource (always "youtube#playlistItem" for this case).
 * @property {string} etag - The ETag of the playlist item resource.
 * @property {string} id - The ID of the playlist item resource.
 * @property {Object} snippet - The snippet object containing details about the playlist item.
 * @property {string} snippet.publishedAt - The date and time when the playlist item was published.
 * @property {string} snippet.channelId - The ID of the YouTube channel that the playlist item belongs to.
 * @property {string} snippet.title - The title of the playlist item.
 * @property {string} snippet.description - The description of the playlist item.
 * @property {Object} snippet.thumbnails - The object containing URLs and dimensions of the playlist item's thumbnail images.
 * @property {Object} snippet.thumbnails.default - The object containing the URL and dimensions of the default quality thumbnail image.
 * @property {string} snippet.thumbnails.default.url - The URL of the default quality thumbnail image.
 * @property {number} snippet.thumbnails.default.width - The width of the default quality thumbnail image.
 * @property {number} snippet.thumbnails.default.height - The height of the default quality thumbnail image.
 * @property {Object} snippet.thumbnails.medium - The object containing the URL and dimensions of the medium quality thumbnail image.
 * @property {string} snippet.thumbnails.medium.url - The URL of the medium quality thumbnail image.
 * @property {number} snippet.thumbnails.medium.width - The width of the medium quality thumbnail image.
 * @property {number} snippet.thumbnails.medium.height - The height of the medium quality thumbnail image.
 * @property {Object} snippet.thumbnails.high - The object containing the URL and dimensions of the high quality thumbnail image.
 * @property {string} snippet.thumbnails.high.url - The URL of the high quality thumbnail image.
 * @property {number} snippet.thumbnails.high.width - The width of the high quality thumbnail image.
 * @property {number} snippet.thumbnails.high.height - The height of the high quality thumbnail image.
 * @property {Object} snippet.thumbnails.standard - The object containing the URL and dimensions of the standard quality thumbnail image.
 * @property {string} snippet.thumbnails.standard.url - The URL of the standard quality thumbnail image.
 * @property {number} snippet.thumbnails.standard.width - The width of the standard quality thumbnail image.
 * @property {number} snippet.thumbnails.standard.height - The height of the standard quality thumbnail image.
 * @property {Object} snippet.resourceId
 * @property {string} snippet.resourceId.kind
 * @property {string} snippet.resourceId.videoId
 */

/**
 * @typedef {Object} YoutubeVideo compatible type for simplified YoutubeRawSearchedVideo and YoutubeRawPlaylistVideo
 * @property {string} id - The ID of the video.
 * @property {string} title - The title of the video.
 * @property {string} description - The description of the video.
 * @property {string} thumbnail - The thumbnail url from YoutubeRawSearchedVideo|YoutubeRawPlaylistVideo.snippet.thumbnails.high.url.
 */
