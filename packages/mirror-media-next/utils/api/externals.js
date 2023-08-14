import client from '../../apollo/apollo-client'
import { fetchExternalsByPartnerSlug } from '../../apollo/query/externals'

/**
 * @typedef {import('../../apollo/fragments/external').ListingExternal} ListingExternal
 */

/**
 * @callback FetchExternalsForExternalPage
 * @param {number} page
 * @param {number} renderPageSize
 * @param {string | string[]} [partnerSlug]
 * @returns {Promise<ListingExternal[]>}
 */

/**
 * @type {FetchExternalsForExternalPage}
 */
const fetchExternalsForExternalPage = async (
  page,
  renderPageSize,
  partnerSlug
) => {
  const partnerSlugForFetch = Array.isArray(partnerSlug)
    ? partnerSlug[0]
    : partnerSlug
  try {
    const response = await client.query({
      query: fetchExternalsByPartnerSlug,
      variables: {
        take: renderPageSize * 2,
        skip: (page - 1) * renderPageSize * 2,
        orderBy: { publishedDate: 'desc' },
        filter: {
          state: { equals: 'published' },
          partner: { slug: { equals: partnerSlugForFetch } },
        },
      },
    })
    return response.data.externals
  } catch (error) {
    console.error(error)
  }
  return
}

export { fetchExternalsForExternalPage }
