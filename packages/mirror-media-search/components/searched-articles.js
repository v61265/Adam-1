import styled from 'styled-components'
import axios from 'axios'

import Image from 'next/legacy/image'
import LoadingPage from '../public/images/loading_page.gif'
import ArticleList from './article-list'
import { API_TIMEOUT } from '../config'
import gtag from '../utils/programmable-search/gtag'

import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'

const Loading = styled.div`
  margin: 20px auto 0;
  padding: 0 0 20px;
  text-align: center;

  ${({ theme }) => theme.breakpoint.xl} {
    margin: 64px auto 0;
    padding: 0 0 64px;
  }
`

export default function SearchedArticles({ searchResult }) {
  const {
    items: initialArticles,
    queries,
    searchInformation = {},
  } = searchResult
  const { totalResults = 0 } = searchInformation
  const searchTerms = queries?.request[0].exactTerms
  async function fetchPostsFromPage(page) {
    if ((page - 1) * 20 + 1 > 100) return []
    gtag.sendGAEvent(`search-${searchTerms}-loadmore-${page}`)
    try {
      const { data } = await axios({
        method: 'get',
        url: '/api/search',
        params: {
          exactTerms: searchTerms,
          start: (page - 1) * 20 + 1,
          takeAmount: Math.min(20, totalResults - (page - 1) * 20),
        },
        timeout: API_TIMEOUT,
      })
      return data.items ?? []
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const loader = (
    <Loading key={0}>
      <Image src={LoadingPage} alt="loading page"></Image>
    </Loading>
  )

  return (
    <InfiniteScrollList
      initialList={initialArticles}
      pageSize={12}
      amountOfElements={Math.min(totalResults, 100)}
      fetchListInPage={fetchPostsFromPage}
      isAutoFetch={true}
      loader={loader}
    >
      {(renderList) => {
        return <ArticleList renderList={renderList} searchTerms={searchTerms} />
      }}
    </InfiniteScrollList>
  )
}
