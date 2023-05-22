import errors from '@twreporter/errors'
import {
  URL_STATIC_NORMAL_SECTIONS,
  URL_STATIC_PREMIUM_SECTIONS,
  URL_STATIC_TOPICS,
} from '../../config/index.mjs'
import axiosInstance from '../../axios/index.js'

/**
 * @typedef {import('../../apollo/fragments/section.js').Section[]} Sections
 */
/**
 * @typedef {import('../../apollo/fragments/topic.js').Topic[]} Topics
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
  throw annotatingAxiosError
}

/** @type {() => Promise<import('axios').AxiosResponse<{sections: Sections}>>} */
const fetchNormalSections = createAxiosRequest(URL_STATIC_NORMAL_SECTIONS)
/** @type {() => Promise<import('axios').AxiosResponse<{topics: Topics}>>} */
const fetchTopics = createAxiosRequest(URL_STATIC_TOPICS)

const fetchPremiumSections = createAxiosRequest(URL_STATIC_PREMIUM_SECTIONS)

const fetchHeaderDataInDefaultPageLayout = async () => {
  /** @type {Sections} */
  let sectionsData = []
  /** @type {Topics} */
  let topicsData = []
  try {
    const responses = await Promise.all([fetchNormalSections(), fetchTopics()])
    if (responses[0]?.data?.sections) {
      sectionsData = responses[0]?.data?.sections
    }
    const sectionsDataContainMagazine = sectionsData.map((section) => {
      if (section.slug === 'member') {
        return {
          ...section,
          categories: [
            {
              id: '7a7482edb739242537f11e24760d2c79', //hash for ensure it is unique from other category, no other usage.
              slug: 'magazine',
              name: '動態雜誌',
              isMemberOnly: false,
            },
            ...section.categories,
          ],
        }
      }
      return { ...section }
    })

    if (responses[1]?.data?.topics) {
      topicsData = responses[1].data.topics
    }
    return { sectionsData: sectionsDataContainMagazine, topicsData }
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
export {
  fetchHeaderDataInDefaultPageLayout,
  fetchHeaderDataInPremiumPageLayout,
}
