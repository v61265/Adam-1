import styled from 'styled-components'
import client from '../../../apollo/apollo-client'

import InfiniteScrollList from '../../infinite-scroll-list'
import Image from 'next/legacy/image'
import LoadingPage from '../../../public/images/loading_page.gif'
import TopicList from './topic-list'
import { fetchTopics } from '../../../apollo/query/topics'

const Loading = styled.div`
  margin: 20px auto 0;
  padding: 0 0 20px;
  text-align: center;

  ${({ theme }) => theme.breakpoint.xl} {
    margin: 64px auto 0;
    padding: 0 0 64px;
  }
`

/**
 * @typedef {import('./topic-list').Topic} Topic
 */

/**
 *
 * @param {Object} props
 * @param {number} props.topicsCount
 * @param {Topic[]} props.topics
 * @param {number} props.renderPageSize
 * @returns {React.ReactElement}
 */
export default function SectionTopics({ topics, topicsCount, renderPageSize }) {
  async function fetchTopicsFromPage(page) {
    try {
      const response = await client.query({
        query: fetchTopics,
        variables: {
          take: renderPageSize * 2,
          skip: (page - 1) * renderPageSize * 2,
          orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
          filter: { state: { equals: 'published' } },
        },
      })
      return response.data.topics
    } catch (error) {
      console.error('fetchTopicsFromPage error', error)
    }
    return
  }

  const loader = (
    <Loading key={0}>
      <Image src={LoadingPage} alt="loading page"></Image>
    </Loading>
  )

  return (
    <InfiniteScrollList
      initialList={topics}
      renderAmount={renderPageSize}
      fetchCount={Math.ceil(topicsCount / renderPageSize)}
      fetchListInPage={fetchTopicsFromPage}
      loader={loader}
    >
      {(renderList) => <TopicList renderList={renderList} />}
    </InfiniteScrollList>
  )
}
