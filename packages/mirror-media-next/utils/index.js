import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { GCP_PROJECT_ID } from '../config/index.mjs'

/**
 * @typedef {import('../apollo/fragments/section').Section[]} Sections
 */
/**
 * @typedef {import('../apollo/fragments/category').Category} Category
 */
/**
 * @typedef {Category[]} Categories
 */

/**
 * Get path of article base on different article style, and whether is external article.
 * @param {String} slug
 * @param {import('../type/raw-data.typedef').ArticleStyle} style
 * @param {Object |''} partner
 * @returns {String}
 */
const getArticleHref = (slug, style, partner) => {
  if (partner) {
    return `/external/${slug}/`
  }
  if (style === 'campaign') {
    return `/campaigns/${slug}`
  } else if (style === 'projects') {
    return `/projects/${slug}/`
  }
  /**
   * TODO: condition `isPremiumMember` is whether user is log in and is premium member,
   * We haven't migrate membership system yet, so remove this condition temporally.
   */
  // else if (isPremiumMember) {
  //   return `pre/story/${slug}/`
  // }

  return `/story/${slug}/`
}

/**
 * Get section slug based on different condition
 * @param {Sections} sections
 * @param {Object | ''} partner
 * @returns {String | undefined}
 */
function getSectionSlugGql(sections = [], partner = '') {
  if (partner) {
    return 'external'
  } else if (sections?.some((section) => section.slug === 'member')) {
    return 'member'
  }
  return sections[0]?.slug
}

/**
 * Get section name based on different condition
 * @param {Sections} sections
 * @param {Object | ''} partner
 * @returns {String | undefined}
 */
function getSectionNameGql(sections = [], partner) {
  if (partner) {
    if (partner.slug === 'healthnews') {
      return '生活'
    } else if (partner.slug === 'ebc') {
      return '時事'
    } else {
      return '時事'
    }
  }

  if (sections.length > 0) {
    if (sections.some((section) => section.slug === 'member')) {
      return '會員專區'
    } else {
      return sections[0]?.name
    }
  }
  return undefined
}

/**
 * Transform params `time` into different pattern
 * depend on the type 'dot' or 'slash' or 'slashWithTime'
 * If `time` is not a valid date, this function will return undefined
 * @param {string} time
 * @param {'dot' | 'slash'| 'slashWithTime'|'dash'} format
 * @returns {string | undefined}
 */
const transformTimeData = (time, format) => {
  dayjs.extend(utc)

  const timeData = dayjs(time).utcOffset(8)

  if (!timeData.isValid()) {
    return undefined
  } else {
    switch (format) {
      case 'dot':
        return timeData.format('YYYY.MM.DD HH:mm')

      case 'slash':
        return timeData.format('YYYY/MM/DD')

      case 'slashWithTime':
        return timeData.format('YYYY/MM/DD HH:mm')

      case 'dash':
        return timeData.format('YYYY-MM-DD')

      default:
        return undefined
    }
  }
}

/**
 * Transform params `time` into `YYYY.MM.DD HH:MM` pattern
 * If `time` is not a valid date, this function will return undefined
 * @param {String} time
 * @returns {string | undefined}
 */
const transformTimeDataIntoDotFormat = (time) => {
  return transformTimeData(time, 'dot')
}

/**
 * Transform params `time` into `YYYY/MM/DD HH:MM` pattern
 * If `time` is not a valid date, this function will return undefined
 * @param {String} time
 * @param {boolean} includeTime - Whether to include time or not. Default is true.
 * @returns {string | undefined}
 */
const transformTimeDataIntoSlashFormat = (time, includeTime = true) => {
  const format = includeTime ? 'slashWithTime' : 'slash'
  return transformTimeData(time, format)
}

//TODO: add more specific type in param `arrayNeedToSort` and `arraySortReference`
/**
 * Sorts an array of objects based on the order of ids in another array of objects.
 * @template {{ id: any }} T
 * @template {{ id: any }} S
 * @param {T[]} arrayNeedToSort
 * @param {S[]} arraySortReference
 */
