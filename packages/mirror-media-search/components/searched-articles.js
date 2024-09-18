import styled from 'styled-components'
import axios from 'axios'

import Image from 'next/legacy/image'
import LoadingPage from '../public/images/loading_page.gif'
import ArticleList from './article-list'
import { API_TIMEOUT } from '../config'
import gtag from '../utils/programmable-search/gtag'

import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import { PROGRAMABLE_SEARCH_PER_PAGE } from '../utils/programmable-search/const'

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
    items: { items },
    queries,
  } = searchResult
  const initialArticles = items.slice(0, PROGRAMABLE_SEARCH_PER_PAGE)
  const searchTerms = queries?.request[0].exactTerms
  async function fetchPostsFromPage(page) {
    gtag.sendGAEvent(`search-${searchTerms}-loadmore-${page}`)
    return items.slice(
      PROGRAMABLE_SEARCH_PER_PAGE * (page - 1),
      PROGRAMABLE_SEARCH_PER_PAGE * page
    )
  }

  const loader = (
    <Loading key={0}>
      <Image src={LoadingPage} alt="loading page"></Image>
    </Loading>
  )

  return (
    <InfiniteScrollList
      initialList={initialArticles}
      pageSize={PROGRAMABLE_SEARCH_PER_PAGE}
      fetchListInPage={fetchPostsFromPage}
      isAutoFetch={true}
      loader={loader}
    >
      {(renderList) => (
        <ArticleList renderList={renderList} searchTerms={searchTerms} />
      )}
    </InfiniteScrollList>
  )
}
