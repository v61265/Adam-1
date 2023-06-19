import client from '../../apollo/apollo-client'
import { fetchTopic } from '../../apollo/query/topics'

/**
 * @param {string} topicId
 * @param {number} postsTake
 * @param {number} postsSkip
 */
export function fetchTopicByTopicId(topicId, postsTake, postsSkip) {
  return client.query({
    query: fetchTopic,
    variables: {
      topicFilter: { id: topicId },
      postsFilter: { state: { equals: 'published' } },
      postsOrderBy: [{ isFeatured: 'desc' }, { publishedDate: 'desc' }],
      postsTake,
      postsSkip,
    },
  })
}
