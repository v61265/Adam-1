/**
 * @typedef {import('./api/index').fetchHeaderDataInDefaultPageLayout} fetchHeaderDataInDefaultPageLayout
 * @typedef {import('./api/index').HeadersData} HeadersData
 * @typedef {import('./api/index').Topics} Topics
 */

/**
 * @param {Awaited<ReturnType<fetchHeaderDataInDefaultPageLayout>> | undefined} headerData
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

export { getSectionAndTopicFromDefaultHeaderData }
