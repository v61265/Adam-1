import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

/**
 * @typedef {import('../type/raw-data.typedef').RawData} RawData
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
 * TODO: use typedef in `../apollo/fragments/section`
 * Should be done after fetch header data from new json file
 *
 * Get section name based on different condition
 * @param {import('../type/raw-data.typedef').Section[]} sections
 * @param {Object | ''} partner
 * @returns {String | undefined}
 */
function getSectionName(sections = [], partner = '') {
  if (partner) {
    return 'external'
  } else if (sections?.some((section) => section.name === 'member')) {
    return 'member'
  }
  return sections[0]?.name
}

/**
 * TODO: use typedef in `../apollo/fragments/section`
 * Should be done after fetch header data from new json file
 *
 * Get section title based on different condition
 * @param {import('../type/raw-data.typedef').Section[]} sections
 * @param {Object | ''} partner
 * @returns {String | undefined}
 */
function getSectionTitle(sections = [], partner) {
  if (partner) {
    if (partner.name === 'healthnews') {
      return '生活'
    } else if (partner.name === 'ebc') {
      return '時事'
    } else {
      return '時事'
    }
  }

  if (sections.length > 0) {
    if (sections.some((section) => section.name === 'member')) {
      return '會員專區'
    } else {
      return sections[0]?.title
    }
  }
  return undefined
}

//TODO:
// - remove function for handling data from k3 server
// - adjust typedef of Section

//TODO: use typedef in `../apollo/fragments/section`
// Should be done after fetch header data from new json file
/**
 * Get section name based on different condition
 * Because data structure of keystone 6 response is different from keystone 3, we create this function to handle data from keystone 6 server.
 * @param {import('../type/raw-data.typedef').Section[]} sections
 * @param {Object | ''} partner
 * @returns {String | undefined}
 */
function getSectionNameGql(sections = [], partner = '') {
  if (partner) {
    return 'external'
  } else if (sections?.some((section) => section.name === 'member')) {
    return 'member'
  }
  return sections[0]?.name
}

// TODO: use typedef in `../apollo/fragments/section`
// Should be done after fetch header data from new json file
/**
 * Get section title based on different condition
 * Because data structure of keystone 6 response is different from keystone 3, we create this function to handle data from keystone 6 server.
 * @param {import('../type/raw-data.typedef').Section[]} sections
 * @param {Object | ''} partner
 * @returns {String | undefined}
 */
function getSectionTitleGql(sections = [], partner) {
  if (partner) {
    if (partner.name === 'healthnews') {
      return '生活'
    } else if (partner.name === 'ebc') {
      return '時事'
    } else {
      return '時事'
    }
  }

  if (sections.length > 0) {
    if (sections.some((section) => section.name === 'member')) {
      return '會員專區'
    } else {
      return sections[0]?.slug
    }
  }
  return undefined
}
/**
 * Transform the item in the array into a specific data structure, which will be applied to a specific list page
 * @param {RawData[]} rawData
 * @returns {import('../type/index').ArticleInfoCard[]}
 */
const transformRawDataToArticleInfo = (rawData) => {
  return rawData?.map((article) => {
    const {
      slug = '',
      title = '',
      heroImage = {
        image: { resizedTargets: { mobile: { url: '' }, tablet: { url: '' } } },
      },
      sections = [],
      partner = {},
      style,
    } = article || {}

    const { mobile = {}, tablet = {} } = heroImage?.image
      ? heroImage?.image?.resizedTargets
      : {}
    return {
      title,
      slug,
      href: getArticleHref(slug, style, partner),
      imgSrcMobile: mobile?.url || '/images/default-og-img.png',
      imgSrcTablet: tablet?.url || '/images/default-og-img.png',
      sectionTitle: getSectionTitle(sections, partner),
      sectionName: getSectionName(sections, partner),
    }
  })
}

/**
 * Transform params `time` into different pattern
 * depend on the type 'dot' or 'slash' or 'slashWithTime'
 * If `time` is not a valid date, this function will return undefined
 * @param {string} time
 * @param {'dot' | 'slash'| 'slashWithTime'} format
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
 * @param {Object[]} arrayNeedToSort
 * @param {Object[]} arraySortReference
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

export {
  transformRawDataToArticleInfo,
  transformTimeDataIntoDotFormat,
  transformTimeDataIntoSlashFormat,
  getSectionNameGql,
  getSectionTitleGql,
  getArticleHref,
  sortArrayWithOtherArrayId,
  getMagazineHrefFromSlug,
}
