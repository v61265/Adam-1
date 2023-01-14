import { gql } from '@apollo/client'

const fetchPostsByCategory = gql`
  query (
    $take: Int
    $skip: Int
    $orderBy: [PostOrderByInput!]
    $filter: PostWhereInput!
  ) {
    postsCount
    posts(take: $take, skip: $skip, orderBy: $orderBy, where: $filter) {
      id
      title
      sections {
        name
      }
      publishedDate
      state
    }
  }
`

export { fetchPostsByCategory }
