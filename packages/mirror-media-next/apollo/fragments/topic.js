import { gql } from '@apollo/client'
import { heroImage } from './photo'
import { post } from './post'
import { tag } from './tag'

/**
 * @typedef {Object} Topic
 * @property {string} id
 * @property {string} name
 * @property {import('../../type/draft-js').Draft} brief
 * @property {import('./photo').Photo} heroImage
 * @property {number} sortOrder
 * @property {string} createdAt
 * @property {string} leading
 * @property {string} type
 * @property {string} style
 * @property {number} postsCount
 * @property {import('./post').Post[]} posts
 * @property {import('./tag').Tag[]} tags
 */

export const simpleTopic = gql`
  ${heroImage}
  fragment simpleTopic on Topic {
    id
    name
    brief
    heroImage {
      ...heroImage
    }
  }
`

export const topic = gql`
  ${heroImage}
  ${post}
  ${tag}
  fragment topic on Topic {
    id
    name
    brief
    heroImage {
      ...heroImage
    }
    leading
    type
    style
    postsCount(where: $postsFilter)
    posts(
      where: $postsFilter
      orderBy: $postsOrderBy
      take: $postsTake
      skip: $postsSkip
    ) {
      ...post
    }
    tags {
      ...tag
    }
  }
`
