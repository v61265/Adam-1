import { gql } from '@apollo/client'

const fetchPostsByCategory = gql`
  query (
    $take: Int
    $skip: Int
    $orderBy: [PostOrderByInput!]!
    $filter: PostWhereInput!
  ) {
    postsCount(where: $filter)
    posts(take: $take, skip: $skip, orderBy: $orderBy, where: $filter) {
      id
      title
      brief
      sections {
        slug
        name
      }
      publishedDate
      state
      categories {
        slug
        name
      }
      heroImage {
        imageFile {
          width
          height
        }
        resized {
          original
          w480
          w800
          w1200
          w1600
          w2400
        }
      }
    }
  }
`

export { fetchPostsByCategory }
