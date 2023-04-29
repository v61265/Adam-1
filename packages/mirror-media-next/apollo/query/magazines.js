import { gql } from '@apollo/client'

const fetchSpecials = gql`
  query {
    magazines(
      where: { type: { equals: "special" } }
      orderBy: { publishedDate: desc }
    ) {
      id
      slug
      title
      urlOriginal
      coverPhoto {
        resized {
          original
          w480
          w800
          w1200
        }
      }
      type
      publishedDate
      createdAt
      updatedAt
    }
  }
`

export { fetchSpecials }
