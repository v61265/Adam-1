import { gql } from '@apollo/client'
import { partner } from './partner'

/**
 * @typedef {import('./partner').Partner} Partner
 */

/**
 * @typedef {Object} GenericExternal
 * @property {string} id
 * @property {string} slug
 * @property {Partner} partner
 * @property {string} title
 * @property {string} state
 * @property {string} publishedDate
 * @property {string} extend_byline
 * @property {string} thumb
 * @property {string} brief
 * @property {string} content
 * @property {string} source
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} createdBy
 * @property {string} updatedBy
 */

/**
 * @typedef {Pick<GenericExternal, 'id' | 'slug' | 'title' | 'thumb' | 'brief' | 'content' | 'partner'>} External
 */

export const external = gql`
  ${partner}
  fragment external on External {
    id
    slug
    title
    thumb
    brief
    content
    partner {
      ...partner
    }
  }
`