const sortArrayWithOtherArrayId = (arrayNeedToSort, arraySortReference) => {
  const sortedArray = arrayNeedToSort.slice().sort((a, b) => {
    const aIndex = arraySortReference.findIndex((x) => x.id === a.id)
    const bIndex = arraySortReference.findIndex((x) => x.id === b.id)
    return aIndex - bIndex
  })
  return sortedArray
}

/**
Get the magazine href from a given slug.
@param {string} slug 
@returns {string} 
*/
const getMagazineHrefFromSlug = (slug) => {
  const issue = slug.match(/\d+/)[0]
  const book = slug.endsWith('A本') ? 'A' : 'B'
  const href = `/magazine/Book_${book}/${book}${issue}-Publish`
  return href
}

/**
 * array of categories with the slug 'wine' or 'wine1'.
 * @param {Pick<Category, 'id' | 'name' | 'slug'>[]} categories - certain category information
 * @returns {Pick<Category, 'id' | 'name' | 'slug'>[] | []}
 */
const getCategoryOfWineSlug = (categories) => {
  if (Array.isArray(categories)) {
    return categories.filter(
      (category) => category.slug === 'wine' || category.slug === 'wine1'
    )
  }
  return []
}

/**
 * Convert the `text` content in `rawContentBlock` data (h2, h3, unstyled)
 * and combine the first 160 characters as a plain text description for `og-description`.
 * @param {import('../type/draft-js').Draft} rawContentBlock
 * @returns {string | undefined}
 */
const convertDraftToText = (rawContentBlock) => {
  if (
    rawContentBlock &&
    rawContentBlock?.blocks &&
    rawContentBlock.blocks.length > 0
  ) {
    const text = rawContentBlock.blocks.map((block) => block.text).join('')

    const ogDescription =
      text && text.length > 160
        ? text.trim().slice(0, 160) + '...'
        : text.trim()

    return ogDescription
  } else {
    return undefined
  }
}

/**
 * To get the URL link for `og-image`, sorted in ascending order based on file size.
 * Skip w480 to prevent image size minimum 200 x 200.
 * It's recommended for using images which is at least 1200 * 630 pixels on high resolution devices, so we use w1600 at first.
 * @see https://developers.facebook.com/docs/sharing/webmasters/images
 * @param {import('../apollo/fragments/photo').Resized | undefined | null} resized
 * @returns {string | undefined}
 */
const getResizedUrl = (resized) => {
  if (resized) {
    return resized?.w1600 || resized?.w2400 || resized?.original
  } else {
    return undefined
  }
}

/**
 * Returns a string representation of a number with commas as thousand separators.
 *
 * @param {number} num - The number to convert to a string with commas.
 * @return {string} The string representation of the number with commas.
 */
const getNumberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Return sections that are in `active` state and sorted.
 *
 * @param {Sections} sections
 * @param {Sections} sectionsInInputOrder
 * @return {Sections}
 */
const getActiveOrderSection = (sections, sectionsInInputOrder) => {
  /**
   * Because `sections` can be filtered by `where` in GraphQL based on whether `state` is active,
   * but `sectionsInInputOrder` doesn't have `where`.
   *
   * Need to filter state of `sectionsInInputOrder` to match the results of sections.
   */
  const activeSectionsOrder = Array.isArray(sectionsInInputOrder)
    ? sectionsInInputOrder.filter((section) => section.state === 'active')
    : []

  /**
   * Although `sections` already filter `state` at GraphQL ,
   * for the sake of maintaining same logic between `sectionsInInputOrder` and `sections`,
   * filter `state` status of `sections` again.
   * */
  const activeSections = Array.isArray(sections)
    ? sections.filter((section) => section.state === 'active')
    : []

  if (activeSectionsOrder.length > 0) {
    return activeSectionsOrder
  } else if (activeSections.length > 0) {
    return activeSections
  } else {
    return []
  }
}

/**
 * Return categories that are in `active` state and sorted.
 *
 * @param {Categories | null} categories
 * @param {Categories} categoriesInInputOrder
 * @return {Categories}
 */
