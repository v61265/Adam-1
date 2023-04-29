import { gql } from '@apollo/client'

const fetchSpecials = gql`
  query {
    magazines(
      where: { type: { equals: "special" }, state: { equals: "published" } }
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
      state
      publishedDate
      createdAt
      updatedAt
    }
  }
`

const fetchWeeklys = gql`
  query {
    magazines(
      where: { type: { equals: "weekly" }, state: { equals: "published" } }
      orderBy: { publishedDate: desc }
      take: 8
    ) {
      id
      slug
      title
      coverPhoto {
        resized {
          original
          w480
          w800
          w1200
        }
      }
      type
      state
      publishedDate
      createdAt
      updatedAt
    }
  }
`

export { fetchSpecials, fetchWeeklys }
