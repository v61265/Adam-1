import { gql } from '@apollo/client'
import { listingPost } from '../fragments/listing-post'
import { post } from '../fragments/post'

//TODO: result of fetchListingPost is similar to fetchPosts, should refactor to on gql query if possible

/**
 * @typedef {import('../fragments/listing-post').ListingPost} ResultOfFetchListingPosts
 */

const fetchListingPosts = gql`
  ${listingPost}
  query fetchListingPosts(
    $take: Int
    $sectionSlug: [String!]
    $storySlug: String!
  ) {
    posts(
      take: $take
      orderBy: { publishedDate: desc }
      where: {
        sections: { some: { slug: { in: $sectionSlug } } }
        slug: { not: { equals: $storySlug } }
      }
    ) {
      ...listingPost
    }
  }
`

const fetchPosts = gql`
  ${post}
  query (
    $take: Int
    $skip: Int
    $orderBy: [PostOrderByInput!]!
    $filter: PostWhereInput!
  ) {
    postsCount(where: $filter)
    posts(take: $take, skip: $skip, orderBy: $orderBy, where: $filter) {
      ...post
    }
  }
`

export { fetchPosts, fetchListingPosts }