const getActiveOrderCategory = (categories, categoriesInInputOrder) => {
  /**
   * Because `categories` can be filtered by `where` in GraphQL based on whether `state` is active,
   * but `categoriesInInputOrder` doesn't have `where`.
   *
   * Need to filter state of `categoriesInInputOrder` to match the results of categories.
   */
  const activeCategoriesOrder = Array.isArray(categoriesInInputOrder)
    ? categoriesInInputOrder.filter((category) => category.state === 'active')
    : []

  /**
   * Although `categories` already filter `state` at GraphQL ,
   * for the sake of maintaining same logic between `categoriesInInputOrder` and `categories`,
   * filter `state` status of `categories` again.
   * */
  const activeCategories = Array.isArray(categories)
    ? categories.filter((category) => category.state === 'active')
    : []

  if (activeCategoriesOrder.length > 0) {
    return activeCategoriesOrder
  } else if (activeCategories.length > 0) {
    return activeCategories
  } else {
    return []
  }
}

/**
 * Verify email input
 *
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return regex.test(email)
}

/**
 * Verify password input
 *
 * @param {string} password
 * @returns {boolean}
 */
const isValidPassword = (password) => {
  return typeof password === 'string' && password.length >= 6
}

/**
 * Verify if the email is a company email
 *
 * @param {string} email
 * @returns {boolean}
 */
const isCompanyEmail = (email) => {
  const validSuffixes = [
    '@mnews.com.tw',
    '@mnews.tw',
    '@mirrormedia.mg',
    '@mirrorfiction.com',
  ]
  return validSuffixes.some((suffix) => email.endsWith(suffix))
}

/**
 * @param {import('next/router').NextRouter} router
 * @returns {import('next/link').LinkProps['href']}
 */
const getLoginHref = (router) => {
  const pathname = router.pathname

  if (pathname === '/login') {
    const queryParam = router.query
    let destination = queryParam.destination

    if (Array.isArray(destination)) {
      destination = destination.join(',')
    }

    if (destination) {
      return {
        pathname: '/login',
        query: {
          ...queryParam,
        },
      }
    } else {
      return {
        pathname: '/login',
        query: {
          destination: '/',
          ...queryParam,
        },
      }
    }
  } else {
    const urlObject = new URL(
      router.asPath,
      'https://www.google.com' /** sample base */
    )
    const searchParams = Object.fromEntries(urlObject.searchParams.entries())

    return {
      pathname: '/login',
      query: {
        destination: urlObject.pathname, // avoid dynamic route repreentaion, e.g., /story/[slug]
        ...searchParams,
      },
    }
  }
}

const isServer = () => {
  return typeof window === 'undefined' ? true : false
}

/**
 * @param {string} functionName
 * @returns
 */
const getClientSideOnlyError = (functionName) => {
  return new Error(`Method ${functionName} is client-side only`)
}

/**
 * @param {import('querystring').ParsedUrlQuery} query
 * @param {string} key
 * @returns {string | string[] | undefined}
 */
const getSearchParamFromApiKeyUrl = (query, key) => {
  if (key in query) {
    return query[key]
  }

  const apiKeyUrl = Object.keys(query).find((key) => key.includes('apiKey'))
  return new URLSearchParams(apiKeyUrl).get(key)
}

/**
 * @param {import('http').IncomingMessage} req
 */
const getLogTraceObject = (req) => {
  const traceHeader = req?.headers?.['x-cloud-trace-context']
  let globalLogFields = {}
  if (traceHeader && !Array.isArray(traceHeader)) {
    const [trace] = traceHeader.split('/')
    globalLogFields[
      'logging.googleapis.com/trace'
    ] = `projects/${GCP_PROJECT_ID}/traces/${trace}`
  }
  return globalLogFields
}

export {
  transformTimeDataIntoDotFormat,
  transformTimeDataIntoSlashFormat,
  getSectionNameGql,
  getSectionSlugGql,
  getArticleHref,
  sortArrayWithOtherArrayId,
  getMagazineHrefFromSlug,
  getCategoryOfWineSlug,
  convertDraftToText,
  getResizedUrl,
  getNumberWithCommas,
  getActiveOrderSection,
  getActiveOrderCategory,
  isValidEmail,
  isValidPassword,
  isCompanyEmail,
  transformTimeData,
  getLoginHref,
  isServer,
  getClientSideOnlyError,
  getSearchParamFromApiKeyUrl,
  getLogTraceObject,
}
