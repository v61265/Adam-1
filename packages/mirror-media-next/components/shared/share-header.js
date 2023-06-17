//TODO: add jsDoc of param  on component `Share-Header`

import Header from '../header'
import PremiumHeader from '../premium-header'
import FlashNews from '../flash-news'
/**
 * @typedef {Object} DefaultHeaderData
 * @property {import('../header').Sections} normalSectionsData
 * @property {import('../header').Topics} topicsData
 *
 * @typedef {Object} PremiumHeaderData
 * @property {import('../premium-header').PremiumHeaderSection[]} premiumSectionsData
 *
 */

/**
 * @typedef {Object} HeaderData
 * @property {DefaultHeaderData['normalSectionsData'] | PremiumHeaderData['premiumSectionsData']} [sectionsData]
 * @property {DefaultHeaderData['topicsData']} [topicsData]
 * @property {import('../flash-news').FlashNews[]} [flashNewsData]
 *
 * @typedef {'default' | 'default-with-flash-news' | 'premium' | 'empty'} HeaderType
 */

const getDefaultHeader = (headerData) => {
  const { sectionsData, topicsData } = headerData
  if (!sectionsData || !sectionsData.length) {
    console.warn('There is no sections data for header of default page layout')
  } else if (!topicsData || !topicsData.length) {
    console.warn('There is no topics data for header of default page layout')
  }

  return <Header sectionsData={sectionsData} topicsData={topicsData} />
}
const getDefaultHeaderWithFlashNews = (headerData) => {
  const { sectionsData, topicsData, flashNewsData } = headerData
  if (!sectionsData || !sectionsData.length) {
    console.warn('There is no sections data for header of default page layout')
  } else if (!topicsData || !topicsData.length) {
    console.warn('There is no topics data for header of default page layout')
  } else if (!flashNewsData || !flashNewsData.length) {
    console.warn(
      'There is no flash news data for header of default page layout'
    )
  }
  const flashNews = flashNewsData
  return (
    <Header sectionsData={sectionsData} topicsData={topicsData}>
      <FlashNews flashNews={flashNews} />
    </Header>
  )
}
const getPremiumHeader = (headerData) => {
  const { sectionsData } = headerData
  if (!sectionsData || !sectionsData.length) {
    console.warn('There is no sections data for header of premium page layout')
  }

  return <PremiumHeader premiumHeaderData={{ sections: sectionsData }} />
}

/**
 *
 * @param {Object} props
 * @param {HeaderType} props.pageLayoutType
 * @param {HeaderData} [props.headerData]
 * @param {JSX.Element | null} [props.children]
 * @returns {JSX.Element}
 */
export default function ShareHeader({
  pageLayoutType = 'default',
  headerData = {},
}) {
  const getheaderJsx = (pageLayoutType) => {
    switch (pageLayoutType) {
      case 'default': {
        const defaultHeader = getDefaultHeader(headerData)
        return defaultHeader
      }
      case 'default-with-flash-news': {
        const defaultHeaderWithFlashNews =
          getDefaultHeaderWithFlashNews(headerData)
        return defaultHeaderWithFlashNews
      }
      case 'premium': {
        const premiumHeader = getPremiumHeader(headerData)
        return premiumHeader
      }
      case 'empty':
        return <></>
      default: {
        const defaultHeader = getDefaultHeader(headerData)
        return defaultHeader
      }
    }
  }
  const headerJsx = getheaderJsx(pageLayoutType)

  return headerJsx
}
