import { gql } from '@apollo/client'
import { topic } from '../fragments/topic'

const fetchTopics = gql`
  ${topic}
  query (
    $take: Int
    $skip: Int
    $orderBy: [TopicOrderByInput!]!
    $filter: TopicWhereInput!
  ) {
    topicsCount(where: $filter)
    topics(take: $take, skip: $skip, orderBy: $orderBy, where: $filter) {
      ...topic
    }
  }
`

export { fetchTopics }
