import errors from '@twreporter/errors'
import axiosInstance from '../../axios/index.js'
import {
  URL_STATIC_HEADER_HEADERS,
  URL_STATIC_PODCAST_LIST,
  URL_STATIC_PREMIUM_SECTIONS,
  URL_STATIC_TOPICS,
} from '../../config/index.mjs'

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {boolean} isMemberOnly
 */
/**
 * @typedef {import('../../apollo/fragments/topic.js').Topic[]} Topics
 */

/**
 * @typedef {Object} CategoryInHeadersDataSection
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {boolean} isMemberOnly
 */

/**
 * @typedef {Object} HeadersDataSection
 * @property {number} order
 * @property {'section'} type
 * @property {string} slug
 * @property {string} name
 * @property {CategoryInHeadersDataSection[]} categories
 */

/**
 * @typedef {Object} HeadersDataCategory
 * @property {number} order
 * @property {'category'} type
 * @property {string} slug
 * @property {string} name
 * @property {boolean} isMemberOnly
 * @property {string[]} sections
 *
 */

/**
 * @typedef { (HeadersDataSection | HeadersDataCategory)[]} HeadersData
 */
/**
 * Creates an Axios request function that sends a GET request to the specified URL with a timeout.
 * @param {string} requestUrl - The URL to send the request to.
 */
const createAxiosRequest = (requestUrl) => {
  return () => axiosInstance(requestUrl)
}

const errorLogger = (errorMessage) => {
  const annotatingAxiosError = errors.helpers.annotateAxiosError(errorMessage)
  //WORKAROUND: print error in here. Should print in place where fetch function used, such as category/[slug]
  console.log(
    JSON.stringify({
      severity: 'WARNING',
      message: errors.helpers.printAll(
        annotatingAxiosError,
        {
          withStack: true,
          withPayload: true,
        },
        0,
        0
      ),
    })
  )

  throw annotatingAxiosError
}

/** @type {() => Promise<import('axios').AxiosResponse<{headers: HeadersData}>>} */
const fetchNormalSections = createAxiosRequest(URL_STATIC_HEADER_HEADERS)

/** @type {() => Promise<import('axios').AxiosResponse<{topics: Topics}>>} */
const fetchTopics = createAxiosRequest(URL_STATIC_TOPICS)

const fetchPremiumSections = createAxiosRequest(URL_STATIC_PREMIUM_SECTIONS)

const fetchPodcastList = createAxiosRequest(URL_STATIC_PODCAST_LIST)

const fetchHeaderDataInDefaultPageLayout = async () => {
  /** @type {HeadersData} */
  let sectionsData = []
  /** @type {Topics} */
  let topicsData = []

  try {
    const responses = await Promise.allSettled([
      fetchNormalSections(),
      fetchTopics(),
    ])

    const sectionsResponse = responses[0].status === 'fulfilled' && responses[0]
    sectionsData = Array.isArray(sectionsResponse?.value?.data?.headers)
      ? sectionsResponse?.value?.data?.headers
      : []

    const topicsResponse = responses[1].status === 'fulfilled' && responses[1]
    topicsData = Array.isArray(topicsResponse?.value?.data?.topics)
      ? topicsResponse?.value?.data?.topics
      : []

    return { sectionsData, topicsData }
  } catch (err) {
    errorLogger(err)
  }
}

const fetchHeaderDataInPremiumPageLayout = async () => {
  let sectionsData = []
  try {
    const response = await fetchPremiumSections()
    if (response?.data?.sections) {
      sectionsData = response?.data?.sections
    }
    return { sectionsData }
  } catch (err) {
    errorLogger(err)
  }
}

/**
 * @param {Awaited<ReturnType<typeof fetchHeaderDataInDefaultPageLayout>> | undefined} headerData
 * @returns {[HeadersData, Topics]}
 */
const getSectionAndTopicFromDefaultHeaderData = (headerData) => {
  /** @type {HeadersData} */
  let sectionData = []
  /** @type {Topics} */
  let topicsData = []

  if (headerData) {
    if (Array.isArray(headerData['sectionsData']))
      sectionData = headerData['sectionsData']
    if (Array.isArray(headerData['topicsData']))
      topicsData = headerData['topicsData']
  }

  return [sectionData, topicsData]
}

/**
 * @param {Awaited<ReturnType<typeof fetchHeaderDataInPremiumPageLayout>> | undefined} headerData
 * @returns {HeadersData}
 */
const getSectionFromPremiumHeaderData = (headerData) => {
  /** @type {HeadersData} */
  let sectionData = []

  if (headerData) {
    if (Array.isArray(headerData['sectionsData']))
      sectionData = headerData['sectionsData']
  }

  return sectionData
}

/**
 * @template T
 * @param {import('@apollo/client').ApolloQueryResult<any> | undefined} gqlData
 * @returns {[number, T[]]}
 */
const getPostsAndPostscountFromGqlData = (gqlData) => {
  if (!gqlData) {
    return [0, []]
  }

  const data = gqlData.data
  const postsCount = data?.postsCount || 0
  const posts = data?.posts || []
  return [postsCount, posts]
}

export {
  fetchHeaderDataInDefaultPageLayout,
  fetchHeaderDataInPremiumPageLayout,
  fetchPodcastList,
  getSectionAndTopicFromDefaultHeaderData,
  getSectionFromPremiumHeaderData,
  getPostsAndPostscountFromGqlData,
}
